define(['jquery','fnbase','ueditor','./controller/c-study','./model/m-study','./controller/c-page'],function($,fnbase,ueditor,controller,model,cPage){
    var urlPath = fnbase.getRouterName();
	if(urlPath == "/study"){	//分享文章管理
		controller.getStudyList(1,function(total){
			var pageSize = $("#pageSize").val();
			var buttons = $("#pageButton").val();
			cPage.createPage(pageSize,buttons,total,function(pageIndex){
				controller.getStudyList(pageIndex);
			});
		});
		$("#addButton").on("click",function(){
			window.location.href = "/study-edit?type=add";
		});	
	}else if(urlPath == "/study-edit"){	//编辑详情
		var requestGet = fnbase.GetRequest();
		var urlType = requestGet["type"];
        var urlId = requestGet["id"];
        var ue = UE.getEditor('articleEditor');
		$("#pageBack").on("click",function(){
    		window.location.href="/study";
    	});
        if(urlType == "add"){
        	model.getStudyTypeList(function(resType){	//获取分享文章类型
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
					$("#studyType").append(html);
				}else{
					console.log(resType);
				}
			});
			$("#studySubmit").on("click",function(){
				controller.studyEditSubmit();
			});
			$("#pageHeader").html("学习分享 <small>添加文章</small>");
        }else if(urlType == "edit"){
        	controller.editStudy(urlId);
			$("#pageHeader").html("学习分享 <small>修改文章</small>");
        }
	}else if(urlPath == "/study-type"){	//编辑类型
		var requestGet = fnbase.GetRequest();
		var urlType = requestGet["type"];
        var urlId = requestGet["id"];
        if(urlType == "add"){
        	$("#studySubmit").on("click",function(){
				controller.studyTypeSubmit();
			});
			$("#pageBack").on("click",function(){
	    		window.location.href="/study";
	    	});
			$("#pageHeader").html("学习分享 <small>添加类型</small>");
        }	
	}
});