<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Response;
use  App\Save;
use Auth;
use Session;


class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        Session::set('id_user',Auth::user()->id);
        return view('wireframe');
    }
    public function post_save(Request $request)
    {
       $wireframe =  htmlentities(trim($_POST['wireframe']));// warning check laravel native method before
       $token = $_POST['token'];
       
       $save =  new Save;
       $save->timestamps = false;
       $save->user_id = 1;
       $save->uri = strip_tags($token);
       $save->wireframe = $wireframe;
       $save->save();
    }
     public function load($token)
    {
        Session::set('currentWire',$token);
        $id = (int)Session::get('id_user');
        $uri = strip_tags($token);
        $save = Save::where('user_id','=',$id)->where('uri','=',$uri)->first();
        $save->wireframe = html_entity_decode($save->wireframe);
       
        return view('load', compact(['save',$save->wireframe]));
       
    
    }
    public function post_updateSave(){ //ajax request
         $wireframe =  htmlentities(trim($_POST['wireframe']));
       
         $id = (int)Session::get('id_user');
         $token = strip_tags(Session::get('currentWire'));
       
         $save = Save::where('user_id', $id)->where('uri',$token)->update(['wireframe'=>$wireframe]);
    
         return;
    }
}
