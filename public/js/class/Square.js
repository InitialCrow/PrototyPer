function Square(color, borderColor, name){
	Shape.call(this,name);
	this.color = color || 'white';
	this.borderColor = borderColor || 'black';
	this.name = name || 'Square Tool';
}
Square.protype = Object.create(Shape.prototype);


Square.prototype.draw = function(elem, increment, pos, color){
	var self = this;
	var $elem = elem;
	
	$elem.append('<div class=\'square'+increment+'\'></div>');
	$elem.find('.square'+increment).css({
		
		'position':'absolute',
		'left':pos.x+'px',
		'top':pos.y+'px',
		'border':'2px solid '+self.borderColor,
		'background':self.color
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