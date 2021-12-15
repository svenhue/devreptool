<?php

use App\Http\Controllers\iabo\IABOAuthController;
use App\Http\Controllers\iabo\IABOConnectionTestController;
use App\Http\Controllers\iabo\IABOContainerController;
use App\Http\Controllers\iabo\IABOCustomerController;
use App\Http\Controllers\iabo\IABODayCalculationController;
use App\Http\Controllers\iabo\IABODayItemController;
use App\Http\Controllers\iabo\IABODCPurchaseController;
use App\Http\Controllers\iabo\IABODCSaleController;
use App\Http\Controllers\iabo\IABODisassemblyDayController;
use App\Http\Controllers\iabo\IABODisassemblyInputController;
use App\Http\Controllers\iabo\IABODisassemblyOutputController;
use App\Http\Controllers\iabo\IABOKnowledgeAreaController;
use App\Http\Controllers\iabo\IABOKnowledgeController;
use App\Http\Controllers\iabo\IABOMessageController;
use App\Http\Controllers\iabo\IABOModuleController;
use App\Http\Controllers\iabo\IABONotificationController;
use App\Http\Controllers\iabo\IABONowController;
use App\Http\Controllers\iabo\IABOPalletizingController;
use App\Http\Controllers\iabo\IABOPlannerController;
use App\Http\Controllers\iabo\IABOPlanningTaskController;
use App\Http\Controllers\iabo\IABOPresenceWorkOrderController;
use App\Http\Controllers\iabo\IABOTicketController;
use App\Http\Controllers\iabo\IABOUserController;
use App\Http\Controllers\iabo\IABOUserGroupController;
use App\Http\Controllers\iabo\IABOWeightController;

Route::get('iabo/sti/responses', [IABOTicketController::class, 'checkResponses'])->middleware('iaboauth');;
Route::post('iabo/presence/contact', [IABOTicketController::class, 'contactForm']);

Route::post('iabo/auth/login', [IABOAuthController::class, 'login']);
Route::post('iabo/auth/logout', [IABOAuthController::class, 'logout']);
Route::get('iabo/auth/authenticate', [IABOAuthController::class, 'authenticate']);

Route::get('iabo/connectiontest/provider', [IABOConnectionTestController::class, 'doProviderCheck']);
Route::get('iabo/connectiontest/productive', [IABOConnectionTestController::class, 'doProductiveCheck']);

Route::get('iabo/messages', [IABOMessageController::class, 'all']);

Route::post('iabo/mobile/auth/login', [IABOAuthController::class, 'mobileLogin']);
Route::post('iabo/mobile/auth/logout', [IABOAuthController::class, 'mobileLogout']);
Route::get('iabo/mobile/auth/authenticate', [IABOAuthController::class, 'mobileAuthenticate']);

Route::get('iabo/customers/shortname', [IABOCustomerController::class, 'getByShortName']);
Route::get('iabo/customers/details', [IABOCustomerController::class, 'getDetails']);

Route::get('iabo/disassemblyoutput', [IABODisassemblyOutputController::class, 'output']);
Route::get('iabo/disassemblyinput', [IABODisassemblyInputController::class, 'input']);
Route::post('iabo/disassembly/export', [IABODisassemblyInputController::class, 'exportXLS']);

Route::get('iabo/palletizing', [IABOPalletizingController::class, 'all']);
Route::post('iabo/palletizing/export', [IABOPalletizingController::class, 'exportXLS']);

Route::get('iabo/disassemblyday', [IABODisassemblyDayController::class, 'day']);
Route::get('iabo/daycalculation', [IABODayCalculationController::class, 'day']);
Route::post('iabo/daycalculation/export', [IABODayCalculationController::class, 'exportXLS']);

Route::post('iabo/container/export', [IABOContainerController::class, 'exportXLS']);
Route::post('iabo/weights/export', [IABOWeightController::class, 'exportXLS']);
Route::post('iabo/lot/export', [IABOWeightController::class, 'exportXLS']);
Route::post('iabo/dcsales/export', [IABODCSaleController::class, 'exportXLS']);
Route::post('iabo/dcpurchases/export', [IABODCPurchaseController::class, 'exportXLS']);
Route::post('iabo/dayitems/export', [IABODayItemController::class, 'exportXLS']);

Route::get('iabo/presence/workorders', [IABOPresenceWorkOrderController::class, 'all']);
Route::get('iabo/presence/workorders/details', [IABOPresenceWorkOrderController::class, 'getDetails']);
Route::post('iabo/presence/workorders/details', [IABOPresenceWorkOrderController::class, 'sendDetails']);

Route::post('iabo/presence/login', [IABOAuthController::class, 'presenceLogin']);

Route::post('iabo/modules/state/read', [IABOModuleController::class, 'readState']);
Route::post('iabo/modules/state/save', [IABOModuleController::class, 'saveState']);

Route::get('iabo/notifications', [IABONotificationController::class, 'allForUser']);

Route::get('iabo/nowentries', [IABONowController::class, 'getEntries']);
Route::post('iabo/nowentries', [IABONowController::class, 'sendEntries']);

Route::get('iabo/plannings', [IABOPlannerController::class, 'all']);
Route::get('iabo/plannings/details', [IABOPlannerController::class, 'getDetails']);
Route::post('iabo/plannings/details', [IABOPlannerController::class, 'sendDetails']);

Route::get('iabo/planningtasks/root', [IABOPlanningTaskController::class, 'all'])->middleware('iaboauth');
Route::get('iabo/planningtasks/request', [IABOPlanningTaskController::class, 'requestData'])->middleware('iaboauth');
Route::get('iabo/planningtasks/{id}', [IABOPlanningTaskController::class, 'all'])->middleware('iaboauth');
Route::get('iabo/planningtasks', [IABOPlanningTaskController::class, 'all'])->middleware('iaboauth');
Route::put('iabo/planningtasks/{id}', [IABOPlanningTaskController::class, 'createOrUpdate'])->middleware('iaboauth');
Route::post('iabo/planningtasks', [IABOPlanningTaskController::class, 'createOrUpdate'])->middleware('iaboauth');

Route::get('iabo/user', [IABOUserController::class, 'all'])->middleware('iaboauth');
Route::put('iabo/user/{id}', [IABOUserController::class, 'createOrUpdate'])->middleware('iaboauth');
Route::post('iabo/user/export', [IABOUserController::class, 'exportXLS'])->middleware('iaboauth');
Route::post('iabo/user', [IABOUserController::class, 'createOrUpdate'])->middleware('iaboauth');
Route::delete('iabo/user/{id}', [IABOUserController::class, 'delete'])->middleware('iaboauth');

Route::get('iabo/usergroups', [IABOUserGroupController::class, 'all'])->middleware('iaboauth');
Route::put('iabo/usergroups/{id}', [IABOUserGroupController::class, 'createOrUpdate'])->middleware('iaboauth');
Route::post('iabo/usergroups/export', [IABOUserGroupController::class, 'exportXLS'])->middleware('iaboauth');
Route::post('iabo/usergroups', [IABOUserGroupController::class, 'createOrUpdate'])->middleware('iaboauth');
Route::delete('iabo/usergroups/{id}', [IABOUserGroupController::class, 'delete'])->middleware('iaboauth');

Route::get('iabo/usergroups/users', [IABOUserGroupController::class, 'allUsers'])->middleware('iaboauth');
Route::put('iabo/usergroups/users/{id}', [IABOUserGroupController::class, 'createOrUpdateUser'])->middleware('iaboauth');
Route::post('iabo/usergroups/users', [IABOUserGroupController::class, 'createOrUpdateUser'])->middleware('iaboauth');
Route::delete('iabo/usergroups/users/{id}', [IABOUserGroupController::class, 'deleteUser'])->middleware('iaboauth');

Route::get('iabo/knowledgeareas', [IABOKnowledgeAreaController::class, 'all'])->middleware('iaboauth');
Route::get('iabo/knowledgeareas/{id}', [IABOKnowledgeAreaController::class, 'getById'])->middleware('iaboauth');
Route::put('iabo/knowledgeareas/{id}', [IABOKnowledgeAreaController::class, 'createOrUpdate'])->middleware('iaboauth');
Route::post('iabo/knowledgeareas/export', [IABOKnowledgeAreaController::class, 'exportXLS'])->middleware('iaboauth');
Route::post('iabo/knowledgeareas', [IABOKnowledgeAreaController::class, 'createOrUpdate'])->middleware('iaboauth');
Route::delete('iabo/knowledgeareas/{id}', [IABOKnowledgeAreaController::class, 'delete'])->middleware('iaboauth');

Route::get('iabo/knowledgeareas/usergroups', [IABOKnowledgeAreaController::class, 'allUserGroups'])->middleware('iaboauth');
Route::put('iabo/knowledgeareas/usergroups/{id}', [IABOKnowledgeAreaController::class, 'createOrUpdateUserGroup'])->middleware('iaboauth');
Route::post('iabo/knowledgeareas/usergroups', [IABOKnowledgeAreaController::class, 'createOrUpdateUserGroup'])->middleware('iaboauth');
Route::delete('iabo/knowledgeareas/usergroups/{id}', [IABOKnowledgeAreaController::class, 'deleteUserGroup'])->middleware('iaboauth');

Route::get('iabo/knowledge', [IABOKnowledgeController::class, 'all'])->middleware('iaboauth');
Route::get('iabo/knowledge/{id}', [IABOKnowledgeController::class, 'getById'])->middleware('iaboauth');
Route::put('iabo/knowledge/{id}', [IABOKnowledgeController::class, 'createOrUpdate'])->middleware('iaboauth');
Route::post('iabo/knowledge/export', [IABOKnowledgeController::class, 'exportXLS'])->middleware('iaboauth');
Route::post('iabo/knowledge/upload', [IABOKnowledgeController::class, 'upload'])->middleware('iaboauth');
Route::post('iabo/knowledge', [IABOKnowledgeController::class, 'createOrUpdate'])->middleware('iaboauth');
Route::delete('iabo/knowledge/{id}', [IABOKnowledgeController::class, 'delete'])->middleware('iaboauth');

Route::get('iabo/knowledge/knowledgeareas', [IABOKnowledgeController::class, 'allKnowledgeAreas'])->middleware('iaboauth');
Route::put('iabo/knowledge/knowledgeareas/{id}', [IABOKnowledgeController::class, 'createOrUpdateKnowledgeArea'])->middleware('iaboauth');
Route::post('iabo/knowledge/knowledgeareas', [IABOKnowledgeController::class, 'createOrUpdateKnowledgeArea'])->middleware('iaboauth');
Route::delete('iabo/knowledge/knowledgeareas/{id}', [IABOKnowledgeController::class, 'deleteKnowledgeArea'])->middleware('iaboauth');

Route::get('iabo/knowledge/knowledgetree/{id}', [IABOKnowledgeController::class, 'getKnowledgeTree'])->middleware('iaboauth');
Route::get('iabo/knowledge/link/{id}', [IABOKnowledgeController::class, 'linkNode'])->middleware('iaboauth');
Route::delete('iabo/knowledge/link/{id}', [IABOKnowledgeController::class, 'deleteLinkNode'])->middleware('iaboauth');
