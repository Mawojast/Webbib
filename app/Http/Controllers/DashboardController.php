<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use App\Models\Dashboard;
use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StoreDashboardRequest;
use App\Http\Requests\Dashboard\UpdateDashboardRequest;
use App\Http\Requests\Dashboard\UpdatePositionDashboardRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use App\Services\Favicon\FaviconService;
use Illuminate\Support\Facades\Cache;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource
     */
    public function index(Request $request)
    {
        Cache::forget('dashboard.index.'.Auth::id());
        $dashboards = Cache::remember('dashboard.index.'.Auth::id(), 60, function() {
            return Dashboard::where('user_id', Auth::id())
                ->orderBy('position', 'asc')
                ->get();
            });

        $user = User::find(Auth::id());

        return Inertia::render('dashboard/index', [
            'dashboards' => $dashboards->map->only(['id', 'title', 'url', 'position', 'created_at', 'image']),
            'user' => $user->only(['name', 'image', 'email_verified_at']),
            'mustVerifyEmail' => !$request->user()->hasVerifiedEmail(),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dashboard/CreateDashboard', []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDashboardRequest $request, FaviconService $faviconService)
    {
        Gate::authorize('create', Dashboard::class);
        $data = $request->validated();

        $data['image'] = $faviconService->getFavicon($data['url']);

        DB::transaction(function () use ($data) {
            $userId = Auth::id();

            $data['user_id'] = $userId;
            $data['position'] = 1;

            Dashboard::where('user_id', $userId)
                ->orderBy('position', 'desc')
                ->increment('position');

            Dashboard::create($data);
        }, 2);

        Cache::forget('dashboard.index.'.Auth::id());

        return redirect()->route('dashboard.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Dashboard $dashboard)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dashboard $dashboard): InertiaResponse
    {
        Gate::authorize('view', $dashboard);
        return Inertia::render('dashboard/EditDashboard', [
            'dashboard' => $dashboard
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDashboardRequest $request, Dashboard $dashboard, FaviconService $faviconService): RedirectResponse
    {
        Gate::authorize('update', $dashboard);
        $data = $request->validated();

        if ($data['url'] !== $dashboard->url) {
            $data['image'] = $faviconService->getFavicon($data['url']);
        }

        $dashboard->update($data);

        Cache::forget('dashboard.index.'.Auth::id());
        return redirect()->route('dashboard.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function updatePosition(UpdatePositionDashboardRequest $request, Dashboard $dashboard): RedirectResponse
    {
        Gate::authorize('updatePosition', $dashboard);
        $data = $request->validated();
        DB::transaction(function () use ($dashboard, $data) {
            $userId = Auth::id();
            $dashboard->update(['position' => 0]);

            if ($data['from'] < $data['to']) {

                Dashboard::where('user_id', $userId)
                ->whereBetween('position', [$data['from'] + 1, $data['to']])
                ->orderBy('position', 'ASC')
                ->decrement('position');

            } else {

                Dashboard::where('user_id', $userId)
                ->whereBetween('position', [$data['to'], $data['from'] - 1])
                ->orderBy('position', 'desc')
                ->increment('position');
            }

            $dashboard->update(['position' => $data['to']]);
        }, 2);

        Cache::forget('dashboard.index.'.Auth::id());
        return redirect()->route('dashboard.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dashboard $dashboard)
    {
        Gate::authorize('delete', $dashboard);

        DB::transaction(function () use ($dashboard) {
            $userId = Auth::id();
            $deletedPosition = $dashboard->position;

            $dashboard->delete();

            Dashboard::where('user_id', $userId)
                ->where('position', '>', $deletedPosition)
                ->orderBy('position')
                ->decrement('position');
        }, 2);

        Cache::forget('dashboard.index.'.Auth::id());

        return back();
    }
}
