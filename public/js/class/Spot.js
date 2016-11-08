function Spot(name){
	ToolBox.call(this, name);
	this.name = name || 'Spot box';
	this.family = "spots";
	this.tool = null;
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
