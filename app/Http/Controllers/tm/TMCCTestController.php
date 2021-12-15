<?php

namespace App\Http\Controllers\tm;

use App\Models\tm\TMCCTest;
use App\Models\tm\TMCCTestItem;
use App\Utils\Utils;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TMCCTestController extends Controller
{
    public function all(Request $request)
    {
        $query = TMCCTest::select(
            'tm_cc_test.*',
            'tm_cc_person.code',
            'tm_cc_person.staff_section',
        )
            ->leftJoin('tm_cc_person', 'tm_cc_person.ident', '=', 'tm_cc_test.ident')
            ->where('tm_cc_test.hv_company_id', $request->current_company_id);

        if ($request->input('query', null))
            $query->where('ident', 'like', '%' . $request->input('query', null) . '%');
        else {
            $filter = str_ireplace('"created_at', '"tm_cc_test.created_at', $request->filter);
            $filter = str_ireplace('"ident', '"tm_cc_test.ident', $filter);
            $filter = str_ireplace('"firstname', '"tm_cc_test.firstname', $filter);
            $filter = str_ireplace('"lastname', '"tm_cc_test.lastname', $filter);
            Utils::buildFilter($query, $filter);
        }
        $total = $query->count();

        Utils::buildSort($query, $request->sort);

        if ($request->limit)
            Utils::buildLimit($query, $request->start, $request->limit);


        return array('success' => true, 'data' => $query->get(), 'total' => $total);
    }

    public function createOrUpdateFromMobile(Request $request, $id = null)
    {
        Utils::logDB('tm_test', json_encode($request->all(), false));

        $all = $request->all();
        $formItems = $all['formItems'];

        $ccTestObj = new TMCCTest();
        $ccTestObj->hv_company_id = $request->current_company_id;
        $ccTestObj->created_by = $request->current_user_id;
        $ccTestObj->is_done = true;

        foreach ($formItems as $formItem) {
            $ccTestObj->hv_form_dev_id = Utils::varFromArray($formItem, 'hv_form_dev_id');
            switch ($formItem['term']) {
                case 'Personalnummer':
                    $ccTestObj->ident = Utils::varFromArray($formItem, 'InputValue');
                    break;
                case 'Nachname':
                    $ccTestObj->lastname = Utils::varFromArray($formItem, 'InputValue');
                    break;
                case 'Vorname':
                    $ccTestObj->firstname = Utils::varFromArray($formItem, 'InputValue');
                    break;
                case 'Testergebnis':
                    $ccTestObj->status_1 = Utils::varFromArray($formItem, 'InputValue');
                    break;
                case 'Testzeitpunkt':
                    $ccTestObj->created_at = Utils::convertDateTimeFromMobile(Utils::varFromArray($formItem, 'InputValue'));
                    break;
            }
        }

        $ccTestObj->save();

        foreach ($formItems as $formItem) {
            $ccTestItemObj = new TMCCTestItem();
            $ccTestItemObj->hv_company_id = $request->current_company_id;
            $ccTestItemObj->created_by = $request->current_user_id;

            $ccTestItemObj->tm_cc_test_id = $ccTestObj->id;
            $ccTestItemObj->value = Utils::varFromArray($formItem, 'InputValue');
            $ccTestItemObj->hv_form_dev_item_id = Utils::varFromArray($formItem, 'id');

            $ccTestItemObj->save();

        }

        return array('success' => true);
    }

    public function createOrUpdate(Request $request, $id = null)
    {
        $all = $request->all();

        if ($id) {
            $obj = TMCCTest::find($id);
            $obj->updated_by = $request->current_user_id;
        } else {
            $obj = new TMCCTest();
            $obj->hv_company_id = $request->current_company_id;
            $obj->created_by = $request->current_user_id;
        }

        foreach ($all as $property => $value) {
            switch ($property) {
                case 'id':
                case 'token':
                case '_dc':
                    break;
                default:
                    $obj->$property = $value;

            }
        }

        if (Utils::alreadyExists(TMCCTest::class, $request->current_company_id, 'ident', $obj->ident, $obj->id)) {
            return array('success' => false, 'error' => 'exists', 'field' => 'ident');
        }

        $obj->save();

        return array('success' => true, 'data' => $obj);
    }

    public function delete(Request $request, $id)
    {
        $obj = TMCCTest::find($id);
        $obj->delete();
        return array('success' => true);
    }

    public function exportXLS(Request $request)
    {
        $all = self::all($request);
        return Utils::exportXLS($request->caption, json_decode($request->columns, true), $all);
    }
}
