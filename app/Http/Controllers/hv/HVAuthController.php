<?php

namespace App\Http\Controllers\hv;

use App\Models\hv\HVCompany;
use App\Models\hv\HVReport;
use App\Models\hv\HVMobileDevice;
use App\Models\hv\HVMobileDeviceConfig;
use App\Models\hv\HVUserGroup;
use App\Models\hv\HVUser;
use App\Utils\Utils;
use DateTime;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class HVAuthController extends Controller
{
    public function login(Request $request)
    {
        $jsonReport = null;
        $companyIdent = $request->company;
        $loginname = $request->loginname;
        $password = $request->password;


        $companyObj = HVCompany::withAccessByIdent($companyIdent);
        if ($companyObj) {

            $userObj = HVUser::withAccessByLogin($companyObj->id, $loginname, $password);
            if ($userObj) {

                $userGroupObj = HVUserGroup::find($userObj->hv_user_group_id);

                $userObj->session_token = Utils::unique();
                $userObj->last_login_at = new DateTime();
                $userObj->last_access_at = new DateTime();

                $userObj->save();

                if ($userObj->hv_report_id) {
                    $reportObj = HVReport::find($userObj->hv_report_id);
                    if ($reportObj)
                        $jsonReport = $reportObj->definition;
                }

                $groupMenu = HVUserGroup::getMenu($companyObj->id, $userObj->is_superuser, $userGroupObj->id, 'de');

                $autostartModules = $userObj->getAutostartModules();

                return array(
                    'success' => true,
                    'data' => array(
                        'company_id' => $companyObj->id,
                        'company_name' => $companyObj->name_1,
                        'user_id' => $userObj->id,
                        'user_name' => $userObj->lastname . ($userObj->firstname ? ', ' . $userObj->firstname : ''),
                        'user_ident' => $userObj->ident,
                        'user_group_id' => $userGroupObj->id,
                        'admin_access' => $userGroupObj->admin_access,
                        'use_tile_menu' => $userObj->use_tile_menu,
                        'session_token' => $userObj->session_token,
                        'group_menu' => $groupMenu,
                        'autostart' => $autostartModules,
                        'dashboard' => $jsonReport,
                        'company_config' => $companyObj->config ? json_decode($companyObj->config) : json_decode('{}'),
                        'user_group_config' => $userGroupObj->config ? json_decode($userGroupObj->config) : json_decode('{}')
                    )
                );
            }
        }
        return array('success' => false, 'error' => 'no_permission');
    }

    public function authenticate(Request $request)
    {
        $jsonReport = null;
        $token = $request->token;
        $userObj = HVUser::where('session_token', $token)->first();
        if ($userObj) {
            $companyObj = HVCompany::withAccessById($userObj->hv_company_id);
            if ($companyObj) {

                $userGroupObj = HVUserGroup::find($userObj->hv_user_group_id);
                $userObj->session_token = Utils::unique();
                $userObj->last_login_at = new DateTime();
                $userObj->last_access_at = new DateTime();

                $userObj->save();

                if ($userObj->hv_report_id) {
                    $reportObj = HVReport::find($userObj->hv_report_id);
                    if ($reportObj)
                        $jsonReport = $reportObj->definition;
                }

                $groupMenu = HVUserGroup::getMenu($userObj->hv_company_id, $userObj->is_superuser, $userGroupObj->id, 'de');

                $autostartModules = $userObj->getAutostartModules();

                return array('success' => true,
                    'data' => array(
                        'company_id' => $companyObj->id,
                        'company_name' => $companyObj->name_1,
                        'user_id' => $userObj->id,
                        'user_name' => $userObj->lastname . ($userObj->firstname ? ', ' . $userObj->firstname : ''),
                        'user_ident' => $userObj->ident,
                        'user_group_id' => $userGroupObj->id,
                        'admin_access' => $userGroupObj->admin_access,
                        'use_tile_menu' => $userObj->use_tile_menu,
                        'session_token' => $userObj->session_token,
                        'group_menu' => $groupMenu,
                        'autostart' => $autostartModules,
                        'dashboard' => $jsonReport,
                        'company_config' => $companyObj->config ? json_decode($companyObj->config) : json_decode('{}'),
                        'user_group_config' => $userGroupObj->config ? json_decode($userGroupObj->config) : json_decode('{}')
                    )
                );
            }
        }
        return array('success' => false, 'error' => 'no_permission');
    }

    public function mobileLogin(Request $request)
    {
        $companyIdent = $request->company;
        $loginname = $request->loginname;
        $password = $request->password;
        $deviceIdent = $request->device;
        $overrideOtherLogin = $request->override;

        if ($deviceIdent) {

            $companyObj = HVCompany::withAccessByIdent($companyIdent);
            if ($companyObj) {

                $userObj = HVUser::withMobileAccessByLogin($companyObj->id, $loginname, $password);
                if ($userObj) {

                    $deviceObj = HVMobileDevice::where('hv_company_id', $companyObj->id)->where('id', $userObj->hv_mobile_device_id)->first();

                    if ($deviceObj) {
                        if ($deviceObj->ident !== $deviceIdent && !$overrideOtherLogin) {
                            return array('success' => false, 'error' => 'device_login_by_other_user');
                        } else {
                            $deviceObj->session_token = null;
                            $deviceObj->save();
                        }
                    }

                    $userGroupObj = HVUserGroup::find($userObj->hv_user_group_id);
                    $deviceObj = HVMobileDevice::where(DB::raw('BINARY ident'), $deviceIdent)->first();
                    $deviceConfigObj = HVMobileDeviceConfig::where('hv_company_id', $companyObj->id)->where('ident', 'Standard')->first();

                    if (!$deviceObj) {
                        $deviceObj = new HVMobileDevice();
                        $deviceObj->hv_company_id = $companyObj->id;
                        $deviceObj->ident = $deviceIdent;
                        if ($deviceConfigObj)
                            $deviceObj->hv_mobile_device_config_id = $deviceConfigObj->id;
                        $deviceObj->created_by = $userObj->id;
                        $deviceObj->created_at = new DateTime();
                    }

                    if ($deviceObj->hv_company_id == $companyObj->id) {
                        if ($deviceObj->hv_mobile_device_config_id)
                            $deviceConfigObj = HVMobileDeviceConfig::find($deviceObj->hv_mobile_device_config_id);
                    } else {
                        if ($deviceConfigObj)
                            $deviceObj->hv_mobile_device_config_id = $deviceConfigObj->id;
                    }

                    $deviceObj->hv_company_id = $companyObj->id;
                    $deviceObj->session_token = Utils::unique();
                    $deviceObj->last_login_at = new DateTime();
                    $deviceObj->last_access_at = new DateTime();

                    $deviceObj->app_version = $request->app_version;
                    $deviceObj->os = $request->os;
                    $deviceObj->os_version = $request->os_version;
                    $deviceObj->accu_level = $request->accu;
                    $deviceObj->updated_by = $userObj->id;

                    $deviceObj->save();

                    $userObj->hv_mobile_device_id = $deviceObj->id;
                    $userObj->save();

                    return array('success' => true,
                        'data' => array(
                            'company_name' => $companyObj->name_1,
                            'user_id' => $userObj->id,
                            'user_name' => $userObj->lastname . ($userObj->firstname ? ', ' . $userObj->firstname : ''),
                            'user_ident' => $userObj->ident,
                            'user_group_id' => $userGroupObj->id,
                            'admin_access' => $userGroupObj->admin_access,
                            'session_token' => $deviceObj->session_token,
                            'device_config' => $deviceConfigObj ? json_decode($deviceConfigObj->config) : null
                        )
                    );
                }
            }
        }

        return array('success' => false, 'error' => 'no_permission');
    }

    public function mobileAuthenticate(Request $request)
    {
        $token = $request->token;
        $deviceIdent = $request->device;
        if ($deviceIdent) {
            $deviceObj = HVMobileDevice::where('ident', $deviceIdent)->where('session_token', $token)->first();
            if ($deviceObj) {
                $companyObj = HVCompany::withAccessById($deviceObj->hv_company_id);
                if ($companyObj) {

                    $deviceConfigObj = HVMobileDeviceConfig::select('config')->find($deviceObj->hv_mobile_device_config_id);

                    $userObj = HVUser::withMobileAccessByMobileDeviceId($deviceObj->id);
                    if ($userObj) {
                        $userGroupObj = HVUserGroup::find($userObj->hv_user_group_id);
                        $deviceObj->session_token = Utils::unique();
                        $deviceObj->last_login_at = new DateTime();
                        $deviceObj->last_access_at = new DateTime();

                        $deviceObj->save();

                        return array('success' => true,
                            'data' => array(
                                'company_name' => $companyObj->name_1,
                                'user_id' => $userObj->id,
                                'user_name' => $userObj->lastname . ($userObj->firstname ? ', ' . $userObj->firstname : ''),
                                'user_ident' => $userObj->ident,
                                'user_group_id' => $userGroupObj->id,
                                'admin_access' => $userGroupObj->admin_access,
                                'session_token' => $deviceObj->session_token,
                                'device_config' => $deviceConfigObj ? json_decode($deviceConfigObj->config) : null
                            )
                        );
                    }
                }
            }
        }
        return array('success' => false, 'error' => 'no_permission');
    }
}
