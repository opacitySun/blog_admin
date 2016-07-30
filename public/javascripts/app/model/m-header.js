define(['./Base'],function(Base){
	var modelBase = new Base();

	var mHeader = {
		//查找用户
		getSession : function(callback){
			var url = "/outerGetSessionAction";
			var data = {};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//查找用户
		findUser : function(username,pwd,callback){
			var url = "/outerUserFindAction";
			var data = {"name":username,"password":pwd};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//查找用户信息
		findUserInfo : function(userId,callback){
			var url = "/outerUserFindAction";
			var data = {"userId":userId};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		}
	};

	return mHeader;
});