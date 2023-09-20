<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\Admin\CategoriesController as AdminCategoriesController;
use App\Http\Controllers\Admin\ProductsController as AdminProductsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
  |--------------------------------------------------------------------------
  | Web Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register web routes for your application. These
  | routes are loaded by the RouteServiceProvider within a group which
  | contains the "web" middleware group. Now create something great!
  |
 */

Route::get('/', function () {
    return redirect('/products');
//    return Inertia::render('Welcome', [
//        'canLogin' => Route::has('login'),
//        'canRegister' => Route::has('register'),
//        'laravelVersion' => Application::VERSION,
//        'phpVersion' => PHP_VERSION,
//    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/admin/categories/create', [AdminCategoriesController::class, 'create'])->name('admin.categories.create');
    Route::post('/admin/categories/store', [AdminCategoriesController::class, 'store'])->name('admin.categories.store');
    Route::get('/admin/categories/{id}/edit', [AdminCategoriesController::class, 'edit'])->name('admin.categories.edit');
    Route::put('/admin/categories/{id}/update', [AdminCategoriesController::class, 'update'])->name('admin.categories.update');
    Route::delete('/admin/categories/{id}/delete', [AdminCategoriesController::class, 'destroy'])->name('admin.categories.destroy');
    Route::get('/admin/categories', [AdminCategoriesController::class, 'index'])->name('admin.categories.index');

    Route::get('/admin/products/create', [AdminProductsController::class, 'create'])->name('admin.products.create');
    Route::post('/admin/products/store', [AdminProductsController::class, 'store'])->name('admin.products.store');
    Route::get('/admin/products/{id}/edit', [AdminProductsController::class, 'edit'])->name('admin.products.edit');
    Route::put('/admin/products/{id}/update', [AdminProductsController::class, 'update'])->name('admin.products.update');
    Route::delete('/admin/products/{id}/delete', [AdminProductsController::class, 'destroy'])->name('admin.products.destroy');
    Route::get('/admin/products', [AdminProductsController::class, 'index'])->name('admin.products.index');
    Route::get('/products/{id}', [ProductsController::class, 'show'])->name('products.show');
    Route::delete('/products', [ProductsController::class, 'destroy'])->name('products.destroy');
    Route::get('/products', [ProductsController::class, 'index'])->name('products.index');
//    Route::resource('admin/categories', \App\Http\Controllers\Admin\CategoriesController::class);
});

require __DIR__ . '/auth.php';
