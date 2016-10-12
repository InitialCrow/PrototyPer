function Shape(name){
	ToolBox.call(this, name);
	this.name = name || 'Shapes box';
	this.family = "shapes";
}
Shape.prototype = Object.create(ToolBox.prototype);

Shape.prototype.init = function(){

	console.log('initiation de shapes')
}

Shape.prototype.select_shape = function(){


}