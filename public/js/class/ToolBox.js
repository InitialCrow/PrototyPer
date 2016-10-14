function ToolBox(name){
	this.name = name || 'Prototyper Box';
	this.active = false;
}
ToolBox.prototype = {
	show_sub : function(toolBoxElem, family){
		var $toolBox = $(toolBoxElem);
		var sub= "<div class='sub-tool col-xs-1'></div>";
		var sub_content = "<p>"+family.name+"<a href='#' class='return-btn'> <-</a></p>";
		$('.sub-tool').remove();
		$toolBox.after(sub);
		

		var $sub_tool = $('.sub-tool');

		$sub_tool.append(sub_content);

		

		$sub_tool.css('height', $toolBox[0].clientHeight);
		$('.return-btn').on('click',function(evt){
			evt.preventDefault();
			$('.sub-tool').addClass('bye');	
		})
		family.init();
	}
};