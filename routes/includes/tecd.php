<?php

use App\Http\Controllers\tecd\TECDContractController;
use App\Http\Controllers\tecd\TECDContractModelController;
use App\Http\Controllers\tecd\TECDContractSystemController;
use App\Http\Controllers\tecd\TECDContractTypeController;
use App\Http\Controllers\tecd\TECDItemPurchasePriceController;
use App\Http\Controllers\tecd\TECDItemSellingPriceController;
use App\Http\Controllers\tecd\TECDSkipAuthController;
use App\Http\Controllers\tecd\TECDCustomerAddressController;
use App\Http\Controllers\tecd\TECDDeliveryAddressController;
use App\Http\Controllers\tecd\TECDInfoTextController;
use App\Http\Controllers\tecd\TECDItemController;
use App\Http\Controllers\tecd\TECDModelController;
use App\Http\Controllers\tecd\TECDFMAModelController;
use App\Http\Controllers\tecd\TECDSkipModelDistributionController;
use App\Http\Controllers\tecd\TECDSkipModuleController;
use App\Http\Controllers\tecd\TECDSkipSupplyOrderController;
use App\Http\Controllers\tecd\TECDSkipSystemController;
use App\Http\Controllers\tecd\TECDSkipTicketController;
use App\Http\Controllers\tecd\TECDSkipUserController;
use App\Http\Controllers\tecd\TECDSkipVolumeDistributionController;
use App\Http\Controllers\tecd\TECDSkipVolumeEvaluationController;
use App\Http\Controllers\tecd\TECDSkipVolumeOverviewController;
use App\Http\Controllers\tecd\TECDSLAController;
use App\Http\Controllers\tecd\TECDSupplyOrderController;
use App\Http\Controllers\tecd\TECDSystemController;
use App\Http\Controllers\tecd\TECDSystemSupplyItemController;
use App\Http\Controllers\tecd\TECDTicketController;
use App\Http\Controllers\tecd\TECDTicketNoteTypeController;
use App\Models\tecd\TECDBillingType;

Route::post('tecd/skip/auth/login', [TECDSkipAuthController::class,'login']);
Route::get('tecd/skip/auth/authenticate', [TECDSkipAuthController::class,'authenticate']);

Route::post('tecd/skip/modules/state/read', [TECDSkipModuleController::class,'readState'])->middleware('skipauth');
Route::post('tecd/skip/modules/state/save', [TECDSkipModuleController::class,'saveState'])->middleware('skipauth');

Route::get('tecd/ticketnotetypes', [TECDTicketNoteTypeController::class,'all'])->middleware('auth');
Route::put('tecd/ticketnotetypes/{id}', [TECDTicketNoteTypeController::class,'createOrUpdate'])->middleware('auth');
Route::post('tecd/ticketnotetypes/export', [TECDTicketNoteTypeController::class,'exportXLS'])->middleware('auth');
Route::post('tecd/ticketnotetypes', [TECDTicketNoteTypeController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tecd/ticketnotetypes/{id}', [TECDTicketNoteTypeController::class,'delete'])->middleware('auth');

Route::get('tecd/slas', [TECDSLAController::class,'all'])->middleware('auth');
Route::put('tecd/slas/{id}', [TECDSLAController::class,'createOrUpdate'])->middleware('auth');
Route::post('tecd/slas/export', [TECDSLAController::class,'exportXLS'])->middleware('auth');
Route::post('tecd/slas', [TECDSLAController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tecd/slas/{id}', [TECDSLAController::class,'delete'])->middleware('auth');

Route::get('tecd/items', [TECDItemController::class,'all'])->middleware('auth');
Route::post('tecd/items/export', [TECDItemController::class,'exportXLS'])->middleware('auth');

Route::get('tecd/items/sellingprices', [TECDItemSellingPriceController::class,'all'])->middleware('auth');
Route::post('tecd/items/sellingprices/export', [TECDItemSellingPriceController::class,'exportXLS'])->middleware('auth');
Route::post('tecd/items/sellingprices', [TECDItemSellingPriceController::class,'createOrUpdate'])->middleware('auth');
Route::put('tecd/items/sellingprices/{id}', [TECDItemSellingPriceController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tecd/items/sellingprices/{id}', [TECDItemSellingPriceController::class,'delete'])->middleware('auth');

Route::get('tecd/items/purchaseprices', [TECDItemPurchasePriceController::class,'all'])->middleware('auth');
Route::post('tecd/items/purchaseprices/export', [TECDItemPurchasePriceController::class,'exportXLS'])->middleware('auth');
Route::post('tecd/items/purchaseprices', [TECDItemPurchasePriceController::class,'createOrUpdate'])->middleware('auth');
Route::put('tecd/items/purchaseprices/{id}', [TECDItemPurchasePriceController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tecd/items/purchaseprices/{id}', [TECDItemPurchasePriceController::class,'delete'])->middleware('auth');

Route::get('tecd/customeraddresses', [TECDCustomerAddressController::class,'all'])->middleware('auth');
Route::post('tecd/customeraddresses/export', [TECDCustomerAddressController::class,'exportXLS'])->middleware('auth');
Route::post('tecd/customeraddresses', [TECDCustomerAddressController::class,'createOrUpdate'])->middleware('auth');
Route::put('tecd/customeraddresses/{id}', [TECDCustomerAddressController::class,'createOrUpdate'])->middleware('auth');

Route::get('tecd/customeraddresses/menu/{id}/root', [TECDCustomerAddressController::class,'menuConfiguration'])->middleware('auth');

Route::get('tecd/infotext', [TECDInfoTextController::class,'all'])->middleware('auth');
Route::post('tecd/infotext/export', [TECDInfoTextController::class,'exportXLS'])->middleware('auth');
Route::post('tecd/infotext', [TECDInfoTextController::class,'createOrUpdate'])->middleware('auth');
Route::put('tecd/infotext/{id}', [TECDInfoTextController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tecd/infotext/{id}', [TECDInfoTextController::class,'delete'])->middleware('auth');

Route::get('tecd/infotext/customers', [TECDInfoTextController::class,'allCustomers'])->middleware('auth');
Route::post('tecd/infotext/customers', [TECDInfoTextController::class,'createOrUpdateCustomer'])->middleware('auth');
Route::put('tecd/infotext/customers/{id}', [TECDInfoTextController::class,'createOrUpdateCustomer'])->middleware('auth');
Route::delete('tecd/infotext/customers/{id}', [TECDInfoTextController::class,'deleteCustomer'])->middleware('auth');

Route::get('tecd/infotext/models', [TECDInfoTextController::class,'allModels'])->middleware('auth');
Route::post('tecd/infotext/models', [TECDInfoTextController::class,'createOrUpdateModel'])->middleware('auth');
Route::put('tecd/infotext/models/{id}', [TECDInfoTextController::class,'createOrUpdateModel'])->middleware('auth');
Route::delete('tecd/infotext/models/{id}', [TECDInfoTextController::class,'deleteModel'])->middleware('auth');

Route::get('tecd/models', [TECDModelController::class,'all'])->middleware('auth');
Route::post('tecd/models', [TECDModelController::class,'createOrUpdate'])->middleware('auth');
Route::put('tecd/models/{id}', [TECDModelController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tecd/models/{id}', [TECDModelController::class,'delete'])->middleware('auth');

Route::get('tecd/fmamodels', [TECDFMAModelController::class,'all'])->middleware('auth');
Route::post('tecd/fmamodels', [TECDFMAModelController::class,'createOrUpdate'])->middleware('auth');
Route::put('tecd/fmamodels/{id}', [TECDFMAModelController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tecd/fmamodels/{id}', [TECDFMAModelController::class,'delete'])->middleware('auth');

Route::get('tecd/deliveryaddresses', [TECDDeliveryAddressController::class,'all'])->middleware('auth');
Route::post('tecd/deliveryaddresses/export', [TECDDeliveryAddressController::class,'exportXLS'])->middleware('auth');

Route::get('tecd/systemcounters', [TECDSystemController::class,'getSystemCounter'])->middleware('auth');

Route::get('tecd/systems', [TECDSystemController::class,'all'])->middleware('auth');
Route::get('tecd/systems/{id}/tickets/hasopen', [TECDSystemController::class,'hasOpenTickets'])->middleware('auth');
Route::post('tecd/systems/export', [TECDSystemController::class,'exportXLS'])->middleware('auth');
Route::post('tecd/systems', [TECDSystemController::class,'createOrUpdate'])->middleware('auth');
Route::put('tecd/systems/{id}', [TECDSystemController::class,'createOrUpdate'])->middleware('auth');

Route::post('tecd/systems/location', [TECDSkipSystemController::class,'changeLocation'])->middleware('auth');

Route::get('tecd/tickets', [TECDTicketController::class,'all'])->middleware('auth');
Route::get('tecd/tickets/statusrequest/{id}', [TECDTicketController::class,'statusRequest'])->middleware('auth');
Route::put('tecd/tickets/{id}', [TECDTicketController::class,'createOrUpdate'])->middleware('auth');

Route::post('tecd/tickets/export', [TECDTicketController::class,'exportXLS'])->middleware('auth');
Route::post('tecd/tickets/slaexport', [TECDTicketController::class,'exportSLAXLS'])->middleware('auth');

Route::get('tecd/tickets/binaries', [TECDTicketController::class,'allBinaries'])->middleware('auth');
Route::get('tecd/tickets/binaries/{id}', [TECDTicketController::class,'downloadBinary']);
Route::post('tecd/tickets/binaries', [TECDTicketController::class,'createOrUpdateBinary'])->middleware('auth');
Route::put('tecd/tickets/binaries/{id}', [TECDTicketController::class,'createOrUpdateBinary'])->middleware('auth');
Route::delete('tecd/tickets/binaries/{id}', [TECDTicketController::class,'deleteBinary'])->middleware('auth');
Route::post('tecd/tickets/upload', [TECDTicketController::class,'uploadBinary'])->middleware('auth');
Route::get('tecd/tickets/history', [TECDTicketController::class,'allHistories'])->middleware('auth');
Route::get('tecd/tickets/voucher', [TECDTicketController::class,'generateServiceVoucher'])->middleware('auth');
Route::get('tecd/tickets/read', [TECDTicketController::class,'setReadFlag'])->middleware('auth');

Route::get('tecd/tickets/serviceprovider/sendmail/{id}', [TECDTicketController::class,'sendMailToSP'])->middleware('auth');

Route::post('tecd/tickets', [TECDTicketController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tecd/tickets/{id}', [TECDTicketController::class,'delete'])->middleware('auth');

Route::get('tecd/ticketpositions', [TECDTicketController::class,'allPositions'])->middleware('auth');
Route::put('tecd/ticketpositions/{id}', [TECDTicketController::class,'createOrUpdatePosition'])->middleware('auth');
Route::post('tecd/ticketpositions', [TECDTicketController::class,'createOrUpdatePosition'])->middleware('auth');
Route::delete('tecd/ticketpositions/{id}', [TECDTicketController::class,'deletePosition'])->middleware('auth');

Route::get('tecd/ticketnotes', [TECDTicketController::class,'allNotes'])->middleware('auth');
Route::put('tecd/ticketnotes/{id}', [TECDTicketController::class,'createOrUpdateNote'])->middleware('auth');
Route::post('tecd/ticketnotes', [TECDTicketController::class,'createOrUpdateNote'])->middleware('auth');
Route::delete('tecd/ticketnotes/{id}', [TECDTicketController::class,'deleteNote'])->middleware('auth');

Route::get('tecd/supplyorders', [TECDSupplyOrderController::class,'all'])->middleware('auth');
Route::put('tecd/supplyorders/{id}', [TECDSupplyOrderController::class,'createOrUpdate'])->middleware('auth');
Route::post('tecd/supplyorders', [TECDSupplyOrderController::class,'createOrUpdate'])->middleware('auth');
Route::post('tecd/supplyorders/export', [TECDSupplyOrderController::class,'exportXLS'])->middleware('auth');
Route::delete('tecd/supplyorders/{id}', [TECDSupplyOrderController::class,'delete'])->middleware('auth');

Route::get('tecd/supplyitems', [TECDSystemSupplyItemController::class,'all'])->middleware('auth');

Route::get('tecd/skipusers', [TECDSkipUserController::class,'all'])->middleware('auth');
Route::put('tecd/skipusers/{id}', [TECDSkipUserController::class,'createOrUpdate'])->middleware('auth');
Route::post('tecd/skipusers', [TECDSkipUserController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tecd/skipusers/{id}', [TECDSkipUserController::class,'delete'])->middleware('auth');

Route::get('tecd/skipusers/menu/{id}/root', [TECDSkipUserController::class,'menuConfiguration'])->middleware('auth');

Route::get('tecd/skip/skipusers', [TECDSkipUserController::class,'all'])->middleware('skipauth');
Route::put('tecd/skip/skipusers/{id}', [TECDSkipUserController::class,'createOrUpdate'])->middleware('skipauth');
Route::post('tecd/skip/skipusers', [TECDSkipUserController::class,'createOrUpdate'])->middleware('skipauth');
Route::delete('tecd/skip/skipusers/{id}', [TECDSkipUserController::class,'delete'])->middleware('skipauth');
Route::get('tecd/skip/skipusers/menu/{id}/root', [TECDSkipUserController::class,'menuConfiguration'])->middleware('skipauth');

Route::get('tecd/skip/supplyorders', [TECDSkipSupplyOrderController::class,'all'])->middleware('skipauth');
Route::post('tecd/skip/supplyorders', [TECDSupplyOrderController::class,'createOrUpdate'])->middleware('skipauth');
Route::post('tecd/skip/supplyorders/export', [TECDSkipSupplyOrderController::class,'exportXLS'])->middleware('skipauth');

Route::get('tecd/skip/systems', [TECDSkipSystemController::class,'all'])->middleware('skipauth');
Route::post('tecd/skip/systems/location', [TECDSkipSystemController::class,'changeLocation'])->middleware('skipauth');
Route::post('tecd/skip/systems/export', [TECDSkipSystemController::class,'exportXLS'])->middleware('skipauth');

Route::get('tecd/skip/tickets', [TECDSkipTicketController::class,'all'])->middleware('skipauth');
Route::post('tecd/skip/tickets', [TECDTicketController::class,'createOrUpdateSkip'])->middleware('skipauth');
Route::post('tecd/skip/tickets/export', [TECDSkipTicketController::class,'exportXLS'])->middleware('skipauth');
Route::post('tecd/skip/tickets/upload', [TECDTicketController::class,'uploadBinarySkip'])->middleware('skipauth');

Route::get('tecd/skip/users/tilemenu', [TECDSkipUserController::class,'setUseTileMenu'])->middleware('skipauth');
Route::post('tecd/skip/users/autostart', [TECDSkipUserController::class,'saveAutostart'])->middleware('skipauth');

Route::get('tecd/skip/modeldistribution', [TECDSkipModelDistributionController::class,'all'])->middleware('skipauth');
Route::get('tecd/skip/volumedistribution', [TECDSkipVolumeDistributionController::class,'all'])->middleware('skipauth');
Route::get('tecd/skip/volumeoverview', [TECDSkipVolumeOverviewController::class,'all'])->middleware('skipauth');
Route::get('tecd/skip/volumeevaluation', [TECDSkipVolumeEvaluationController::class,'all'])->middleware('skipauth');
Route::post('tecd/skip/volumeevaluation/export', [TECDSkipVolumeEvaluationController::class,'exportXLS'])->middleware('skipauth');

Route::get('tecd/skip/supplyitems', [TECDSystemSupplyItemController::class,'all'])->middleware('skipauth');

Route::get('tecd/contracts', [TECDContractController::class,'all'])->middleware('auth');
Route::put('tecd/contracts/{id}', [TECDContractController::class,'createOrUpdate'])->middleware('auth');
Route::post('tecd/contracts/export', [TECDContractController::class,'exportXLS'])->middleware('auth');
Route::post('tecd/contracts', [TECDContractController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tecd/contracts/{id}', [TECDContractController::class,'delete'])->middleware('auth');

Route::get('tecd/contractsystems', [TECDContractSystemController::class,'all'])->middleware('auth');
Route::put('tecd/contractsystems/{id}', [TECDContractSystemController::class,'createOrUpdate'])->middleware('auth');
Route::post('tecd/contractsystems/export', [TECDContractSystemController::class,'exportXLS'])->middleware('auth');
Route::post('tecd/contractsystems', [TECDContractSystemController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tecd/contractsystems/{id}', [TECDContractSystemController::class,'delete'])->middleware('auth');

Route::get('tecd/contractmodels', [TECDContractModelController::class,'all'])->middleware('auth');
Route::put('tecd/contractmodels/{id}', [TECDContractModelController::class,'createOrUpdate'])->middleware('auth');
Route::post('tecd/contractmodels/export', [TECDContractModelController::class,'exportXLS'])->middleware('auth');
Route::post('tecd/contractmodels', [TECDContractModelController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tecd/contractmodels/{id}', [TECDContractModelController::class,'delete'])->middleware('auth');

Route::get('tecd/contracttypes', [TECDContractTypeController::class,'all'])->middleware('auth');
Route::put('tecd/contracttypes/{id}', [TECDContractTypeController::class,'createOrUpdate'])->middleware('auth');
Route::post('tecd/contracttypes/export', [TECDContractTypeController::class,'exportXLS'])->middleware('auth');
Route::post('tecd/contracttypes', [TECDContractTypeController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tecd/contracttypes/{id}', [TECDContractTypeController::class,'delete'])->middleware('auth');

Route::get('tecd/billingtypes', [TECDBillingType::class,'all'])->middleware('auth');
Route::put('tecd/billingtypes/{id}', [TECDBillingType::class,'createOrUpdate'])->middleware('auth');
Route::post('tecd/billingtypes/export', [TECDBillingType::class,'exportXLS'])->middleware('auth');
Route::post('tecd/billingtypes', [TECDBillingType::class,'createOrUpdate'])->middleware('auth');
Route::delete('tecd/billingtypes/{id}', [TECDBillingType::class,'delete'])->middleware('auth');

