function Square(name, color){
	Shape.call(this,name);
	this.name = name || 'Square Tool';
	this.color = color || 'black';
}
Square.protype = Object.create(Shape.prototype);


Square.prototype.draw = function(elem, increment, pos, color){
	var self = this;
	var $elem = elem;
	console.log(elem);
	$elem.append('<div class=\'square'+increment+'\'></div>');
	$elem.find('.square'+increment).css({
		
		'position':'absolute',
		'left':pos.x+'px',
		'top':pos.y+'px',
		'background-color':self.color
	});
}
Square.prototype.resize = function(elem, increment, mousepos){
	var self = this;
	var $elem = elem;
	
	$elem.find('.square'+increment).css({
		'width': mousepos.x+'px',
		'height':mousepos.y+'px',
	});
}