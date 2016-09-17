define(["./Base"],function(Base){
	var modelBase = new Base();

	var mWorks = {
		//获取作品列表
		getWorksList : function(formData,callback){
			var url = "/worksAllListFindAction";
			var data = {
				"currentPage":formData.currentPage,
				"pageSize":formData.pageSize
			};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//根据id获取作品信息
		getWorkById : function(id,callback){
			var url = "/getWorkByIdAction";
			var data = {"id":id};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//修改作品信息（无图片时）
		editWorkNoImg : function(formData,callback){
			var url = "/updateWorkByIdAction";
			var data = {
				"id":formData.id,
				"workName":formData.workName,
				"workUrl":formData.workUrl,
				"workDesc":formData.workDesc,
				"type":formData.type,
				"status":formData.status,
				"userId":formData.userId
			};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//添加或修改作品信息
		editWork : function(formData,callback){
			var url = "/editWorkAction";
			var data = formData;
			modelBase.postFormDataAjax(url,data,function(res){
				callback(res);
			});
		},
		//删除作品
		deleteWork : function(id,callback){
			var url = "/deleteWorkAction";
			var data = {"id":id};
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
		}
	};

	return mWorks;
});