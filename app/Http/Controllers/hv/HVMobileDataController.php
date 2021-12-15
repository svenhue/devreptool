<?php

namespace App\Http\Controllers\hv;

use App\Models\hv\HVWayPoint;
use App\Utils\Utils;
use DateTime;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HVMobileDataController extends Controller
{
    public function exchangeData(Request $request)
    {
        $data = $request->data;

        foreach ($data as $content) {
            switch ($content['type']) {
                case 'GPS':
                    $wayPointObj = new HVWayPoint();
                    $wayPointObj->hv_company_id = $request->current_company_id;
                    $wayPointObj->hv_user_id = $request->current_user_id;
                    $wayPointObj->hv_mobile_device_id = $request->current_mobile_device_id;
                    $wayPointObj->location_at = $content['time'];
                    $wayPointObj->lat = $content['lat'];
                    $wayPointObj->lon = $content['lon'];
                    $wayPointObj->direction = $content['dir'];
                    $wayPointObj->speed = $content['speed'];
                    $wayPointObj->altitude = $content['alt'];
                    $wayPointObj->angle = $content['angle'];
                    $wayPointObj->distance = $content['dist'];
                    $wayPointObj->precision = $content['pre'];
                    $wayPointObj->created_at = new DateTime();
                    $wayPointObj->save();
                    break;

            }
        }

        return array("success" => true);
    }


}
