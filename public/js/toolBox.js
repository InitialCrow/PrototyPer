(function(ctx, $){
	var toolBox = {
		box : new ToolBox(),
		customBar : {
			backgroundColor : null,
			borderColor : null,
		},
		family :{
			export : new Export(),
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
			this.initCustomBar();
			this.draw();
			this.edit(self.family.edit.name);
			this.save();
			this.export();
		},
		initCustomBar : function(){
			$(".spectre-color").spectrum({
				color: "white",
				preferredFormat:'rgba',
				showInput: true,
			});
		
			$(".spectre-color-border").spectrum({
				color: "black",
				preferredFormat:'rgba',
				showInput: true,

			});
			$('.sp-choose').on('click', function(evt){
				self.customBar.backgroundColor = $(".spectre-color").spectrum('get');
				self.customBar.backgroundColor = self.customBar.backgroundColor._format+'('+self.customBar.backgroundColor._r+'%, '+self.customBar.backgroundColor._g+'%, '+self.customBar.backgroundColor._b+'%, '+self.customBar.backgroundColor._a+')';
				
				self.customBar.borderColor = $(".spectre-color-border").spectrum('get');
				self.customBar.borderColor = self.customBar.borderColor._format+'('+self.customBar.borderColor._r+'%, '+self.customBar.borderColor._g+'%, '+self.customBar.borderColor._b+'%, '+self.customBar.borderColor._a+')';
			});
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

			if($iframe.children().length == 0){
				
				var classIncrement=0;
			}
			else{
				var $classname = $iframe.children().last().attr('class');

				var matches = $classname.match(/\d+/g);
				if (matches != null) {
				   var classIncrement = Number(matches[0]);
				}
			}

			var mousePos = {};
			var mouseMovePos = {};
			var inputReady = false;
			
			
			$iframe.on('mousedown', function(evt){
				// evt.preventDefault();
				if(self.selected.family !== null){
					mousePos.x = evt.pageX-$(this).offset().left ;
					mousePos.y = evt.pageY-$(this).offset().top ;
					if(self.selected.family.tool === "square-tool" ){
						self.selected.tool = new Square(self.customBar.backgroundColor, self.customBar.borderColor);
					
						self.selected.tool.active = true;
						classIncrement ++;
						self.selected.tool.draw($iframe, classIncrement, mousePos);
					}
					if(self.selected.family.tool === "round-tool" ){
						self.selected.tool = new Round(self.customBar.backgroundColor, self.customBar.borderColor);
						self.selected.tool.active = true;
						
						classIncrement ++;
						self.selected.tool.draw($iframe, classIncrement, mousePos);
					}
					if(self.selected.family.tool === "write-tool" ){
						self.selected.tool = new Write(self.customBar.backgroundColor);				
								
						
						if(inputReady === false){

							
							self.selected.tool.drawInput($iframe, classIncrement, mousePos);
							inputReady = true;
							
						}
						self.selected.tool.active = true;	
					}
					if(self.selected.family.tool === "trait-tool" ){
						self.selected.tool = new Trait(self.customBar.backgroundColor);
						self.selected.tool.active = true;
						
						classIncrement ++;
						self.selected.tool.draw($iframe, classIncrement, mousePos);
					}
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

			var elemIsEdit = false;
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
				if(self.selected.family !== null){
					var $classname = $(evt.target).attr('class');
					
					if($classname!== 'panel-work' && self.selected.family.name === editFamilyName){
						$elem = $('.'+$classname);
						$elem[0].dispatchEvent(elemLoaded);
					}
				}
			})
			document.addEventListener('elemLoaded',function(){

				$elem.on('mouseleave',function(evt){
					
					if($elem.attr('class')!== 'panel-work'){
						$elem.css({
							'border-color':'black',
							
						});
					}
				})
				$elem.on('mousedown', function(evt){

					selected = true;
					elemIsEdit = $(this);
					if(self.selected.family.tool === 'remove-tool'){
						self.selected.tool = new Remove();
						self.selected.tool.active = true;
						self.selected.tool.remove(this);
						self.selected.family.tool = null;
						self.selected.tool = null;
						return;				
					}
					
				});
				$iframe.on('mousemove',function(evt){
					if(moveMode === true){
						
						resizeMode = false;
						self.selected.family.move( elemIsEdit, mouseMovePos);
						
					
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
					}
					return;
				});
			});
		},
		save : function(){

			var $saveBtn = $('.save-btn');
			var $form = $('.save-form');
			var $wireframe = null;
			var token = null;
			
			$saveBtn.on('click', function(evt){

				
				
				$form.submit();

				
				
			});
			$form.on('submit',function(evt){

					evt.preventDefault();
					$wireframe = $('.panel-work').html();
					token = self.makeid(10);
					$.ajaxSetup({
					    headers: {
					        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
					    }
					});
					if($(this).attr('data-type') === 'save'){
						$.ajax({
							
							url: $form.attr('action'),
							method : $form.attr('method'),
							data : {wireframe : $wireframe, token: token},	
							success : function(res){
								window.location.href = 'load/'+token;
								
							},
							error : function(res){
								alert('sorry bug ajax try update your browser or contact me');
							}	
						});
					}
					if($(this).attr('data-type') === 'updateSave'){
						$.ajax({
							
							url: $form.attr('action'),
							method : $form.attr('method'),
							data : {wireframe : $wireframe},	
							success : function(res){
								
								console.log('wireframe->saved!');
								
							},
							error : function(res){
								alert('sorry bug ajax try update your browser or contact me');
							}	
						});
					}
					if($(this).attr('data-type') === 'export_html'){
						$wireframe = "<div id='wireframeSnipet' style='margin: 0; position: relative; width: 100%; height: 100%;'>\n"+$wireframe+"\n \t\t</div>";
						$.ajax({
							
							url: $form.attr('action'),
							method : $form.attr('method'),
							data : {wireframe : $wireframe},	
							success : function(res){
							
								window.location.href = '/download/'+res;
							},
							error : function(res){
								alert('sorry bug ajax try update your browser or contact me');
							}	
						});
					}
					
				})
		},
		makeid : function(nb){
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			for( var i=0; i < nb; i++ )
			text += possible.charAt(Math.floor(Math.random() * possible.length));

			return text;
		},
		export : function(){
			new Clipboard('.clip');

			document.addEventListener('exportEvent',function(){
				if(self.selected.family.tool === "snipet-tool" ){
					self.selected.tool = new Snipet()
					self.selected.tool.init();
				}
				if(self.selected.family.tool === "html-tool" ){
					self.selected.tool = new Html()
					self.selected.tool.init();
				}
			});
		}
	}
	ctx.toolBox = toolBox;
	var self = toolBox;
})(app, jQuery)