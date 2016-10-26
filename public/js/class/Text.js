function Text(name){
	ToolBox.call(this, name);
	this.name = name || 'Texts box';
	this.family = "texts";
	this.tool = null;
}
Text.prototype = Object.create(ToolBox.prototype);

Text.prototype.init = function(){
	var self = this;

	var html = "<button type='' class='text-btn ' data-type='write-tool'>A|</button>";
	// html += "<button type=''class='text-btn .btn' data-type='round-tool'>Round</button>";
	$('.sub-tool').append(html);

	$('.text-btn').on('click',function(evt){
		evt.preventDefault();
		self.active = true;
		self.tool = $(this).attr('data-type');
		return self;	
	});
}