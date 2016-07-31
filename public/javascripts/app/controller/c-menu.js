define(['./Base'], function (Base) {
    var cMenu = {
    	//添加选中样式
        liActive : function(){
        	$("#menuUl").on("li","click",function(){
        		if($(this).hasClass("children")){
        			$(this).parents("#menuUl").find("li").removeClass("active");
        			$(this).addClass("active");
        			var pageHref = $(this).find("a").attr("page-href");
        			//window.location.href = pageHref;
        		}
        	});
        },
        //改变页面标题
        updateTitle : function(){
        	var pageTitle = $("#menuUl li.active").parent().parent().find(".page_title").text();
			var pageSmall = $("#menuUl li.active").find("a").text();
			$("#pageHeader").html(pageTitle+"<small>"+pageSmall+"</small>");
        }
    };

    return cMenu;
});