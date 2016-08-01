
define(['jquery','fnbase','bootstrap','./controller/c-index','./model/m-index'],function($,fnbase,bootstrap,controller,model){
    var urlPath = fnbase.getRouterName();
	if(urlPath == "/index-banner"){	//banner管理
		controller.getBannerList();
		$("#addBannerButton").on("click",function(){
			window.location.href = "/index-banner-edit";
		});
	}else if(urlPath == "/index-banner-edit"){	//banner编辑
		controller.addImgButtonShowByBannerType();
		controller.addImgFileUpload();
		$("#bannerSubmit").on("click",function(){
			controller.bannerEditSubmit();
		});
	}else{	//欢迎页
		$("#pageHeader").html("SUN Admin <small>欢迎来到孙博为的博客管理</small>");
	}
});