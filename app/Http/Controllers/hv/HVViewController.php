<?php

namespace App\Http\Controllers\hv;

use App\Utils\Utils;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HVViewController extends Controller
{
    public function view(Request $request)
    {
        $viewParam = $request->input('view');

        $viewConfig = Utils::encrypt_decrypt('decrypt', $viewParam);

        $viewConfigArr = explode('::', $viewConfig);

        return array('success' => true, 'data'=>$viewConfigArr);

    }
}
