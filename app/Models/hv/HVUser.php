<?php

namespace App\Models\hv;

use App\Utils\Utils;
use DateTime;
use Illuminate\Support\Facades\DB;

class HVUser extends \App\Models\hv\Base\HVUser
{
    public static function withMobileAccessByLogin($companyId, $loginname, $password)
    {
        return self::select('id', 'ident', 'lastname', 'firstname', 'hv_user_group_id', 'hv_mobile_device_id')
            ->where('hv_company_id', $companyId)
            ->where('loginname', $loginname)
            ->where('password', $password)
            ->where('mobile_device_access', 1)
            ->where(function ($query) {
                $query->whereNull('mobile_device_access_until')
                    ->orWhereDate('mobile_device_access_until', '<=', new DateTime());
            })->first();
    }

    public static function withMobileAccessByMobileDeviceId($mobileDeviceId)
    {
        return self::select('id', 'ident', 'lastname', 'firstname', 'hv_user_group_id')
            ->where('hv_mobile_device_id', $mobileDeviceId)
            ->where('mobile_device_access', 1)
            ->where(function ($query) {
                $query->whereNull('mobile_device_access_until')
                    ->orWhereDate('mobile_device_access_until', '>=', new DateTime());
            })->first();
    }

    public static function withAccessByLogin($companyId, $loginname, $password)
    {
        return self::select('id', 'ident', 'lastname', 'firstname', 'hv_user_group_id', 'hv_report_id')
            ->where('hv_company_id', $companyId)
            ->where('loginname', $loginname)
            ->where('password', $password)
            ->where('web_access', 1)
            ->where(function ($query) {
                $query->whereNull('web_access_until')
                    ->orWhereDate('web_access_until', '>=', new DateTime());
            })->first();
    }

    public static function tokenValid($deviceIdent, $token, $companyId)
    {
        if ($companyId) {
            $obj = new \stdClass();
            $obj->hv_company_id = $companyId;
            $obj->hv_user_id = 0;
            $obj->hv_user_group_id = 0;
            $obj->hv_mobile_device_id = 0;
        } else
            if ($deviceIdent) {
                $obj = DB::table('hv_user')
                    ->select('hv_mobile_device.id AS hv_mobile_device_id', 'hv_user.hv_company_id', 'hv_user.id as hv_user_id', 'hv_user_group_id as hv_user_group_id')
                    ->join('hv_mobile_device', 'hv_mobile_device.id', '=', 'hv_user.hv_mobile_device_id')
                    ->where('hv_mobile_device.ident', $deviceIdent)
                    ->where('hv_mobile_device.session_token', $token)
                    ->where('hv_user.mobile_device_access', 1)
                    ->where(function ($query) {
                        $query->whereNull('hv_user.mobile_device_access_until')
                            ->orWhereDate('mobile_device_access_until', '>=', new DateTime());
                    })
                    ->first();
                if ($obj)
                    DB::table('hv_mobile_device')->where('id', $obj->hv_mobile_device_id)->update(['last_access_at' => new DateTime()]);
            } else {
                $obj = DB::table('hv_user')
                    ->select('hv_user.hv_company_id', 'hv_user.id as hv_user_id', 'hv_user_group_id as hv_user_group_id')
                    ->where('hv_user.session_token', $token)
                    ->where('hv_user.web_access', '=', 1)
                    ->where(function ($query) {
                        $query->whereNull('hv_user.web_access_until')
                            ->orWhereDate('hv_user.web_access_until', '>=', new DateTime());
                    })
                    ->first();
                if ($obj) {
                    $obj->hv_mobile_device_id = null;
                    DB::table('hv_user')->where('id', $obj->hv_user_id)->update(['last_access_at' => new DateTime()]);
                }
            }
        return $obj;
    }

    public function getAutoStartModules()
    {
        $autostartObj = HVUserAutostart::select()->where('hv_user_id', $this->id)->first();

        if ($autostartObj)
            return $autostartObj->modules;
        else
            return '';
    }

    public static function allResources($companyId, $sort, $group, $start, $limit, $onlyMobile, $filter, $search = null)
    {
        $query = HVUser::select(
            'hv_user.id',
            'hv_user.ident',
            'hv_user.lastname',
            'hv_user.firstname',
            'hv_user.street',
            'hv_user.zip',
            'hv_user.city',
            'hv_user.city',
            'hv_user.address_lat',
            'hv_user.address_lon',
            'hv_country.id AS hv_country_id',
            'hv_country.iso_code_1 AS country_iso_code_1',
            'hv_user.qualifications',
            'hv_user.hv_user_group_id',
            'hv_user.hv_resource_type_id',
            'hv_user.current_task_id',
            'hv_user.current_distance_to_task',
            'hv_user.office_email',
            'hv_user_group.ident as user_group_ident',
            'hv_mobile_device.last_access_at as last_mobile_access_at',
            'hv_mobile_device.app_version',
            'hv_mobile_device.os',
            'hv_mobile_device.os_version',
            'hv_mobile_device.accu_level',
            'hv_mobile_device.session_token AS mobile_session_token',
            'hv_resource_type.ident AS resource_type_ident',
            'hv_resource_type.email_notification AS resource_email_notification',
            'hv_way_point.location_at AS last_location_at',
            'hv_way_point.lat AS last_lat',
            'hv_way_point.lon AS last_lon',
            'hv_way_point.speed as last_speed'
        )
            ->leftJoin('hv_user_group', 'hv_user_group.id', '=', 'hv_user.hv_user_group_id')
            ->leftJoin('hv_mobile_device', 'hv_mobile_device.id', '=', 'hv_user.hv_mobile_device_id')
            ->leftJoin('hv_way_point', 'hv_way_point.id', '=', 'hv_mobile_device.hv_way_point_id')
            ->leftJoin('hv_country', 'hv_country.id', '=', 'hv_user.hv_country_id')
            ->join('hv_resource_type', 'hv_resource_type.id', '=', 'hv_user.hv_resource_type_id')
            ->where('hv_user.hv_company_id', $companyId)
            ->whereNotNull('hv_user.hv_resource_type_id')
            ->where('hv_user.is_hidden', 0);


        if ($onlyMobile) {
            $query->where('hv_user.mobile_device_access', 1);
        }

        if ($search) {
            $searchStr = '%' . $search . '%';
            $query->where(function ($query) use ($searchStr) {
                $query->where('lastname', 'like', $searchStr)
                    ->orWhere('hv_user.ident', 'like', $searchStr)
                    ->orWhere('firstname', 'like', $searchStr);
            });
        } else {
            $filter = str_ireplace('"user_group_ident', '"hv_user_group.ident', $filter);
            $filter = str_ireplace('"resource_type_ident', '"hv_resource_type.ident', $filter);
            $filter = str_ireplace('"ident', '"hv_user.ident', $filter);

            Utils::buildFilter($query, $filter);
        }
        $sort = str_ireplace('"user_group_ident', '"hv_user_group.ident', $sort);
        $sort = str_ireplace('"resource_type_ident', '"hv_resource_type.ident', $sort);
        $sort = str_ireplace('"ident', '"hv_user.ident', $sort);

        $total = $query->count();

        Utils::buildGroup($query, $group);
        Utils::buildSort($query, $sort);

        if ($limit)
            Utils::buildLimit($query, $start, $limit);

        $rows = $query->get();

        foreach ($rows as $index => $row) {
            if ((int)$row['address_lat'] === 0 && (int)$row['address_lon'] === 0) {
                if (strlen($row['street']) && strlen($row['zip']) && strlen($row['city']) && strlen($row['country_iso_code_1'])) {
                    set_time_limit(10);
                    $addressCoords = Utils::geocode(($row['street'] . ', ' . $row['zip'] . ' ' . $row['city'] . ', ' . $row['country_iso_code_1']));
                    if ($addressCoords) {
                        $addressLat = $addressCoords[0];
                        $row['address_lat'] = $addressLat;
                        $addressLon = $addressCoords[1];
                        $row['address_lon'] = $addressLon;
                        $row->save();
                    }
                }
            }
        }

        return array('success' => true, 'data' => $rows, 'total' => $total);
    }

}
