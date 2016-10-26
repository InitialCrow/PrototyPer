function Edit(name){
	ToolBox.call(this, name);
	this.name = name || 'Edits box';
	this.family = "edits";
	this.tool = null;
}
Edit.prototype = Object.create(ToolBox.prototype);

Edit.prototype.init = function(){
	var self = this;
	var html = "<button type=''class='edit-btn' data-type='edit-tool'>first option</button>";
	$('.sub-tool').append(html);

	$('.edit-btn').on('click',function(evt){
		evt.preventDefault();
		self.active = true;
		self.tool = $(this).attr('data-type');
		return self;
	});
}
