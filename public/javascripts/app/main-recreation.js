define(['jquery','fnbase','./controller/c-recreation','./model/m-recreation'],function($,fnbase,controller,model){
    var urlPath = fnbase.getRouterName();
	if(urlPath == "/recreation"){	//娱乐管理
		controller.getRecreationList();
		$("#addButton").on("click",function(){
			window.location.href = "/recreation-edit?type=add";
		});	
	}else if(urlPath == "/recreation-edit"){	//编辑详情
		var requestGet = fnbase.GetRequest();
		var urlType = requestGet["type"];
        var urlId = requestGet["id"];
		$("#pageBack").on("click",function(){
    		window.location.href="/recreation";
    	});
        if(urlType == "add"){
        	model.getNewsTypeList(function(resType){	//获取类型
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
			$("#pageHeader").html("娱乐 <small>添加</small>");
        }else if(urlType == "edit"){
        	controller.editNews(urlId);
			$("#pageHeader").html("娱乐 <small>修改</small>");
        }
	}else if(urlPath == "/recreation-type"){	//编辑类型
		$("#newsSubmit").on("click",function(){
			controller.newsTypeSubmit();
		});
		$("#pageBack").on("click",function(){
    		window.location.href="/recreation";
    	});
		$("#pageHeader").html("娱乐 <small>添加类型</small>");
	}
});