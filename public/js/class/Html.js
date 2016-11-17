function Html(name, color){
	Export.call(this,name);
	this.name = name || 'Html Tool';
	this.color = color || 'white';
}
Html.prototype = Object.create(Export.prototype);


Html.prototype.init = function(){

	var self = this;	
	var $form = $('.save-form');
	
	$form.attr('action','/export_html');
	$form.attr('data-type','export_html');
	$form.submit();

}
