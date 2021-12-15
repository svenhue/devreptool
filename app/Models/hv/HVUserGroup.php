<?php

namespace App\Models\hv;

use Illuminate\Support\Facades\DB;

class HVUserGroup extends \App\Models\hv\Base\HVUserGroup
{
    public static function getMenu($companyId, $superUser, $id, $lng)
    {
        $groupMenu = array();

        $menuJson = file_get_contents('../resources/menu/menu.json');
        $menuObj = json_decode($menuJson, false);

        $companyObj = HVCompany::find($companyId);

        function iterate(&$groupMenu, &$node, $companyId, $superUser, $userGroupId, $is_admin, $is_master, $lng)
        {
            $menuNode = array();
            if ($is_admin) {
                if ($is_master) {
                    $companyMenuObj = true;
                    $groupMenuObj = true;
                } else {
                    $companyMenuObj = HVCompanyMenu::select('id')->where('hv_company_id', $companyId)->where('menu_ident', $node->id)->first();
                    if ($companyMenuObj)
                        $groupMenuObj = true;
                    else
                        $groupMenuObj = false;

                }
            } else {
                $companyMenuObj = HVCompanyMenu::select('id')->where('hv_company_id', $companyId)->where('menu_ident', $node->id)->first();
                if ($companyMenuObj)
                    $groupMenuObj = HVUserGroupMenu::select('id')->where('hv_user_group_id', $userGroupId)->where('menu_ident', $node->id)->first();
                else
                    $groupMenuObj = false;
            }

            if (($companyMenuObj && $groupMenuObj) || $node->id == 'root' || (isset($node->superUser) && $node->superUser && $superUser)) {

                if (isset($node->hidden) && $node->hidden == true) return;

                $menuNode['id'] = (isset($node->id)) ? $node->id : '';
                $menuNode['text'] = (isset($node->$lng)) ? $node->$lng : 'NoName';
                $menuNode['iconCls'] = (isset($node->iconCls)) ? $node->iconCls : '';
                $menuNode['leaf'] = (isset($node->leaf)) ? $node->leaf : true;

                if ($menuNode['leaf']) {
                    $menuNode['moduleClass'] = (isset($node->moduleClass)) ? $node->moduleClass : '';
                    $menuNode['closable'] = (isset($node->closable)) ? $node->closable : true;
                    $menuNode['standalone'] = (isset($node->standalone)) ? $node->standalone : false;
                    $menuNode['loadmask'] = (isset($node->loadmask)) ? $node->loadmask : false;
                    $menuNode['startalone'] = (isset($node->startalone)) ? $node->startalone : false;
                } else {
                    $menuNode['expanded'] = (isset($node->expanded)) ? $node->expanded : false;
                }

                if (isset($node->children)) {
                    $menuNodeChildren = array();
                    foreach ($node->children as $child) {
                        iterate($menuNodeChildren, $child, $companyId, $superUser, $userGroupId, $is_admin, $is_master, $lng);
                    }
                    $menuNode['children'] = $menuNodeChildren;

                }
                $groupMenu[] = $menuNode;
            }
        }

        $userGroupObj = self::find($id);

        if ($userGroupObj) {
            iterate($groupMenu, $menuObj, $companyId, $superUser, $id, $userGroupObj->admin_access, $companyObj->is_master, $lng);
        }

        return $groupMenu;

    }

    public static function getMenuConfiguration($companyId, $id, $lng)
    {
        $groupMenu = array();

        $menuJson = file_get_contents('../resources/menu/menu.json');
        $menuObj = json_decode($menuJson, false);

        $companyObj = HVCompany::find($companyId);

        function iterate(&$groupMenu, &$node, $companyId, $userGroupId, $is_admin, $is_master, $lng)
        {
            $menuNode = array();
            $companyMenuObj = HVCompanyMenu::select('id')->where('hv_company_id', $companyId)->where('menu_ident', $node->id)->first();

            if ($is_admin) {
                if ($companyMenuObj)
                    $groupMenuObj = true;
                else
                    $groupMenuObj = false;

            } else {
                if ($companyMenuObj)
                    $groupMenuObj = HVUserGroupMenu::where('hv_user_group_id', $userGroupId)->where(DB::raw('menu_ident'), $node->id)->first();
                else
                    $groupMenuObj = false;
            }

            if ($companyMenuObj || $node->id == 'root') {

                if ((isset($node->hidden) && !$node->hidden) || !isset($node->hidden)) {

                    $menuNode['id'] = (isset($node->id)) ? $node->id : '';
                    $menuNode['text'] = (isset($node->$lng)) ? $node->$lng : 'NoName';
                    $menuNode['iconCls'] = (isset($node->iconCls)) ? $node->iconCls : '';
                    $menuNode['leaf'] = (isset($node->leaf)) ? $node->leaf : true;
                    $menuNode['checked'] = $groupMenuObj <> null;

                    if ($menuNode['leaf']) {
                        $menuNode['class'] = (isset($node->class)) ? $node->class : '';
                        $menuNode['closable'] = (isset($node->closable)) ? $node->closable : true;
                        $menuNode['type'] = (isset($node->type)) ? $node->type : 'module';
                    } else {
                        $menuNode['expanded'] = true;
                    }

                    if (isset($node->children)) {
                        $menuNode['children'] = array();
                        foreach ($node->children as $child) {
                            iterate($menuNode['children'], $child, $companyId, $userGroupId, $is_admin, $is_master, $lng);
                        }
                    }
                    $groupMenu[] = $menuNode;
                }
            }
        }

        $userGroupObj = self::find($id);

        if ($userGroupObj)
            iterate($groupMenu, $menuObj, $companyId, $id, $userGroupObj->admin_access, $companyObj->is_master, $lng);
        else
            iterate($groupMenu, $menuObj, $companyId, $id, true, $companyObj->is_master, $lng);

        return $groupMenu;
    }

    public static function saveMenuConfiguration($companyId, $userId, $id, $dataObj)
    {

        HVUserGroup::find($id)->hvUserGroupMenus()->delete($id);

        foreach ($dataObj as $menuItem) {
            $menuItemObj = new HVUserGroupMenu();
            $menuItemObj->hv_company_id = $companyId;
            $menuItemObj->hv_user_group_id = $id;
            $menuItemObj->created_by = $userId;
            $menuItemObj->menu_ident = $menuItem['id'];

            $menuItemObj->save();

        }
    }
}
