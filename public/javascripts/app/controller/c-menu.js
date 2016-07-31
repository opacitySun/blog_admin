define(['./Base'], function (Base) {
    var cMenu = {
    	//添加选中样式
        liActive : function(){
        	$("#menuUl").on("li","click",function(){
        		if($(this).hasClass("children")){
        			$(this).parents("#menuUl").find("li").removeClass("active");
        			$(this).addClass("active");

        			var pageTitle = $(this).parent().parent().find(".page_title").text();
        			var pageSmall = $(this).find("a").text();
        			$("#pageHeader").html(pageTitle+"<small>"+pageSmall+"</small>");
        		}
        	});
        }
    };

    return cMenu;
});