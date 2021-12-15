<?php

use App\Http\Controllers\ths\THSArticleDescriptionController;
use App\Http\Controllers\ths\THSArticleTypeController;
use App\Http\Controllers\ths\THSBasicConfigController;
use App\Http\Controllers\ths\THSColorFieldController;
use App\Http\Controllers\ths\THSContainerTypeController;
use App\Http\Controllers\ths\THSCustomerController;
use App\Http\Controllers\ths\THSCustomerProductController;
use App\Http\Controllers\ths\THSDeviceModelController;
use App\Http\Controllers\ths\THSDeviceModelGroupController;
use App\Http\Controllers\ths\THSIASLabelController;
use App\Http\Controllers\ths\THSIntercompanyController;
use App\Http\Controllers\ths\THSItemController;
use App\Http\Controllers\ths\THSItemGroupController;
use App\Http\Controllers\ths\THSLabelController;
use App\Http\Controllers\ths\THSLanguageController;
use App\Http\Controllers\ths\THSManufacturerController;
use App\Http\Controllers\ths\THSOrderPlanningController;
use App\Http\Controllers\ths\THSPictureController;
use App\Http\Controllers\ths\THSPrinterController;
use App\Http\Controllers\ths\THSProductController;
use App\Http\Controllers\ths\THSProductGroupController;
use App\Http\Controllers\ths\THSProductionPlanningController;
use App\Http\Controllers\ths\THSQuotationController;
use App\Http\Controllers\ths\THSQuotationPositionController;
use App\Http\Controllers\ths\THSSalesmanController;
use App\Http\Controllers\ths\THSSupplierController;
use App\Http\Controllers\ths\THSVoucherTypeController;

Route::get('ths/device/model/groups', [THSDeviceModelGroupController::class,'all'])->middleware('auth');
Route::put('ths/device/model/groups/{id}', [THSDeviceModelGroupController::class,'createOrUpdate'])->middleware('auth');
Route::post('ths/device/model/groups/export', [THSDeviceModelGroupController::class,'exportXLS'])->middleware('auth');
Route::post('ths/device/model/groups', [THSDeviceModelGroupController::class,'createOrUpdate'])->middleware('auth');
Route::delete('ths/device/model/groups/{id}', [THSDeviceModelGroupController::class,'delete'])->middleware('auth');

Route::get('ths/device/models', [THSDeviceModelController::class,'all'])->middleware('auth');
Route::put('ths/device/models/{id}', [THSDeviceModelController::class,'createOrUpdate'])->middleware('auth');
Route::post('ths/device/models/export', [THSDeviceModelController::class,'exportXLS'])->middleware('auth');
Route::post('ths/device/models', [THSDeviceModelController::class,'createOrUpdate'])->middleware('auth');
Route::delete('ths/device/models/{id}', [THSDeviceModelController::class,'delete'])->middleware('auth');

Route::get('ths/product/groups', [THSProductGroupController::class,'all'])->middleware('auth');
Route::put('ths/product/groups/{id}', [THSProductGroupController::class,'createOrUpdate'])->middleware('auth');
Route::post('ths/product/groups/export', [THSProductGroupController::class,'exportXLS'])->middleware('auth');
Route::post('ths/product/groups', [THSProductGroupController::class,'createOrUpdate'])->middleware('auth');
Route::delete('ths/product/groups/{id}', [THSProductGroupController::class,'delete'])->middleware('auth');
Route::delete('ths/product/groups/{id}', [THSProductGroupController::class,'delete'])->middleware('auth');

Route::get('ths/product/groups/productsort', [THSProductGroupController::class,'getProductSort'])->middleware('auth');
Route::put('ths/product/groups/productsort/{id}', [THSProductGroupController::class,'updateProductSort'])->middleware('auth');

Route::get('ths/manufacturers', [THSManufacturerController::class,'all'])->middleware('auth');
Route::put('ths/manufacturers/{id}', [THSManufacturerController::class,'createOrUpdate'])->middleware('auth');
Route::post('ths/manufacturers/export', [THSManufacturerController::class,'exportXLS'])->middleware('auth');
Route::post('ths/manufacturers', [THSManufacturerController::class,'createOrUpdate'])->middleware('auth');
Route::delete('ths/manufacturers/{id}', [THSManufacturerController::class,'delete'])->middleware('auth');

Route::get('ths/products', [THSProductController::class,'all'])->middleware('auth');
Route::put('ths/products/{id}', [THSProductController::class,'createOrUpdate'])->middleware('auth');
Route::post('ths/products/export', [THSProductController::class,'exportXLS'])->middleware('auth');
Route::post('ths/products', [THSProductController::class,'createOrUpdate'])->middleware('auth');
Route::delete('ths/products/{id}', [THSProductController::class,'delete'])->middleware('auth');

Route::get('ths/article/descriptions', [THSArticleDescriptionController::class,'all'])->middleware('auth');
Route::put('ths/article/descriptions/{id}', [THSArticleDescriptionController::class,'createOrUpdate'])->middleware('auth');
Route::post('ths/article/descriptions/export', [THSArticleDescriptionController::class,'exportXLS'])->middleware('auth');
Route::post('ths/article/descriptions', [THSArticleDescriptionController::class,'createOrUpdate'])->middleware('auth');
Route::delete('ths/article/descriptions/{id}', [THSArticleDescriptionController::class,'delete'])->middleware('auth');

Route::get('ths/color/fields', [THSColorFieldController::class,'all'])->middleware('auth');
Route::put('ths/color/fields/{id}', [THSColorFieldController::class,'createOrUpdate'])->middleware('auth');
Route::post('ths/color/fields/export', [THSColorFieldController::class,'exportXLS'])->middleware('auth');
Route::post('ths/color/fields', [THSColorFieldController::class,'createOrUpdate'])->middleware('auth');
Route::delete('ths/color/fields/{id}', [THSColorFieldController::class,'delete'])->middleware('auth');

Route::get('ths/article/types', [THSArticleTypeController::class,'all'])->middleware('auth');
Route::put('ths/article/types/{id}', [THSArticleTypeController::class,'createOrUpdate'])->middleware('auth');
Route::post('ths/article/types/export', [THSArticleTypeController::class,'exportXLS'])->middleware('auth');
Route::post('ths/article/types', [THSArticleTypeController::class,'createOrUpdate'])->middleware('auth');
Route::delete('ths/article/types/{id}', [THSArticleTypeController::class,'delete'])->middleware('auth');

Route::get('ths/product/types', [THSProductController::class,'allProductTypes'])->middleware('auth');
Route::put('ths/product/types/{id}', [THSProductController::class,'createOrUpdateProductType'])->middleware('auth');
Route::post('ths/product/types', [THSProductController::class,'createOrUpdateProductType'])->middleware('auth');
Route::delete('ths/product/types/{id}', [THSProductController::class,'deleteProductType'])->middleware('auth');

Route::get('ths/product/oemidents', [THSProductController::class,'allOEMIdents'])->middleware('auth');
Route::put('ths/product/oemidents/{id}', [THSProductController::class,'createOrUpdateOEMIdent'])->middleware('auth');
Route::post('ths/product/oemidents', [THSProductController::class,'createOrUpdateOEMIdent'])->middleware('auth');
Route::delete('ths/product/oemidents/{id}', [THSProductController::class,'deleteOEMIdent'])->middleware('auth');

Route::get('ths/product/device/models', [THSProductController::class,'allDeviceModels'])->middleware('auth');
Route::put('ths/product/device/models/{id}', [THSProductController::class,'createOrUpdateDeviceModel'])->middleware('auth');
Route::post('ths/product/device/models', [THSProductController::class,'createOrUpdateDeviceModel'])->middleware('auth');
Route::delete('ths/product/device/models/{id}', [THSProductController::class,'deleteDeviceModel'])->middleware('auth');

Route::get('ths/product/alternates', [THSProductController::class,'allAlternates'])->middleware('auth');
Route::put('ths/product/alternates/{id}', [THSProductController::class,'createOrUpdateAlternate'])->middleware('auth');
Route::post('ths/product/alternates', [THSProductController::class,'createOrUpdateAlternate'])->middleware('auth');
Route::delete('ths/product/alternates/{id}', [THSProductController::class,'deleteAlternate'])->middleware('auth');

Route::get('ths/product/customers/blacklist', [THSProductController::class,'allCustomersBL'])->middleware('auth');
Route::put('ths/product/customers/blacklist/{id}', [THSProductController::class,'createOrUpdateCustomerBL'])->middleware('auth');
Route::post('ths/product/customers/blacklist', [THSProductController::class,'createOrUpdateCustomerBL'])->middleware('auth');
Route::delete('ths/product/customers/blacklist/{id}', [THSProductController::class,'deleteCustomerBL'])->middleware('auth');

Route::get('ths/product/countries/blacklist', [THSProductController::class,'allCountriesBL'])->middleware('auth');
Route::put('ths/product/countries/blacklist/{id}', [THSProductController::class,'createOrUpdateCountryBL'])->middleware('auth');
Route::post('ths/product/countries/blacklist', [THSProductController::class,'createOrUpdateCountryBL'])->middleware('auth');
Route::delete('ths/product/countries/blacklist/{id}', [THSProductController::class,'deleteCountryBL'])->middleware('auth');

Route::get('ths/product/product/groups', [THSProductController::class,'allProductGroups'])->middleware('auth');
Route::put('ths/product/product/groups/{id}', [THSProductController::class,'createOrUpdateProductGroup'])->middleware('auth');
Route::post('ths/product/product/groups', [THSProductController::class,'createOrUpdateProductGroup'])->middleware('auth');
Route::delete('ths/product/product/groups/{id}', [THSProductController::class,'deleteProductGroup'])->middleware('auth');

Route::get('ths/product/customer/exclusive', [THSProductController::class,'allExclusives'])->middleware('auth');
Route::put('ths/product/customer/exclusive/{id}', [THSProductController::class,'createOrUpdateExclusive'])->middleware('auth');
Route::post('ths/product/customer/exclusive', [THSProductController::class,'createOrUpdateExclusive'])->middleware('auth');
Route::delete('ths/product/customer/exclusive/{id}', [THSProductController::class,'deleteExclusive'])->middleware('auth');

Route::get('ths/product/equivalentes', [THSProductController::class,'allEquivalentes'])->middleware('auth');
Route::put('ths/product/equivalentes/{id}', [THSProductController::class,'createOrUpdateEquivalent'])->middleware('auth');
Route::post('ths/product/equivalentes', [THSProductController::class,'createOrUpdateEquivalent'])->middleware('auth');
Route::delete('ths/product/equivalentes/{id}', [THSProductController::class,'deleteEquivalent'])->middleware('auth');

Route::get('ths/printers', [THSPrinterController::class,'all'])->middleware('auth');
Route::put('ths/printers/{id}', [THSPrinterController::class,'createOrUpdate'])->middleware('auth');
Route::post('ths/printers/export', [THSPrinterController::class,'exportXLS'])->middleware('auth');
Route::post('ths/printers', [THSPrinterController::class,'createOrUpdate'])->middleware('auth');
Route::delete('ths/printers/{id}', [THSPrinterController::class,'delete'])->middleware('auth');

Route::get('ths/labels', [THSLabelController::class,'all'])->middleware('auth');
Route::put('ths/labels/{id}', [THSLabelController::class,'createOrUpdate'])->middleware('auth');
Route::post('ths/labels/export', [THSLabelController::class,'exportXLS'])->middleware('auth');
Route::post('ths/labels', [THSLabelController::class,'createOrUpdate'])->middleware('auth');
Route::delete('ths/labels/{id}', [THSLabelController::class,'delete'])->middleware('auth');

Route::get('ths/labels/ias', [THSIASLabelController::class,'all'])->middleware('auth');

Route::get('ths/repeatlabelprint/positions', [THSLabelController::class,'getVoucherPositions'])->middleware('auth');
Route::put('ths/repeatlabelprint/positions/{id}', [THSLabelController::class,'printPosition'])->middleware('auth');
Route::get('ths/repeatchargelabelprint/positions', [THSLabelController::class,'getPPSVoucherPositions'])->middleware('auth');
Route::put('ths/repeatchargelabelprint/positions/{id}', [THSLabelController::class,'printPPSPosition'])->middleware('auth');

Route::post('ths/labelprint/itemlabel', [THSLabelController::class,'printItemLabel'])->middleware('auth');
Route::post('ths/labelprint/chargelabel', [THSLabelController::class,'printChargeLabel'])->middleware('auth');
Route::post('ths/labelprint/customeritemlabel', [THSLabelController::class,'printCustomerItemLabel'])->middleware('auth');

Route::get('ths/customers', [THSCustomerController::class,'all'])->middleware('auth');
Route::put('ths/customers/{id}', [THSCustomerController::class,'createOrUpdate'])->middleware('auth');
Route::post('ths/customers/export', [THSCustomerController::class,'exportXLS'])->middleware('auth');
Route::post('ths/customers', [THSCustomerController::class,'createOrUpdate'])->middleware('auth');
Route::post('ths/customers/logo', [THSCustomerController::class,'uploadLogo'])->middleware('auth');
Route::post('ths/customers/bg', [THSCustomerController::class,'uploadBackground'])->middleware('auth');
Route::get('ths/customers/mailhistory', [THSCustomerController::class,'mailHistory'])->middleware('auth');
Route::get('ths/customers/importhistory', [THSCustomerController::class,'importHistory'])->middleware('auth');

Route::get('ths/items', [THSItemController::class,'all'])->middleware('auth');

Route::get('ths/itemgroups', [THSItemGroupController::class,'all'])->middleware('auth');

Route::get('ths/customers/products', [THSCustomerProductController::class,'all'])->middleware('auth');
Route::get('ths/customers/products/initial', [THSCustomerProductController::class,'getInitialProducts'])->middleware('auth');
Route::put('ths/customers/products/{id}', [THSCustomerProductController::class,'createOrUpdate'])->middleware('auth');
Route::delete('ths/customers/products/{id}', [THSCustomerProductController::class,'delete'])->middleware('auth');
Route::post('ths/customers/products/export', [THSCustomerProductController::class,'exportXLS'])->middleware('auth');
Route::post('ths/customers/products', [THSCustomerProductController::class,'createOrUpdate'])->middleware('auth');

Route::get('ths/suppliers', [THSSupplierController::class,'all'])->middleware('auth');
Route::put('ths/suppliers/{id}', [THSSupplierController::class,'createOrUpdate'])->middleware('auth');
Route::post('ths/suppliers/export', [THSSupplierController::class,'exportXLS'])->middleware('auth');

//Route::get('ths/ftp/configurations', [THSFTPController::class,'all'])->middleware('auth');

Route::get('ths/production/planning', [THSProductionPlanningController::class,'data'])->middleware('auth');
Route::post('ths/production/planning', [THSProductionPlanningController::class,'change'])->middleware('auth');

Route::get('ths/basics/config', [THSBasicConfigController::class,'get'])->middleware('auth');
Route::get('ths/basics/config/{id}', [THSBasicConfigController::class,'get'])->middleware('auth');
Route::put('ths/basics/config/{id}', [THSBasicConfigController::class,'createOrUpdate'])->middleware('auth');
Route::post('ths/basics/config', [THSBasicConfigController::class,'createOrUpdate'])->middleware('auth');

Route::post('ths/intercompany/message', [THSIntercompanyController::class,'message']);
Route::get('ths/intercompany/message', [THSIntercompanyController::class,'message']);

Route::get('ths/finishpartorderplannings', [THSOrderPlanningController::class,'allFinishPart'])->middleware('auth');
Route::post('ths/finishpartorderplannings', [THSOrderPlanningController::class,'createOrUpdateFinishPart'])->middleware('auth');
Route::put('ths/finishpartorderplannings/{id}', [THSOrderPlanningController::class,'createOrUpdateFinishPart'])->middleware('auth');
Route::delete('ths/finishpartorderplannings/{id}', [THSOrderPlanningController::class,'deleteFinishPart'])->middleware('auth');

Route::get('ths/finishpartitemsorderplanning', [THSOrderPlanningController::class,'allFinishPartItem'])->middleware('auth');
Route::put('ths/finishpartitemsorderplanning/{id}', [THSOrderPlanningController::class,'createOrUpdateFinishPartItem'])->middleware('auth');
Route::post('ths/finishpartitemsorderplanning/exportgrid', [THSOrderPlanningController::class,'exportFinishPartItemsGridToXLS'])->middleware('auth');

Route::get('ths/rawmaterialorderplannings', [THSOrderPlanningController::class,'allRawMaterial'])->middleware('auth');
Route::post('ths/rawmaterialorderplannings', [THSOrderPlanningController::class,'createOrUpdateRawMaterial'])->middleware('auth');
Route::put('ths/rawmaterialorderplannings/{id}', [THSOrderPlanningController::class,'createOrUpdateRawMaterial'])->middleware('auth');
Route::delete('ths/rawmaterialorderplannings/{id}', [THSOrderPlanningController::class,'deleteRawMaterial'])->middleware('auth');

Route::get('ths/rawmaterialresourcesorderplanning', [THSOrderPlanningController::class,'allRawMaterialResource'])->middleware('auth');
Route::put('ths/rawmaterialresourcesorderplanning/{id}', [THSOrderPlanningController::class,'createOrUpdateRawMaterialResource'])->middleware('auth');
Route::post('ths/rawmaterialresourcesorderplanning/exportgrid', [THSOrderPlanningController::class,'exportRawMaterialResourceGridToXLS'])->middleware('auth');

Route::get('ths/productionorderplannings', [THSOrderPlanningController::class,'allProduction'])->middleware('auth');
Route::post('ths/productionorderplannings', [THSOrderPlanningController::class,'createOrUpdateProduction'])->middleware('auth');
Route::put('ths/productionorderplannings/{id}', [THSOrderPlanningController::class,'createOrUpdateProduction'])->middleware('auth');
Route::delete('ths/productionorderplannings/{id}', [THSOrderPlanningController::class,'deleteProduction'])->middleware('auth');

Route::get('ths/productionitemsorderplanning', [THSOrderPlanningController::class,'allProductionItem'])->middleware('auth');
Route::put('ths/productionitemsorderplanning/{id}', [THSOrderPlanningController::class,'createOrUpdateProductionItem'])->middleware('auth');
Route::post('ths/productionitemsorderplanning/exportgrid', [THSOrderPlanningController::class,'exportProductionItemsGridToXLS'])->middleware('auth');

Route::get('ths/tradinggoodsorderplannings', [THSOrderPlanningController::class,'allTradingGoods'])->middleware('auth');
Route::post('ths/tradinggoodsorderplannings', [THSOrderPlanningController::class,'createOrUpdateTradingGoods'])->middleware('auth');
Route::put('ths/tradinggoodsorderplannings/{id}', [THSOrderPlanningController::class,'createOrUpdateTradingGoods'])->middleware('auth');
Route::delete('ths/tradinggoodsorderplannings/{id}', [THSOrderPlanningController::class,'deleteTradingGoods'])->middleware('auth');

Route::get('ths/tradinggoodsitemsorderplanning', [THSOrderPlanningController::class,'allTradingGoodsItem'])->middleware('auth');
Route::put('ths/tradinggoodsitemsorderplanning/{id}', [THSOrderPlanningController::class,'createOrUpdateTradingGoodsItem'])->middleware('auth');
Route::post('ths/tradinggoodsitemsorderplanning/exportgrid', [THSOrderPlanningController::class,'exportTradingGoodsItemsGridToXLS'])->middleware('auth');
Route::post('ths/tradinggoodsitemsorderplanning/createinquiry', [THSOrderPlanningController::class,'createTradingGoodsInquiry'])->middleware('auth');

Route::get('ths/tradinggoodsitemsorderplanning/supplierassign', [THSOrderPlanningController::class,'allTradingGoodsSupplierAssign'])->middleware('auth');
Route::post('ths/tradinggoodsitemsorderplanning/supplierassign', [THSOrderPlanningController::class,'createOrUpdateTradingGoodsSupplierAssign'])->middleware('auth');
Route::put('ths/tradinggoodsitemsorderplanning/supplierassign/{id}', [THSOrderPlanningController::class,'createOrUpdateTradingGoodsSupplierAssign'])->middleware('auth');
Route::delete('ths/tradinggoodsitemsorderplanning/supplierassign/{id}', [THSOrderPlanningController::class,'deleteTradingGoodsSupplierAssign'])->middleware('auth');

Route::get('ths/salesman', [THSSalesmanController::class,'all'])->middleware('auth');
Route::post('ths/salesman', [THSSalesmanController::class,'createOrUpdate'])->middleware('auth');
Route::put('ths/salesman/{id}', [THSSalesmanController::class,'createOrUpdate'])->middleware('auth');

Route::get('ths/vouchertypes', [THSVoucherTypeController::class,'all'])->middleware('auth');
Route::post('ths/vouchertypes', [THSVoucherTypeController::class,'createOrUpdate'])->middleware('auth');
Route::put('ths/vouchertypes/{id}', [THSVoucherTypeController::class,'createOrUpdate'])->middleware('auth');
Route::put('ths/vouchertypes', [THSVoucherTypeController::class,'createOrUpdate'])->middleware('auth');
Route::post('ths/vouchertypes/export', [THSVoucherTypeController::class,'exportXLS'])->middleware('auth');

Route::get('ths/vouchertypes/emailtemplates', [THSVoucherTypeController::class,'allEMailTemplates'])->middleware('auth');
Route::post('ths/vouchertypes/emailtemplates', [THSVoucherTypeController::class,'createOrUpdateEMailTemplate'])->middleware('auth');
Route::put('ths/vouchertypes/emailtemplates/{id}', [THSVoucherTypeController::class,'createOrUpdateEMailTemplate'])->middleware('auth');
Route::delete('ths/vouchertypes/emailtemplates/{id}', [THSVoucherTypeController::class,'deleteEMailTemplate'])->middleware('auth');

Route::get('ths/resources', [THSPictureController::class,'getResource'])->middleware('auth');

Route::get('ths/languages', [THSLanguageController::class,'all'])->middleware('auth');

Route::get('ths/quotations', [THSQuotationController::class,'all'])->middleware('auth');
Route::post('ths/quotations', [THSQuotationController::class,'createOrUpdate'])->middleware('auth');

Route::put('ths/quotations/{id}', [THSQuotationController::class,'createOrUpdate'])->middleware('auth');
Route::delete('ths/quotations/{id}', [THSQuotationController::class,'delete'])->middleware('auth');
Route::put('ths/quotations', [THSQuotationController::class,'createOrUpdate'])->middleware('auth');
Route::post('ths/quotations/columns', [THSQuotationController::class,'fileColumns'])->middleware('auth');
Route::post('ths/quotations/export', [THSQuotationController::class,'exportXLS'])->middleware('auth');
Route::post('ths/quotations/upload', [THSQuotationController::class, 'upload'])->middleware('auth');
Route::get('ths/quotations/customer/{id}', [THSQuotationController::class,'lastCustomerQuotationImport'])->middleware('auth');
Route::delete('ths/quotations/{id}', [THSQuotationController::class,'delete'])->middleware('auth');

Route::get('ths/quotationpositions', [THSQuotationPositionController::class,'all'])->middleware('auth');
Route::post('ths/quotationpositions', [THSQuotationPositionController::class,'createOrUpdate'])->middleware('auth');
Route::put('ths/quotationpositions/{id}', [THSQuotationPositionController::class,'createOrUpdate'])->middleware('auth');
Route::delete('ths/quotationpositions/{id}', [THSQuotationPositionController::class,'delete'])->middleware('auth');
Route::get('ths/quotationpositions/refresh/{id}', [THSQuotationController::class,'refreshPositions'])->middleware('auth');
Route::post('ths/quotationpositions/export', [THSQuotationPositionController::class,'exportXLS'])->middleware('auth');
Route::post('ths/quotationpositions/exportS100', [THSQuotationPositionController::class,'exportS100'])->middleware('auth');
Route::post('ths/quotationpositions/exportCustomer', [THSQuotationPositionController::class,'exportCustomer'])->middleware('auth');

Route::get('ths/containertypes', [THSContainerTypeController::class,'all'])->middleware('auth');
Route::put('ths/containertypes/{id}', [THSContainerTypeController::class,'createOrUpdate'])->middleware('auth');
Route::post('ths/containertypes/export', [THSContainerTypeController::class,'exportXLS'])->middleware('auth');
Route::post('ths/containertypes', [THSContainerTypeController::class,'createOrUpdate'])->middleware('auth');
Route::delete('ths/containertypes/{id}', [THSContainerTypeController::class,'delete'])->middleware('auth');

Route::get('ths/parsiastock', [THSProductController::class,'getPARSIAStock'])->middleware('auth');
