function Snipet(name, color){
	Export.call(this,name);
	this.name = name || 'Snipet Tool';
	this.color = color || 'white';
}
Snipet.prototype = Object.create(Export.prototype);


Snipet.prototype.init = function(){
	var self = this;
	var $elem = $('.panel-heading');
	var $wireframe = $('.panel-work');
	var popup = "<div class='popup'><p>copy this snipet code for use this wireframe on your website <span class='close'>X</span> </p><button class='showSnip btn btn-default'>show snipet</button><button  class='clip btn btn-default'>copy</button></div>"
	$elem.append(popup);
	var $popup = $('.popup');
	var result = null;
	var opened = false;
	result = "<div id='wireframeSnipet' style='overflow: hidden; margin: 0; position: relative; width: 100%; height: 100%;'>"+$wireframe.html().trim()+"</div>";

	$popup.css('display','block');
	$('.clip').attr('data-clipboard-text',result);

	$('.showSnip').on('click',function(evt){

		if(opened === false){

			$popup.append('<div id=\'popUpSnipet\'>'+self.escapeHtmlChar(result)+'</div>');
			opened = true;
		}
		else{

			$('#popUpSnipet').remove();
			opened = false;
		}
	});
	$('.popup .close').on('click', function(evt){
			$popup.remove();
	})
	
}
Snipet.prototype.escapeHtmlChar = function(html){
	var html = html;
	var map = {
		'&':'&amp;',
		'<':'&lt;',
		'>':'&gt;',
		'"':'&quot;',
		"'":'&#039;'
	}
	return html.replace(/[&<>"'"]/g, function(m){return map[m];});
}