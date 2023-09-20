<?php

namespace App\Http\Controllers\Admin;

use App\Models\Categories;
use App\Models\Products;
use App\Models\ProductCategories;
use App\Models\ProductImages;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Support\Testing\Fakes\Fake;

class ProductsController extends Controller {

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $products = Products::paginate(100)->withQueryString();
        $productItems = [];
        foreach($products as $product){
            $productItems[]=$product;
        }

        return Inertia::render('Admin/Products/Main', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
                'products' => $productItems
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        $categories = Categories::all();
        return Inertia::render('Admin/Products/Create', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
                'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {


        $product = new Products();
        $product['name'] = $request->name;
        $product['description'] = $request->description;
        $product['price'] = $request->price || 0.00;
        $product['created_by_id'] = auth()->user()->id;
        $product['updated_by_id'] = auth()->user()->id;
        $product->save();

        if ($request->categories && count($request->categories) > 0) {
            foreach ($request->categories as $category) {
                ProductCategories::create([
                    'product_id' => $product->id,
                    'category_id' => $category
                ]);
            }
        }
        if ($request->main_image) {
            $imageName = pathinfo($request->main_image->getClientOriginalName(), PATHINFO_FILENAME);
            $newImage = $imageName . '-' . $product->id . '.' . $request->main_image->extension();

            $request->main_image->move(public_path('images/products'), $newImage);

            $product['main_image'] = $newImage;
            $product->save();
        }

        if ($request->image1) {
            $imageName = pathinfo($request->image1->getClientOriginalName(), PATHINFO_FILENAME);
            $newImage = $imageName . '-' . $product->id . '_1.' . $request->image1->extension();

            $request->image1->move(public_path('images/products'), $newImage);

            ProductImages::create([
                'product_id' => $product->id,
                'image' => $newImage
            ]);

            $product->save();
        }

        if ($request->image2) {
            $imageName = pathinfo($request->image2->getClientOriginalName(), PATHINFO_FILENAME);
            $newImage = $imageName . '-' . $product->id . '_2.' . $request->image2->extension();

            $request->image2->move(public_path('images/products'), $newImage);

            ProductImages::create([
                'product_id' => $product->id,
                'image' => $newImage
            ]);
            $product->save();
        }

        if ($request->image3) {
            $imageName = pathinfo($request->image3->getClientOriginalName(), PATHINFO_FILENAME);
            $newImage = $imageName . '-' . $product->id . '_3.' . $request->image3->extension();

            $request->image3->move(public_path('images/products'), $newImage);

            ProductImages::create([
                'product_id' => $product->id,
                'image' => $newImage
            ]);
            $product->save();
        }
        return Redirect::route('admin.products.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id, Request $request) {
        $categories = Categories::all();
        $product = Products::find($id);
        $productCategories = [];
        foreach ($product->categories as $category) {
            $productCategories[] = $category->category_id;
        }

        if ($request->categories && count($request->categories) > 0) {
            foreach ($request->categories as $category) {
                ProductCategories::create([
                    'product_id' => $product->id,
                    'category_id' => $category
                ]);
            }
        }

        return Inertia::render('Admin/Products/Edit', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
                'product' => $product,
                'categories' => $categories,
                'product_categories' => $productCategories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {

        ProductCategories::where('product_id', $id)->delete();
        $product = Products::find($id);
        $product['name'] = $request->name;
        $product['description'] = $request->description;
        $product['price'] = $request->price || 0.00;
        $product['updated_by_id'] = auth()->user()->id;
        $product->save();

        if ($request->categories && count($request->categories) > 0) {
            foreach ($request->categories as $category) {
                ProductCategories::create([
                    'product_id' => $product->id,
                    'category_id' => $category
                ]);
            }
        }
        if ($request->main_image) {
            $imageName = pathinfo($request->main_image->getClientOriginalName(), PATHINFO_FILENAME);
            $newImage = $imageName . '-' . $product->id . '.' . $request->main_image->extension();

            $request->main_image->move(public_path('images/products'), $newImage);

            $product['main_image'] = $newImage;
            $product->save();
        }
        return Redirect::route('admin.products.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        //
    }

    
}
