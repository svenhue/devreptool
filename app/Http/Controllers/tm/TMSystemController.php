<?php

namespace App\Http\Controllers\tm;

use App\Models\hv\HVUser;
use App\Models\tecd\TECDTicket;
use App\Models\tecd\TECDTicketBinary;
use App\Models\tecd\TECDTicketHistory;
use App\Models\tm\TMSystem;
use App\Models\tm\TMSystemBinary;
use App\Utils\Utils;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class TMSystemController extends Controller
{

    public function addToHistory($id, $key, $companyId, $userId, $attribute, $oldValue, $newValue)
    {
        if ($id) {
//            $obj = new TMSystemHistory();
//            $obj->hv_company_id = $companyId;
//            $obj->created_by = $userId;
//            $obj->attribute = $attribute;
//            $obj->old_value = $oldValue;
//            $obj->new_value = $newValue;
//            $obj->tecd_ticket_id = $key;

//            $obj->save();

        }
    }


    public function all(Request $request)
    {
        $query = TMSystem::select(
            'tm_system.*',
            'tm_service_provider.ident AS service_provider_ident',
            'tm_building.ident AS building_ident',
//            'tm_stock.ident AS stock_ident'
        )
            ->where('tm_system.hv_company_id', $request->current_company_id)
            ->leftJoin('tm_service_provider','tm_service_provider.id','=','tm_system.tm_service_provider_id')
            ->leftJoin('tm_building','tm_building.id','=','tm_system.tm_building_id');
//            ->leftJoin('tm_stock','tm_stock.id','=','tm_system.tm_stock_id');

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

    public function createOrUpdate(Request $request, $id = null)
    {
        $all = $request->all();

        if ($id) {
            $obj = TMSystem::find($id);
            $obj->updated_by = $request->current_user_id;
        } else {
            $obj = new TMSystem();
            $obj->hv_company_id = $request->current_company_id;
            $obj->created_by = $request->current_user_id;
        }

        foreach ($all as $property => $value) {
            switch ($property) {
                case 'id':
                case 'token':
                case '_dc':
                    break;
                case 'tm_building_id':
                case 'tm_stock_id':
                case 'tm_service_provider_id':
                case 'hv_user_id':
                    if (!$value)
                        $value = null;
                    $obj->$property = $value;
                    break;
                default:
                    $obj->$property = $value;

            }
        }

        if (Utils::alreadyExists(TMSystem::class, $request->current_company_id,'ident', $obj->ident, $obj->id)) {
            return array('success' => false, 'error' => 'exists', 'field' => 'ident');
        }

        $obj->save();

        return array('success' => true, 'data' => $obj);
    }

    public function delete(Request $request, $id)
    {
        $obj = TMSystem::find($id);
        $obj->delete();
        return array('success' => true);
    }

    public function exportXLS(Request $request)
    {
        $all = self::all($request);
        return Utils::exportXLS($request->caption, json_decode($request->columns, true), $all);
    }

}
