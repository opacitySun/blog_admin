
define(["./Base"],function(Base){
	var modelBase = new Base();

	var mIndex = {
		//添加banner数据
		addBannerData : function(formData,callback){
			var url = "/addBannerAction";
			var data = formData;
			Base.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//获取banner列表
		getBannerList : function(callback){
			var url = "/getBannerListAction";
			var data = {};
			Base.postAjax(url,data,function(res){
				callback(res);
			});
		}
	};

	return mIndex;
});