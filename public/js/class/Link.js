function Link(name){
	ToolBox.call(this, name);
	this.name = name || 'Links box';
	this.family = "links";
	this.tool = null;
}
Link.prototype = Object.create(ToolBox.prototype);

Link.prototype.init = function(){
	var self = this;
	var $customTextBar = $('.text-link-tool');

	var html = "<button type='' class='link-btn' data-type='link-tool'>Text</button>";


	// html += "<button type=''class='text-btn .btn' data-type='round-tool'>Round</button>";
	$('.sub-tool').append(html);

	$('.link-btn').on('click',function(evt){
		
		evt.preventDefault();
		self.active = true;
		self.tool = $(this).attr('data-type');
		$customTextBar.css('display', 'inline-block');
		return self;	
	});
}