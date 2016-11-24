(function(ctx, $){
	var protoBox = {
		box : new ToolBox('protoBox'),
		viewer : {
			target1 : sessionStorage.getItem('wireframe_selected1'),
			target2 : sessionStorage.getItem('wireframe_selected2'),
			target2Content : sessionStorage.getItem('wireframe_selected2_content'),
			showedTarget :sessionStorage.getItem('wireframe_dest'),
		},
		family :{
			spot : new Spot(),
			edit : new Edit(),
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
		preshot: function(){
			var $viewerModal = $('.viewer-modal');
			console.log(self.viewer.target1);
			if(self.viewer.target1 !== null && self.viewer.target1 !== undefined){
				$viewerModal.append('<p> target 1 selected ->'+self.viewer.target1+'</p>')
			}
			if(self.viewer.target2 !== null && self.viewer.target2 !== undefined){
				$viewerModal.append('<p> target 2 selected ->'+self.viewer.target2+'</p>')
				self.family.spot.options($viewerModal, self.viewer.target2);
			}


		},
		execViewFunc : function(){
			if(self.viewer.showedTarget !== null){
				
				self.family.spot.show(self.viewer.target1,self.viewer.target2Content, 'panel-work' )
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
		
		

		}
	}
	ctx.protoBox = protoBox;
	var self = protoBox;
})(app, jQuery)