define(['./Base'], function (Base) {
    var cMenu = {
    	//添加选中样式并跳转
        liActive : function(){
        	$("#menuUl li.children").on("click",function(){
    			$(this).parents("#menuUl").find("li").removeClass("active");
    			$(this).addClass("active");

    			var pageTitle = $(this).parent().parent().find(".page_title").text();
				var pageSmall = $(this).find("a").text();
				$("#pageHeader").html(pageTitle+"<small>"+pageSmall+"</small>");

    			var pageHref = $(this).find("a").attr("page-href");
    			window.location.href = pageHref;
        	});
        }
    };

    return cMenu;
});