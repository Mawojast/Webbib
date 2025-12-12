<?php

namespace App\Http\Controllers\Explorer;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Folder;
use App\Http\Controllers\Controller;
use App\Http\Requests\Explorer\StoreFolderRequest;
use App\Http\Requests\Explorer\UpdateFolderRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Models\SidebarFolder;
use Illuminate\Http\Request;

class FolderController extends Controller
{
    /**
     * Show the dashboard page.
     */
    public function index(Folder $folder, Request $request): Response
    {
        Gate::authorize('view', $folder);

        $lastUsedTags = $request->user()->tags()->orderBy('created_at', 'DESC')->limit(8)->get();
        $childFolders = Folder::where('parent_id', $folder->id)->get();
        $sidebarFolders = SidebarFolder::where('user_id', Auth::id())->get();
        $ancestors = $folder->ancestors()->get();

        // takes the first and last two elements
        if ($ancestors->count() > 2) {
            $ancestors = $ancestors->take(1)->merge($ancestors->take(-2));
        }


        return Inertia::render('explorer/Folder', [
            'folder' => $folder,
            'childFolders' => $childFolders->map->only(['name', 'id', 'created_at']),
            'ancestorFolders' => $ancestors->map->only(['name', 'id', 'created_at']),
            'previousFolderId' => $folder->parent_id,
            'sidebarFolderIds' => $sidebarFolders->map->only(['folder_id']),
            'lastUsedTags' => $lastUsedTags->map->only(['name'])
        ]);
    }

    public function edit(Folder $folder): Response
    {
        Gate::authorize('update', $folder);

        return Inertia::render('explorer/EditFolder', [
            'folder' => $folder->only('name', 'id', 'created_at', 'parent_id')
        ]);
    }

    public function store(StoreFolderRequest $request, Folder $folder): RedirectResponse
    {
        Gate::authorize('create', $folder);

        $data = $request->validated();
        $data['user_id'] = Auth::id();
        $data['parent_id'] = $folder->id;
        $data['public'] = $folder->public;

        Folder::create($data);

        return back();
    }

    public function update(UpdateFolderRequest $request, Folder $folder): RedirectResponse
    {
        Gate::authorize('update', $folder);

        $data = $request->validated();
        $folder->update($data);

        return redirect()->route('explorer.folder.index', $folder->parent_id);
    }

    public function destroy(Folder $folder): RedirectResponse
    {
        Gate::authorize('delete', $folder);
        $folder->delete();

        return back();
    }
}
