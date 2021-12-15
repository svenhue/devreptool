<?php

use App\Http\Controllers\tm\TMBuildingBinaryController;
use App\Http\Controllers\tm\TMBuildingController;
use App\Http\Controllers\tm\TMBuildingExamController;
use App\Http\Controllers\tm\TMCCPersonController;
use App\Http\Controllers\tm\TMCCTestController;
use App\Http\Controllers\tm\TMCCTestItemController;
use App\Http\Controllers\tm\TMItemController;
use App\Http\Controllers\tm\TMItemUnitController;
use App\Http\Controllers\tm\TMServiceProviderContactController;
use App\Http\Controllers\tm\TMServiceProviderController;
use App\Http\Controllers\tm\TMStockController;
use App\Http\Controllers\tm\TMStockStoragePlaceController;
use App\Http\Controllers\tm\TMSystemBinaryController;
use App\Http\Controllers\tm\TMSystemController;
use App\Http\Controllers\tm\TMSystemExamController;
use App\Http\Controllers\tm\TMUniversalMapOverviewController;
use App\Models\tm\TMCCVaccinationStatus;

Route::get('tm/stocks', [TMStockController::class,'all'])->middleware('auth');
Route::put('tm/stocks/{id}', [TMStockController::class,'createOrUpdate'])->middleware('auth');
Route::post('tm/stocks/export', [TMStockController::class,'exportXLS'])->middleware('auth');
Route::post('tm/stocks', [TMStockController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tm/stocks/{id}', [TMStockController::class,'delete'])->middleware('auth');

Route::get('tm/items', [TMItemController::class,'all'])->middleware('auth');
Route::put('tm/items/{id}', [TMItemController::class,'createOrUpdate'])->middleware('auth');
Route::post('tm/items/export', [TMItemController::class,'exportXLS'])->middleware('auth');
Route::post('tm/items', [TMItemController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tm/items/{id}', [TMItemController::class,'delete'])->middleware('auth');

Route::get('tm/serviceproviders', [TMServiceProviderController::class,'all'])->middleware('auth');
Route::put('tm/serviceproviders/{id}', [TMServiceProviderController::class,'createOrUpdate'])->middleware('auth');
Route::post('tm/serviceproviders/export', [TMServiceProviderController::class,'exportXLS'])->middleware('auth');
Route::post('tm/serviceproviders', [TMServiceProviderController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tm/serviceproviders/{id}', [TMServiceProviderController::class,'delete'])->middleware('auth');

Route::get('tm/buildings', [TMBuildingController::class,'all'])->middleware('auth');
Route::put('tm/buildings/{id}', [TMBuildingController::class,'createOrUpdate'])->middleware('auth');
Route::post('tm/buildings/export', [TMBuildingController::class,'exportXLS'])->middleware('auth');
Route::post('tm/buildings', [TMBuildingController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tm/buildings/{id}', [TMBuildingController::class,'delete'])->middleware('auth');


Route::get('tm/buildingbinaries', [TMBuildingBinaryController::class,'all'])->middleware('auth');
Route::get('tm/buildingbinaries/{id}', [TMBuildingBinaryController::class,'download'])->middleware('auth');
Route::put('tm/buildingbinaries/{id}', [TMBuildingBinaryController::class,'createOrUpdate'])->middleware('auth');
Route::post('tm/buildingbinaries/export', [TMBuildingBinaryController::class,'exportXLS'])->middleware('auth');
Route::post('tm/buildingbinaries/upload', [TMBuildingBinaryController::class,'uploadBinary'])->middleware('auth');
Route::post('tm/buildingbinaries', [TMBuildingBinaryController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tm/buildingbinaries/{id}', [TMBuildingBinaryController::class,'delete'])->middleware('auth');

Route::get('tm/systems', [TMSystemController::class,'all'])->middleware('auth');
Route::put('tm/systems/{id}', [TMSystemController::class,'createOrUpdate'])->middleware('auth');
Route::post('tm/systems/export', [TMSystemController::class,'exportXLS'])->middleware('auth');
Route::post('tm/systems', [TMSystemController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tm/systems/{id}', [TMSystemController::class,'delete'])->middleware('auth');

Route::get('tm/systembinaries', [TMSystemBinaryController::class,'all'])->middleware('auth');
Route::get('tm/systembinaries/{id}', [TMSystemBinaryController::class,'download'])->middleware('auth');
Route::put('tm/systembinaries/{id}', [TMSystemBinaryController::class,'createOrUpdate'])->middleware('auth');
Route::post('tm/systembinaries/export', [TMSystemBinaryController::class,'exportXLS'])->middleware('auth');
Route::post('tm/systembinaries/upload', [TMSystemBinaryController::class,'uploadBinary'])->middleware('auth');
Route::post('tm/systembinaries', [TMSystemBinaryController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tm/systembinaries/{id}', [TMSystemBinaryController::class,'delete'])->middleware('auth');

Route::get('tm/systemexams', [TMSystemExamController::class,'all'])->middleware('auth');
Route::put('tm/systemexams/{id}', [TMSystemExamController::class,'createOrUpdate'])->middleware('auth');
Route::post('tm/systemexams', [TMSystemExamController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tm/systemexams/{id}', [TMSystemExamController::class,'delete'])->middleware('auth');

Route::get('tm/stockstorageplaces', [TMStockStoragePlaceController::class,'all'])->middleware('auth');
Route::put('tm/stockstorageplaces/{id}', [TMStockStoragePlaceController::class,'createOrUpdate'])->middleware('auth');
Route::post('tm/stockstorageplaces', [TMStockStoragePlaceController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tm/stockstorageplaces/{id}', [TMStockStoragePlaceController::class,'delete'])->middleware('auth');

Route::get('tm/serviceprovidercontacts', [TMServiceProviderContactController::class,'all'])->middleware('auth');
Route::put('tm/serviceprovidercontacts/{id}', [TMServiceProviderContactController::class,'createOrUpdate'])->middleware('auth');
Route::post('tm/serviceprovidercontacts', [TMServiceProviderContactController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tm/serviceprovidercontacts/{id}', [TMServiceProviderContactController::class,'delete'])->middleware('auth');

Route::get('tm/buildingexams', [TMBuildingExamController::class,'all'])->middleware('auth');
Route::put('tm/buildingexams/{id}', [TMBuildingExamController::class,'createOrUpdate'])->middleware('auth');
Route::post('tm/buildingexams', [TMBuildingExamController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tm/buildingexams/{id}', [TMBuildingExamController::class,'delete'])->middleware('auth');

Route::get('tm/itemunits', [TMItemUnitController::class,'all'])->middleware('auth');

Route::get('tm/coronacheck/vaccinationstatus', [TMCCVaccinationStatus::class,'all'])->middleware('auth');

Route::get('tm/coronacheck/persons', [TMCCPersonController::class,'all'])->middleware('auth');
Route::get('tm/coronacheck/persons/testneeded', [TMCCPersonController::class,'getTodayNotTested'])->middleware('auth');
Route::get('tm/coronacheck/persons/code/{code}', [TMCCPersonController::class,'getByCode'])->middleware('auth');
Route::put('tm/coronacheck/persons/{id}', [TMCCPersonController::class,'createOrUpdate'])->middleware('auth');
Route::post('tm/coronacheck/persons/export', [TMCCPersonController::class,'exportXLS'])->middleware('auth');
Route::post('tm/coronacheck/persons', [TMCCPersonController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tm/coronacheck/persons/{id}', [TMCCPersonController::class,'delete'])->middleware('auth');

Route::get('tm/coronacheck/persons', [TMCCPersonController::class,'all'])->middleware('auth');
Route::put('tm/coronacheck/persons/{id}', [TMCCPersonController::class,'createOrUpdate'])->middleware('auth');
Route::post('tm/coronacheck/persons/export', [TMCCPersonController::class,'exportXLS'])->middleware('auth');
Route::post('tm/coronacheck/persons', [TMCCPersonController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tm/coronacheck/persons/{id}', [TMCCPersonController::class,'delete'])->middleware('auth');

Route::get('tm/coronacheck/tests', [TMCCTestController::class,'all'])->middleware('auth');
Route::put('tm/coronacheck/tests/{id}', [TMCCTestController::class,'createOrUpdate'])->middleware('auth');
Route::post('tm/coronacheck/tests/export', [TMCCTestController::class,'exportXLS'])->middleware('auth');
Route::post('tm/coronacheck/tests', [TMCCTestController::class,'createOrUpdate'])->middleware('auth');
Route::post('tm/coronacheck/mobile/tests', [TMCCTestController::class,'createOrUpdateFromMobile'])->middleware('auth');
Route::delete('tm/coronacheck/tests/{id}', [TMCCTestController::class,'delete'])->middleware('auth');

Route::get('tm/coronacheck/tests/items', [TMCCTestItemController::class,'all'])->middleware('auth');
Route::put('tm/coronacheck/tests/items/{id}', [TMCCTestItemController::class,'createOrUpdate'])->middleware('auth');
Route::post('tm/coronacheck/tests/items/export', [TMCCTestItemController::class,'exportXLS'])->middleware('auth');
Route::post('tm/coronacheck/tests/items', [TMCCTestItemController::class,'createOrUpdate'])->middleware('auth');
Route::delete('tm/coronacheck/tests/items/{id}', [TMCCTestItemController::class,'delete'])->middleware('auth');

Route::get('tm/mapping/universal/allUnits', [TMUniversalMapOverviewController::class,'allUnits'])->middleware('auth');
Route::get('tm/mapping/universal/allTours', [TMUniversalMapOverviewController::class,'allTours'])->middleware('auth');
