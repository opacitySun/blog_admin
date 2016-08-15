define(["./Base"],function(Base){
	var modelBase = new Base();

	var mNews = {
		//获取分享文章列表
		getNewsList : function(callback){
			var url = "/newsAllListFindAction";
			var data = {};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//获取分享文章类型
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
		//添加或修改新闻消息
		editNews : function(formData,callback){
			var url = "/editNewsAction";
			var data = {
				"newsId":formData.newsId,
				"name":formData.name,
				"type":formData.type,
				"desc":formData.desc
			};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//添加或修改类型
		editNewsType : function(formData,callback){
			var url = "/editNewsTypeAction";
			var data = {"name":formData.name};
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
		}
	};

	return mNews;
});