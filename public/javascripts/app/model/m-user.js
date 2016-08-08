define(["./Base"],function(Base){
	var modelBase = new Base();

	var mUser = {
		//获取用户列表
		getUserList : function(callback){
			var url = "/outerUserListAction";
			var data = {};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//删除用户
		deleteUser : function(id,callback){
			var url = "/outerDeleteUserAction";
			var data = {"id":id};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		}
	};

	return mUser;
});