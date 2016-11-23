<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Response;
use  App\Save;
use Auth;
use Session;
class WireframeController extends Controller
{
     public function __construct()
    {
        $this->middleware('auth');
    }

    public function post_save(Request $request)
    {
       $wireframe =  htmlentities(trim($_POST['wireframe']));// warning check laravel native method before
       $title =  htmlentities(trim($_POST['title']));
       $token = $_POST['token'];
       
       $save =  new Save;
       $save->timestamps = false;
       $save->user_id = 1;
       $save->title = $title;
       $save->uri = strip_tags($token);
       $save->wireframe = $wireframe;
       $save->save();
    }
    
    public function post_updateSave()
    { //ajax request
         $wireframe =  htmlentities(trim($_POST['wireframe']));
         $title =  htmlentities(trim($_POST['title']));
         $id = (int)Session::get('id_user');
         $token = strip_tags(Session::get('currentWire'));
       
         $save = Save::where('user_id', $id)->where('uri',$token)->update(['wireframe'=>$wireframe, 'title'=>$title]);
    
         return;
    }
}
