define(['jquery','fnbase','ueditor','./controller/c-news','./model/m-news'],function($,fnbase,ueditor,controller,model){
    var urlPath = fnbase.getRouterName();
	if(urlPath == "/news"){	//新闻消息管理
		controller.getNewsList();
		$("#addButton").on("click",function(){
			window.location.href = "/news-edit?type=add";
		});	
	}else if(urlPath == "/news-edit"){	//编辑详情
		var requestGet = fnbase.GetRequest();
		var urlType = requestGet["type"];
        var urlId = requestGet["id"];
        var ue = UE.getEditor('descEditor');
		$("#pageBack").on("click",function(){
    		window.location.href="/news";
    	});
        if(urlType == "add"){
        	model.getNewsTypeList(function(resType){	//获取新闻消息类型
				if(resType.success == 1){
					var html = "";
					$.each(resType.result,function(key,obj){
						html += '<div class="radio">';
						html += '<label>';
						if(key > 0){
							html += '<input type="radio" name="type" id="type'+obj.type+'" value="'+obj.type+'">'+obj.name;
						}else{
							html += '<input type="radio" name="type" id="type'+obj.type+'" value="'+obj.type+'" checked>'+obj.name;
						}
						html += '</label>';
						html += '</div>';
					});
					$("#newsType").append(html);
				}else{
					console.log(resType);
				}
			});
			$("#newsSubmit").on("click",function(){
				controller.newsEditSubmit();
			});
			$("#pageHeader").html("新闻消息 <small>添加文章</small>");
        }else if(urlType == "edit"){
        	controller.editNews(urlId);
			$("#pageHeader").html("新闻消息 <small>修改文章</small>");
        }
	}else if(urlPath == "/news-type"){	//编辑类型
		$("#newsSubmit").on("click",function(){
			controller.newsTypeSubmit();
		});
		$("#pageBack").on("click",function(){
    		window.location.href="/news";
    	});
		$("#pageHeader").html("新闻消息 <small>添加类型</small>");
	}
});