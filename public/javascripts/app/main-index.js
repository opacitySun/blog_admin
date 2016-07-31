
define(['jquery','fnbase','bootstrap','./controller/c-index','./model/m-index'],function($,fnbase,bootstrap,controller,model){
	var url = window.location.href;
	if(fnbase.inString("/index-banner",url)){	//banner管理
		
	}else{	//欢迎页
		$("#pageHeader").html("SUN Admin <small>欢迎来到孙博为的博客管理</small>");
	}
});