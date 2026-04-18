<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index(): Collection
    {
        return Product::all();
    }

    public function show($id): Product
    {
        return Product::findOrFail($id);
    }

    //
    public function store(Request $request): Product
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|regex:/^[A-Za-z]{1,30}$/$i',
            'price' => 'required|numeric|min:0|max:100000',
        ]);


        $product = new Product();
        $product->name = $request->input('name');
        $product->price = $request->input('price');
        $product->save();
        return $product;
    }

    public function update(Request $request, $id): \Illuminate\Http\JsonResponse
    {
        $product = Product::findOrFail($id);
        if($product === null){
            return response()->json(['message' => 'Product not found'], 404);
        }
        $product->name = $request->input('name');
        $product->price = $request->input('price');
        $product->save();
        return $product;
    }

    public function destroy($id){
        $product = Product::find($id);
        if($product !== null){
            $product->delete();
            return $product;
        }
        return response()->json(['message' => 'Product not found'], 404);
    }
}
