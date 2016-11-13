function Write(color, borderSize, zIndex, borderColor, name){
	Text.call(this,name);
	this.color = color || 'black';
	this.borderSize = borderSize || 'none';
	this.zIndex = zIndex || 0;
	this.borderColor = borderColor || 'none';
	this.name = name || 'write Tool';

	
}
Write.protype = Object.create(Shape.prototype);


Write.prototype.drawInput = function(elem, increment, pos, color){
	var self = this;
	var $elem = elem;


	var $input = $elem.append("<input class= 'input0' type='text'>");
	
	$input.find('.input0').css({	
		'position':'absolute',
		'left':pos.x+'px',
		'top':pos.y+'px',	
	});
}
Write.prototype.drawText = function(elem, increment,color){
	var self = this;
	var $elem = elem.find('.input0');
	var $content = elem.val();
	if(elem.val() !== ''){
		
		elem.before('<div class=\'write-container'+increment+'\' ><p class=\'write'+increment+'\'>'+$content+'</p></div>');
		$('.write'+increment).css({
			'position':'absolute',
			'left':elem.position().left+'px',
			'top':elem.position().top+'px',
			'z-index': self.zIndex,
			'color':self.color,

		});
	}
	
	
}

Write.prototype.resize = function(elem, increment, mousepos){
	var self = this;
	// var $elem = elem;

	// $elem.find('.round'+increment).css({
	// 	'width': mousepos.x+'px',
	// 	'height':mousepos.y+'px',
	// });
}