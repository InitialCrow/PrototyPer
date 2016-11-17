function Remove(name, color){
	Edit.call(this,name);
	this.name = name || 'edit Tool';
	this.color = color || 'white';
}
Remove.prototype = Object.create(Edit.prototype);


Remove.prototype.remove = function(elem){
	var $elem = elem;
	$elem.remove();
}
