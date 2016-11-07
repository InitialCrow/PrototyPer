(function(ctx, $){
	var app = {
		init:function(){
			this.cssHeight();
			// enable toolbox function
			this.toolBox.init();
			//this.protoBox.init();
			
		},
		cssHeight : function(){
			//hack for height always 100%
			//heigth of toolbox
			var height = $(document).height();
			$('.toolBox').css('height',height);
			
			//height of iframe
			$('.panel-body').css('height',height-250);

		},
	}
	ctx.app = app;
	var self = app;
})(window, jQuery)