define(['./Base'], function (Base) {
    var cMenu = {
    	//添加选中样式
        liActive : function(){
        	$("#menuUl").on("li","click",function(){
        		$(this).parents("#menuUl").find("li").removeClass("active");
        		$(this).addClass("active");
        	});
        }
    };

    return cMenu;
});