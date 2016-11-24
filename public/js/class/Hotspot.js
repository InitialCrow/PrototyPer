function Hotspot(name, color){
	Spot.call(this,name);
	this.name = name || 'Hotspot Tool';
	this.color = color || 'white';
	this.target1 = null;
	this.target2 = null;
}
Hotspot.prototype = Object.create(Spot.prototype);


Hotspot.prototype.init = function(target, mousePos){
	var self = this;
	var $elem =$(target);
	self.target1 = $elem.attr('class');
	sessionStorage.setItem('wireframe_selected1',self.target1);

}

Hotspot.prototype.drop = function(target, mousePos){
	var self = this;
	var $elem = $(target);
	self.target2= $elem.attr('class');
	$elem.wrap("<div class='protobuffer'></div>");
	sessionStorage.setItem('wireframe_selected2',self.target2);
	sessionStorage.setItem('wireframe_selected2_content',$elem.parent().html());
	console.log("2nd target ->");
	console.log(self.target2);
}
