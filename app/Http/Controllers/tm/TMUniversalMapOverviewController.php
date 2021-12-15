<?php

namespace App\Http\Controllers\tm;

use App\Models\tm\TMBuilding;
use App\Utils\Utils;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TMUniversalMapOverviewController extends Controller
{
    public function allUnits(Request $request)
    {

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://login.motracking.ch/api/v1/unit/list.json?key=43cccec65eec545c967b4257dba36c06b83d5b98');
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $response = curl_exec($ch);

        if (!$response) {
            return array('success' => false);
        }

        curl_close($ch);

        $result = json_decode($response, false);

        return array('success' => true, 'data' => $result->data->units, 'total' => count($result->data->units));
    }

    public function allTours(Request $request)
    {

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://lo1lhaintern.logisticsone.cloud/Modules/GetRequest/GetTourReport.aspx?Status=Ontour&ExportMethod=WEB');
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Basic YWRtaW5NTzo0RGxvMkdv',
        ]);

        $response = curl_exec($ch);



        if (!$response) {
            return array('success' => false);
        }

        curl_close($ch);

        $xmlDoc = simplexml_load_string($response);
        $json = json_encode($xmlDoc);
        $array = json_decode($json,false);

        return array('success' => true, 'data' => $array->Tour, 'total'=>count($array->Tour));
    }

}
