define(['jquery','fnbase','editor','./controller/c-study','./model/m-study'],function($,fnbase,editor,controller,model){
    var urlPath = fnbase.getRouterName();
	if(urlPath == "/study"){	//分享文章管理
		controller.getStudyList();
		$("#addButton").on("click",function(){
			window.location.href = "/study-edit?type=add";
		});	
	}else if(urlPath == "/study-edit"){	//编辑详情
		var requestGet = fnbase.GetRequest();
		var urlType = requestGet["type"];
        var urlId = requestGet["id"];
        $("#article").Editor();
        model.getStudyTypeList(function(resType){	//获取分享文章类型
			if(resType.success == 1){
				var html = "";
				$.each(resType.result,function(key,obj){
					html += '<div class="radio">';
					html += '<label>';
					if(key > 0){
						html += '<input type="radio" name="type" value="'+obj.type+'">'+obj.name;
					}else{
						html += '<input type="radio" name="type" value="'+obj.type+'" checked>'+obj.name;
					}
					html += '</label>';
					html += '</div>';
				});
				$("#studyType").append(html);
			}else{
				console.log(resType);
			}
		});
        if(urlType == "add"){
			$("#studySubmit").on("click",function(){
				controller.studyEditSubmit();
			});
			$("#pageHeader").html("学习分享 <small>添加文章</small>");
        }else if(urlType == "edit"){
        	controller.editStudy(urlId);
        	$("#pageBack").on("click",function(){
        		window.location.href="/study";
        	});
			$("#pageHeader").html("学习分享 <small>修改文章</small>");
        }
	}else if(urlPath == "/study-type"){	//编辑类型
		var requestGet = fnbase.GetRequest();
		var urlType = requestGet["type"];
        var urlId = requestGet["id"];
        if(urlType == "add"){
			$("#studySubmit").on("click",function(){
				controller.studyEditSubmit();
			});
			$("#pageHeader").html("学习分享 <small>添加类型</small>");
        }else if(urlType == "edit"){
        	controller.editWorks(urlId);
        	$("#pageBack").on("click",function(){
        		window.location.href="/works";
        	});
			$("#pageHeader").html("学习分享 <small>修改类型</small>");
        }
	}
});