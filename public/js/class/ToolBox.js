function ToolBox(name){
	this.name = name || 'Prototyper Box';
	this.active = false;
}
ToolBox.prototype = {
	show_sub : function(toolBoxElem, family){
		var $toolBox = $(toolBoxElem);
		var sub= "<div class='sub-tool col-xs-1'></div>";
		var sub_content = '<p>'+family.name+'</p>';
		$('.sub-tool').remove();
		$toolBox.after(sub);


		var $sub_tool = $('.sub-tool');


		$sub_tool.append(sub_content);

		

		$sub_tool.css('height', $toolBox[0].clientHeight);
		family.init();
	}
};