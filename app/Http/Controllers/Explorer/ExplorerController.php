<?php

namespace App\Http\Controllers\Explorer;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Folder;
use App\Models\SidebarFolder;
use App\Http\Controllers\Controller;
use App\Http\Requests\Explorer\StoreExplorerRequest;
use App\Http\Requests\Explorer\UpdateExplorerRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;


class ExplorerController extends Controller
{
    /**
     * Show the dashboard page.
     */
    public function index(): Response
    {
        $folders = Folder::where('user_id', Auth::id())->where('parent_id', null)->get();
        $sidebarFolders = SidebarFolder::where('user_id', Auth::id())->get();

        return Inertia::render('explorer/index', [
            'folders' => $folders->map->only(['id', 'name', 'created_at', 'public', 'updated_at']),
            'sidebarFolderIds' => $sidebarFolders->map->only(['folder_id']),
        ]);
    }

    public function edit(Folder $folder): Response
    {
        Gate::authorize('updateExplorer', $folder);
        return Inertia::render('explorer/EditExplorer', [
            'folder' => $folder->only(['id', 'name', 'created_at', 'updated_at']),
        ]);
    }

    public function store(StoreExplorerRequest $request): RedirectResponse
    {
        Gate::authorize('createExplorer', Folder::class);

        $data = $request->validated();
        $data['user_id'] = Auth::id();
        $data['parent_id'] = null;

        Folder::create($data);

        return back();
    }

    public function update(UpdateExplorerRequest $request, Folder $folder): RedirectResponse
    {
        Gate::authorize('updateExplorer', $folder);
        $data = $request->validated();
        $folder->update($data);

        return redirect()->route('explorer.index');
    }

    public function updatePublic(Folder $folder): RedirectResponse
    {
        Gate::authorize('updateExplorer', $folder);
        $isPublic = !$folder->public;
        Folder::whereDescendantOrSelf($folder)->update(['public' => $isPublic]);
        return back();
    }

    public function destroy(Folder $folder)
    {
        Gate::authorize('deleteExplorer', $folder);
        $folder->delete();

        return back();
    }
}
