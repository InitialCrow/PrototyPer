function Spot(name){
	ToolBox.call(this, name);
	this.name = name || 'Spot box';
	this.family = "spots";
	this.tool = null;
	this.showedOption = false;
}
Spot.prototype = Object.create(ToolBox.prototype);

Spot.prototype.init = function(){
	var self = this;
	var html = "<button type=''class='spot-btn ' data-type='hotspot-tool'>hot spot</button>";
	// html += "<button type=''class='spot-btn ' data-type='round-tool'>Round</button>";
	$('.sub-tool').append(html);

	$('.spot-btn').on('click',function(evt){
		evt.preventDefault();
		self.active = true;
		self.tool = $(this).attr('data-type');
		return self;	
	});
}
Spot.prototype.options = function(viewer, lastTarget){
	var self = this;
	var $viewer = $(viewer);
	var showbtn = "<button class ='showBtn btn btn-default'>show</button>";
	var lastTarget = lastTarget;

	if(lastTarget !== null && lastTarget !== undefined ){
		$viewer.append(showbtn);
	}
	$('.showBtn').on('click',function(evt){
		self.showedOption = true;
	});
}
Spot.prototype.show = function(target1, target2, dest){
	var self = this;
	var $target1 = $('.'+target1);
	var target2 = target2;
	var $dest = $('.'+dest);
	var content = target2.replace(/"/g, "'");
	var scripts_save = "$('."+target1+"').on('click', function(evt){$('#wireframeSnipet').append(\""+content+"\");});";



	$target1.on('click', function(evt){
		console.log(target2);	
		$dest.append(target2);
		
	});
	return scripts_save;
	
}
