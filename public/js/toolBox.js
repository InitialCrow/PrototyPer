(function(ctx, $){
	var toolBox = {
		box : new ToolBox(),
		family :{
			shape : new Shape(),
			
		},
		selected : {
			family : null,
			tool : null,
		},
		init:function(){
			//enable selectable tools
			this.select();
		},
		select : function(){
			var $tool = $('.tool');
			$tool.on('click', function(evt){
				evt.preventDefault();
				var $family = $(this).attr('data-family');
				
				for(var i in self.family){
					if(self.family[i].family === $family){
						self.selected.family = self.family[i];
						break;
					}

				}
				self.box.show_sub('.toolBox', self.selected.family);
				console.log(self.selected);
				// self.box.select_family($family);
			})
		}
	}
	ctx.toolBox = toolBox;
	var self = toolBox;
})(app, jQuery)