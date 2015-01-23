// JavaScript Document
var tabs,
maxTabs=6,
tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
function addTab(menu){
	var href = menu.attr("href");
	var text = menu.text();
	var reference = menu.attr('reference');
		if(href!='#'){
			 var  id = "tabs-" + reference,
			        li;
		    if($('#'+id).length){
		    	tabs.tabs( "option", 'active',$("#"+id).index()-1 );
		    	return false;
		    }
		    if(tabs.tabs("instance").anchors.length>maxTabs)
			{
				alert('最多同时打开'+maxTabs+'个Tab页，请关闭不用的窗口！');
				return false;
			}
		    li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, text ) );
			tabs.find( ".ui-tabs-nav" ).append( li );
			$.get(href+"?"+ new Date()).success(function(html){
			    tabs.append( "<div id='" + id + "'>" + html + "</div>" );
				tabs.tabs( "refresh" );
				tabs.tabs( "option", 'active',$("#"+id).index()-1 );
			}).error(function(d){
				tabs.append( "<div id='" + id + "'>" + d.responseText + "</div>" );
				tabs.tabs( "refresh" );
				tabs.tabs( "option", 'active',$("#"+id).index()-1 );
			});
		}else{
			return false;
		}
		
}
$(document).ready(function(){
	$(".menu_level3 a").click(function(){
			addTab($(this));
		return false;
	});
	tabs=$('#tabs').tabs();
	var $layout = $('body').layout({
		applyDefaultStyles:true,
		west:{size:250}
	});
	$('.sub_menu').accordion({collapsible: true});

	tabs.delegate( "span.ui-icon-close", "click", function() {
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      tabs.tabs( "refresh" );
    });
});
function log(info){
	return console.log(info);
}