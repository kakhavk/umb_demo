<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $products = Products::paginate(1000)->withQueryString();
        $productItems = [];
        foreach($products as $product){
            $productItems[]=$product;
        }

        return Inertia::render('Products', [

                'products' => $productItems
        ]);
    }
    
    /**
     * Display the specified resource.
     */
    public function show(string $id) {
       $product = Products::find($id);
       return Inertia::render('ProductDetails', [               
                'product' => $product
        ]);
    }
    
    /**
     * Delete the user's account.
     */
    public function destroy(Request $request)
    {
        $product = Products::find($request->id);
        \App\Models\ProductCategories::where('product_id', $product->id)->delete();
        $product->delete();

        return Redirect::route('products.index');
    }
}
