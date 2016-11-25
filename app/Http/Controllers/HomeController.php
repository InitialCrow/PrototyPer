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


     public function load($token)
    {
        Session::set('currentWire',$token);
        $id = (int)Session::get('id_user');
        $uri = strip_tags($token);
        
    
        $save = Save::where('user_id','=',$id)->where('uri','=',$uri)->first();
        $save->wireframe = html_entity_decode($save->wireframe);
      
        return view('load', compact(['save',$save->wireframe,'uri',$uri]));
        

    }

    public function proto()
    {
        $id = (int)Session::get('id_user');
        $uri= strip_tags(Session::get('currentWire'));
        $save = Save::where('user_id','=',$id)->get();

      
        // $save->wireframe = html_entity_decode($save->wireframe);
       
        return view('proto', compact(['save',$save,'uri',$uri]));
       
    
    }

}
