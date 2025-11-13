<?php

use App\Http\Controllers\Explorer\ExplorerController;
use App\Http\Controllers\Explorer\FolderController;
use App\Http\Controllers\Explorer\LinkController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

Route::middleware(['auth', 'verified'])->group(function () {

    Route::prefix('explorer')
        ->name('explorer.')
        ->group(function () {
            Route::resource('links', LinkController::class)->middleware('verified');
        }
    );

    Route::get('explorer', [ExplorerController::class, 'index'])->name('explorer.index');
    Route::get('explorer/{folder}/edit', [ExplorerController::class, 'edit'])->name('explorer.edit')->middleware('verified');
    Route::get('explorer/folder/{folder}/edit', [FolderController::class, 'edit'])->name('explorer.folder.edit')->middleware('verified');

    Route::post('explorer', [ExplorerController::class, 'store'])->name('explorer.store')->middleware('verified');
    Route::delete('explorer/{folder}', [ExplorerController::class, 'destroy'])->name('explorer.destroy')->middleware('verified');
    Route::put('explorer/{folder}', [ExplorerController::class, 'update'])->name('explorer.update')->middleware('verified');
    Route::put('explorer/{folder}/public', [ExplorerController::class, 'updatePublic'])->name('explorer.update.public')->middleware('verified');

    Route::get('explorer/folder/{folder}', [FolderController::class, 'index'])->name('explorer.folder.index')->middleware('verified');
    Route::post('explorer/folder/{folder}', [FolderController::class, 'store'])->name('explorer.folder.store')->middleware('verified');
    Route::delete('explorer/folder/{folder}', [FolderController::class, 'destroy'])->name('explorer.folder.destroy')->middleware('verified');
    Route::put('explorer/folder/{folder}', [FolderController::class, 'update'])->name('explorer.folder.update')->middleware('verified');
});
