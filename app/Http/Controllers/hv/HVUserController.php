<?php

namespace App\Http\Controllers\hv;

use App\Models\hv\HVCountry;
use App\Models\hv\HVUser;
use App\Models\hv\HVUserAutostart;
use App\Models\hv\HVWayPoint;
use App\Utils\Utils;
use DateTime;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HVUserController extends Controller
{
    public function all(Request $request)
    {
        $query = HVUser::select(
            'hv_user.*',
            'hv_user_group.ident as user_group_ident',
            'hv_mobile_device.last_access_at as last_mobile_access_at',
            'hv_mobile_device.app_version',
            'hv_mobile_device.os',
            'hv_mobile_device.os_version',
            'hv_resource_type.ident as resource_type_ident',
            'hv_resource_type.email_notification as resource_email_notification',
            'hv_country.iso_code_1 as country_ident'
        )
            ->leftJoin('hv_user_group', 'hv_user_group.id', '=', 'hv_user.hv_user_group_id')
            ->leftJoin('hv_mobile_device', 'hv_mobile_device.id', '=', 'hv_user.hv_mobile_device_id')
            ->leftJoin('hv_resource_type', 'hv_resource_type.id', '=', 'hv_user.hv_resource_type_id')
            ->leftJoin('hv_country', 'hv_country.id', '=', 'hv_user.hv_country_id')
            ->where('hv_user.hv_company_id', $request->current_company_id)
            ->where('hv_user.is_hidden', 0);


        if ($request->input('query', null)) {
            $searchStr = '%' . $request->input('query', null) . '%';
            $query->where(function ($query) use ($searchStr) {
                $query->where('lastname', 'like', $searchStr)
                    ->orWhere('employee_ident', 'like', $searchStr)
                    ->orWhere('firstname', 'like', $searchStr);
            });
        } else {
            $filter = str_ireplace('"user_group_ident', '"hv_user_group.ident', $request->filter);
            $filter = str_ireplace('"resource_type_ident', '"hv_resource_type.ident', $filter);
            $filter = str_ireplace('"ident', '"hv_user.ident', $filter);

            Utils::buildFilter($query, $filter);
        }

        $sort = str_ireplace('"user_group_ident', '"hv_user_group.ident', $request->sort);
        $sort = str_ireplace('"resource_type_ident', '"hv_resource_type.ident', $sort);
        $sort = str_ireplace('"ident', '"hv_user.ident', $sort);


        $group = str_ireplace('"user_group_ident', '"hv_user_group.ident', $request->group);
        $group = str_ireplace('"resource_type_ident', '"hv_resource_type.ident', $group);
        $group = str_ireplace('"ident', '"hv_user.ident', $group);

        $total = $query->count();

        Utils::buildGroup($query, $group);
        Utils::buildSort($query, $sort);

        if ($request->limit)
            Utils::buildLimit($query, $request->start, $request->limit);

        return array('success' => true, 'data' => $query->get(), 'total' => $total);
    }

    public function allResources(Request $request)
    {
        return HVUser::allResources($request->current_company_id, $request->sort, $request->group, $request->start, $request->limit, false, $request->filter, $request->input('query',null));
    }

    public function allMobileResources(Request $request)
    {
        return HVUser::allResources($request->current_company_id, $request->sort, $request->group, $request->start, $request->limit, true, $request->filter, $request->input('query',null));
    }

    public function createOrUpdate(Request $request, $id = null)
    {
        $all = $request->all();

        if ($id) {
            $obj = HVUser::find($id);
            $obj->updated_by = $request->current_user_id;
        } else {
            $obj = new HVUser();
            $obj->hv_company_id = $request->current_company_id;
            $obj->created_by = $request->current_user_id;
            $obj->created_at = new DateTime();
        }

        foreach ($all as $property => $value) {
            switch ($property) {
                case 'id':
                case 'token':
                case '_dc':
                case 'hv_company_id':
                case 'hv_company_department_id':
                    break;
                case 'hv_resource_type_id':
                case 'hv_report_id':
                case 'hv_country_id':
                    if (!$value)
                        $value = null;
                    $obj->$property = $value;
                    break;
                default:
                    $obj->$property = $value;
            }
        }

        if (Utils::alreadyExists(HVUser::class, $request->current_company_id, 'ident', $obj->ident, $obj->id)) {
            return array('success' => false, 'error' => 'exists', 'field' => 'ident');
        }

        if (Utils::alreadyExists(HVUser::class, $request->current_company_id, 'loginname', $obj->loginname, $obj->id)) {
            return array('success' => false, 'error' => 'exists', 'field' => 'loginname');
        }

        if (strlen($obj['street']) && strlen($obj['zip']) && strlen($obj['city']) && (int)$obj['hv_country_id'] >= 0) {
            set_time_limit(10);
            $countryObj = HVCountry::find($obj['hv_country_id']);
            $addressCoords = Utils::geocode(($obj['street'] . ', ' . $obj['zip'] . ' ' . $obj['city'] . ', ' . $countryObj['iso_code_1']));
            if ($addressCoords) {
                $addressLat = $addressCoords[0];
                $obj->address_lat = $addressLat;
                $addressLon = $addressCoords[1];
                $obj->address_lon = $addressLon;
            } else {
                $obj->address_lat = 0;
                $obj->address_lon = 0;
            }
        }

        $obj->save();

        return array('success' => true, 'data' => $obj);
    }

    public function delete(Request $request, $id)
    {
        $obj = HVUser::find($id);
        $obj->delete();
        return array('success' => true);

    }

    public function exportXLS(Request $request)
    {
        $all = self::all($request);
        return Utils::exportXLS($request->caption, json_decode($request->columns, true), $all);
    }

    public function saveAutostart(Request $request)
    {

        $autostartObj = HVUserAutostart::select()->where('hv_user_id', $request->current_user_id)->first();

        if (!$autostartObj) {
            $autostartObj = new HVUserAutostart();
            $autostartObj->hv_company_id = $request->current_company_id;
            $autostartObj->hv_user_id = $request->current_user_id;
            $autostartObj->created_at = new DateTime();
        }
        $autostartObj->modules = $request->modules;

        $autostartObj->save();

        return array('success' => true);
    }

    public function setPassword(Request $request)
    {
        $userObj = HVUser::find($request->current_user_id);
        if ($userObj) {
            $userObj->password = $request->passwd;
            $userObj->save();
            return array('success' => true);
        } else
            return array('success' => false, 'error'=>'not_exist');

    }

    public function setUseTileMenu(Request $request)
    {
        $userObj = HVUser::find($request->current_user_id);
        if ($userObj) {
            $userObj->use_tile_menu = $request->input('active') == 'true';
            $userObj->save();
            return array('success' => true);
        } else
            return array('success' => false, 'error'=>'not_exist');

    }

    public function getTrack(Request $request)
    {
        $userId = $request->user_id;
        $date = substr($request->date, 0, 10);
        $dateFrom = $date . ' 00:00:00';
        $dateTo = $date . ' 23:59:59';

        $all = HVWayPoint::select()
            ->where('hv_user_id', $userId)
            ->where('location_at', '>=', $dateFrom)
            ->where('location_at', '<=', $dateTo)
            ->orderBy('location_at')
            ->get();

        return array('success' => true, 'data' => $all, 'total' => count($all));
    }
}
