define(["./Base"],function(Base){
	var modelBase = new Base();

	var mRecreation = {
		//获取娱乐列表
		getRecreationList : function(callback){
			var url = "/recreationAllListFindAction";
			var data = {};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//获取娱乐类型
		getRecreationTypeList : function(callback){
			var url = "/recreationTypeListFindAction";
			var data = {};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//根据id获取文章内容
		getRecreationById : function(id,callback){
			var url = "/recreationFindByIdAction";
			var data = {"id":id};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//添加或修改
		editRecreation : function(formData,callback){
			var url = "/editRecreationAction";
			var data = formData;
			modelBase.postFormDataAjax(url,data,function(res){
				callback(res);
			});
		},
		//修改（无图片时）
		editRecreationNoImg : function(formData,callback){
			var url = "/updateRecreationByIdAction";
			var data = {
				"id":formData.id,
				"name":formData.name,
				"url":formData.url,
				"type":formData.type,
				"desc":formData.desc
			};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//添加或修改类型
		editRecreationType : function(formData,callback){
			var url = "/editRecreationTypeAction";
			var data = {"name":formData.name};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//删除
		deleteRecreation : function(id,callback){
			var url = "/deleteRecreationAction";
			var data = {"id":id};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		}
	};

	return mRecreation;
});