function Write(name, color){
	Text.call(this,name);
	this.name = name || 'write Tool';
	this.color = color || 'black';

	
}
Write.protype = Object.create(Shape.prototype);


Write.prototype.drawInput = function(elem, increment, pos,boolStatement, color){
	var self = this;
	var $elem = elem;
	self.inputReady = boolStatement;

	var $input = $elem.append("<input class= 'input0' type='text'>");
	
	$input.find('.input0').css({	
		'position':'absolute',
		'left':pos.x+'px',
		'top':pos.y+'px',	
	});
}
Write.prototype.drawText = function(elem, increment, content, color){
	var self = this;
	var $elem = elem.find('.input0');
	var $content = elem.val();
	if(elem.val() !== ''){
		elem.before('<p class=\'write'+increment+'\'>'+$content+'</p>');
		$('.write'+increment).css({
			'position':'absolute',
			'left':elem.position().left+'px',
			'top':elem.position().top+'px',
			'z-index':'22',

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