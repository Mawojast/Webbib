<?php

use App\Http\Controllers\Explorer\ExplorerController;
use App\Http\Controllers\Explorer\FolderController;
use App\Http\Controllers\LinkController;

use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('explorer/link', [LinkController::class, 'index'])->name('explorer.link.index')->middleware('verified');
    Route::post('explorer/link', [LinkController::class, 'storeExplorerLink'])->name('explorer.link.store')->middleware('verified');
    Route::get('explorer/link/create', [LinkController::class, 'create'])->name('explorer.link.create')->middleware('verified');
    Route::get('explorer/link/{link}', [LinkController::class, 'show'])->name('explorer.link.show')->middleware('verified');
    Route::match(['put','patch'],'explorer/link/{link}', [LinkController::class, 'updateExplorerLink'])->name('explorer.link.update')->middleware(['auth', 'verified']);
    Route::delete('explorer/link/{link}', [LinkController::class, 'destroy'])->name('explorer.link.destroy')->middleware('verified');
    Route::get('explorer/link/{link}/edit', [LinkController::class, 'edit'])->name('explorer.link.edit')->middleware('verified');

    Route::get('link', [LinkController::class, 'index'])->name('link.index')->middleware('verified');
    Route::post('link', [LinkController::class, 'store'])->name('link.store')->middleware('verified');
    Route::delete('links', [LinkController::class, 'destroyLinks'])->name('links.destroy')->middleware('verified');
    Route::match(['put','patch'],'link/{link}', [LinkController::class, 'update'])->name('link.update')->middleware(['auth', 'verified']);
    // Route::delete('link', [LinkController::class, 'destroy'])->name('link.destroy')->middleware('verified');
});
