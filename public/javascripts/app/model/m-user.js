define(["./Base"],function(Base){
	var modelBase = new Base();

	var mUser = {
		//添加user
		addUser : function(formData,callback){
			var url = "/outerAddUserAction";
			var data = {
				"name":formData.name,
				"password":formData.password,
				"type":formData.type,
				"fairyName":formData.fairyName,
				"fairyType":formData.fairyType
			};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//获取用户权限列表
		getUserTypeList : function(callback){
			var url = "/outerUserTypeListFindAction";
			var data = {};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//获取精灵列表
		getFairyTypeList : function(callback){
			var url = "/outerFairyTypeListFindAction";
			var data = {};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//添加修改userInfo
		editUserInfo : function(formData,callback){
			var url = "/outerEditUserInfoAction";
			var data = formData;
			modelBase.postFormDataAjax(url,data,function(res){
				callback(res);
			});
		},
		//添加修改userInfo,且不修改图片
		editUserInfoNoImg : function(formData,callback){
			var url = "/outerEditUserInfoNoImgAction";
			var data = {"userId":formData.userId,"name":formData.name,"desc":formData.desc};
			modelBase.postAjax(url,data,function(res){
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
		updateUserPwd : function(formData,callback){
			var url = "/outerUpdateUserPwdAction";
			var data = {"id":formData.id,"password":formData.password,"type":formData.type};
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