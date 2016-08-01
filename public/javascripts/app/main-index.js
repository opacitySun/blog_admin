
define(['jquery','fnbase','bootstrap','./controller/c-index','./model/m-index'],function($,fnbase,bootstrap,controller,model){
    var urlPath = fnbase.getRouterName();
	if(urlPath == "/index-banner"){	//banner管理
		controller.getBannerList();
		$("#addBannerButton").on("click",function(){
			window.location.href = "/index-banner-edit?type=add";
		});
		$("button.banner_look").on("click",function(){
			var id = $(this).parent().find(".banner_id").val();
			window.location.href = "/index-banner-edit?type=look&id="+id;
		});
		$("button.banner_edit").each(function(key,obj){
			$(obj).on("click",function(){
				var id = $(this).parent().find(".banner_id").val();
				window.location.href = "/index-banner-edit?type=edit&id="+id;
			});
		});
		$("button.banner_delete").each(function(key,obj){
			$(obj).on("click",function(){
				var id = $(this).parent().find(".banner_id").val();
				controller.deleteBanner(id);
			});
		});
	}else if(urlPath == "/index-banner-edit"){	//banner编辑
		var requestGet = fnbase.GetRequest();
		var urlType = requestGet["type"];
        var urlId = requestGet["id"];
        if(urlType == "add"){
        	controller.addImgButtonShowByBannerType();
			controller.addImgFileUpload();
			$("#bannerSubmit").on("click",function(){
				controller.bannerEditSubmit();
			});
			$("#pageHeader").html("首页 <small>banner添加</small>");
        }else if(urlType == "look"){
        	controller.lookBanner(id);
        	$("#pageHeader").html("首页 <small>banner查看</small>");
        }else if(urlType == "edit"){
			$("#pageHeader").html("首页 <small>banner修改</small>");
        }
	}else{	//欢迎页
		$("#pageHeader").html("SUN Admin <small>欢迎来到孙博为的博客管理</small>");
	}
});