function Grid(zIndex, space, rowSpace, lineSpace,  name){
	ToolBox.call(this, name);
	this.zIndex = zIndex || 0;
	this.row = null;
	this.rowSpace = rowSpace || 10;
	this.line =null;
	this.lineSpace = lineSpace || 10;
	this.space = space;
	this.name = name || 'Grid Tool';
}
Grid.prototype = Object.create(ToolBox.prototype);

Grid.prototype.init = function(elem){
	var self = this;
	var $elem = elem;
	var $width = $elem.width();
	var $height = $elem.height();
	self.row = $width/self.rowSpace;
	self.line = $width/self.lineSpace;
	var grid = "";
	for(var i = 0; i<self.row; i++){

		grid += "<div class='gridRow' style='left:"+self.rowSpace+"px;'></div>";
		self.rowSpace += self.space;

	}
	for(var i = 0; i<self.line; i++){
		grid += "<div class='gridLine' style='top:"+self.lineSpace+"px;'></div>";
		self.lineSpace += self.space;
		
	}
	$elem.prepend(grid);

	

}
