function Export(name){
	ToolBox.call(this, name);
	this.name = name || 'Export box';
	this.family = "exports";
	this.tool = null;
}
Export.prototype = Object.create(ToolBox.prototype);

Export.prototype.init = function(){
	var self = this;
	var exportEvent = new CustomEvent(
		"exportEvent", 
		{
			detail: {
				message: "export wireframe event",
				time: new Date(),
			},
			bubbles: true,
			cancelable: true
		}
	);
	var html = "<button type='' class='export-btn ' data-type='snipet-tool'>Snipet</button>";
	html += "<button type='' class='export-btn ' data-type='html-tool'>HTML</button>";
	$('.sub-tool').append(html);

	$('.export-btn').on('click',function(evt){
		evt.preventDefault();

		self.active = true;
		self.tool = $(this).attr('data-type');
		this.dispatchEvent(exportEvent);
		return self;	
	});
}
