function Paraph(color, borderSize, zIndex, borderColor, textSize, textUnderline, textBold,name ){
	Text.call(this,name);
	this.color = color || 'black';
	this.borderSize = borderSize || 'none';
	this.zIndex = zIndex || 0;
	this.borderColor = borderColor || 'none';
	this.name = name || 'paraph Tool';
	this.textSize = textSize || 14;
	this.textBold = textBold || false;
	this.textUnderline = textUnderline || false;

	
}
Paraph.prototype = Object.create(Shape.prototype);


Paraph.prototype.drawInput = function(elem, increment, pos, color){
	console.log('here');
	var self = this;
	var $elem = elem;
	var inputIndex = self.zIndex +1;
	var $input = $elem.append("<textarea class= 'area0' type='text'></textarea>");
	
	$input.find('.area0').css({	
		'position':'absolute',
		'left':pos.x+'px',
		'top':pos.y+'px',	
		'z-index': inputIndex,
	});
}
Paraph.prototype.drawText = function(elem, increment,color){
	var self = this;
	var $elem = elem.find('.area0');
	var $content = elem.val();
	if(elem.val() !== ''){
		
		elem.before('<div class=\'paraph-container'+increment+'\' ><p class=\'paraph'+increment+'\'>'+$content+'</p></div>');
		$('.paraph'+increment).css({
			'position':'absolute',
			'left':elem.position().left+'px',
			'top':elem.position().top+'px',
			'z-index': self.zIndex,
			'font-size' : self.textSize+'px',
			'color':self.color,

		});
		if(self.textUnderline === true){
			$('.paraph'+increment).css('text-decoration','underline');
		}
		if(self.textBold === true){
			$('.paraph'+increment).css('font-weight','bold');
		}
	}
	
	
}

Paraph.prototype.resize = function(elem, increment, mousepos){
	var self = this;
	// var $elem = elem;

	// $elem.find('.round'+increment).css({
	// 	'width': mousepos.x+'px',
	// 	'height':mousepos.y+'px',
	// });
}