function Round(name, color){
	Shape.call(this,name);
	this.name = name || 'Round Tool';
	this.color = color || 'black';
}
Round.protype = Object.create(Shape.prototype);


Round.prototype.draw = function(color){
	var self = this;
	console.log(self);
}