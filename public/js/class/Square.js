function Square(name, color){
	Shape.call(this,name);
	this.name = name || 'Square Tool';
	this.color = color || 'white';
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
		'border':'2px solid black',
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