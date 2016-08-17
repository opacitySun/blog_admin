define(['./Base','jquery','fnbase','pagination'], function (Base,$,fnbase,pagination) {
    var cPage = {
        //创建分页
        createPage : function(pageSize,buttons,total,func){
        	$(".pagination").jBootstrapPage({
	            pageSize : pageSize,  //每页显示条数
	            total : total,  //一共多少条
	            maxPageButton:buttons,  //最大显示几个按钮
	            pageInfo:true,  //显示分页信息
	            onPageClicked: function(obj, pageIndex) {
	                if(fnbase.isFunc(func)){
	                    func(pageIndex+1);
	                }
	            }
	        });
        }
    };

    return cPage;
});