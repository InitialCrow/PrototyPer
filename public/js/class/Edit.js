function Edit(name){
	ToolBox.call(this, name);
	this.name = name || 'Edits box';
	this.family = "edits";
	this.tool = null;
}
Edit.prototype = Object.create(ToolBox.prototype);

Edit.prototype.init = function(){
	var self = this;
	var html = "<button type=''class='edit-btn' data-type='remove-tool'>Remove Elem</button>";
	$('.sub-tool').append(html);

	$('.edit-btn').on('click',function(evt){
		evt.preventDefault();
		self.active = true;
		self.tool = $(this).attr('data-type');
		return self;
	});
}
Edit.prototype.resizeTop = function(elem, pos){

	var $elem = elem;
	elem.css({'height':pos.y+'px'});

}

Edit.prototype.resizeLeft = function(elem, pos){
	var $elem = elem;
	elem.css({'width':pos.x+'px'});

}
Edit.prototype.move = function(elem, pos){

	var $elem = elem;
	
	$elem.css({
		'top':pos.y+'px',
		'left':pos.x+'px',
	});
	
	
}
Edit.prototype.hovering = function(elem, color, cursor){
	var $elem = elem;
	$elem.css({
		'border-color':color,
		'cursor':cursor,
	})	
}