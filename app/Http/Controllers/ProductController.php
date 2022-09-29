<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Intervention\Image\Facades\Image;


class ProductController extends Controller
{

    public function get_all_product() {
        $products = Product::all();
        return response()->json([
            'products'  =>  $products
        ], 200);
    }

    public function add_product(Request $request) {

        $product = new Product();

        $product->name = $request->name;
        $product->description = $request->description;
        if($request->photo != "")
        {
            $strpos = strpos($request->photo,';');
            $sub = substr($request->photo, 0, $strpos);
            $ex = explode('/',$sub)[1];
            $name = time().".".$ex;
            $img = Image::make($request->photo)->resize(117, 100);
            $upload_path = public_path()."/upload/";
            $img->save($upload_path.$name);
            $product->photo = $name;
        }else
        {
            $product->photo = "image.png";
        }
        $product->photo = $name;
        $product->type = $request->type;
        $product->quantity = $request->quantity;
        $product->price = $request->price;
        $product->save();
    }

    public function get_edit_product($id) {
        $product = Product::find($id);
        return response()->json([
            'product' => $product
        ], 200);
    }
}
