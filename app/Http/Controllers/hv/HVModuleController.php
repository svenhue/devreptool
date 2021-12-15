<?php

namespace App\Http\Controllers\hv;

use App\Models\hv\HVStateFul;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HVModuleController extends Controller
{
    public function readState(Request $request)
    {
        $query = HVStateFul::select('context as name', 'value');
        $query->where('hv_company_id', $request->current_company_id);
        $query->where('hv_user_id', $request->current_user_id);
        return array('success' => true, 'data' => $query->get(), 'total' => $query->count());
    }

    public function saveState(Request $request)
    {
        $data = json_decode($request->get('data'));

        foreach ($data as $module) {
            $moduleObj = HVStateFul::where('hv_company_id', $request->current_company_id)->where('hv_user_id', $request->current_user_id)->where('context', $module->name)->first();
            if (!$moduleObj) {
                $moduleObj = new HVStateFul();
                $moduleObj->hv_company_id = $request->current_company_id;
                $moduleObj->hv_user_id = $request->current_user_id;
                $moduleObj->context = $module->name;
            }

            $moduleObj->value = $module->value;

            $moduleObj->save();
        }

        return array('success' => true);

    }
}
