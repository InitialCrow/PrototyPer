@extends('layouts.app')
@section('content')
@include('partial.toolbox')

<div class="container">
    <ul class="mode-list col-xs-10">
        <li><button class="mode-btn btn btn-default"><a href="#">Wireframe</a></button></li>
        <li><button class="mode-btn btn btn-default"><a href="#">Protype</a></button></li>

    </ul>
    <div class="row">     
        <div class="panel panel-default col-xs-10">
            <div class="panel-heading">Draw your WireFrame</div>

            <div class="panel-body">
                
            </div>
        </div>
    </div>
</div>
@endsection
