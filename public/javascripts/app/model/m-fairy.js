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
		//获取等级列表
		getFairyLevelList : function(formData,callback){
			var url = "/fairyLevelListFindAction";
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
		//获取等级列表（无页码）
		getFairyLevelListNoField : function(callback){
			var url = "/fairyTypeListFindNoFieldAction";
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
		//根据id获取精灵类型详情
		getFairyTypeById : function(id,callback){
			var url = "/fairyTypeFindByIdAction";
			var data = {"id":id};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//根据id获取等级详情
		getFairyLevelById : function(id,callback){
			var url = "/fairyLevelFindByIdAction";
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
		//添加或修改类型
		editFairyType : function(formData,callback){
			var url = "/editFairyTypeAction";
			var data = formData;
			modelBase.postFormDataAjax(url,data,function(res){
				callback(res);
			});
		},
		//修改类型（无图片时）
		editFairyTypeNoImg : function(formData,callback){
			var url = "/updateFairyTypeByIdAction";
			var data = {
				"id":formData.id,
				"name":formData.name,
				"desc":formData.desc
			};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//添加等级
		addFairyLevel : function(formData,callback){
			var url = "/addFairyLevelAction";
			var data = {
				"level":formData.level,
				"exp":formData.exp
			};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//修改等级
		editFairyLevel : function(formData,callback){
			var url = "/updateFairyLevelByIdAction";
			var data = {
				"id":formData.id,
				"level":formData.level,
				"exp":formData.exp
			};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//删除类型
		deleteFairyType : function(id,callback){
			var url = "/deleteFairyTypeAction";
			var data = {"id":id};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//删除等级
		deleteFairyLevel : function(id,callback){
			var url = "/deleteFairyLevelAction";
			var data = {"id":id};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		}
	};

	return mFairy;
});