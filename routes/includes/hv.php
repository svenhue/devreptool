<?php

use App\Http\Controllers\hv\HVCompanyController;
use App\Http\Controllers\hv\HVCompanyDepartmentController;
use App\Http\Controllers\hv\HVCountryController;
use App\Http\Controllers\hv\HVFormDevItemController;
use App\Http\Controllers\hv\HVInputTypeController;
use App\Http\Controllers\hv\HVMarkdownController;
use App\Http\Controllers\hv\HVMobileDataController;
use App\Http\Controllers\hv\HVQualificationController;
use App\Http\Controllers\hv\HVReportController;
use App\Http\Controllers\hv\HVResourceTypeController;
use App\Http\Controllers\hv\HVResourceZoneController;
use App\Http\Controllers\hv\HVUserController;
use App\Http\Controllers\hv\HVUserGroupController;
use App\Http\Controllers\hv\HVWebController;
use App\Http\Controllers\hv\HVAuthController;
use App\Http\Controllers\hv\HVModuleController;
use App\Http\Controllers\hv\HVViewController;
use App\Http\Controllers\hv\HVFormDevController;

Route::get('version', [HVWebController::class,'version']);
Route::post('hv/auth/login', [HVAuthController::class,'login']);
Route::get('hv/auth/authenticate', [HVAuthController::class,'authenticate']);

Route::post('hv/mobile/auth/login', [HVAuthController::class,'mobileLogin']);
Route::get('hv/mobile/auth/authenticate', [HVAuthController::class,'mobileAuthenticate']);

Route::post('hv/modules/state/read', [HVModuleController::class,'readState'])->middleware('auth');
Route::post('hv/modules/state/save', [HVModuleController::class,'saveState'])->middleware('auth');

Route::get('hv/view', [HVViewController::class,'view']);

Route::get('hv/countries', [HVCountryController::class,'all'])->middleware('auth');

Route::get('hv/companies/menu/{id}/root', [HVCompanyController::class,'menuConfiguration'])->middleware('auth');
Route::get('hv/companies', [HVCompanyController::class,'all'])->middleware('auth');
Route::get('hv/companies/{id}/config', [HVCompanyController::class,'config']);
Route::put('hv/companies/{id}', [HVCompanyController::class,'createOrUpdate'])->middleware('auth');
Route::post('hv/companies', [HVCompanyController::class,'createOrUpdate'])->middleware('auth');
Route::delete('hv/companies/{id}', [HVCompanyController::class,'delete'])->middleware('auth');

Route::get('hv/companydepartments', [HVCompanyDepartmentController::class,'all'])->middleware('auth');

Route::get('hv/users', [HVUserController::class,'all'])->middleware('auth');
Route::get('hv/users/track', [HVUserController::class,'getTrack'])->middleware('auth');
Route::put('hv/users/profile', [HVUserController::class,'setPassword'])->middleware('auth');
Route::get('hv/users/tilemenu', [HVUserController::class,'setUseTileMenu'])->middleware('auth');

Route::put('hv/users/{id}', [HVUserController::class,'createOrUpdate'])->middleware('auth');
Route::post('hv/users/export', [HVUserController::class,'exportXLS'])->middleware('auth');
Route::post('hv/users/autostart', [HVUserController::class,'saveAutostart'])->middleware('auth');
Route::post('hv/users', [HVUserController::class,'createOrUpdate'])->middleware('auth');
Route::delete('hv/users/{id}', [HVUserController::class,'delete'])->middleware('auth');

Route::get('hv/resources', [HVUserController::class,'allResources'])->middleware('auth');
Route::get('hv/mobileresources', [HVUserController::class,'allMobileResources'])->middleware('auth');

Route::get('hv/usergroups/menu/{id}/root', [HVUserGroupController::class,'menuConfiguration'])->middleware('auth');

Route::get('hv/usergroups', [HVUserGroupController::class,'all'])->middleware('auth');
Route::put('hv/usergroups/{id}', [HVUserGroupController::class,'createOrUpdate'])->middleware('auth');
Route::post('hv/usergroups/export', [HVUserGroupController::class,'exportXLS'])->middleware('auth');
Route::post('hv/usergroups', [HVUserGroupController::class,'createOrUpdate'])->middleware('auth');
Route::delete('hv/usergroups/{id}', [HVUserGroupController::class,'delete'])->middleware('auth');

Route::get('hv/resourcetypes', [HVResourceTypeController::class,'all'])->middleware('auth');
Route::put('hv/resourcetypes/{id}', [HVResourceTypeController::class,'createOrUpdate'])->middleware('auth');
Route::post('hv/resourcetypes/export', [HVResourceTypeController::class,'exportXLS'])->middleware('auth');
Route::post('hv/resourcetypes', [HVResourceTypeController::class,'createOrUpdate'])->middleware('auth');
Route::delete('hv/resourcetypes/{id}', [HVResourceTypeController::class,'delete'])->middleware('auth');

Route::get('hv/allresourcezones', [HVResourceZoneController::class,'allResourceZones'])->middleware('auth');

Route::get('hv/resourcezones', [HVResourceZoneController::class,'all'])->middleware('auth');
Route::put('hv/resourcezones/{id}', [HVResourceZoneController::class,'createOrUpdate'])->middleware('auth');
Route::post('hv/resourcezones', [HVResourceZoneController::class,'createOrUpdate'])->middleware('auth');
Route::delete('hv/resourcezones/{id}', [HVResourceZoneController::class,'delete'])->middleware('auth');


Route::get('hv/qualifications', [HVQualificationController::class,'all'])->middleware('auth');
Route::put('hv/qualifications/{id}', [HVQualificationController::class,'createOrUpdate'])->middleware('auth');
Route::post('hv/qualifications/export', [HVQualificationController::class,'exportXLS'])->middleware('auth');
Route::post('hv/qualifications', [HVQualificationController::class,'createOrUpdate'])->middleware('auth');
Route::delete('hv/qualifications/{id}', [HVQualificationController::class,'delete'])->middleware('auth');

Route::get('hv/reportviewer', [HVReportController::class,'viewer'])->middleware('auth');

Route::get('hv/reports', [HVReportController::class,'all'])->middleware('auth');
Route::put('hv/reports/{id}', [HVReportController::class,'createOrUpdate'])->middleware('auth');
Route::post('hv/reports/export', [HVReportController::class,'exportXLS'])->middleware('auth');
Route::post('hv/reports', [HVReportController::class,'createOrUpdate'])->middleware('auth');
Route::delete('hv/reports/{id}', [HVReportController::class,'delete'])->middleware('auth');

Route::get('hv/formdevs', [HVFormDevController::class,'all'])->middleware('auth');
Route::get('hv/formdevs/ident/{ident}', [HVFormDevController::class,'getByIdent'])->middleware('auth');
Route::put('hv/formdevs/{id}', [HVFormDevController::class,'createOrUpdate'])->middleware('auth');
Route::post('hv/formdevs/export', [HVFormDevController::class,'exportXLS'])->middleware('auth');
Route::post('hv/formdevs', [HVFormDevController::class,'createOrUpdate'])->middleware('auth');
Route::delete('hv/formdevs/{id}', [HVFormDevController::class,'delete'])->middleware('auth');

Route::get('hv/formdev/items', [HVFormDevItemController::class,'all'])->middleware('auth');
Route::put('hv/formdev/items/{id}', [HVFormDevItemController::class,'createOrUpdate'])->middleware('auth');
Route::post('hv/formdev/items/export', [HVFormDevItemController::class,'exportXLS'])->middleware('auth');
Route::post('hv/formdev/items', [HVFormDevItemController::class,'createOrUpdate'])->middleware('auth');
Route::delete('hv/formdev/items/{id}', [HVFormDevItemController::class,'delete'])->middleware('auth');

Route::get('hv/inputtypes', [HVInputTypeController::class,'all'])->middleware('auth');
Route::put('hv/inputtypes/{id}', [HVInputTypeController::class,'createOrUpdate'])->middleware('auth');
Route::post('hv/inputtypes/export', [HVInputTypeController::class,'exportXLS'])->middleware('auth');
Route::post('hv/inputtypes', [HVInputTypeController::class,'createOrUpdate'])->middleware('auth');
Route::delete('hv/inputtypes/{id}', [HVInputTypeController::class,'delete'])->middleware('auth');

Route::post('hv/mobile/data', [HVMobileDataController::class,'exchangeData'])->middleware('auth');

Route::post('hv/markdown/convert', [HVMarkdownController::class,'convert'])->middleware('iaboauth');
