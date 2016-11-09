function Hotspot(name, color){
	Spot.call(this,name);
	this.name = name || 'Hotspot Tool';
	this.color = color || 'white';
}
Hotspot.protype = Object.create(Spot.prototype);


Hotspot.prototype.init = function(target, mousePos){
	var self = this;
	var $iframe = $('.panel-work');
	var mousePos = mousePos;
	var target = target || [];
	//all custom in optionBar.css
	var $target1 = $(target[0]);
	var $target2 = $(target[1]);
	$target1.addClass('display-parent');
	$target2.addClass('display-child');
	if(target.length === 2){
		self.showOption($iframe, mousePos, target);
		
	}
	


}
Hotspot.prototype.showOption = function(elem, mousePos, target){
	var self = this;
	var mousePos = mousePos;
	var $elem = elem;
	var target = target;
	var $target1 = $(target[0]);
	var $target2 = $(target[1]);
	var bar = "<div class='optionBar'><ul><li class='option btn btn-default' data-option='display'>display</li></ul></div>";
	$elem.append(bar);
	var $optionBar = $('.optionBar');
	$optionBar.addClass('option-bar-style');
	$optionBar.css({
		'left':mousePos.x+'px',
		'top':mousePos.y+'px',
	});
	$('.option').on('click',function(){

		var $option = $(this).attr('data-option');

		if($option==='display'){
			$target1.attr('data-display-parent',1).removeClass('display-parent');
			$target2.attr('data-display-child',1).removeClass('display-child');
			$optionBar.remove();
		}
	})


}