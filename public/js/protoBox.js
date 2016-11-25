(function(ctx, $){
	var protoBox = {
		box : new ToolBox('protoBox'),
		viewer : {
			target1 : sessionStorage.getItem('wireframe_selected1'),
			target2 : sessionStorage.getItem('wireframe_selected2'),
			target2Content : sessionStorage.getItem('wireframe_selected2_content'),
			showedTarget :sessionStorage.getItem('wireframe_dest'),
		},
		saveScript : null,	
		family :{
			spot : new Spot(),
			edit : new Edit(),
			export : new Export(),
		},
		selected : {
			family : null,
			tool : null,
		},
		init:function(){
			//enable selectable tools
			this.select();
			this.hotspot();
			this.preshot();
			this.execViewFunc();
			this.save();
			this.export();
			// this.edit(self.family.edit.name);
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
		save : function(){

			var $saveBtn = $('.save-btn');
			var $form = $('.save-form');
			$wireframe = $('.panel-work').html();
			$saveBtn.on('click', function(evt){

		
				$form.submit();

				
				
			});


			$form.on('submit', function(evt){
				evt.preventDefault();
				
				$.ajaxSetup({
				    headers: {
				        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
				    }
				});
				if($(this).attr('data-type') === 'save'){
					$.ajax({
						
						url: $form.attr('action'),
						method : $form.attr('method'),
						data : {scripts : self.saveScript},	
						success : function(res){
							window.location.href = 'load/'+token;
							
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
			});
		},
		preshot: function(){
			var $viewerModal = $('.viewer-modal');
			// var $scripts = $('.scriptsProto');
			
			if(self.viewer.target1 !== null && self.viewer.target1 !== undefined){
				$viewerModal.append('<p> target 1 selected ->'+self.viewer.target1+'</p>')
			}
			if(self.viewer.target2 !== null && self.viewer.target2 !== undefined){
				$viewerModal.append('<p> target 2 selected ->'+self.viewer.target2+'</p>')
				self.family.spot.options($viewerModal, self.viewer.target2);
			}
			// if($scripts !== null && $scripts !== undefined){
			// 	self.saveScript = $scripts.html();
			// }


		},
		execViewFunc : function(){
			if(self.viewer.showedTarget !== null){
				
				self.saveScript = self.family.spot.show(self.viewer.target1,self.viewer.target2Content, 'panel-work' );

			}
		},
		hotspot:function(){
			var $iframe = $('.panel-work');
			var $frame = $('.frame');
		
			var mousePos = {};
			$iframe.on('mousedown',function(evt){
			
				if(self.family.spot.showedOption === true && evt.button === 2 ){
					self.viewer.showedTarget = evt.target.className;
					sessionStorage.setItem('wireframe_dest', evt.target.className );
					self.family.spot.showedOption =false;

				}
				if(self.selected.family !== null){

					if(self.selected.family.tool !== null ){
					
						mousePos.x = evt.pageX-$(this).offset().left ;
						mousePos.y = evt.pageY-$(this).offset().top ;
						
					
						if(self.selected.family.tool === "hotspot-tool" ){
							self.selected.tool = new Hotspot();
							self.selected.tool.active = true;
					
							if(evt.button === 2){
								if(self.viewer.target1 === null || self.viewer.target1 === undefined){

									self.selected.tool.init(evt.target, mousePos);
								}
								else{

									self.selected.tool.drop(evt.target, mousePos);
								}
								
							}
							if(evt.button === 1){
								sessionStorage.clear();
							}

						}
					}
				}

				
			});
			$(document).on("contextmenu", ".panel-work", function(e){
		
				return false;
			});
			
		

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
	ctx.protoBox = protoBox;
	var self = protoBox;
})(app, jQuery)