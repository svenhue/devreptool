<?php

namespace App\Http\Controllers\hv;

use App\Models\hv\HVCompany;
use App\Utils\Utils;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HVCompanyController extends Controller
{
    public function all(Request $request)
    {
        $query = HVCompany::select();

        if ($request->input('id', null))
            $query->where('hv_company.id', $request->input('id', null));
        else {
            Utils::buildFilter($query, $request->filter);


            Utils::buildGroup($query, $request->group);
            Utils::buildSort($query, $request->sort);

            if ($request->limit)
                Utils::buildLimit($query, $request->start, $request->limit);
        }

        $total = $query->count();

        return array('success' => true, 'data' => $query->get(), 'total' => $total);
    }

    public function createOrUpdate(Request $request, $id = null)
    {
        $menuConfig = null;
        $all = $request->all();

        if ($id) {
            $obj = HVCompany::find($id);
            $obj->updated_by = $request->current_user_id;
        } else {
            $obj = new HVCompany();
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

        if (HVCompany::alreadyExists(HVCompany::class, 'ident', $obj->ident, $obj->id)) {
            return array('success' => false, 'error' => 'exists', 'field' => 'ident');
        }

        $obj->save();

        if ($menuConfig) {
            HVCompany::saveMenuConfiguration($request->current_user_id, $obj->id, $menuConfig);
        }

        return array('success' => true, 'data' => $obj);
    }

    public function delete(Request $request, $id)
    {
        $obj = HVCompany::find($id);

        $obj->hvCompanyMenus()->delete($id);

        $obj->delete();
        return array('success' => true);

    }

    public function config(Request $request, $id = null)
    {
        if ($id) {
            $hvCompanyObj = HVCompany::find(1);
            if ($hvCompanyObj) {
                return array('success' => true, 'data' => json_decode($hvCompanyObj->config));
            }
        }
        return array('success' => false);
    }

    public static function menuConfiguration(Request $request, $id)
    {
        return HVCompany::getMenuConfiguration($id, 'de');
    }

}
