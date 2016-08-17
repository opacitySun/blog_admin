define(['require','jquery','fnbase','./controller/c-page','./model/m-page'],function(require,$,fnbase,controller,model){
	var pageSize = $("#pageSize").val();
	var buttons = 10;
	var total = $("#dataTotal").val();
	var func = function(currentPage){
		alert(currentPage);
	};
    controller.createPage(pageSize,buttons,total,func);
});