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
		findUserInfo : function(id,callback){
			var url = "/outerUserInfoFindAction";
			var data = {"id":id};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		}
	};

	return mHeader;
});