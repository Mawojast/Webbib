<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\UserFront;
use App\Models\User;
use App\Models\Folder;
use App\Http\Requests\UserFront\StoreUserFrontRequest;
use App\Http\Requests\UserFront\UpdateUserFrontRequest;
use App\Http\Requests\UserFront\UpdatePositionUserFrontRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class UserFrontController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(User $user): Response
    {
        return Inertia::render('userFront/index', [
            'username' => $user->name,
            'displayname' => $user->display_name,
            'links' =>$user->userFront()
                ->orderBy('position', 'desc')
                ->get()->map->only(['id', 'title', 'url', 'position']),
            'folders' => $user->folders()
                ->whereNull('parent_id')
                ->where('public', true)
                ->get()->map->only(['id', 'name', 'public']),
            'profileImage' => $user->getImageUrl(),
        ]);
    }

    public function indexFolder(User $user, Folder $folder): Response
    {
        $ancestors = $folder->ancestors()->get()->toArray();

        if (count($ancestors) > 2) {
            $ancestors = [...array_slice($ancestors, 0, 1), ...array_slice($ancestors, -2)];
        }

        return Inertia::render('userFront/Topic', [
            'username' => $user->name,
            'displayname' => $user->display_name,
            'links' =>$folder->links->map->only(['id', 'title', 'url', 'position', 'image']),
            'childFolders' => $folder->children->map->only(['id', 'name']),
            'profileImage' => '/profile_image/'.$user->image,
            'folder' => $folder->only(['id', 'name']),
            'ancestors' => $ancestors,
            'previousFolderId' => $folder->parent_id,
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(User $user): Response
    {
        Gate::authorize('create', [UserFront::class, $user->name]);
        return Inertia::render('userFront/CreateUserFront', [
            'name' => $user->name
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserFrontRequest $request, User $user): RedirectResponse
    {
        Gate::authorize('create', [UserFront::class, $user->name]);
        $data = $request->validated();

        DB::transaction(function () use ($data) {
            $userId = Auth::id();

            $data['user_id'] = $userId;
            $data['position'] = 1;

            UserFront::where('user_id', $userId)
                ->orderBy('position', 'desc')
                ->increment('position');

            UserFront::create($data);
        }, 2);

        return redirect()->route('userfront.index',['user' => $user->name]);
    }

    /**
     * Display the specified resource.
     */
    public function show(UserFront $userFront)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user, UserFront $userFront): Response
    {
        Gate::authorize('update', [$userFront, $user->name]);
        return Inertia::render('userFront/EditUserFront', [
            'link' => $userFront->only(['title', 'url', 'id']),
            'name' => $user->name
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserFrontRequest $request, User $user, UserFront $userFront): RedirectResponse
    {
        Gate::authorize('update', [$userFront, $user->name]);
        $data = $request->validated();
        $userFront->update($data);

        return redirect()->route('userfront.index', ['user' => $user->name]);
    }

    public function updatePosition(UpdatePositionUserFrontRequest $request, User $user, UserFront $userFront): RedirectResponse
    {
        Gate::authorize('updatePosition', [$userFront, $user->name]);
        $data = $request->validated();

        DB::transaction(function () use ($userFront, $data) {
            $userId = Auth::id();
            $userFront->update(['position' => 0]);

            if ($data['from'] < $data['to']) {

                UserFront::where('user_id', $userId)
                ->whereBetween('position', [$data['from'] + 1, $data['to']])
                ->orderBy('position', 'ASC')
                ->decrement('position');

            } else {

                UserFront::where('user_id', $userId)
                ->whereBetween('position', [$data['to'], $data['from'] - 1])
                ->orderBy('position', 'desc')
                ->increment('position');
            }

            $userFront->update(['position' => $data['to']]);
        }, 2);

        return redirect()->route('userfront.index', ['user' => $user->name]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user, UserFront $userFront): RedirectResponse
    {
        Gate::authorize('delete', [$userFront, $user->name]);

        DB::transaction(function () use ($userFront) {
            $userId = Auth::id();
            $deletedPosition = $userFront->position;

            $userFront->delete();

            UserFront::where('user_id', $userId)
                ->where('position', '>', $deletedPosition)
                ->orderBy('position')
                ->decrement('position');
        }, 2);

        return back();
    }
}
