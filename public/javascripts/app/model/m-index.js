
define(["./Base"],function(Base){
	var modelBase = new Base();

	var mIndex = {
		//添加banner数据
		addBannerData : function(formData,callback){
			var url = "/addBannerAction";
			var data = formData;
			modelBase.postFormDataAjax(url,data,function(res){
				callback(res);
			});
		},
		//添加banner图片数据
		addBannerImageData : function(formData,callback){
			var url = "/addBannerImageAction";
			var data = formData;
			modelBase.postFormDataAjax(url,data,function(res){
				callback(res);
			});
		},
		//查找一个banner数据
		findOneBannerData : function(id,callback){
			var url = "/findOneBannerAction";
			var data = {"id":id};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//修改banner数据
		updateBannerData : function(id,jsonData,callback){
			var url = "/updateBannerAction";
			var data = {"id":id,"name":jsonData.name,"type":jsonData.type,"pageTo":jsonData.pageTo,"isShow":jsonData.isShow};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//删除banner数据
		deleteBannerData : function(id,callback){
			var url = "/deleteBannerAction";
			var data = {"id":id};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//删除banner图片数据
		deleteBannerImageData : function(id,callback){
			var url = "/deleteBannerImageAction";
			var data = {"id":id};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//获取banner列表
		getBannerList : function(callback){
			var url = "/getBannerListAction";
			var data = {};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		},
		//获取banner图片列表
		getBannerImageList : function(id,callback){
			var url = "/getBannerImageListAction";
			var data = {"id":id};
			modelBase.postAjax(url,data,function(res){
				callback(res);
			});
		}
	};

	return mIndex;
});