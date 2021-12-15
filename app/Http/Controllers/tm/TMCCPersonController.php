<?php

namespace App\Http\Controllers\tm;

use App\Models\tm\TMCCPerson;
use App\Utils\Utils;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class TMCCPersonController extends Controller
{
    public function all(Request $request)
    {
        $query = TMCCPerson::select(
            'tm_cc_person.*',
            'tm_cc_vaccination_status.ident AS status_ident'

        )
            ->leftJoin('tm_cc_vaccination_status', 'tm_cc_vaccination_status.id', 'tm_cc_person.tm_cc_vaccination_status_id')
            ->where('tm_cc_person.hv_company_id', $request->current_company_id);

        if ($request->input('query', null))
            $query->where('ident', 'like', '%' . $request->input('query', null) . '%');
        else {
            $filter = str_ireplace('"status_ident', '"tm_cc_vaccination_status.ident', $request->filter);
            $filter = str_ireplace('"ident', '"tm_cc_person.ident', $filter);
            Utils::buildFilter($query, $filter);
        }

        $total = $query->count();

        Utils::buildSort($query, $request->sort);

        if ($request->limit)
            Utils::buildLimit($query, $request->start, $request->limit);


        return array('success' => true, 'data' => $query->get(), 'total' => $total);
    }

    public function getByCode(Request $request, $code)
    {
        $personObj = TMCCPerson::where('hv_company_id', $request->current_company_id)->where('code', $code)->first();
        if ($personObj)
            return array('success' => true, 'data' => $personObj);
        else
            return array('success' => false);
    }

    public function createOrUpdate(Request $request, $id = null)
    {
        $all = $request->all();

        if ($id) {
            $obj = TMCCPerson::find($id);
            $obj->updated_by = $request->current_user_id;
        } else {
            $obj = new TMCCPerson();
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

        $obj->save();

        return array('success' => true, 'data' => $obj);
    }

    public function delete(Request $request, $id)
    {
        $obj = TMCCPerson::find($id);
        $obj->delete();
        return array('success' => true);
    }

    public function exportXLS(Request $request)
    {
        $all = self::all($request);
        return Utils::exportXLS($request->caption, json_decode($request->columns, true), $all);
    }

    public function getTodayNotTested(Request $request)
    {
        $query = TMCCPerson::select(
            'tm_cc_person.ident',
            'tm_cc_person.code',
            'tm_cc_person.lastname',
            'tm_cc_person.firstname',
            'tm_cc_test.created_at'
        )
            ->leftJoin('tm_cc_test', 'tm_cc_test.ident', 'tm_cc_person.ident')
            ->where('tm_cc_person.test_needed', 1)
            ->where(function ($query) {
                $query->whereNull('tm_cc_test.created_at')
                    ->whereOr('tm_cc_test.created_at', '<', date('Y-m-d'));
            })
            ->orderBy('tm_cc_person.ident');


        $total = $query->count();
        return array('success' => true, 'data' => $query->get(), 'total' => $total);
    }
}
