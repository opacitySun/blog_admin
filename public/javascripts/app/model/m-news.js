define(["./Base"],function(Base){
	var modelBase = new Base();

	var mNews = {
		//获取分享文章列表
		getNewsList : function(formData,callback){
			var url = "/newsAllListFindAction";
			var data = {
				"currentPage":formData.currentPage,
				"pageSize":formData.pageSize
			};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//获取新闻类型
		getNewsTypeList : function(callback){
			var url = "/newsTypeListFindAction";
			var data = {};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//根据id获取文章内容
		getNewsById : function(id,callback){
			var url = "/newsFindByIdAction";
			var data = {"id":id};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//根据id获取类型
		getNewsTypeById : function(id,callback){
			var url = "/newsTypeFindByIdAction";
			var data = {"id":id};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//添加或修改新闻消息
		editNews : function(formData,callback){
			var url = "/editNewsAction";
			var data = formData;
			modelBase.postFormDataAjax(url,data,function(res){
				callback(res);
			});
		},
		//添加或修改类型
		editNewsType : function(formData,callback){
			var url = "/editNewsTypeAction";
			var data = {"id":formData.id,"name":formData.name};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//删除新闻消息
		deleteNews : function(id,callback){
			var url = "/deleteNewsAction";
			var data = {"id":id};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//删除类型
		deleteNewsType : function(id,callback){
			var url = "/deleteNewsTypeAction";
			var data = {"id":id};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		}
	};

	return mNews;
});