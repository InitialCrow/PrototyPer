function Square(name, color){
	Shape.call(this,name);
	this.name = name || 'Square Tool';
	this.color = color || 'black';
}
Square.protype = Object.create(Shape.prototype);


Square.prototype.draw = function(color){

}