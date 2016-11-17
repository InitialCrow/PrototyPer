function Trait(color, weight, zIndex, name ){
	Shape.call(this,name);
	this.color = color || 'black';
	this.weight  = weight || 1;
	this.zIndex = zIndex || 0;
	this.name = name || 'Trait Tool';
}
Trait.prototype = Object.create(Shape.prototype);


Trait.prototype.draw = function(elem, increment, pos, color){
	var self = this;
	var $elem = elem;
	
	$elem.append('<div class=\'trait'+increment+'\'></div>');
	$elem.find('.trait'+increment).css({
		
		'position':'absolute',
		'left':pos.x+'px',
		'top':pos.y+'px',
		'height': self.weight+"px",
		'width': self.weight+"px",
		'z-index': self.zIndex,
		'background':self.color
	});
}
Trait.prototype.resize = function(elem, increment, mousepos){
	var self = this;
	var $elem = elem;
	if(mousepos.x>mousepos.y){
		$elem.find('.trait'+increment).css({
			'width': mousepos.x+'px',
			'height': self.weight+'px',
		});
	}
	else{
		$elem.find('.trait'+increment).css({
			'height': mousepos.y+'px',
			'width': self.weight+'px',
		
		});	
	}
}