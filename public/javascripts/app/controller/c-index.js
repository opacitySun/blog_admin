
define(["./Base"],function(Base){
	var cIndex = {
		//根据banner类型判断添加按钮是否显示
		addImgButtonShowByBannerType : function(){
			$("#bannerType .radio").on("click",function(){
				var bannerTypeVal = $(this).find("input[type='radio']").val();
				if(bannerTypeVal == 0){	//单张图
					$("#imageUpload span").hide();
				}else{	//轮播图
					$("#imageUpload span").show();
				}
			});
		},
		//添加图片上传控件
		addImgFileUpload : function(){
			$("#imageUpload span").on("click",function(){
				$("#imageUpload").append('<input type="file" name="bannerImg" />');
			});
		},
		//banner图管理提交
		bannerEditSubmit : function(){
			var bannerName = $("#bannerName").val();
			if(bannerName == ''){
				$("#bannerName").parent().addClass("has-warning has-feedback").find(".help-block").text("banner名称不能为空");
				return false;
			}
			var imgLen = $(".bannerImg").length;
			if(imgLen <= 1 && $(".bannerImg")[0].val() == ''){
				alert("请上传至少一张图片");
				return false;
			}
		}
	};

	return cIndex;
});