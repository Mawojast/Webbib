<?php
use App\Http\Controllers\Explorer\FolderController;
use App\Http\Controllers\SidebarController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

Route::middleware(['auth', 'verified'])->group(function () {

    Route::post('sidebar/folder/{folder}', [SidebarController::class, 'storeFolder'])->name('sidebar.folder.store')->middleware('verified');
    Route::delete('sidebar/folder/{folder}', [SidebarController::class, 'destroyFolder'])->name('sidebar.folder.destroy')->middleware('verified');
});
