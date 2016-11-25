<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use Response;
use App\Save;
use Auth;
use Session;
use App\User;
use File;
use ZipArchive;
use RecursiveIteratorIterator;
use RecursiveDirectoryIterator;

class DownloadController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function post_exportHtml(){
    	$wireframe =  htmlentities(trim($_POST['wireframe']));
    	$current = Session::get('currentWire');

    	$id_user = Session::get('id_user');
    	$user_name = User::where('id', '=',$id_user)->first();

    	$user_name = trim($user_name->name);
    	$path = public_path().'/download/'.$user_name;
    	$currentFrame = Save::where('uri','=',$current)->first();


    	if(!empty($currentFrame->scripts)){
    		$scripts =  $currentFrame->scripts;
    		$templateJs ="$(document).ready(function(){\n";
		$templateJs .= "\t".$scripts."\n";
		$templateJs .= "});";
		File::makeDirectory($path.'/js',$mode = 0777, true, true);
		File::put($path.'/js/jquery.min.js', file_get_contents('https://code.jquery.com/jquery-3.1.1.min.js'));
		File::put($path.'/js/main.js', $templateJs);
    	}

    	$templateHtml = "<!DOCTYPE html> \n";
    	$templateHtml .= "<html> \n";
    	$templateHtml .="<head>\n";
    	$templateHtml .="\t<meta charset='utf-8'>\n";
	$templateHtml .="\t<title>Wireframe</title>\n";
	$templateHtml .="\t<link rel='stylesheet' type='text/css' href='css/main.css'>\n";
	$templateHtml .="</head>\n";
	$templateHtml .="<body>\n";
	$templateHtml .="\t<div class='container'>\n";
	$templateHtml .="\t\t<h1>".$user_name." Wireframe's</h1>\n";
	$templateHtml .="\t\t".html_entity_decode ($wireframe)."\n";
	$templateHtml .="\t</div>\n";
	$templateHtml .="\t<script src='js/jquery.min.js'></script>\n";
	$templateHtml .="\t<script src='js/main.js'></script>\n";
	$templateHtml .="</body>\n";
	$templateHtml .="</html>";

	$templateCss =".container{font-family : Raleway,sans-serif; max-width : 1200px; margin : 0 auto;} .container h1{font-weight : normal;}";



    	File::makeDirectory($path,$mode = 0777, true, true);
    	
    	File::makeDirectory($path.'/css',$mode = 0777, true, true);
    	
    	
    	File::put($path.'/css/main.css', $templateCss);
    	File::put($path.'/index.html', $templateHtml);
    	
    	$zip = new ZipArchive();
	$zip->open(public_path().'/download/'.$user_name.'.zip', ZipArchive::CREATE | ZipArchive::OVERWRITE);
	$rootPath = realpath($path);
	$files = new RecursiveIteratorIterator(
		new RecursiveDirectoryIterator($rootPath),
		RecursiveIteratorIterator::LEAVES_ONLY
	);
	foreach ($files as $name => $file)
	{
		// Skip directories (they would be added automatically)
		if (!$file->isDir())
		{
			// Get real and relative path for current file
			$filePath = $file->getRealPath();
			$relativePath = substr($filePath, strlen($rootPath) + 1);
			// Add current file to archive
			$zip->addFile($filePath, $relativePath);
			
		}
		
	}
	$zip->close();
	$user_name = $user_name.'.zip';
	return $user_name;
    }

}
