
define(["./Base","fnbase","../model/m-index"],function(Base,fnbase,model){
	var cIndex = {
		//获取banner列表
		getBannerList : function(){
			model.getBannerList(function(res){
				html = "";
				$.each(res.result,function(key,obj){
					var objType,objPageTo,objIsShow;
					html += '<tr>';
					html += '<td>'+(key+1)+'</td>';
					html += '<td>'+obj.name+'</td>';
					switch(obj.type){
						case 1:
							objType = "轮播图";
							break;
						default:
							objType = "单张图";
					}
					html += '<td>'+objType+'</td>';
					switch(obj.pageTo){
						case 1:
							objPageTo = "作品列表页";
							break;
						default:
							objPageTo = "首页";
					}
					html += '<td>'+objPageTo+'</td>';
					switch(obj.isShow){
						case 1:
							objIsShow = "显示";
							break;
						default:
							objIsShow = "隐藏";
					}
					html += '<td>'+objIsShow+'</td>';
					html += '<td>'+fnbase.getSmpFormatDateByLong(obj.updateTime,false)+'</td>';
					html += '<td>';
					html += '<button type="button" class="btn btn-link">查看</button>';
					html += '<button type="button" class="btn btn-link">修改</button>';
					html += '<button type="button" class="btn btn-link">删除</button>';
					html += '</td>';
					html += '</tr>';
				});
				$("#bannerList").html(html);
				$("#bannerList td").css("vertical-align","center");
			});
		},
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
			if(confirm("确认提交新的banner数据吗？")){
				var flag = true;
				var formData = new FormData($("#bannerForm")[0]);
				if(flag == true){
					flag = false;
					model.addBannerData(formData,function(res){
		                if(res.success == 1){
		                    alert("提交成功");
							flag = true;
							window.location.href="/index-banner";
		                }else{
		                    alert("提交失败");
		                }
		            });
				}
			}
		}
	};

	return cIndex;
});