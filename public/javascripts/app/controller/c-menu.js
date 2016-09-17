define(['./Base','fnbase'], function (Base,fnbase) {
    var cMenu = {
        //添加菜单选中样式
        addLiActive : function(){
            var urlPath = fnbase.getRouterName();
            $("#menuUl li.children").each(function(key,obj){
                var aHref = $(obj).find("a").attr("href");
                if(aHref == urlPath){
                    $(obj).parents("#menuUl").find("li").removeClass("active");
                    $(obj).find("a").addClass("active");
                    $(obj).parent().addClass("in");
                    var pageTitle = $(obj).parent().parent().find(".page_title").text();
                    var pageSmall = $(obj).find("a").text();
                    $("#pageHeader").html(pageTitle+"<small>"+pageSmall+"</small>");
                }
            });
        }
    };

    return cMenu;
});