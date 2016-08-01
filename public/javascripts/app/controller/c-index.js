
define(["./Base","jquery","fnbase","../model/m-index"],function(Base,$,fnbase,model){
	var blogPath = $("#blogPath").val();

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
					html += '<input type="hidden" class="banner_id" value="'+obj._id.toString()+'" />';
					html += '<button type="button" class="btn btn-link banner_look">查看</button>';
					html += '<button type="button" class="btn btn-link banner_edit">修改</button>';
					html += '<button type="button" class="btn btn-link banner_delete">删除</button>';
					html += '</td>';
					html += '</tr>';
				});
				$("#bannerList").html(html);
				$("button.banner_look").on("click",function(){
					var id = $(this).parent().find(".banner_id").val();
					window.location.href = "/index-banner-edit?type=look&id="+id;
				});
				$("button.banner_edit").on("click",function(){
					var id = $(this).parent().find(".banner_id").val();
					window.location.href = "/index-banner-edit?type=edit&id="+id;
				});
				$("button.banner_delete").on("click",function(){
					var id = $(this).parent().find(".banner_id").val();
					controller.deleteBanner(id);
				});
			});
		},
		//根据banner类型判断添加按钮是否显示
		addImgButtonShowByBannerType : function(){
			$("#bannerType .radio label").on("click",function(){
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
		},
		//查看banner
		lookBanner : function(id){
			model.findOneBannerData(id,function(res){
				if(res.success == 1){
					$("#bannerName").val(res.result.name);
					$("input[name='bannerType']").prop("checked",false);
					$("input[id='bannerType"+res.result.type+"']").prop("checked",true);
					$("input[name='pageTo']").prop("checked",false);
					$("input[id='pageTo"+res.result.pageTo+"']").prop("checked",true);
					$("input[name='isShow']").prop("checked",false);
					$("input[id='isShow"+res.result.pageTo+"']").prop("checked",true);
					$("#imageUpload").remove();
					var imgHtml = "";
					imgHtml += '<div class="form-group banner_image">';
					imgHtml += '<label>图片</label>';
					imgHtml += '<p>';
					$.each(res.result.images,function(key,obj){
						imgHtml += '<img src="'+blogPath+obj+'">';
					});
					imgHtml += '</p>';
					imgHtml += '</div>';
					$("#bannerForm").append(imgHtml);
					$("#bannerSubmit").remove();
					$("#bannerReset").remove();
					var formHtml = $("#bannerForm").html();
					$("#bannerForm").html("<fieldset disabled>"+formHtml+"</fieldset>");
	            }else{
	                alert("查找失败");
	            }
            });
		},
		//删除banner
		deleteBanner : function(id){
			if(confirm("确认删除该数据吗？")){
				var flag = true;
				if(flag == true){
					flag = false;
					model.deleteBannerData(id,function(res){
						if(res.success == 1){
		                    alert("删除成功");
							flag = true;
							window.location.href="/index-banner";
		                }else{
		                    alert("删除失败");
		                }
					});
				}
			}
		}
	};

	return cIndex;
});