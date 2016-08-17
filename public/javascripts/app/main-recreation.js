define(['jquery','fnbase','./controller/c-recreation','./model/m-recreation','./controller/c-page'],function($,fnbase,controller,model,cPage){
    var urlPath = fnbase.getRouterName();
	if(urlPath == "/recreation"){	//娱乐管理
		controller.getRecreationList(1,function(total){
			var pageSize = $("#pageSize").val();
			var buttons = $("#pageButton").val();
			cPage.createPage(pageSize,buttons,total,function(pageIndex){
				controller.getRecreationList(pageIndex,function(){});
			});
		});
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
			$("#pageHeader").html("娱乐 <small>添加</small>");
        }else if(urlType == "edit"){
        	controller.editRecreation(urlId);
			$("#pageHeader").html("娱乐 <small>修改</small>");
        }
	}else if(urlPath == "/recreation-type"){	//编辑类型
		$("#recreationSubmit").on("click",function(){
			controller.recreationTypeSubmit();
		});
		$("#pageBack").on("click",function(){
    		window.location.href="/recreation";
    	});
		$("#pageHeader").html("娱乐 <small>添加类型</small>");
	}
});