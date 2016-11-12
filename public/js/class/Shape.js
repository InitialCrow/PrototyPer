function Shape(name){
	ToolBox.call(this, name);
	this.name = name || 'Shapes box';
	this.family = "shapes";
	this.tool = null;
}
Shape.prototype = Object.create(ToolBox.prototype);

Shape.prototype.init = function(){
	var self = this;
	var html = "<button type=''class='shape-btn ' data-type='square-tool'>Square</button>";
	html += "<button type=''class='shape-btn ' data-type='round-tool'>Round</button>";
	html += "<button type='' class='shape-btn ' data-type='trait-tool'>Trait</button>";
	$('.sub-tool').append(html);

	$('.shape-btn').on('click',function(evt){
		evt.preventDefault();
		self.active = true;
		self.tool = $(this).attr('data-type');
		return self;	
	});
}
