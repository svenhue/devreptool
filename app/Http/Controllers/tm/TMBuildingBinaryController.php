<?php

namespace App\Http\Controllers\tm;

use App\Models\hv\HVUser;
use App\Models\tm\TMBuilding;
use App\Models\tm\TMBuildingBinary;
use App\Utils\Utils;
use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class TMBuildingBinaryController extends Controller
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
        $query = TMBuildingBinary::select(
            'tm_building_binary.*',
            'tm_building_binary.id as ext_id',
            'hv_user.ident as user_ident'
        )
            ->leftJoin('hv_user', 'hv_user.id', '=', 'tm_building_binary.created_by');

        Utils::buildFilter($query, $request->filter);

        $total = $query->count();

        $all = $query->get();

        foreach ($all as $index => $bin) {
            $bin->url = Storage::disk('public')->url($bin->filename);
        }

        return array('success' => true, 'data' => $all, 'total' => $total);
    }

    public function createOrUpdate(Request $request, $id = null)
    {
        $isNew = false;
        $all = $request->all();
        if ($id) {
            $obj = TMBuildingBinary::find($id);
            $obj->updated_by = $request->current_user_id;
        } else
            if (Utils::varFromArray($all, 'ext_id')) {
                $obj = TMBuildingBinary::find($all['ext_id']);
                $obj->updated_by = $request->current_user_id;
                $isNew = true;
            } else {
                $obj = new TMBuildingBinary();
                $obj->hv_company_id = $request->current_company_id;
                $obj->created_by = $request->current_user_id;
                $obj->updated_by = $request->current_user_id;
                $isNew = true;
            }

        foreach ($all as $property => $value) {
            switch ($property) {
                case 'id':
                case 'token':
                case '_dc':
                    break;
                case 'tm_building_id':
                    if ($value && $value != 0)
                        $obj->$property = $value;
                    break;
                case 'term':
                    $obj->term = $value;
                    break;
            }
        }
        $obj->save();

        if ($isNew)
            $this->addToHistory($obj->id, $obj->tecd_ticket_id, $request->current_company_id, $request->current_user_id, 'Datei hinzugefügt', null, $obj->filename_org);

        return array('success' => true, 'data' => array('id' => $obj->id, 'ext_id' => $obj->id));
    }

    public function uploadBinary(Request $request)
    {
        $file = $request->file('file')->store('tecd', 'public');

        $obj = new TMBuildingBinary();
        $obj->hv_company_id = $request->current_company_id;
        $obj->created_by = $request->current_user_id;
        $obj->filename = $file;
        $obj->filename_org = $request->file('file')->getClientOriginalName();
        $obj->save();

        $userObj = HVUser::where('id', $request->current_user_id)->first();

        return array('success' => true, 'data' => array('ext_id' => $obj->id, 'filename' => $obj->filename, 'filename_org' => $obj->filename_org, 'user_ident' => $userObj->ident, 'url' => Storage::disk('public')->url($obj->filename)));
    }

    public function delete(Request $request, $id)
    {
        $obj = TMBuildingBinary::find($id);
        if ($obj) {
            $obj->delete();

            $this->addToHistory($obj->id, $obj->tecd_ticket_id, $request->current_company_id, $request->current_user_id, 'Datei ' . $obj->filename_org . ' gelöscht', null, '');
            return array('success' => true);
        } else
            throw new Exception('file not found', 404);
    }

    public function download(Request $request, $id)
    {
        $headers = array(
            'Pragma' => 'no-cache',
            'Content-Type' => 'application/octet-stream'
        );
        $obj = TMBuildingBinary::find($id);

        if ($obj) {
            $fileName = $obj->filename_org;
            $systemObj = TMBuilding::where('id', $obj->tm_building_id)->first();
            if ($systemObj)
                if (strpos($fileName, $systemObj->ident) === false)
                    $fileName = $systemObj->ident . '_ ' . $fileName;
            return Storage::disk('public')->download($obj->filename, $fileName, $headers);
        }
        throw new Exception('file not found', 404);

    }
}
