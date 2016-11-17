function Text_link(href, name ){
	Text.call(this,name);
	this.href = href || '#';
	this.name = name || 'link Tool';	
}
Text_link.prototype = Object.create(Link.prototype);


Text_link.prototype.init = function(elem){
	var self = this;
	var $elem = elem;
	$elem.unwrap();
	$elem.parents().find('.link-text').remove();
	var link = "<a class='link-text' href='"+self.href+"'></a>";
	$elem.wrap(link);
	$('.link-text').on('click', function(evt){
		evt.preventDefault();
	})
	
}
