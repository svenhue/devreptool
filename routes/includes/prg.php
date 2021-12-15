<?php

Route::get('prg/ps/surveys', 'prg\PRGPSSurveyController@all')->middleware('auth');
Route::get('prg/ps/surveys/details', 'prg\PRGPSSurveyController@details')->middleware('auth');
Route::get('prg/ps/surveys/binaries', 'prg\PRGPSSurveyController@binaries')->middleware('auth');
Route::get('prg/ps/surveys/binaries/{id}', 'prg\PRGPSSurveyController@binaryById');
Route::get('prg/ps/surveys/{id}/htmlresult', 'prg\PRGPSSurveyController@htmlResult');
Route::post('prg/ps/surveys/{id}/sendmail', 'prg\PRGPSSurveyController@sendMail')->middleware('auth');

Route::put('prg/ps/surveys/{id}', 'prg\PRGPSSurveyController@createOrUpdate')->middleware('auth');
Route::post('prg/ps/surveys/export', 'prg\PRGPSSurveyController@exportXLS')->middleware('auth');
Route::post('prg/ps/surveys', 'prg\PRGPSSurveyController@createOrUpdate')->middleware('auth');
Route::delete('prg/ps/surveys/{id}', 'prg\PRGPSSurveyController@delete')->middleware('auth');

Route::post('prg/ps/mobile/surveys', 'prg\PRGPSSurveyController@add')->middleware('auth');
Route::get('prg/ps/questiongroups/definitions', 'prg\PRGPSQuestionGroupController@definitions')->middleware('auth');
Route::get('prg/ps/checkmails', 'prg\PRGPSSurveyController@checkMails');
