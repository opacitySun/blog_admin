define(['jquery','fnbase','bootstrap','./controller/c-user','./model/m-user'],function($,fnbase,bootstrap,controller,model){
	var staticPath = $("#staticPath").val();
    var urlPath = fnbase.getRouterName();
	if(urlPath == "/user"){	//用户管理
		controller.getUserList();
		$("#addUserButton").on("click",function(){
			window.location.href = "/user-edit?type=add";
		});	
	}else if(urlPath == "/user-edit"){	//用户编辑
		var requestGet = fnbase.GetRequest();
		var urlType = requestGet["type"];
        var urlId = requestGet["id"];
        if(urlType == "add"){
        	model.getUserTypeList(function(resType){	//获取用户权限
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
					$("#userType").append(html);
				}else{
					console.log(resType);
				}
			});
			model.getFairyTypeList(function(resFairy){	//获取精灵列表
				if(resFairy.success == 1){
					var html = "";
					$.each(resFairy.result,function(key,obj){
						html += '<div class="radio">';
						html += '<label>';
						html += '<input type="hidden" class="fairyName" value="'+obj.name+'" />';
						if(key > 0){
							html += '<input type="radio" name="fairyType" id="type'+obj.type+'" value="'+obj.type+'">'+obj.name;
						}else{
							html += '<input type="radio" name="fairyType" id="type'+obj.type+'" value="'+obj.type+'" checked>'+obj.name;
						}
						html += '</label>';
						html += '<img src="'+staticPath+obj.image+'" style="max-width:150px;height:auto;" />';
						html += '</div>';
					});
					$("#fairyName").parent().after(html);
				}else{
					console.log(resFairy);
				}
			});
			$("#userSubmit").on("click",function(){
				controller.userEditSubmit();
			});
			$("#pageBack").on("click",function(){
        		window.location.href="/user";
        	});
			$("#pageHeader").html("用户 <small>添加用户</small>");
        }else if(urlType == "edit_password"){
        	controller.editPassword(urlId);
        	$("#pageBack").on("click",function(){
        		window.location.href="/user";
        	});
			$("#pageHeader").html("用户 <small>修改密码</small>");
        }
	}else if(urlPath == "/user-info-edit"){	//用户信息编辑
		var requestGet = fnbase.GetRequest();
        var urlId = requestGet["id"];
        controller.editUserInfo(urlId);
        $("#userInfoSubmit").on("click",function(){
			controller.userInfoEditSubmit(urlId);
		});
		$("#pageBack").on("click",function(){
    		history.go(-1);
    	});
        $("#pageHeader").html("用户 <small>编辑用户详情</small>");
	}
});