function Square(color, borderSize, borderColor, zIndex, name){
	Shape.call(this,name);
	this.color = color || 'white';
	this.borderSize = borderSize || 2;
	this.borderColor = borderColor || 'black';
	this.zIndex = zIndex || 0;
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
		'border': self.borderSize+'px solid '+self.borderColor,
		'background':self.color,
		'z-index':self.zIndex
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