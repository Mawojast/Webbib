<?php

namespace App\Http\Controllers\Explorer;

use Inertia\Inertia;
use App\Models\Folder;
use App\Models\Link;
use App\Http\Controllers\Controller;
use App\Http\Requests\Explorer\StoreLinkRequest;
use App\Http\Requests\Explorer\UpdateLinkRequest;
use Illuminate\Support\Facades\Gate;
use Hazaveh\LinkPreview\Client;
use App\Services\Favicon\FaviconService;

class LinkController extends Controller
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
    public function store(StoreLinkRequest $request, Client $client, FaviconService $faviconService)
    {
        $data = $request->validated();
        $folder = Folder::find($data['folder_id']);

        Gate::authorize('create', [Link::class, $folder]);

        $preview = $client->parse($data['url']);

        $image = $preview->image;
        $data['image'] = ($image && filter_var($image, FILTER_VALIDATE_URL))
            ? $image
            : $faviconService->getFavicon($data['url']);

        $data['title'] ??= $preview->title;

        Link::create($data);

        return back();
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
    public function edit(Link $link)
    {
        Gate::authorize('update', $link);

        return Inertia::render('explorer/EditLink', [
            'link' => $link->only('title', 'id', 'url', 'created_at', 'folder_id'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLinkRequest $request, Link $link, Client $client, FaviconService $faviconService)
    {
        Gate::authorize('update', $link);
        $data = $request->validated();

        if ($link->url !== $data['url']) {
            $preview = $client->parse($data['url']);

            $image = $preview->image;
            $data['image'] = ($image && filter_var($image, FILTER_VALIDATE_URL))
                ? $image
                : $faviconService->getFavicon($data['url']);
        }

        $data['title'] ??= $preview->title;

        $link->update($data);

        back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Link $link)
    {
        Gate::authorize('delete',$link);
        $link->delete();
        back();
    }
}
