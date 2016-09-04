define(['jquery','fnbase','./controller/c-fairy','./model/m-fairy','./controller/c-page'],function($,fnbase,controller,model,cPage){
    var urlPath = fnbase.getRouterName();
	if(urlPath == "/fairy"){	//精灵管理
		controller.getFairyList(1,function(total){
			var pageSize = $("#pageSize").val();
			var buttons = $("#pageButton").val();
			cPage.createPage(pageSize,buttons,total,function(pageIndex){
				controller.getFairyList(pageIndex,function(){});
			});
		});
	}else if(urlPath == "/fairy-edit"){	//编辑详情
		var requestGet = fnbase.GetRequest();
		var urlType = requestGet["type"];
        var urlId = requestGet["id"];
		$("#pageBack").on("click",function(){
    		window.location.href="/fairy";
    	});
        if(urlType == "add"){
        	model.getRecreationTypeList(function(resType){	//获取类型
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
					$("#recreationType").append(html);
				}else{
					console.log(resType);
				}
			});
			$("#recreationSubmit").on("click",function(){
				controller.recreationEditSubmit();
			});
			$("#pageHeader").html("精灵 <small>添加</small>");
        }else if(urlType == "edit"){
        	controller.editRecreation(urlId);
			$("#pageHeader").html("精灵 <small>修改</small>");
        }
	}else if(urlPath == "/fairy-type"){	//类型列表
		controller.getFairyTypeList(1,function(total){
			var pageSize = $("#pageSize").val();
			var buttons = $("#pageButton").val();
			cPage.createPage(pageSize,buttons,total,function(pageIndex){
				controller.getFairyTypeList(pageIndex,function(){});
			});
		});
		$("#addButton").on("click",function(){
			window.location.href = "/fairy-type-edit?type=add";
		});
	}else if(urlPath == "/fairy-type-edit"){	//编辑类型
		$("#recreationSubmit").on("click",function(){
			controller.recreationTypeSubmit();
		});
		$("#pageBack").on("click",function(){
    		window.location.href="/fairy-type";
    	});
		$("#pageHeader").html("精灵 <small>添加类型</small>");
	}
});