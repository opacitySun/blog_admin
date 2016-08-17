define(['jquery','fnbase','./controller/c-page','./model/m-page'],function($,fnbase,controller,model){
	var pageSize = 15,buttons = 10;
	var total = 150;
	var func = function(num){alert(num);};
    controller.createPage(pageSize,buttons,total,func);
});