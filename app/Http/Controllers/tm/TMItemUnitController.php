<?php

namespace App\Http\Controllers\tm;

use App\Models\tm\TMItemUnit;
use App\Utils\Utils;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TMItemUnitController extends Controller
{
    public function all(Request $request)
    {
        $query = TMItemUnit::select()->where('tm_item_unit.hv_company_id', $request->current_company_id);

        if ($request->input('query', null))
            $query->where('ident', 'like', '%' . $request->input('query', null) . '%');
        else
            Utils::buildFilter($query, $request->filter);

        $total = $query->count();

        Utils::buildSort($query, $request->sort);

        if ($request->limit)
            Utils::buildLimit($query, $request->start, $request->limit);


        return array('success' => true, 'data' => $query->get(), 'total' => $total);
    }
}
