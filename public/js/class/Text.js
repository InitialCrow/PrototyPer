function Text(name){
	ToolBox.call(this, name);
	this.name = name || 'Texts box';
	this.family = "texts";
	this.tool = null;
}
Text.prototype = Object.create(ToolBox.prototype);

Text.prototype.init = function(){
	var self = this;
	var $customTextBar = $('.textTool');

	var html = "<button type='' class='text-btn ' data-type='write-tool'>A|</button>";
	html += "<button type=''class='text-btn' data-type='paraph-tool'>P|</button>";
	$('.sub-tool').append(html);

	$('.text-btn').on('click',function(evt){
		evt.preventDefault();
		self.active = true;
		self.tool = $(this).attr('data-type');
		$customTextBar.css('display', 'inline-block');
		return self;	
	});
}