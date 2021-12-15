<?php

use App\Http\Controllers\msh\MSHCustomerAddressController;
use App\Http\Controllers\msh\MSHDeliveryAddressController;
use App\Http\Controllers\msh\MSHDispatchController;
use App\Http\Controllers\msh\MSHItemController;
use App\Http\Controllers\msh\MSHLXTicketController;
use App\Http\Controllers\msh\MSHModelController;
use App\Http\Controllers\msh\MSHMultiRouteController;
use App\Http\Controllers\msh\MSHPortalAuthController;
use App\Http\Controllers\msh\MSHPortalModelDistributionController;
use App\Http\Controllers\msh\MSHPortalModuleController;
use App\Http\Controllers\msh\MSHPortalSupplyOrderController;
use App\Http\Controllers\msh\MSHPortalSystemController;
use App\Http\Controllers\msh\MSHPortalTicketController;
use App\Http\Controllers\msh\MSHPortalUserController;
use App\Http\Controllers\msh\MSHPortalVolumeDistributionController;
use App\Http\Controllers\msh\MSHPortalVolumeEvaluationController;
use App\Http\Controllers\msh\MSHPortalVolumeOverviewController;
use App\Http\Controllers\msh\MSHStockController;
use App\Http\Controllers\msh\MSHSupplyOrderController;
use App\Http\Controllers\msh\MSHSystemController;
use App\Http\Controllers\msh\MSHSystemLocationAssignController;
use App\Http\Controllers\msh\MSHSystemLocationController;
use App\Http\Controllers\msh\MSHTicketController;
use App\Http\Controllers\msh\MSHTicketNoteTypeController;
use App\Http\Controllers\msh\MSHUserController;
use App\Models\msh\MSHSystemLocation;
use Illuminate\Support\Facades\Route;

Route::post('msh/portal/auth/login', [MSHPortalAuthController::class,'login']);
Route::get('msh/portal/auth/authenticate', [MSHPortalAuthController::class,'authenticate']);

Route::post('msh/portal/modules/state/read', [MSHPortalModuleController::class,'readState'])->middleware('portalauth');
Route::post('msh/portal/modules/state/save', [MSHPortalModuleController::class,'saveState'])->middleware('portalauth');

Route::get('msh/items', [MSHItemController::class, 'all'])->middleware('auth');
Route::post('msh/items/export', [MSHItemController::class, 'exportXLS'])->middleware('auth');

Route::get('msh/customeraddresses', [MSHCustomerAddressController::class, 'all'])->middleware('auth');
Route::put('msh/customeraddresses/{id}', [MSHCustomerAddressController::class, 'createOrUpdate'])->middleware('auth');
Route::post('msh/customeraddresses/export', [MSHCustomerAddressController::class, 'exportXLS'])->middleware('auth');

Route::get('msh/customeraddresses/itcontacts', [MSHCustomerAddressController::class, 'allITContacts'])->middleware('auth');
Route::post('msh/customeraddresses/itcontacts', [MSHCustomerAddressController::class, 'createOrUpdateITContact'])->middleware('auth');
Route::put('msh/customeraddresses/itcontacts/{id}', [MSHCustomerAddressController::class, 'createOrUpdateITContact'])->middleware('auth');
Route::delete('msh/customeraddresses/itcontacts/{id}', [MSHCustomerAddressController::class, 'deleteITContact'])->middleware('auth');

Route::get('msh/systemlocations', [MSHSystemLocationController::class, 'all'])->middleware('auth');
Route::post('msh/systemlocations', [MSHSystemLocationController::class, 'createOrUpdate'])->middleware('auth');
Route::put('msh/systemlocations/{id}', [MSHSystemLocationController::class, 'createOrUpdate'])->middleware('auth');
Route::delete('msh/systemlocations/{id}', [MSHSystemLocationController::class, 'delete'])->middleware('auth');

Route::get('msh/systemlocationassign', [MSHSystemLocationAssignController::class, 'all'])->middleware('auth');
Route::post('msh/systemlocationassign', [MSHSystemLocationAssignController::class, 'createOrUpdate'])->middleware('auth');
Route::put('msh/systemlocationassign/{id}', [MSHSystemLocationAssignController::class, 'createOrUpdate'])->middleware('auth');
Route::delete('msh/systemlocationassign/{id}', [MSHSystemLocationAssignController::class, 'delete'])->middleware('auth');

Route::get('msh/customeraddresses/passwords', [MSHCustomerAddressController::class, 'allPasswords'])->middleware('auth');
Route::post('msh/customeraddresses/passwords', [MSHCustomerAddressController::class, 'createOrUpdatePassword'])->middleware('auth');
Route::put('msh/customeraddresses/passwords/{id}', [MSHCustomerAddressController::class, 'createOrUpdatePassword'])->middleware('auth');
Route::delete('msh/customeraddresses/passwords/{id}', [MSHCustomerAddressController::class, 'deletePassword'])->middleware('auth');

Route::get('msh/customeraddresses/firmware', [MSHCustomerAddressController::class, 'allFirmware'])->middleware('auth');
Route::post('msh/customeraddresses/firmware', [MSHCustomerAddressController::class, 'createOrUpdateFirmware'])->middleware('auth');
Route::put('msh/customeraddresses/firmware/{id}', [MSHCustomerAddressController::class, 'createOrUpdateFirmware'])->middleware('auth');
Route::delete('msh/customeraddresses/firmware/{id}', [MSHCustomerAddressController::class, 'deleteFirmware'])->middleware('auth');


Route::get('msh/deliveryaddresses', [MSHDeliveryAddressController::class, 'all'])->middleware('auth');
Route::put('msh/deliveryaddresses/{id}', [MSHDeliveryAddressController::class, 'createOrUpdate'])->middleware('auth');
Route::post('msh/deliveryaddresses/export', [MSHDeliveryAddressController::class, 'exportXLS'])->middleware('auth');
Route::post('msh/deliveryaddresses/import', [MSHDeliveryAddressController::class, 'import'])->middleware('auth');


Route::get('msh/systemcounters', [MSHSystemController::class, 'getSystemCounter'])->middleware('auth');
Route::get('msh/systems', [MSHSystemController::class, 'all'])->middleware('auth');
Route::get('msh/exsystems', [MSHSystemController::class, 'allExtended'])->middleware('auth');
Route::get('msh/systems/{id}/tickets/hasopen', [MSHSystemController::class, 'hasOpenTickets'])->middleware('auth');
Route::put('msh/systems/{id}', [MSHSystemController::class, 'createOrUpdate'])->middleware('auth');
Route::post('msh/systems/export', [MSHSystemController::class, 'exportXLS'])->middleware('auth');
Route::post('msh/systems/exportgrid', [MSHSystemController::class, 'exportGridToXLS'])->middleware('auth');
Route::post('msh/systems/import', [MSHSystemController::class, 'import'])->middleware('auth');

Route::post('msh/systems', [MSHSystemController::class, 'createOrUpdate'])->middleware('auth');
Route::delete('msh/systems/{id}', [MSHSystemController::class, 'delete'])->middleware('auth');

Route::get('msh/stocks', [MSHStockController::class, 'all'])->middleware('auth');
Route::put('msh/stocks/{id}', [MSHStockController::class, 'createOrUpdate'])->middleware('auth');
Route::post('msh/stocks', [MSHStockController::class, 'createOrUpdate'])->middleware('auth');


Route::get('msh/models', [MSHModelController::class, 'all'])->middleware('auth');
Route::put('msh/models/{id}', [MSHModelController::class, 'createOrUpdate'])->middleware('auth');
Route::post('msh/models/export', [MSHModelController::class, 'exportXLS'])->middleware('auth');
Route::post('msh/models/exportgrid', [MSHModelController::class, 'exportGridToXLS'])->middleware('auth');
Route::post('msh/models', [MSHModelController::class, 'createOrUpdate'])->middleware('auth');
Route::delete('msh/models/{id}', [MSHModelController::class, 'delete'])->middleware('auth');

Route::get('msh/ticketnotetypes', [MSHTicketNoteTypeController::class, 'all'])->middleware('auth');
Route::put('msh/ticketnotetypes/{id}', [MSHTicketNoteTypeController::class, 'createOrUpdate'])->middleware('auth');
Route::post('msh/ticketnotetypes/export', [MSHTicketNoteTypeController::class, 'exportXLS'])->middleware('auth');
Route::post('msh/ticketnotetypes', [MSHTicketNoteTypeController::class, 'createOrUpdate'])->middleware('auth');
Route::delete('msh/ticketnotetypes/{id}', [MSHTicketNoteTypeController::class, 'delete'])->middleware('auth');

Route::get('msh/dispatching', [MSHDispatchController::class, 'data'])->middleware('auth');
Route::post('msh/dispatching', [MSHDispatchController::class, 'change'])->middleware('auth');

Route::get('msh/tickets', [MSHTicketController::class, 'all'])->middleware('auth');
Route::get('msh/tickets/positions', [MSHTicketController::class, 'allPositions'])->middleware('auth');
Route::get('msh/tickets/servicevoucher', [MSHTicketController::class, 'serviceVoucher'])->middleware('auth');
Route::get('msh/tickets/servicevoucherpdf', [MSHTicketController::class, 'serviceVoucherAsPDF']);
Route::get('msh/tickets/utilizations', [MSHTicketController::class, 'allUtilization']);

Route::put('msh/tickets/{id}', [MSHTicketController::class, 'createOrUpdate'])->middleware('auth');
Route::post('msh/tickets/export', [MSHTicketController::class, 'exportXLS'])->middleware('auth');
Route::post('msh/tickets/slaexport', [MSHTicketController::class, 'exportSLAXLS'])->middleware('auth');

Route::post('msh/tickets', [MSHTicketController::class, 'createOrUpdate'])->middleware('auth');
Route::delete('msh/tickets/{id}', [MSHTicketController::class, 'delete'])->middleware('auth');
Route::get('msh/tickets/history', [MSHTicketController::class, 'allHistories'])->middleware('auth');

Route::put('msh/tickets/positions/{id}', [MSHTicketController::class, 'createOrUpdatePosition'])->middleware('auth');
Route::post('msh/tickets/positions', [MSHTicketController::class, 'createOrUpdatePosition'])->middleware('auth');
Route::delete('msh/tickets/positions/{id}', [MSHTicketController::class, 'deletePosition'])->middleware('auth');

Route::get('msh/ticketnotes', [MSHTicketController::class, 'allNotes'])->middleware('auth');
Route::put('msh/ticketnotes/{id}', [MSHTicketController::class, 'createOrUpdateNote'])->middleware('auth');
Route::post('msh/ticketnotes', [MSHTicketController::class, 'createOrUpdateNote'])->middleware('auth');
Route::delete('msh/ticketnotes/{id}', [MSHTicketController::class, 'deleteNote'])->middleware('auth');

Route::get('msh/tickets/binaries', [MSHTicketController::class, 'allBinaries'])->middleware('auth');
Route::get('msh/tickets/binaries/{id}', [MSHTicketController::class, 'downloadBinary'])->middleware('auth');
Route::post('msh/tickets/binaries', [MSHTicketController::class, 'createOrUpdateBinary'])->middleware('auth');
Route::put('msh/tickets/binaries/{id}', [MSHTicketController::class, 'createOrUpdateBinary'])->middleware('auth');
Route::delete('msh/tickets/binaries/{id}', [MSHTicketController::class, 'deleteBinary'])->middleware('auth');
Route::post('msh/tickets/upload', [MSHTicketController::class, 'uploadBinary'])->middleware('auth');

Route::post('msh/tickets/createtour', [MSHMultiRouteController::class, 'createTour'])->middleware('auth');

Route::get('msh/lxticketlogs', [MSHLXTicketController::class, 'allLogEntries'])->middleware('auth');
Route::post('msh/lxticketlogs', [MSHLXTicketController::class, 'createOrUpdateLog'])->middleware('auth');

Route::get('msh/lxticketpositions', [MSHLXTicketController::class, 'allPositions'])->middleware('auth');
Route::post('msh/lxticketpositions', [MSHLXTicketController::class, 'createOrUpdatePosition'])->middleware('auth');
Route::put('msh/lxticketpositions/{id}', [MSHLXTicketController::class, 'createOrUpdatePosition'])->middleware('auth');
Route::delete('msh/lxticketpositions/{id}', [MSHLXTicketController::class, 'deletePosition'])->middleware('auth');

Route::get('msh/lxtickets', [MSHLXTicketController::class, 'all'])->middleware('auth');
Route::get('msh/lxtickets/{id}/isreadyfordebrief', [MSHLXTicketController::class, 'isReadyForDebrief'])->middleware('auth');
Route::post('msh/lxtickets', [MSHLXTicketController::class, 'createOrUpdate'])->middleware('auth');
Route::put('msh/lxtickets/{id}', [MSHLXTicketController::class, 'createOrUpdate'])->middleware('auth');

Route::get('msh/lxactionstatus', [MSHLXTicketController::class, 'allActionStatus'])->middleware('auth');
Route::get('msh/lxactivitysubstatus', [MSHLXTicketController::class, 'allActivitySubStatus'])->middleware('auth');
Route::get('msh/lxactivitytypes', [MSHLXTicketController::class, 'allActivityTypes'])->middleware('auth');
Route::get('msh/lxactualfailures', [MSHLXTicketController::class, 'allActualFailures'])->middleware('auth');
Route::get('msh/lxassettypes', [MSHLXTicketController::class, 'allAssetTypes'])->middleware('auth');
Route::get('msh/lxdeviceconditions', [MSHLXTicketController::class, 'allDeviceConditions'])->middleware('auth');
Route::get('msh/lxpartdepositions', [MSHLXTicketController::class, 'allPartDepositions'])->middleware('auth');
Route::get('msh/lxproblemlevelcodes', [MSHLXTicketController::class, 'allProblemLevelCodes'])->middleware('auth');
Route::get('msh/lxserviceactionresolutioncodes', [MSHLXTicketController::class, 'allServiceActionResolutionCodes'])->middleware('auth');
Route::get('msh/lxserviceerrorcodes_1', [MSHLXTicketController::class, 'allServiceErrorCodes_1'])->middleware('auth');
Route::get('msh/lxserviceerrorcodes_2', [MSHLXTicketController::class, 'allServiceErrorCodes_2'])->middleware('auth');

Route::post('tekaef/tickets', [MSHTicketController::class, 'createOrUpdate'])->middleware('auth');

Route::get('msh/supplyorders', [MSHSupplyOrderController::class, 'all'])->middleware('auth');
Route::get('msh/supplyorders/positions', [MSHSupplyOrderController::class, 'allPositions'])->middleware('auth');
Route::put('msh/supplyorders/{id}', [MSHSupplyOrderController::class, 'createOrUpdate'])->middleware('auth');
Route::post('msh/supplyorders/export', [MSHSupplyOrderController::class, 'exportXLS'])->middleware('auth');
Route::post('msh/supplyorders', [MSHSupplyOrderController::class, 'createOrUpdate'])->middleware('auth');
Route::delete('msh/supplyorders/{id}', [MSHSupplyOrderController::class, 'delete'])->middleware('auth');

Route::post('msh/users/timereport', [MSHUserController::class, 'timeReport'])->middleware('auth');

Route::get('msh/portalusers', [MSHPortalUserController::class,'all'])->middleware('auth');
Route::put('msh/portalusers/{id}', [MSHPortalUserController::class,'createOrUpdate'])->middleware('auth');
Route::post('msh/portalusers', [MSHPortalUserController::class,'createOrUpdate'])->middleware('auth');
Route::delete('msh/portalusers/{id}', [MSHPortalUserController::class,'delete'])->middleware('auth');

Route::get('msh/portalusers/menu/{id}/root', [MSHPortalUserController::class,'menuConfiguration'])->middleware('auth');

Route::get('msh/portal/portalusers', [MSHPortalUserController::class,'all'])->middleware('portalauth');
Route::put('msh/portal/portalusers/{id}', [MSHPortalUserController::class,'createOrUpdate'])->middleware('portalauth');
Route::post('msh/portal/portalusers', [MSHPortalUserController::class,'createOrUpdate'])->middleware('portalauth');
Route::delete('msh/portal/portalusers/{id}', [MSHPortalUserController::class,'delete'])->middleware('portalauth');
Route::get('msh/portal/portalusers/menu/{id}/root', [MSHPortalUserController::class,'menuConfiguration'])->middleware('portalauth');

Route::get('msh/portal/supplyorders', [MSHPortalSupplyOrderController::class,'all'])->middleware('portalauth');
Route::post('msh/portal/supplyorders', [MSHSupplyOrderController::class,'createOrUpdate'])->middleware('portalauth');
Route::post('msh/portal/supplyorders/export', [MSHPortalSupplyOrderController::class,'exportXLS'])->middleware('portalauth');

Route::get('msh/portal/systems', [MSHPortalSystemController::class,'all'])->middleware('portalauth');
Route::post('msh/portal/systems/location', [MSHPortalSystemController::class,'changeLocation'])->middleware('portalauth');
Route::post('msh/portal/systems/export', [MSHPortalSystemController::class,'exportXLS'])->middleware('portalauth');

Route::get('msh/portal/tickets', [MSHPortalTicketController::class,'all'])->middleware('portalauth');
Route::post('msh/portal/tickets', [MSHTicketController::class,'createOrUpdateSkip'])->middleware('portalauth');
Route::post('msh/portal/tickets/export', [MSHPortalTicketController::class,'exportXLS'])->middleware('portalauth');
Route::post('msh/portal/tickets/upload', [MSHTicketController::class,'uploadBinarySkip'])->middleware('portalauth');

Route::get('msh/portal/users/tilemenu', [MSHPortalUserController::class,'setUseTileMenu'])->middleware('portalauth');
Route::post('msh/portal/users/autostart', [MSHPortalUserController::class,'saveAutostart'])->middleware('portalauth');

Route::get('msh/portal/modeldistribution', [MSHPortalModelDistributionController::class,'all'])->middleware('portalauth');
Route::get('msh/portal/volumedistribution', [MSHPortalVolumeDistributionController::class,'all'])->middleware('portalauth');
Route::get('msh/portal/volumeoverview', [MSHPortalVolumeOverviewController::class,'all'])->middleware('portalauth');
Route::get('msh/portal/volumeevaluation', [MSHPortalVolumeEvaluationController::class,'all'])->middleware('portalauth');
Route::post('msh/portal/volumeevaluation/export', [MSHPortalVolumeEvaluationController::class,'exportXLS'])->middleware('portalauth');

Route::get('msh/portal/supplyitems', [MSHSystemSupplyItemController::class,'all'])->middleware('portalauth');
Route::get('msh/portal/systemlocations', [MSHSystemLocationController::class, 'all'])->middleware('portalauth');

Route::get('msh/customeraddresses/menu/{id}/root', [MSHCustomerAddressController::class,'menuConfiguration'])->middleware('auth');



