<?php

namespace App\Http\Controllers\hv;

use App\Models\hv\HVResourceZone;
use App\Utils\Utils;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HVResourceZoneController extends Controller
{
    public function all(Request $request)
    {
        $query = HVResourceZone::select('*', 'start_at AS start_time','end_at AS end_time')
            ->where('hv_resource_zone.hv_company_id', $request->current_company_id)
            ->where('hv_resource_zone.hv_user_id', $request->input('id'));

        $total = $query->count();

        Utils::buildSort($query, $request->sort);

        return array('success' => true, 'data' => $query->get(), 'total' => $total);
    }

    public function allResourceZones(Request $request)
    {
        $query = HVResourceZone::select()
            ->where('hv_resource_zone.hv_company_id', $request->current_company_id);

        $total = $query->count();

        return array('success' => true, 'data' => $query->get(), 'total' => $total);
    }

    public function createOrUpdate(Request $request, $id = null)
    {
        $all = $request->all();

        if ($id) {
            $obj = HVResourceZone::find($id);
            $obj->updated_by = $request->current_user_id;
        } else {
            $obj = new HVResourceZone();
            $obj->hv_company_id = $request->current_company_id;
            $obj->created_by = $request->current_user_id;
        }

        foreach ($all as $property => $value) {
            switch ($property) {
                case 'id':
                case 'token':
                case '_dc':
                case 'Cls':
                case 'AllDay':
                    break;
                default:
                    $obj->$property = $value;

            }
        }

        $obj->save();

        return array('success' => true, 'data' => $obj);
    }

    public function delete(Request $request, $id)
    {
        $obj = HVResourceZone::find($id);
        $obj->delete();
        return array('success' => true);
    }
}
