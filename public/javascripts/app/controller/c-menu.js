define(['./Base'], function (Base) {
    var cMenu = {
        //添加菜单选中样式
        addLiActive : function(){
            var url = window.location.href;
            var host = window.location.host;
            var protocol = window.location.protocol;
            var urlFirstHalf = protocol + "//" + host;
            var urlFirstHalfLen = urlFirstHalf.length;
            var urlPath = url.substring(urlFirstHalfLen);
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