
define(['./Base'],function(Base){
	var modelBase = new Base();

	var mLogin = {
		//查找用户
		findUser : function(username,pwd,callback){
			var url = "/outerUserFindAction";
			var data = {"name":username,"password":pwd};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		}
	};

	return mLogin;
});