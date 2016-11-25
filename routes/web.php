<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

/*Route::get('/', function () {
    return view('home');
});*/

Auth::routes();

Route::get('/', 'HomeController@index');
Route::any('/load/{token}', 'HomeController@load');
Route::any('/proto', 'HomeController@proto');
Route::any('/proto/{token}', 'ProtoController@post_load');

Route::any('/saveWire', 'WireframeController@post_save');
Route::any('/saveScripts', 'ProtoController@post_save');

Route::any('/updateSave', 'WireframeController@post_updateSave');
Route::any('/export_html', 'DownloadController@post_exportHtml');
