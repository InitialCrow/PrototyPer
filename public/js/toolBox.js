(function(ctx, $){
	var toolBox = {
		box : new ToolBox(),
		customBar : {
			backgroundColor : null,
			borderColor : null,
			zIndex : 0,
			borderSize : 2,
			textSize : 14,
			textUnderline : false,
			textBold: false,
			hrefTextLink : '#',
		},
		family :{
			link : new Link(),
			export : new Export(),
			shape : new Shape(),
			text : new Text(),
			edit : new Edit(),
		},
		selected : {
			family : null,
			tool : null,
			elem : null,
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
			var $backgroundColor = $(".spectre-color");
			var $borderColor = $(".spectre-color-border");
			var colorTypeSelect = null;
			$backgroundColor.spectrum({
				color: "white",
				preferredFormat:'rgba',
				showInput: true,
				replacerClassName : 'background'
			
			});
			
			$borderColor.spectrum({
				color: "black",
				preferredFormat:'rgba',
				showInput: true,
				replacerClassName : 'border'

			});
			$('.background').on('click', function(evt){
				colorTypeSelect = 'background';
			});
			$('.border').on('click',function(evt){
				colorTypeSelect = 'border';
			});
			$('.sp-choose').on('click', function(evt){

				self.customBar.backgroundColor = $backgroundColor.spectrum('get');
				self.customBar.backgroundColor = self.customBar.backgroundColor._format+'('+self.customBar.backgroundColor._r+'%, '+self.customBar.backgroundColor._g+'%, '+self.customBar.backgroundColor._b+'%, '+self.customBar.backgroundColor._a+')';
				
				self.customBar.borderColor = $borderColor.spectrum('get');
				self.customBar.borderColor = self.customBar.borderColor._format+'('+self.customBar.borderColor._r+'%, '+self.customBar.borderColor._g+'%, '+self.customBar.borderColor._b+'%, '+self.customBar.borderColor._a+')';
				
				if(self.selected.family.name === "Edits box"){
					if(colorTypeSelect === 'background'){

						$(self.selected.elem).css({
							'background': self.customBar.backgroundColor,
						});


					}
					if(colorTypeSelect === 'border'){
						$(self.selected.elem).css('border-color', self.customBar.borderColor);
					}
				
				}
				else{
					
				}
				
			});
			$('.z-index-mod').on('change', function(evt){
				var value = Number($(this).val());
				if(isNaN(value) === false){ //is number
					self.customBar.zIndex = value;
					if(self.selected.family.name === "Edits box"){
						console.log(self.customBar.zIndex);
						$(self.selected.elem).css({
							'z-index': self.customBar.zIndex,
						})
					}
				}
				
				else{

					
				}
				
			});
			$('.border-size-mod').on('change', function(evt){

				var value = Number($(this).val());
				if(isNaN(value) === false){
					self.customBar.borderSize = value;
					if(self.selected.family.name === "Edits box"){

						$(self.selected.elem).css({
							
							'border-size': self.customBar.borderSize,
							
						});
					}
				}
				else{
					
					
				}
				

			});
			$('.text-size-mod').on('change', function(evt){
				var value = Number($(this).val());
				if(isNaN(value) === false){
					self.customBar.textSize = value;
					if(self.selected.family.name === "Edits box"){
						console.log(self.customBar.textSize);
						$(self.selected.elem).css({
							
							'font-size': self.customBar.textSize+'px',
							
						});
					}
				}
				else{
						
					
						

				}
			});
			$('.text-style-mod').on('click', function(evt){
				var $style = $(this).attr('data-type')

			
				if($style === 'underline'){
					if(self.customBar.textUnderline){ // if not active
						if(self.selected.family.name === 'Edits box'){
							$(self.selected.elem).css('text-decoration','none');
						}
						$(this).removeClass('active');
						self.customBar.textUnderline = false;
					}
					else{
						if(self.selected.family.name === 'Edits box'){
							$(self.selected.elem).css('text-decoration','underline');
						}
						$(this).addClass('active');
						self.customBar.textUnderline = true;
					}
				}
				if($style === 'bold'){
					if(self.customBar.textBold){// if not active
						if(self.selected.family.name === 'Edits box'){

							$(self.selected.elem).css('font-weight','normal');
						}
						$(this).removeClass('active');
						self.customBar.textBold = false;
					}
					else{
						if(self.selected.family.name === 'Edits box'){

							$(self.selected.elem).css('font-weight','bold');
						}
						$(this).addClass('active');
						self.customBar.textBold = true;
					}
				}	
				
			});
			$('.text-link-mod').on('change', function(evt){
				var $value = self.escapeHtml($(this).val());
				self.customBar.hrefTextLink = $value;
			});


		},
		escapeHtml: function(text){
			var map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;'
			}

			return text.replace(/[&<>"']/g, function(m) { return map[m]; });
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
				var $targetElem = $(evt.target);
				
				// evt.preventDefault();
				if(self.selected.family !== null){
					mousePos.x = evt.pageX-$(this).offset().left ;
					mousePos.y = evt.pageY-$(this).offset().top ;
					if(self.selected.family.tool === "square-tool" ){
						self.selected.tool = new Square(self.customBar.backgroundColor, self.customBar.borderSize, self.customBar.borderColor, self.customBar.zIndex);
					
						self.selected.tool.active = true;
						classIncrement ++;

						self.selected.tool.draw($iframe, classIncrement, mousePos);
						self.customBar.zIndex ++;
					}
					if(self.selected.family.tool === "round-tool" ){
						self.selected.tool = new Round(self.customBar.backgroundColor, self.customBar.borderSize, self.customBar.borderColor, self.customBar.zIndex);
						self.selected.tool.active = true;
						
						classIncrement ++;
						self.selected.tool.draw($iframe, classIncrement, mousePos);
						self.customBar.zIndex ++;
					}
					if(self.selected.family.tool === "write-tool" ){

						self.selected.tool = new Write(self.customBar.backgroundColor,'none', self.customBar.zIndex, 'none',self.customBar.textSize, self.customBar.textUnderline, self.customBar.textBold);				
								
						
						if(inputReady === false){

							
							self.selected.tool.drawInput($iframe, classIncrement, mousePos);
							
							inputReady = true;
							
						}
						self.selected.tool.active = true;	
					}
					if(self.selected.family.tool === "trait-tool" ){
						self.selected.tool = new Trait(self.customBar.backgroundColor,self.customBar.borderSize, self.customBar.zIndex);
						self.selected.tool.active = true;
						
						classIncrement ++;
						self.selected.tool.draw($iframe, classIncrement, mousePos);
						self.customBar.zIndex ++;
					}
					if(self.selected.family.tool === "link-tool" ){
						self.selected.tool = new Text_link(self.customBar.hrefTextLink);
						self.selected.tool.init($targetElem);
						self.selected.tool.active = true;

					}
				}
			}).on('click',function(){
				$('.input0').on('blur', function(evt){
					if(inputReady === true){		
						$content = $(this).val(); // empty
						console.log('draw text activate');

						self.selected.tool.drawText($(this), classIncrement);
						inputReady = false;
						classIncrement ++;
						self.customBar.zIndex ++;
					}
					
				});
			});

			$iframe.on('mouseup', function(evt){
				if(self.selected.tool !== null){
					$('.z-index-mod').val(self.customBar.zIndex);
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
					self.selected.elem = elemIsEdit;

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