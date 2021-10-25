<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookCategoryController;
use App\Http\Controllers\ProductController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::resource('/sample', 'App\Http\Controllers\BookCategoryController');

Route::get('/product-list', [ProductController::class, 'index'])->name('product.list');
Route::get('/product-create', [ProductController::class, 'create'])->name('product.create');
Route::post('/product-store', [ProductController::class, 'store'])->name('product.store');
Route::get('/product-edit/{id}', [ProductController::class, 'edit'])->name('product.edit');
Route::get('/product-show/{id}', [ProductController::class, 'show'])->name('product.show');
Route::post('/product-update', [ProductController::class, 'update'])->name('product.update');
Route::get('/product-delete/{id}', [ProductController::class, 'destroy'])->name('product.delete');
//Route::post('/brand-search', [BrandController::class, 'search'])->name('brand.search')->middleware('auth:sanctum'); 

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
