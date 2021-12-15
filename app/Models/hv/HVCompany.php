<?php

namespace App\Models\hv;

use DateTime;
use Illuminate\Support\Facades\DB;

class HVCompany extends \App\Models\hv\Base\HVCompany
{

    public static function withAccessByIdent($ident)
    {
        return self::select('id', 'name_1', 'config')
            ->where('ident', $ident)
            ->where(function ($query) {
                $query->whereNull('access_until')
                    ->orWhereDate('access_until', '>=', new DateTime());
            })
            ->first();
    }

    public static function withAccessById($id)
    {
        return self::select('id', 'name_1', 'config')
            ->where(function ($query) {
                $query->whereNull('access_until')
                    ->orWhereDate('access_until', '>=', new DateTime());
            })
            ->find($id);
    }

    public static function alreadyExists($class, $fieldName, $value, $id)
    {
        if ($value !== '') {
            if ($id)
                return $class::where('id', '<>', $id)
                        ->where($fieldName, $value)->first() != null;
            else
                return $class::where($fieldName, $value)->first() != null;
        } else
            return false;
    }

    public static function getMenuConfiguration($id, $lng)
    {
        $groupMenu = array();

        $menuJson = file_get_contents('../resources/menu/menu.json');
        $menuObj = json_decode($menuJson, false);

        function iterate(&$groupMenu, &$node, $companyId, $is_admin, $lng)
        {
            $menuNode = array();
            if ($is_admin)
                $menuItemObj = true;
            else
                $menuItemObj = HVCompanyMenu::where('hv_company_id', $companyId)->where('menu_ident', $node->id)->first();

            if ((isset($node->hidden) && !$node->hidden) || !isset($node->hidden)) {

                $menuNode['id'] = (isset($node->id)) ? $node->id : '';
                $menuNode['text'] = $node->info;
                $menuNode['iconCls'] = (isset($node->iconCls)) ? $node->iconCls : '';
                $menuNode['leaf'] = (isset($node->leaf)) ? $node->leaf : true;
                $menuNode['checked'] = $menuItemObj <> null;

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
                        iterate($menuNode['children'], $child, $companyId, $is_admin, $lng);
                    }
                }
                $groupMenu[] = $menuNode;
            }
        }

        $companyObj = self::find($id);

        if ($companyObj)
            iterate($groupMenu, $menuObj, $id, $companyObj->is_master, $lng);
        else
            iterate($groupMenu, $menuObj, $id, true, $lng);

        return $groupMenu;
    }

    public static function saveMenuConfiguration($userId, $id, $dataObj)
    {

        HVCompany::find($id)->hvCompanyMenus()->delete($id);

        foreach ($dataObj as $menuItem) {
            $menuItemObj = new HVCompanyMenu();
            $menuItemObj->hv_company_id = $id;
            $menuItemObj->created_by = $userId;
            $menuItemObj->menu_ident = $menuItem['id'];

            $menuItemObj->save();

        }
    }

    public static function getConfiguration($id)
    {
        $obj = HVCompany::find($id);
        if ($obj)
            return json_decode($obj->config);
        else
            return null;
    }
}
