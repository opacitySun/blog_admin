define(['jquery','fnbase','ueditor','./controller/c-news','./model/m-news','./controller/c-page'],function($,fnbase,ueditor,controller,model,cPage){
    var urlPath = fnbase.getRouterName();
	if(urlPath == "/news"){	//新闻消息管理
		controller.getNewsList(1,function(total){
			var pageSize = $("#pageSize").val();
			var buttons = $("#pageButton").val();
			cPage.createPage(pageSize,buttons,total,function(pageIndex){
				controller.getNewsList(pageIndex,function(){});
			});
		});
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
						html += '<option value="'+obj.type+'">'+obj.name+'</option>';
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
	}else if(urlPath == "/news-type"){	//类型列表
		controller.getNewsTypeList();
		$("#addButton").on("click",function(){
			window.location.href = "/news-type-edit?type=add";
		});
	}else if(urlPath == "/news-type-edit"){	//编辑类型
		var requestGet = fnbase.GetRequest();
		var urlType = requestGet["type"];
        var urlId = requestGet["id"];
		$("#pageBack").on("click",function(){
    		window.location.href="/news-type";
    	});
        if(urlType == "add"){
			$("#newsSubmit").on("click",function(){
				controller.newsTypeSubmit();
			});
			$("#pageHeader").html("新闻消息 <small>添加类型</small>");
        }else if(urlType == "edit"){
        	controller.editNewsType(urlId);
			$("#pageHeader").html("新闻消息 <small>修改类型</small>");
        }
	}
});