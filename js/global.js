// JavaScript Document
var tabs,
maxTabs=2,
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
			$.get(href).success(function(html){
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
function opened_tab(uname){
	if(window.tab_params["tabs"].indexOf(uname)>=0){ return true; }
	return false;
}
$(document).ready(function(){
	// var h1=$(document).height();
	//$(".left,.right,.inner").css("height",h1-5);
	//$(".right .inner .content,.right .inner .content div:first").css("height",h1-113);
	// $(".menu_level2").first().addClass("active");
	// $(".menu_level2").first().siblings().slideDown(300);
	// $(".menu a").click(function(){
	// 	$(".menu a").removeClass("active");
	// 	$(this).addClass("active");
	// });
	$(".menu_level3 a").click(function(){
			addTab($(this));
		return false;
	});
	// $(".menu_level2").click(function(){
	// 	$(".menu_level2").removeClass("active");
	// 	$(this).addClass("active");
	// 	$(".menu_level3").slideUp(300);
	// 	$(this).siblings(".menu_level3").slideDown(300);
	// });
	// $("#tab_menu").on('click','.menu',function(){
	// 	var text = $(this).find("span.text").text();
	// 	var uname = uniencode(text);
	// 	active_tab(uname);
	// });
	// $("#tab_menu").on('click','.btn_close',function(){
	// 	removeTab($(this));
	// 	return false;
	// });
	tabs=$('#tabs').tabs();
	$('body').layout({applyDefaultStyles:true});
	$('.sub_menu').accordion();

	tabs.delegate( "span.ui-icon-close", "click", function() {
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      tabs.tabs( "refresh" );
    });
});
function log(info){
	return console.log(info);
}