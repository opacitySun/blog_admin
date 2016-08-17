define(['jquery','fnbase','./controller/c-page','./model/m-page'],function($,fnbase,controller,model){
	var pageSize = 15,buttons = 10;
	var total = 15;
    controller.createPage(pageSize,buttons,total,func);
});