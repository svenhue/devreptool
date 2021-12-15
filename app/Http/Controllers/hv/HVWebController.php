<?php

namespace App\Http\Controllers\hv;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HVWebController extends Controller
{
    public function root(Request $request)
    {
        return view('index');
    }

    public function version(Request $request)
    {
        return array('version' => 'V2.0');
    }
}


