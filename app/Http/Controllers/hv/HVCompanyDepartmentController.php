<?php

namespace App\Http\Controllers\hv;

use App\Models\hv\HVCompany;
use App\Models\hv\HVCompanyDepartment;
use App\Utils\Utils;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HVCompanyDepartmentController extends Controller
{
    public function all(Request $request)
    {
        $query = HVCompanyDepartment::select()->where('hv_company_department.hv_company_id', $request->current_company_id);

        $total = $query->count();

        $rows = $query->get();

        foreach ($rows as $index => $row) {
            if ((int)$row['lat'] === 0 && (int)$row['lon'] === 0) {
                //Prüfen ob Land in Standortadresse null
                if (!$row['country_ident']) {
                    $row['country_ident'] = 'DE';
                }
                if (strlen($row['street']) && strlen($row['zip']) && strlen($row['city']) && strlen($row['country_ident'])) {
                    set_time_limit(10);
                    $destinationLocationCoords = Utils::geocode(($row['street'] . ', ' . $row['zip'] . ' ' . $row['city'] . ', ' . $row['country_ident']));
                    if ($destinationLocationCoords) {
                        $destinationLat = $destinationLocationCoords[0];
                        $row['lat'] = $destinationLat;
                        $destinationLon = $destinationLocationCoords[1];
                        $row['lon'] = $destinationLon;
                        $row['updated_by'] = $request->current_user_id;
                        $row->save();
                    }
                }
            }
        }

        return array('success' => true, 'data' => $rows, 'total' => $total);
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
