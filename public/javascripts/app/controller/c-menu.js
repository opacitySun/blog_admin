define(['./Base'], function (Base) {
    var cMenu = {
    	//添加选中样式
        liActive : function(){
        	$("#menuUl li.children").on("click",function(){
    			$(this).parents("#menuUl").find("li").removeClass("active");
    			$(this).addClass("active");
    			var pageHref = $(this).find("a").attr("page-href");
    			window.location.href = "#";
        	});
        },
        //改变页面标题
        updateTitle : function(){
        	var liActiveLen = $("#menuUl li.active").length;
        	if(liActiveLen > 0){
        		var pageTitle = $("#menuUl li.active").parent().parent().find(".page_title").text();
				var pageSmall = $("#menuUl li.active").find("a").text();
				$("#pageHeader").html(pageTitle+"<small>"+pageSmall+"</small>");
        	}
        }
    };

    return cMenu;
});