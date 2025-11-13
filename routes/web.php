<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserFrontController;
use App\Http\Middleware\EnsureUserFrontFolderIsPublic;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');


Route::middleware(['auth'])->group(function () {

    Route::resource('dashboard', DashboardController::class);
    Route::match(['put', 'patch'], 'dashboard/{dashboard}/position', [DashboardController::class, 'updatePosition'])
    ->name('dashboard.update.position');
});

require __DIR__.'/settings.php';
require __DIR__.'/pol.php';
require __DIR__.'/explorer.php';
require __DIR__.'/sidebar.php';

Route::get('{user}', [UserFrontController::class, 'index'])->name('userfront.index');
Route::get('{user}/topic', fn () => abort(404));
Route::get('{user}/topic/{folder}', [UserFrontController::class, 'indexFolder'])->name('userfront.folder.index')->middleware(EnsureUserFrontFolderIsPublic::class);
Route::get('{user}/create', [UserFrontController::class, 'create'])->name('userfront.create')->middleware(['auth', 'verified']);
Route::get('{user}/{userFront}/edit', [UserFrontController::class, 'edit'])->name('userfront.edit')->middleware(['auth', 'verified']);
Route::post('{user}', [UserFrontController::class, 'store'])->name('userfront.store')->middleware(['auth', 'verified']);
Route::delete('{user}/{userFront}', [UserFrontController::class, 'destroy'])->name('userfront.destroy')->middleware(['auth', 'verified']);
Route::match(['put','patch'],'{user}/{userFront}', [UserFrontController::class, 'update'])->name('userfront.update')->middleware(['auth', 'verified']);
Route::match(['put', 'patch'],'{user}/{userFront}/position', [UserFrontController::class, 'updatePosition'])->name('userfront.update.position')->middleware(['auth', 'verified']);
// Route::get('{user}/{userFront}/position', [UserFrontController::class, 'updatePosition'])->name('userfront.update.position')->middleware(['auth', 'verified']);
