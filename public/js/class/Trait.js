function Trait(color, name ){
	Shape.call(this,name);
	this.color = color || 'black';
	this.name = name || 'Trait Tool';
}
Trait.protype = Object.create(Shape.prototype);


Trait.prototype.draw = function(elem, increment, pos, color){
	var self = this;
	var $elem = elem;
	
	$elem.append('<div class=\'trait'+increment+'\'></div>');
	$elem.find('.trait'+increment).css({
		
		'position':'absolute',
		'left':pos.x+'px',
		'top':pos.y+'px',
		'height':"1px",
		'width':"1px",

		'background':self.color
	});
}
Trait.prototype.resize = function(elem, increment, mousepos){
	var self = this;
	var $elem = elem;
	if(mousepos.x>mousepos.y){
		$elem.find('.trait'+increment).css({
			'width': mousepos.x+'px',
			'height': 1+'px',
		});
	}
	else{
		$elem.find('.trait'+increment).css({
			'height': mousepos.y+'px',
			'width': 1+'px',
		
		});	
	}
}