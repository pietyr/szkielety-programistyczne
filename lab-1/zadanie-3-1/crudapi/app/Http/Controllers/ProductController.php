<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index()
    {
        return Product::all();
    }

    public function show($id)
    {
        return Product::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0|max:1000000',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $product = new Product();
        $product->name = $request->input('name');
        $product->price = $request->input('price');
        $product->save();
        return $product;
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id); //find zamiast findOrFail, aby pojawiła się poniższa wiadomość, a nie 404
        if ($product !== null) {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'price' => 'required|numeric|min:0|max:1000000',
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }
            $product->name = $request->input('name');
            $product->price = $request->input('price');
            $product->save();
            return $product;
        }
        return "Nie istnieje w bazie obiekt o podanym id=$id";
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if ($product !== null) {
            $product->delete();
            return $product;
        }
        return "Nie istnieje w bazie obiekt o podanym id=$id";
    }
}
