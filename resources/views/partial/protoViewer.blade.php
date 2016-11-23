
<div class="viewer col-xs-12">
    <h2>viewer</h2>

    <div class="viewer-body ">
    	<ul >
    	@foreach($save as $sav)
    		
    			<li class="frame"><p class='title'>{{$sav->title}}</p></li>
    		
	@endforeach
	</ul>
    </div>
</div>
