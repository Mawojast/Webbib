<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Folder;
use App\Models\SidebarFolder;
use App\Http\Requests\Sidebar\StoreSidebarFolderRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class SidebarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeFolder(StoreSidebarFolderRequest $request, Folder $folder)
    {
        Gate::authorize('createSidebar', $folder);
        $request->validated();

        SidebarFolder::create([
            'user_id' => $folder->user_id,
            'folder_id' => $folder->id
        ]);

        back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Folder $folder)
    {
        Gate::authorize('delete', $folder);
    }

        /**
     * Remove the specified resource from storage.
     */
    public function destroyFolder(Folder $folder): RedirectResponse
    {
        Gate::authorize('deleteSidebar', $folder);
        SidebarFolder::where('user_id', $folder->user_id)
            ->where('folder_id', $folder->id)
            ->delete();

        return back();
    }
}
