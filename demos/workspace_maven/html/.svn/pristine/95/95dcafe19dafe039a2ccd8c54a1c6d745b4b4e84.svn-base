// JavaScript Document
window.tab_params = {"tabs":[],last_active:""};
function addTab(menu){
	var href = menu.attr("frame_src");
	var text = menu.text();
	var uname = uniencode(text);
	if(opened_tab(uname)){
		active_tab(uname);
	}
	else if(window.tab_params["tabs"].length >= 6){
		alert("最多同时打开6个Tab页，请关闭不用的窗口");
		return false;	
	}
	else{
		window.tab_params["tabs"].push(uname);
		var str = "<a uname='" + uname + "' class='menu active' frame_src='" + href + "'>";
			str += "<span class='text'>" + text + "</span>";
			str += "<span class='btn_close'></span>";
			str += "</a>";
		var iframe = "<iframe uname='" + uname + "' src='" + href + "' scrolling='auto' width='100%' height='100%' frameborder='0'></iframe>";
		$("#tab_menu").append(str);
		$("#content").append(iframe);
		active_tab(uname);
	}
}
function opened_tab(uname){
	if(window.tab_params["tabs"].indexOf(uname)>=0){ return true; }
	return false;
}
function removeTab(btn_close){
	var tab = btn_close.parent();
	var is_active = tab.hasClass("active");
	var next_tab;
	var uname = uniencode(btn_close.siblings("span.text").text());
	if(is_active){
		if(tab.next().length > 0){
			next_tab = tab.next();
		}
		else{
			next_tab = tab.prev();
		}
		var next_uname = uniencode(next_tab.find("span.text").text());
		active_tab(next_uname);
	}
	$("[uname='" + uname + "']").remove();
	var uname_index = window.tab_params["tabs"].indexOf(uname);
	window.tab_params["tabs"].splice(uname_index,1);
}
function active_tab(uname){
	$(".menu_level3 a").removeClass("active");
	$("#tab_menu .menu").removeClass("active");
	$("#content iframe").hide();
	var text =  unescape(uname.replace(/\\u/g, "%u"))
	$(".menu_level3 a").each(function(){
		if($(this).text() == text){
			$(this).addClass("active");
		}
	});
	$("#tab_menu .menu[uname='" + uname + "']").addClass("active");
	$("#content iframe[uname='" + uname + "']").show();
}
function uniencode(text) { 
	text = escape(text.toString()).replace(/\+/g, "%2B"); 
	var matches = text.match(/(%([0-9A-F]{2}))/gi); 
	if (matches) { 
		for (var matchid = 0; matchid < matches.length; matchid++) { 
			var code = matches[matchid].substring(1,3); 
			if (parseInt(code, 16) >= 128) { 
				text = text.replace(matches[matchid], '%u00' + code); 
			} 
		} 
	} 
	text = text.replace('%25', '%u0025'); 
	return text; 
}
$(document).ready(function(){
	var h1=$(document).height();
	$(".left,.right,.inner").css("height",h1-5);
	$(".right .inner .content,.right .inner .content iframe").css("height",h1-113);
	$(".menu_level2").first().addClass("active");
	$(".menu_level2").first().siblings().slideDown(300);
	$(".menu a").click(function(){
		$(".menu a").removeClass("active");
		$(this).addClass("active");
	});
	$(".menu_level3 a").click(function(){
		$(".menu_level3 a").removeClass("active");
		$(this).addClass("active");
		addTab($(this));
	});
	$(".menu_level2").click(function(){
		$(".menu_level2").removeClass("active");
		$(this).addClass("active");
		$(".menu_level3").slideUp(300);
		$(this).siblings(".menu_level3").slideDown(300);
	});
	$("#tab_menu").on('click','.menu',function(){
		var text = $(this).find("span.text").text();
		var uname = uniencode(text);
		active_tab(uname);
	});
	$("#tab_menu").on('click','.btn_close',function(){
		removeTab($(this));
		return false;
	});
});
function log(info){
	return console.log(info);
}