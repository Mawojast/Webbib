<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Folder;
use App\Models\Link;
use App\Models\Tag;
use App\Http\Controllers\Controller;
use App\Http\Requests\Explorer\StoreExplorerLinkRequest;
use App\Http\Requests\Link\StoreLinkRequest;
use App\Http\Requests\Link\UpdateLinkRequest;
use App\Http\Requests\Explorer\UpdateExplorerLinkRequest;
use Illuminate\Support\Facades\Gate;
use Hazaveh\LinkPreview\Client;
use App\Services\Favicon\FaviconService;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class LinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $lastUsedTags = $request->user()->lastUsedTags()->get();
        $links = $request->user()
            ->links()
            ->with(['tags', 'folder:id,name'])
            ->orderBy('created_at', 'DESC')
            ->get()
            ->makeHidden(['user_id'])
            ->each(function ($link) {
                $link->folder_name = $link->folder->name ?? null;
            });

        return Inertia::render('link/index', [
            'lastUsedTags' => $lastUsedTags->map->only(['name']),
            'links' => $links,
        ]);
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

        DB::transaction(function () use ($data, $request, $client, $faviconService) {

            $preview = $client->parse($data['url']);

            $image = $preview->image;
            $data['image'] = ($image && filter_var($image, FILTER_VALIDATE_URL))
                ? $image
                : $image;

            $data['title'] ??= $preview->title;
            $data['user_id'] = $request->user()->id;
            $data['parent_id'] = null;

            $link = Link::create($data);

            if ($data['tags']) {

                $tagCollection = collect($data['tags'])->unique();

                $tagIds = $tagCollection->map(function ($name) {
                    return Tag::firstOrCreate(['name' => $name])->id;
                });

                $link->tags()->syncWithoutDetaching($tagIds->toArray());
            }

        }, 2);

        return back();
    }

    /**
     * Store a newly created resource in storage assigned to an explorer folder.
     */
    public function storeExplorerLink(StoreExplorerLinkRequest $request, Client $client, FaviconService $faviconService)
    {
        $data = $request->validated();
        $folder = Folder::find($data['folder_id']);

        Gate::authorize('createExplorerLink', [Link::class, $folder]);

        DB::transaction(function () use ($data, $request, $client, $faviconService) {

            $preview = $client->parse($data['url']);

            $image = $preview->image;
            $data['image'] = ($image && filter_var($image, FILTER_VALIDATE_URL))
                ? $image
                : $faviconService->getFavicon($data['url']);

            $data['title'] ??= $preview->title;
            $data['user_id'] = $request->user()->id;

            $link = Link::create($data);

            if ($data['tags']) {

                $tagCollection = collect($data['tags'])->unique();

                $tagIds = $tagCollection->map(function ($name) {
                    return Tag::firstOrCreate(['name' => $name])->id;
                });

                $link->tags()->syncWithoutDetaching($tagIds->toArray());
            }

        }, 2);

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
    // public function edit(Link $link)
    // {
    //     Gate::authorize('update', $link);

    //     return Inertia::render('explorer/EditLink', [
    //         'link' => $link->only('title', 'id', 'url', 'created_at', 'folder_id'),
    //     ]);
    // }

    /**
     * Update the specified resource in storage.
     */
    public function updateExplorerLink(UpdateExplorerLinkRequest $request, Link $link, Client $client, FaviconService $faviconService)
    {
        Gate::authorize('updateExplorerLink', $link);
        $data = $request->validated();

        DB::transaction(function () use ($data, $request, $client, $faviconService, $link) {

            if ($link->url !== $data['url'] || !isset($data['title'])) {

                $preview = $client->parse($data['url']);
                $data['title'] ??= $preview->title;
                $image = $preview->image;
                $data['image'] = ($image && filter_var($image, FILTER_VALIDATE_URL))
                    ? $image
                    : $faviconService->getFavicon($data['url']);
            }

            $link->update($data);
            if ($data['tags'] !== $link->tags->pluck('name')->toArray()) {

                $tagCollection = collect($data['tags'])->unique();

                $tagIds = $tagCollection->map(function ($name) {
                    return Tag::firstOrCreate(['name' => $name])->id;
                });

                $link->tags()->sync($tagIds->toArray());
            }
        }, 2);

        back();
    }

        /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLinkRequest $request, Link $link, Client $client, FaviconService $faviconService)
    {
        Gate::authorize('update', $link);
        $data = $request->validated();

        DB::transaction(function () use ($data, $request, $client, $faviconService, $link) {

            if ($link->url !== $data['url'] || !isset($data['title'])) {

                $preview = $client->parse($data['url']);
                $data['title'] ??= $preview->title;
                $image = $preview->image;
                $data['image'] = ($image && filter_var($image, FILTER_VALIDATE_URL))
                    ? $image
                    : $faviconService->getFavicon($data['url']);
            }

            $link->update($data);
            if ($data['tags'] !== $link->tags->pluck('name')->toArray()) {

                $tagCollection = collect($data['tags'])->unique();

                $tagIds = $tagCollection->map(function ($name) {
                    return Tag::firstOrCreate(['name' => $name])->id;
                });

                $link->tags()->sync($tagIds->toArray());
            }
        }, 2);

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

    public function destroyLinks(Request $request)
    {
        $validated = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer', 'exists:links,id'],
        ]);

        $links = Link::whereIn('id', $validated['ids'])->get();

        foreach ($links as $link) {
            Gate::authorize('delete', $link);
            $link->delete();
        }

        return back()->with('success', 'Links deleted.');
    }
}
