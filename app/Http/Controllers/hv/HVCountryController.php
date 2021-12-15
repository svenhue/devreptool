<?php

namespace App\Http\Controllers\hv;

use App\Models\hv\HVCountry;
use App\Utils\Utils;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HVCountryController extends Controller
{
    public function all(Request $request)
    {
        $query = HVCountry::select();

        Utils::buildFilter($query, $request->filter);

        $total = $query->count();

        Utils::buildGroup($query, $request->group);
        Utils::buildSort($query, $request->sort);

        if ($request->limit)
            Utils::buildLimit($query, $request->start, $request->limit);

        return array('success' => true, 'data' => $query->get(), 'total' => $total);
    }
}
