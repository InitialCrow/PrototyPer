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
			this.draw();
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
				
			
			});		
		},
		draw : function(){
			var $panel = $('.home-container .panel');
			var  $iframe = $('.panel-work');
			var classIncrement=0;
			var mousePos = {};
			var mouseMovePos = {};
			
			$iframe.on('mousedown', function(evt){
				if(self.family.shape.tool === "square-tool" ){
					console.log('icvi');
					
					self.selected.tool = new Square();
					self.selected.tool.active = true;
					
					mousePos.x = evt.pageX-$(this).offset().left ;
					mousePos.y = evt.pageY-$(this).offset().top ;
				
					classIncrement ++;
					self.selected.tool.draw($iframe, classIncrement, mousePos);

					console.log(self.selected.tool.active);
				}
				
			});
			$iframe.on('mouseup', function(evt){
				if(self.selected.tool !== null){
					if(self.selected.tool.active === true){
						self.selected.tool.active = false;
					
						return;
					}
				}
			});
			$iframe.on('mousemove', function(evt){
				
				if(self.selected.tool !== null){
					if(self.selected.tool.active === true){
						
						mouseMovePos.x =  evt.pageX-$(this).offset().left - mousePos.x;
						mouseMovePos.y = evt.pageY-$(this).offset().top - mousePos.y;
						console.log(mouseMovePos.x, mouseMovePos.y);
						self.selected.tool.resize($iframe, classIncrement, mouseMovePos);
					}
				}
				else{
					return ;
				}

			});


		}
	}
	ctx.toolBox = toolBox;
	var self = toolBox;
})(app, jQuery)