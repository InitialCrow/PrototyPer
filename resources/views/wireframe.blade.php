@extends('layouts.app')
@section('content')
@include('partial.toolbox')
@include('partial.custombar')

<div class="container">
    <ul class="mode-list col-xs-9">
        <li><a href="#"><button class="mode-btn btn btn-default">Wireframe</button></a></li>
        <li><a href="#"><button class="mode-btn btn btn-default" disabled>Protype</button></a></li>

    </ul>
    <div class="row home-container">     
        <div class="panel panel-default col-xs-9">
            <div class="panel-heading">Draw your WireFrame</div>
            <form class='save-form' action="/saveWire" method="post" data-type='save'>
                
            
                <div class="panel-body">
                   <!--  <iframe class= "panel-work" src="" allowfullscreen frameborder=0>
                 
                    </iframe> -->
                     <div class= "panel-work">
                 
                    </div>
                    {{ csrf_field() }}
            </form>
            </div>
        </div>
    </div>
</div>


@endsection
@section('script')
<script src='/js/spectrum/spectrum.js'></script>

<script type="text/javascript">
    app.toolBox.init();
</script>
@endsection


