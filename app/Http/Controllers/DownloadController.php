<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use Response;
use  App\Save;
use Auth;
use Session;
use  App\User;
use File;

class DownloadController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function post_exportHtml(){
    	$wireframe =  htmlentities(trim($_POST['wireframe']));
    	$id_user = Session::get('id_user');
    	$user_name = User::where('id', '=',$id_user)->first();
    	$user_name = trim($user_name->name);
    	$path = public_path().'/download/'.$user_name;

    	$templateHtml = "<!DOCTYPE html> \n";
    	$templateHtml .= "<html> \n";
    	$templateHtml .="<head>\n";
	$templateHtml .="<title>Wireframe</title>\n";
	$templateHtml .="\t<link rel='stylesheet' type='text/css' href='/css/bootstrap.min.css'>\n";
	$templateHtml .="\t<link rel='stylesheet' type='text/css' href='/css/main.css'>\n";
	$templateHtml .="</head>\n";
	$templateHtml .="<body>\n";
	$templateHtml .="\t<h1>".$user_name." Wireframe's</h1>\n";
	$templateHtml .="\t<div class='container'>\n";
	$templateHtml .="\t\t".html_entity_decode ($wireframe)."\n";
	$templateHtml .="\t</div>\n";
	$templateHtml .="\t<script src='/js/jQuery.min.js'></script>\n";
	$templateHtml .="\t<script src='/js/main.js'></script>\n";
	$templateHtml .="</body>\n";
	$templateHtml .="</html>";

	$templateCss =".container{max-width : 1200px; margin : 0 auto;}";


    	File::makeDirectory($path,$mode = 0777, true, true);
    	File::makeDirectory($path.'/js',$mode = 0777, true, true);
    	File::makeDirectory($path.'/css',$mode = 0777, true, true);
    	File::put($path.'/css/main.css', $templateCss);
    	File::put($path.'/index.html', $templateHtml);


    }
}
