
<div class="viewer col-xs-12">
    <h2>viewer</h2>

    <div class="viewer-body ">
    	<ul >
        @foreach($save as $sav)

    			<li class="frame"><a href="/proto/{{$sav->uri}}"><p class='title'>{{$sav->title}}</p></a></li>
    		
	@endforeach
	</ul>
    </div>
</div>
