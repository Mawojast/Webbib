<?php

use App\Http\Controllers\PolController;
use Illuminate\Support\Facades\Route;

// pol abbreviation of policy
Route::get('/pol', fn () => abort(404));
Route::get('/pol/privacypolicy', [PolController::class, 'privacyPolicy'])->name('pol.privacypolicy');
Route::get('/pol/userprivacypolicy', [PolController::class, 'userPrivacyPolicy'])->name('pol.userprivacypolicy');
Route::get('/pol/termsofservice', [PolController::class, 'termsOfService'])->name('pol.termsofservice');
Route::get('/pol/imprint', [PolController::class, 'imprint'])->name('pol.imprint');
