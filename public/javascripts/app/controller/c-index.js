
define(["./Base"],function(Base){
	var cIndex = {
		//根据banner类型判断添加按钮是否显示
		addImgButtonShowByBannerType : function(){
			$("input[name='bannerType']").on("click",function(){
				var bannerTypeVal = $("input[name='bannerType']").val();
				if(bannerTypeVal == 0){	//单张图
					$(".image_upload span").hide();
				}else{	//轮播图
					$(".image_upload span").show();
				}
			});
		}
	};

	return cIndex;
});