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
			tabs.append( "<div id='" + id + "'>加载中......</div>" )
				.tabs( "refresh" )
				.tabs( "option", 'active',$("#"+id).index()-1 );
			$.get(href+"?"+ new Date()).success(function(html){
				 tabs.find('#'+id).html(html);
			}).error(function(d){
				tabs.find('#'+id).html(d.responseText);
			});
		}else{
			return false;
		}
		
}
$(document).ready(function(){
	$(".sub_menu").on('click','.menu_level3 a',function(){
			addTab($(this));
		return false;
	});
	tabs=$('#tabs').tabs({
		
	});
	var $layout = $('body').layout({
		applyDefaultStyles:true,
		west:{size:250}
	});
	$('.sub_menu').accordion({collapsible: true,heightStyle: "content"});

	tabs.delegate( "span.ui-icon-close", "click", function() {
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      tabs.tabs( "refresh" );
    });

    $('#navgation').on('click','a',function(){
    	$(this).addClass('active').siblings().removeClass('active');
    	var href = $(this).attr('href')+"?"+new Date();
    	$.get(href).success(function(data){
    		$('.sub_menu').html(data).accordion('destroy').accordion({collapsible: true,heightStyle: "content"});
    	});
    	return false;
    });

    $.each($('a','#navgation'),function(index,ele){
    	var matchResult =  $(ele).text().match(/\((.*)\)/);
    	var hotkey = matchResult[1].toLowerCase();

    	var instance = $('a:contains('+ matchResult.input +')','#navgation');
    	$(document).bind('keydown.alt_'+ hotkey ,function(){
    		instance.click();
    	});
    	
    });

    $(document).bind('keydown.alt_q' ,function(){
		var active = tabs.tabs('option','active');
		if(active!=0){
			$("span.ui-icon-close",tabs).eq(active-1).trigger('click');
		}
	}).bind('keydown.alt_a' ,function(){
		$("span.ui-icon-close",tabs).trigger('click');
	});
});
function log(info){
	return console.log(info);
}

function createPager(param){
    $('#pager').tmpl(param).appendTo(param.container.empty());
	$('.pager_first',param.container).on('click',function(){
		alert(1);
		if(param.afterPaging){
			param.afterPaging('w');			
		}
		createPager(param);
    	return false;
	});
	$('.pager_next',param.container).on('click',function(){
		if(param.CurrentPage==param.TotalPage){
			alert(param.CurrentPage);
		}else{
			alert(param.CurrentPage+1);
		}
		if(param.afterPaging){
			param.afterPaging('q');			
		}
    	return false;
	});
	$('.pager_prev',param.container).on('click',function(){
		if (param.CurrentPage == 1) {
			alert(1);
		}else{
			alert(param.CurrentPage-1);
		}
		if(param.afterPaging){
			param.afterPaging('e');			
		}
    	return false;
	});
	$('.pager_last',param.container).on('click',function(){
		alert(param.TotalPage);
		if(param.afterPaging){
			param.afterPaging('r');			
		}
    	return false;
	});
	$('input:text',param.container).on('keyup',function(e){
		if(e.keyCode===13){
			alert($(this).val());
			if(param.afterPaging){
				param.afterPaging('t');			
			}
    	return false;
		}
	});
}