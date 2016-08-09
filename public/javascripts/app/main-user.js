define(['jquery','fnbase','bootstrap','./controller/c-user','./model/m-user'],function($,fnbase,bootstrap,controller,model){
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
			$("#userSubmit").on("click",function(){
				controller.userEditSubmit();
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