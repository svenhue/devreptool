<?php

namespace App\Http\Controllers\hv;

use App\Utils\MDConverter;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HVMarkdownController extends Controller
{
    public function convert(Request $request)
    {

        $all = $request->all();
        $data = MDConverter::convert($all['md']);

        return array('success' => true, 'data' => $data);
    }
}
