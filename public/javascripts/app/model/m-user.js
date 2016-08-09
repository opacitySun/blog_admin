define(["./Base"],function(Base){
	var modelBase = new Base();

	var mUser = {
		//添加user
		addUser : function(formData,callback){
			var url = "/outerAddUserAction";
			var data = {"name":formData.name,"password":formData.password};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//添加userInfo
		editUserInfo : function(formData,callback){
			var url = "/outerEditUserInfoAction";
			var data = formData;
			modelBase.postFormDataAjax(url,data,function(res){
				callback(res);
			});
		},
		//获取用户列表
		getUserList : function(callback){
			var url = "/outerUserListAction";
			var data = {};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//获取单个用户
		getUserById : function(id,callback){
			var url = "/outerUserFindByIdAction";
			var data = {"id":id};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//获取用户信息
		getUserInfo : function(id,callback){
			var url = "/outerUserInfoFindAction";
			var data = {"id":id};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//修改用户密码
		updateUserPwd : function(id,pwd,callback){
			var url = "/outerUpdateUserPwdAction";
			var data = {"id":id,"password":pwd};
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