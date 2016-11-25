<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use Response;
use App\Save;
use Auth;
use Session;

class ProtoController extends Controller
{
     public function __construct()
    {
        $this->middleware('auth');
    }

    public function post_load($token){
    	Session::set('currentWire',$token);
       	$id = (int)Session::get('id_user');
        	$uri = strip_tags($token);
    	$wireframe = Save::where('user_id','=',$id)->where('uri','=',$uri)->first();
            $save = Save::where('user_id','=',$id)->get();

            $wireframe = html_entity_decode($wireframe->wireframe);
           
            return view('proto', compact(['wireframe',$wireframe,'uri',$uri, 'save',$save]));
    }
    public function post_save(){
            $token= Session::get('currentWire');
            $scripts = $_POST['scripts'];
            Save::where('uri',$token)->update(['scripts'=>$scripts]);

    }
}
