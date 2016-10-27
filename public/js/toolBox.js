(function(ctx, $){
	var toolBox = {
		box : new ToolBox(),
		family :{
			shape : new Shape(),
			text : new Text(),
			edit : new Edit(),
		},
		selected : {
			family : null,
			tool : null,
		},
		init:function(){
			//enable selectable tools
			this.select();
			this.draw();
			this.edit(self.family.edit.name);
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
			var inputReady = false;
			
			
			$iframe.on('mousedown', function(evt){
				// evt.preventDefault();
				mousePos.x = evt.pageX-$(this).offset().left ;
				mousePos.y = evt.pageY-$(this).offset().top ;
				if(self.selected.family.tool === "square-tool" ){
					self.selected.tool = new Square();
					self.selected.tool.active = true;
					classIncrement ++;
					self.selected.tool.draw($iframe, classIncrement, mousePos);
				}
				if(self.selected.family.tool === "round-tool" ){
					self.selected.tool = new Round();
					self.selected.tool.active = true;
					
					classIncrement ++;
					self.selected.tool.draw($iframe, classIncrement, mousePos);
				}
				if(self.selected.family.tool === "write-tool" ){
					self.selected.tool = new Write();				
							
					
					if(inputReady === false){

						
						self.selected.tool.drawInput($iframe, classIncrement, mousePos);
						inputReady = true;
						
					}
					

					
					self.selected.tool.active = true;	
				}
				
			}).on('click',function(){
				$('.input0').on('blur', function(evt){
					if(inputReady === true){		
						$content = $(this).val(); // empty
						self.selected.tool.drawText($(this), classIncrement);
						inputReady = false;
						classIncrement ++;
					}
					
				});
			});

			$iframe.on('mouseup', function(evt){
				if(self.selected.tool !== null){

					if(self.selected.tool.active === true){
						self.selected.tool.active = false;
						if(inputReady === false){

							$('.input0').remove();
						}
						
					}
				}
				
			});

			$iframe.on('mousemove', function(evt){
				
				if(self.selected.tool !== null){
					if(self.selected.tool.active === true){
						
						mouseMovePos.x =  evt.pageX-$(this).offset().left - mousePos.x;
						mouseMovePos.y = evt.pageY-$(this).offset().top - mousePos.y;
					
						self.selected.tool.resize($iframe, classIncrement, mouseMovePos);
					}
				}
				else{
					return ;
				}

			});
		},
		edit : function(editFamilyName){
			var $iframe = $('.panel-work');
			var $elem = null;
			var mouseMovePos = {};
		
			var selected = false;
			var resizing = false;

			var moveMode = false;
			var resizeMode = false;

			var resizeTop = null;

			var elemLoaded = new CustomEvent(
				"elemLoaded", 
				{
					detail: {
						message: "execute when $elem is loaded",
						time: new Date(),
					},
					bubbles: true,
					cancelable: true
				}
			);
			$iframe.on('mouseover',function(evt){
				evt.preventDefault();
				var $classname = $(evt.target).attr('class');
				
				if($classname!== 'panel-work' && self.selected.family.name === editFamilyName){
					$elem = $('.'+$classname);
					
					
					
					$elem[0].dispatchEvent(elemLoaded);
				}
				
			})
			document.addEventListener('elemLoaded',function(){

				$elem.on('mouseleave',function(evt){
					
					if($elem.attr('class')!== 'panel-work'){
						$elem.css({
							'border-color':'inherit',
							
						});
					}
				})

				$elem.on('mousedown', function(evt){
					selected = true;
				});

				$iframe.on('mousemove',function(evt){
					
					if(moveMode === true){
						resizeMode = false;
						self.selected.family.move($elem, mouseMovePos);
					
					}
					if(resizeMode === true){
						mouseMovePos.x =  evt.pageX-$elem.offset().left
						mouseMovePos.y = evt.pageY-$elem.offset().top

						moveMode = false;
						if(resizeTop === true){
							self.selected.family.resizeTop($elem, mouseMovePos);
						}
						else{
							self.selected.family.resizeLeft($elem, mouseMovePos);
						}
						
						return
					}
				
				
					if(selected === true && resizing === false){
					

						mouseMovePos.x =  evt.pageX-$(this).offset().left
						mouseMovePos.y = evt.pageY-$(this).offset().top
						moveMode = true;
						resizeMode = false;
					
						return;

					}
					

					if((evt.offsetY < parseInt($elem.css('borderRightWidth'))*8 && evt.offsetY > -parseInt($elem.css('borderRightWidth'))*2) && $elem.is(':hover')){
					
					
						resizing = true;
						self.selected.family.hovering($elem, 'red','s-resize');
						if(selected === true){
							resizeMode = true;
							resizeTop = true;
						}
						return;
							
					}
					else{
						if($elem.is(':hover')){
							$elem.css({
								'border-color':'red',
								'cursor':'pointer',
							});
							resizing = false;
							resizeMode= false;

						}	
					}
					if((evt.offsetY >$elem.outerHeight()-parseInt($elem.css('borderRightWidth'))*8 && evt.offsetY <$elem.outerHeight()+parseInt($elem.css('borderRightWidth'))*2) && $elem.is(':hover')){
				
						
						resizing = true;
						self.selected.family.hovering($elem, 'red','n-resize');
						if(selected === true ){
							resizeMode = true;
							resizeTop = true;
						}
						return;
					
					}
					if((evt.offsetX <parseInt($elem.css('borderRightWidth'))*8 && evt.offsetX > -parseInt($elem.css('borderRightWidth'))*2) && $elem.is(':hover')){
						
						
						resizing = true;
						self.selected.family.hovering($elem, 'red','e-resize');
						if(selected === true){
							resizeMode = true;
							resizeTop = false;

						}
						return;

					}
					if((evt.offsetX > $elem.outerWidth()-parseInt($elem.css('borderRightWidth'))*8 &&  +parseInt($elem.css('borderRightWidth'))*2) && $elem.is(':hover')){
					
						resizing = true;
					
						self.selected.family.hovering($elem, 'red','w-resize');
						if(selected === true ){
							resizeMode = true;
							resizeTop = false;
						}
						return;
					}

				});
				$iframe.on('mouseup', function(evt){
					if(selected === true){
						
						mouseMovePos.x = null;
						mouseMovePos.y = null;
						resizing = false;
						moveMode =false;
						resizeMode = false;
						selected = false;
						return;
					}
				});
			});
		}
	}
	ctx.toolBox = toolBox;
	var self = toolBox;
})(app, jQuery)