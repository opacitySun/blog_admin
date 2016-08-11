define(["./Base"],function(Base){
	var modelBase = new Base();

	var mStudy = {
		//获取分享文章列表
		getStudyList : function(callback){
			var url = "/studyAllListFindAction";
			var data = {};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//获取分享文章类型
		getStudyTypeList : function(callback){
			var url = "/studyTypeListFindAction";
			var data = {};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//删除分享资料
		deleteStudy : function(id,callback){
			var url = "/deleteStudyAction";
			var data = {"id":id};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		}
	};

	return mStudy;
});