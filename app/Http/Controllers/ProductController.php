<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Session;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $allData = Product::latest()->get();
		return response()->json([
		'allData' => $allData
		]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = new Product();
        $data->product_name = $request->product_name;
        $data->product_code = $request->product_code;
        $data->product_price = $request->product_price;
        $data->product_image = time(). $_FILES["product_image"]["name"];
        $save = $data->save();
        
        $source= $_FILES['product_image']['tmp_name'];
        @mkdir("productimages");
        $destination="productimages/".$data->product_image;
        $saveimage = move_uploaded_file($source,$destination);  
        
        if($save)
        {
            $message="Product created successfully.";
            $status = 1;
            return response()->json([
                'message' => $message,
                'status' => $status
                ]);  
        }
        else
        {
            $message="Unable to create product,please try again.";
            $status = 0;
            return response()->json([
                'message' => $message,
                'status' => $status
                ]); 
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $singledata = Product::find($id);
        return response()->json([
            'singledata' => $singledata
            ]);    
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = Product::find($id);
        $data->product_name = $request->product_name;
        $data->product_code = $request->product_code;
        $data->product_price = $request->product_price;
        if($request->product_image != null)
        {
            $data->product_image = time(). $_FILES["product_image"]["name"];
        }
        $save = $data->update();
        if($request->product_image != null)
        {
          $source= $_FILES['product_image']['tmp_name'];
          @mkdir("productimages");
          $destination="productimages/".$data->product_image;
          $saveimage = move_uploaded_file($source,$destination);  
        }
        if($save)
        {
            $message="Product created successfully.";
            $status = 1;
            return response()->json([
                'message' => $message,
                'status' => $status
                ]);  
        }
        else
        {
            $message="Unable to create product,please try again.";
            $status = 0;
            return response()->json([
                'message' => $message,
                'status' => $status
                ]); 
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Product::find($id);
        $delete = $data->delete();
        
        if($delete)
        {   
            $allData = Product::latest()->get();
            $message="Product deleted sccuessfully.";
            $status = 1;
            return response()->json([
                'message' => $message,
                'status' => $status,
                'allData' => $allData
                ]); 
        }
        else
        {
            $message="Unable to delete product,please try again.";
            $status = 0;
            return response()->json([
                'message' => $message,
                'status' => $status
                ]); 
        }
    }
}
