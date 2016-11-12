function Round( color,borderColor,name){
	Shape.call(this,name);
	this.color = color || 'white';
	this.borderColor = borderColor || 'black';
	this.name = name || 'round Tool';
}
Round.protype = Object.create(Shape.prototype);


Round.prototype.draw = function(elem, increment, pos, color){
	var self = this;
	var $elem = elem;
	$elem.append('<div class=\'round'+increment+'\'></div>');
	$elem.find('.round'+increment).css({
		'position':'absolute',
		'left':pos.x+'px',
		'top':pos.y+'px',
		'border-radius':'50%',
		'border':'2px solid '+self.borderColor,
		'background':self.color
	});
}
Round.prototype.resize = function(elem, increment, mousepos){
	var self = this;
	var $elem = elem;
	
	$elem.find('.round'+increment).css({
		'width': mousepos.x+'px',
		'height':mousepos.y+'px',
	});
}