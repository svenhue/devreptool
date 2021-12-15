<?php

use App\Http\Controllers\pcts\PCTSActionController;
use App\Http\Controllers\pcts\PCTSContactTypeController;
use App\Http\Controllers\pcts\PCTSContractTypeController;
use App\Http\Controllers\pcts\PCTSErrorCodeController;
use App\Http\Controllers\pcts\PCTSOrderStatusTypeController;
use App\Http\Controllers\pcts\PCTSOrderTypeController;
use App\Http\Controllers\pcts\PCTSPamContractController;
use App\Http\Controllers\pcts\PCTSPamController;
use App\Http\Controllers\pcts\PCTSPietColumnCfgController;
use App\Http\Controllers\pcts\PCTSPietController;
use App\Http\Controllers\pcts\PCTSPietSystemController;
use App\Http\Controllers\pcts\PCTSReasonController;
use App\Http\Controllers\pcts\PCTSResourceStatusTypeController;
use App\Http\Controllers\pcts\PCTSRevisitReasonController;
use App\Http\Controllers\pcts\PCTSSLAController;
use App\Http\Controllers\pcts\PCTSSymptomController;
use App\Http\Controllers\pcts\PCTSTextBlockController;
use App\Http\Controllers\pcts\PCTSUrgencyController;
use App\Http\Controllers\S100\S100AddressController;
use App\Http\Controllers\S100\S100CustomerController;
use App\Http\Controllers\S100\S100ItemController;
use App\Http\Controllers\S100\S100ContractController;

Route::get('pcts/actions', [PCTSActionController::class,'all'])->middleware('auth');
Route::put('pcts/actions/{id}', [PCTSActionController::class,'createOrUpdate'])->middleware('auth');
Route::post('pcts/actions/export', [PCTSActionController::class,'exportXLS'])->middleware('auth');
Route::post('pcts/actions', [PCTSActionController::class,'createOrUpdate'])->middleware('auth');
Route::delete('pcts/actions/{id}', [PCTSActionController::class,'delete'])->middleware('auth');

Route::get('pcts/reasons', [PCTSReasonController::class,'all'])->middleware('auth');
Route::put('pcts/reasons/{id}', [PCTSReasonController::class,'createOrUpdate'])->middleware('auth');
Route::post('pcts/reasons/export', [PCTSReasonController::class,'exportXLS'])->middleware('auth');
Route::post('pcts/reasons', [PCTSReasonController::class,'createOrUpdate'])->middleware('auth');
Route::delete('pcts/reasons/{id}', [PCTSReasonController::class,'delete'])->middleware('auth');

Route::get('pcts/revisitreasons', [PCTSRevisitReasonController::class,'all'])->middleware('auth');
Route::put('pcts/revisitreasons/{id}', [PCTSRevisitReasonController::class,'createOrUpdate'])->middleware('auth');
Route::post('pcts/revisitreasons/export', [PCTSRevisitReasonController::class,'exportXLS'])->middleware('auth');
Route::post('pcts/revisitreasons', [PCTSRevisitReasonController::class,'createOrUpdate'])->middleware('auth');
Route::delete('pcts/revisitreasons/{id}', [PCTSRevisitReasonController::class,'delete'])->middleware('auth');

Route::get('pcts/symptoms', [PCTSSymptomController::class,'all'])->middleware('auth');
Route::put('pcts/symptoms/{id}', [PCTSSymptomController::class,'createOrUpdate'])->middleware('auth');
Route::post('pcts/symptoms/export', [PCTSSymptomController::class,'exportXLS'])->middleware('auth');
Route::post('pcts/symptoms', [PCTSSymptomController::class,'createOrUpdate'])->middleware('auth');
Route::delete('pcts/symptoms/{id}', [PCTSSymptomController::class,'delete'])->middleware('auth');

Route::get('pcts/errorcodes', [PCTSErrorCodeController::class,'all'])->middleware('auth');
Route::put('pcts/errorcodes/{id}', [PCTSErrorCodeController::class,'createOrUpdate'])->middleware('auth');
Route::post('pcts/errorcodes/export', [PCTSErrorCodeController::class,'exportXLS'])->middleware('auth');
Route::post('pcts/errorcodes', [PCTSErrorCodeController::class,'createOrUpdate'])->middleware('auth');
Route::delete('pcts/errorcodes/{id}', [PCTSErrorCodeController::class,'delete'])->middleware('auth');

Route::get('pcts/urgencies', [PCTSUrgencyController::class,'all'])->middleware('auth');
Route::put('pcts/urgencies/{id}', [PCTSUrgencyController::class,'createOrUpdate'])->middleware('auth');
Route::post('pcts/urgencies/export', [PCTSUrgencyController::class,'exportXLS'])->middleware('auth');
Route::post('pcts/urgencies', [PCTSUrgencyController::class,'createOrUpdate'])->middleware('auth');
Route::delete('pcts/urgencies/{id}', [PCTSUrgencyController::class,'delete'])->middleware('auth');

Route::get('pcts/slas', [PCTSSLAController::class,'all'])->middleware('auth');
Route::put('pcts/slas/{id}', [PCTSSLAController::class,'createOrUpdate'])->middleware('auth');
Route::post('pcts/slas/export', [PCTSSLAController::class,'exportXLS'])->middleware('auth');
Route::post('pcts/slas', [PCTSSLAController::class,'createOrUpdate'])->middleware('auth');
Route::delete('pcts/slas/{id}', [PCTSSLAController::class,'delete'])->middleware('auth');

Route::get('pcts/orderstatustypes', [PCTSOrderStatusTypeController::class,'all'])->middleware('auth');
Route::put('pcts/orderstatustypes/{id}', [PCTSOrderStatusTypeController::class,'createOrUpdate'])->middleware('auth');
Route::post('pcts/orderstatustypes/export', [PCTSOrderStatusTypeController::class,'exportXLS'])->middleware('auth');
Route::post('pcts/orderstatustypes', [PCTSOrderStatusTypeController::class,'createOrUpdate'])->middleware('auth');
Route::delete('pcts/orderstatustypes/{id}', [PCTSOrderStatusTypeController::class,'delete'])->middleware('auth');

Route::get('pcts/ordertypes', [PCTSOrderTypeController::class,'all'])->middleware('auth');
Route::put('pcts/ordertypes/{id}', [PCTSOrderTypeController::class,'createOrUpdate'])->middleware('auth');
Route::post('pcts/ordertypes/export', [PCTSOrderTypeController::class,'exportXLS'])->middleware('auth');
Route::post('pcts/ordertypes', [PCTSOrderTypeController::class,'createOrUpdate'])->middleware('auth');
Route::delete('pcts/ordertypes/{id}', [PCTSOrderTypeController::class,'delete'])->middleware('auth');

Route::get('pcts/contacttypes', [PCTSContactTypeController::class,'all'])->middleware('auth');
Route::put('pcts/contacttypes/{id}', [PCTSContactTypeController::class,'createOrUpdate'])->middleware('auth');
Route::post('pcts/contacttypes/export', [PCTSContactTypeController::class,'exportXLS'])->middleware('auth');
Route::post('pcts/contacttypes', [PCTSContactTypeController::class,'createOrUpdate'])->middleware('auth');
Route::delete('pcts/contacttypes/{id}', [PCTSContactTypeController::class,'delete'])->middleware('auth');

Route::get('pcts/contracttypes', [PCTSContractTypeController::class,'all'])->middleware('auth');
Route::put('pcts/contracttypes/{id}', [PCTSContractTypeController::class,'createOrUpdate'])->middleware('auth');
Route::post('pcts/contracttypes/export', [PCTSContractTypeController::class,'exportXLS'])->middleware('auth');
Route::post('pcts/contracttypes', [PCTSContractTypeController::class,'createOrUpdate'])->middleware('auth');
Route::delete('pcts/contracttypes/{id}', [PCTSContractTypeController::class,'delete'])->middleware('auth');

Route::get('pcts/textblocks', [PCTSTextBlockController::class,'all'])->middleware('auth');
Route::put('pcts/textblocks/{id}', [PCTSTextBlockController::class,'createOrUpdate'])->middleware('auth');
Route::post('pcts/textblocks/export', [PCTSTextBlockController::class,'exportXLS'])->middleware('auth');
Route::post('pcts/textblocks', [PCTSTextBlockController::class,'createOrUpdate'])->middleware('auth');
Route::delete('pcts/textblocks/{id}', [PCTSTextBlockController::class,'delete'])->middleware('auth');

Route::get('pcts/resourcestatustypes', [PCTSResourceStatusTypeController::class,'all'])->middleware('auth');
Route::put('pcts/resourcestatustypes/{id}', [PCTSResourceStatusTypeController::class,'createOrUpdate'])->middleware('auth');
Route::post('pcts/resourcestatustypes/export', [PCTSResourceStatusTypeController::class,'exportXLS'])->middleware('auth');
Route::post('pcts/resourcestatustypes', [PCTSResourceStatusTypeController::class,'createOrUpdate'])->middleware('auth');
Route::delete('pcts/resourcestatustypes/{id}', [PCTSResourceStatusTypeController::class,'delete'])->middleware('auth');

Route::get('pcts/piet', [PCTSPietController::class,'all'])->middleware('auth');
Route::get('pcts/piet/defaultconfig', [PCTSPietController::class,'setDefaultConfig'])->middleware('auth');

Route::put('pcts/piet/{id}', [PCTSPietController::class,'createOrUpdate'])->middleware('auth');
Route::post('pcts/piet/export', [PCTSPietController::class,'exportXLS'])->middleware('auth');
Route::post('pcts/piet/upload', [PCTSPietController::class,'upload'])->middleware('auth');
Route::post('pcts/piet', [PCTSPietController::class,'createOrUpdate'])->middleware('auth');
Route::delete('pcts/piet/{id}', [PCTSPietController::class,'delete'])->middleware('auth');
Route::post('pcts/pietsystems/syncerp', [PCTSPietController::class,'syncWithERP'])->middleware('auth');

Route::post('pcts/pietsystems/exportserialletter', [PCTSPietSystemController::class,'exportSerialLetter'])->middleware('auth');

Route::get('pcts/pietsystems/exportscanlist', [PCTSPietSystemController::class,'exportScanList'])->middleware('auth');
Route::get('pcts/pietsystems/exportobjectlist', [PCTSPietSystemController::class,'exportObjectList'])->middleware('auth');
Route::get('pcts/pietsystems', [PCTSPietSystemController::class,'all'])->middleware('auth');
Route::put('pcts/pietsystems/{id}', [PCTSPietSystemController::class,'createOrUpdate'])->middleware('auth');
Route::post('pcts/pietsystems', [PCTSPietSystemController::class,'createOrUpdate'])->middleware('auth');
Route::delete('pcts/pietsystems/{id}', [PCTSPietSystemController::class,'delete'])->middleware('auth');

Route::get('pcts/pietcolumns', [PCTSPietColumnCfgController::class,'all'])->middleware('auth');
Route::put('pcts/pietcolumns/{id}', [PCTSPietColumnCfgController::class,'createOrUpdate'])->middleware('auth');
Route::post('pcts/pietcolumns', [PCTSPietColumnCfgController::class,'createOrUpdate'])->middleware('auth');
Route::delete('pcts/pietcolumns/{id}', [PCTSPietColumnCfgController::class,'delete'])->middleware('auth');

Route::get('s100/customers', [S100CustomerController::class,'all'])->middleware('auth');
Route::get('s100/addresses', [S100AddressController::class,'all'])->middleware('auth');
Route::get('s100/items', [S100ItemController::class,'all'])->middleware('auth');

Route::get('s100/contracts', [S100ContractController::class,'all'])->middleware('auth');
Route::put('s100/contracts/{id}', [S100ContractController::class,'createOrUpdate'])->middleware('auth');
Route::post('s100/contracts/export', [S100ContractController::class,'exportXLS'])->middleware('auth');
Route::post('s100/contracts', [S100ContractController::class,'createOrUpdate'])->middleware('auth');
Route::delete('s100/contracts{id}', [S100ContractController::class,'delete'])->middleware('auth');
Route::post('s100/contracts/erp', [S100ContractController::class,'syncWithERP'])->middleware('auth');

Route::get('pcts/pams', [PCTSPamController::class,'all'])->middleware('auth');
Route::put('pcts/pams/{id}', [PCTSPamController::class,'createOrUpdate'])->middleware('auth');
Route::post('pcts/pams/export', [PCTSPamController::class,'exportXLS'])->middleware('auth');
Route::post('pcts/pams', [PCTSPamController::class,'createOrUpdate'])->middleware('auth');
Route::delete('pcts/pams/{id}', [PCTSPamController::class,'delete'])->middleware('auth');

Route::get('pcts/pamcontracts', [PCTSPamContractController::class,'all'])->middleware('auth');
Route::put('pcts/pamcontracts/{id}', [PCTSPamContractController::class,'createOrUpdate'])->middleware('auth');
Route::post('pcts/pamcontracts/export', [PCTSPamContractController::class,'exportXLS'])->middleware('auth');
Route::post('pcts/pamcontracts', [PCTSPamContractController::class,'createOrUpdate'])->middleware('auth');
Route::delete('pcts/pamcontracts/{id}', [PCTSPamContractController::class,'delete'])->middleware('auth');


