<?php

use App\Http\Controllers\msa\MSAAuthController;
use App\Http\Controllers\msa\MSACallATow;
use App\Http\Controllers\msa\MSACountryController;
use App\Http\Controllers\msa\MSADispatchTaskController;
use App\Http\Controllers\msa\MSADPBikeController;
use App\Http\Controllers\msa\MSADPVehicleController;
use App\Http\Controllers\msa\MSAOriginModuleController;
use App\Http\Controllers\msa\MSAOriginUserController;
use App\Http\Controllers\msa\MSAOriginUserGroupController;
use App\Http\Controllers\msa\MSATaskController;

Route::post('msa/origin/modules/state/read', [MSAOriginModuleController::class,'readState'])->middleware('msaauth');
Route::post('msa/origin/modules/state/save', [MSAOriginModuleController::class,'saveState'])->middleware('msaauth');

Route::get('msa/countries', [MSACountryController::class,'all'])->middleware('msaauth');

Route::get('callatow/version', [MSACallATow::class,'version']);
Route::post('callatow/task', [MSACallATow::class,'createTask']);
Route::get('callatow/task/{id}/status', [MSACallATow::class,'getStatus']);
Route::post('callatow/task/status', [MSACallATow::class,'setStatus']);
Route::get('callatow/testcall', [MSACallATow::class,'testCall']);

Route::post('msa/auth/login', [MSAAuthController::class,'login']);
Route::get('msa/auth/authenticate', [MSAAuthController::class,'authenticate']);

Route::get('msa/dp/vehicles', [MSADPVehicleController::class,'all']);
Route::get('msa/dp/bikes', [MSADPBikeController::class,'all']);

Route::get('msa/origin/usergroups', [MSAOriginUserGroupController::class,'all'])->middleware('msaauth');
Route::get('msa/origin/usergroups/menu/{id}/root', [MSAOriginUserGroupController::class,'menuConfiguration'])->middleware('msaauth');
Route::put('msa/origin/usergroups/{id}', [MSAOriginUserGroupController::class,'createOrUpdate'])->middleware('msaauth');
Route::post('msa/origin/usergroups/export', [MSAOriginUserGroupController::class,'exportXLS'])->middleware('msaauth');
Route::post('msa/origin/usergroups', [MSAOriginUserGroupController::class,'createOrUpdate'])->middleware('msaauth');
Route::delete('msa/origin/usergroups/{id}', [MSAOriginUserGroupController::class,'delete'])->middleware('msaauth');

Route::get('msa/origin/users', [MSAOriginUserController::class,'all'])->middleware('msaauth');
Route::post('msa/origin/users/autostart', [MSAOriginUserController::class,'saveAutostart'])->middleware('msaauth');
Route::put('msa/origin/users/profile', [MSAOriginUserController::class,'setPassword'])->middleware('msaauth');
Route::get('msa/origin/users/tilemenu', [MSAOriginUserController::class,'setUseTileMenu'])->middleware('msaauth');
Route::put('msa/origin/users/{id}', [MSAOriginUserController::class,'createOrUpdate'])->middleware('msaauth');
Route::post('msa/origin/users/export', [MSAOriginUserController::class,'exportXLS'])->middleware('msaauth');
Route::post('msa/origin/users', [MSAOriginUserController::class,'createOrUpdate'])->middleware('msaauth');
Route::delete('msa/origin/uses/{id}', [MSAOriginUserController::class,'delete'])->middleware('msaauth');

Route::get('msa/tasks', [MSATaskController::class,'all'])->middleware('msaauth');
Route::get('msa/dp/fleet/tasks', [MSATaskController::class,'allDPFleet'])->middleware('msaauth');
Route::get('msa/dp/fleet/tasks/{id}', [MSATaskController::class,'getFleetById'])->middleware('msaauth');
Route::post('msa/dp/fleet/tasks/export', [MSATaskController::class,'exportFleetXLS'])->middleware('msaauth');
Route::get('msa/dp/bike/tasks', [MSATaskController::class,'allDPBike'])->middleware('msaauth');
Route::get('msa/dp/bike/tasks/{id}', [MSATaskController::class,'getBikeById'])->middleware('msaauth');

Route::post('msa/tasks', [MSATaskController::class,'createOrUpdate'])->middleware('msaauth');

Route::get('msa/external/dispatch', [MSADispatchTaskController::class,'runDispatch'])->middleware('msaauth');
