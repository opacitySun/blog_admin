define(['jquery','fnbase','bootstrap','./controller/c-menu','./model/m-menu'],function($,fnbase,bootstrap,controller,model){
	//添加选中样式
    controller.liActive();
    //改变页面标题
    controller.updateTitle();
});