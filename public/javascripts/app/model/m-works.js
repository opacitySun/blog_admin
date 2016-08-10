define(["./Base"],function(Base){
	var modelBase = new Base();

	var mWorks = {
		//获取作品列表
		getWorksList : function(callback){
			var url = "/worksAllListFindAction";
			var data = {};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		}
	};

	return mWorks;
});