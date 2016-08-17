define(['jquery','fnbase','./controller/c-page','./model/m-page'],function($,fnbase,controller,model){
	var pageSize = 15,buttons = 10;
	var total = 150;
	var func = function(){alert(1);};
    controller.createPage(pageSize,buttons,total,func);
});