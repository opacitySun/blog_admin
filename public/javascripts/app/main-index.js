
define(['require','jquery','fnbase','./controller/c-index','./model/m-index'],function(require,$,fnbase,controller,model){
    $(".content_2 section dl:last").css("margin","0");

    //获取用户信息
    model.getUserInfo(function(res){
    	$("#peopleImg").attr("src",res.result[0].image);
    	$("#peopleName").text(res.result[0].name);
    	$("#peopleDesc").text(res.result[0].desc);
    });

    //获取作品列表
    model.getUserWorks(function(res){
    	var html = "";
        if(res.result){
            $.each(res.result,function(key,obj){
                html += '<dl title="'+obj.workName+'">';
                html += '<a target="_blank" href="'+obj.workUrl+'">';
                html += '<dt><img src="'+obj.workImg+'" alt="截图" /></dt>';
                html += '<dd>'+obj.workName+'</dd>';
                html += '</a>';
                html += '</dl>';
            });
        }
    	$("#userWorks").html(html);
    });

    //获取新闻列表
    model.getNewsList(function(res){
        var html = "";
        if(res.result){
            $.each(res.result,function(key,obj){
                html += '<li title="'+obj.name+'">';
                html += '<a target="_blank" href="/news-detail?id='+obj._id.toString()+'">';
                html += '<span class="txt_ellipsis">'+obj.name+'</span>';
                html += '<em>'+fnbase.getSmpFormatDateByLong(obj.updateTime,false)+'</em>';
                html += '</a>';
                html += '</li>';
            });
        }
        $("#newsList").html(html);
    });
});