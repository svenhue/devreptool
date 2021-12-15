<?php

namespace App\Http\Controllers\hv;

use App\Models\hv\HVUserGroup;
use App\Utils\Utils;
use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class HVUserGroupController extends Controller
{
    public function all(Request $request)
    {
        $query = HVUserGroup::select()->where('hv_user_group.hv_company_id', $request->current_company_id);

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
        $menuConfig = null;
        $all = $request->all();

        if ($id) {
            $obj = HVUserGroup::find($id);
            $obj->updated_by = $request->current_user_id;
        } else {
            $obj = new HVUserGroup();
            $obj->hv_company_id = $request->current_company_id;
            $obj->created_by = $request->current_user_id;
        }

        foreach ($all as $property => $value) {
            switch ($property) {
                case 'id':
                case 'token':
                case '_dc':
                    break;
                case 'menu_config':
                    $menuConfig = $value;
                    break;
                default:
                    $obj->$property = $value;

            }
        }

        if (Utils::alreadyExists(HVUserGroup::class, $request->current_company_id, 'ident', $obj->ident, $obj->id)) {
            return array('success' => false, 'error' => 'exists', 'field' => 'ident');
        }

        $obj->save();

        if ($menuConfig && !$obj->admin_access) {
            HVUserGroup::saveMenuConfiguration($request->current_company_id, $request->current_user_id, $obj->id, $menuConfig);
        }

        return array('success' => true, 'data' => $obj);
    }

    public function delete(Request $request, $id)
    {
        $obj = HVUserGroup::find($id);
        if ($obj) {
            try {
                DB::beginTransaction();
                $obj->hvUserGroupMenus()->delete($id);
                $obj->delete();
                DB::commit();
            } catch (Exception $ex) {
                DB::rollBack();
                return array('success' => false, 'error' => 'db_error', 'message' => $ex->getMessage());
            }
        }
        return array('success' => true);
    }

    public static function menuConfiguration(Request $request, $id)
    {
        return HVUserGroup::getMenuConfiguration($request->current_company_id, $id, 'de');
    }

    public function exportXLS(Request $request)
    {
        $all = self::all($request);
        return Utils::exportXLS($request->caption, json_decode($request->columns, true), $all);
    }
}
