<?php

namespace App\Http\Controllers\tm;

use App\Models\tm\TMBuildingExam;
use App\Utils\Utils;
use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TMBuildingExamController extends Controller
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
        $query = TMBuildingExam::select(
            'tm_building_exam.*',
            'tm_exam.ident AS exam_ident'
        )
            ->leftJoin('tm_exam','tm_exam.id','=','tm_building_exam.tm_exam_id')
            ->where('tm_building_exam.hv_company_id', $request->current_company_id);

        Utils::buildFilter($query, $request->filter);
        $data = $query->get();
        return array('success' => true, 'data' => $data, 'total' => count($data));
    }

    public function createOrUpdate(Request $request, $id = null)
    {
        $isNew = false;
        $all = $request->all();

        if ($id) {
            $obj = TMBuildingExam::find($id);
            $obj->updated_by = $request->current_user_id;
        } else {
            $obj = new TMBuildingExam();
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
                case 'finished_by':
                default:
                    if (!$isNew)
                        $this->addToHistory($obj->id, $obj->tm_building_id, $request->current_company_id, $request->current_user_id, 'Prüfprotokoll geändert', $obj->property, $value);
                    $obj->$property = $value;
            }
        }
        $obj->save();
        if ($isNew)
            $this->addToHistory($obj->id, $obj->tm_building_id, $request->current_company_id, $request->current_user_id, 'Prüfprotokoll hinzugefügt', null, $obj->notes);

        return array('success' => true, 'data' => $obj);
    }

    public function delete(Request $request, $id)
    {
        $obj = TMBuildingExam::find($id);

        if ($obj) {
            $obj->delete();
            $this->addToHistory($obj->id, $obj->tm_building_id, $request->current_company_id, $request->current_user_id, 'Prüfprotokoll gelöscht', $obj->notes, null);
            return array('success' => true);
        } else
            throw new Exception('file not found', 404);
    }
}
