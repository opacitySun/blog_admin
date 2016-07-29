
define(["./Base"],function(Base){
	var modelBase = new Base();

	var mIndex = {
		//获取用户信息
		getUserInfo : function(callback){
			var url = "/userInfoFindAction";
			var data = {};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//获取作品列表
		getUserWorks : function(callback){
			var url = "/userWorksFindAction";
			var data = {};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//获取新闻列表
		getNewsList : function(callback){
			var url = "/newsListAction";
			var data = {};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		}
	};

	return mIndex;
});