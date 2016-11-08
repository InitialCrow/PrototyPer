@extends('layouts.app')
@section('content')
@include('partial.protobox')

<div class="container">
    <ul class="mode-list col-xs-9">
        <li><a href="/load/{{$uri}}"><button class="mode-btn btn btn-default ">Wireframe</button></a></li>
        <li><a href=""><button class="mode-btn btn btn-default active">Protype</button></a></li>

    </ul>
    <div class="row home-container">     
        <div class="panel panel-default col-xs-9">
            <div class="panel-heading">Draw your WireFrame</div>
            <form class='save-form' action="/updateSave" method="post" data-type='updateSave'>
                
            
                <div class="panel-body">
                   <!--  <iframe class= "panel-work" src="" allowfullscreen frameborder=0>
                 
                    </iframe> -->
                     <div class= "panel-work">
                        <?php  echo $save->wireframe;?>
                    </div>
                    {{ csrf_field() }}
            </form>
            </div>
        </div>
    </div>
</div>

@endsection
@section('script')
<script type="text/javascript">
    app.protoBox.init();
</script>
@endsection
