define(["./Base"],function(Base){
	var modelBase = new Base();

	var mFairy = {
		//获取精灵列表
		getFairyList : function(formData,callback){
			var url = "/fairyAllListFindAction";
			var data = {
				"currentPage":formData.currentPage,
				"pageSize":formData.pageSize
			};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//获取类型列表
		getFairyTypeList : function(formData,callback){
			var url = "/fairyTypeListFindAction";
			var data = {
				"currentPage":formData.currentPage,
				"pageSize":formData.pageSize
			};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//获取类型列表（无页码）
		getFairyTypeListNoFields : function(callback){
			var url = "/fairyTypeListFindNoFieldAction";
			var data = {};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//获取等级列表
		getFairyLevelList : function(callback){
			var url = "/fairyLevelListFindAction";
			var data = {};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//根据id获取精灵详情
		getFairyById : function(id,callback){
			var url = "/fairyFindByIdAction";
			var data = {"id":id};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//修改精灵信息
		editFairy : function(formData,callback){
			var url = "/updateFairyByIdAction";
			var data = {
				"id":formData.id,
				"name":formData.name,
				"type":formData.type,
				"level":formData.level,
				"exp":formData.exp
			};
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
		deleteFairyType : function(id,callback){
			var url = "/deleteFairyTypeAction";
			var data = {"id":id};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		}
	};

	return mFairy;
});