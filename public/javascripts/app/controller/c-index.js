
define(["./Base","jquery","fnbase","../model/m-index"],function(Base,$,fnbase,model){
	var staticPath = $("#staticPath").val();

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
					cIndex.deleteBanner(id);
				});
			});
		},
		//获取banner图片列表
		getBannerImageList : function(id){
			model.getBannerImageList(id,function(res){
				html = "";
				$.each(res.result,function(key,obj){
					html += '<tr>';
					html += '<td>'+(key+1)+'</td>';
					html += '<td>'+obj.name+'</td>';
					html += '<td><a target="_blank" href="'+staticPath+obj.url+'">'+staticPath+obj.url+'</a></td>';
					html += '<td>'+fnbase.getSmpFormatDateByLong(obj.updateTime,false)+'</td>';
					html += '<td>';
					html += '<input type="hidden" class="image_id" value="'+obj._id.toString()+'" />';
					html += '<button type="button" class="btn btn-link image_delete">删除</button>';
					html += '</td>';
					html += '</tr>';
				});
				$("#bannerImageList").html(html);
				$("#addBannerImageButton").on("click",function(){
					window.location.href = "/banner-image-edit?id="+id;
				});
				$("button.image_delete").on("click",function(){
					var id = $(this).parent().find(".banner_id").val();
					cIndex.deleteBannerImage(id);
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
		//banner图管理提交
		bannerImageEditSubmit : function(){
			var bannerImageName = $("#bannerImageName").val();
			if(bannerImageName == ''){
				$("#bannerImageName").parent().addClass("has-warning has-feedback").find(".help-block").text("名称不能为空");
				return false;
			}
			var files = $("input[name='bannerImg']").prop("files");
			if(files.length == 0){
				alert("请上传图片");
				return false;
			}
			if(confirm("确认提交新的banner数据吗？")){
				var flag = true;
				var formData = new FormData($("#bannerImageForm")[0]);
				//formData.append("file",files[0]);
				if(flag == true){
					flag = false;
					model.addBannerImageData(formData,function(res){
		                if(res.success == 1){
		                    alert("提交成功");
							flag = true;
							history.go(-1);
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
					var formHtml = $("#bannerForm").html();
					$("#bannerForm").html("<fieldset disabled>"+formHtml+"</fieldset>");
					$("#bannerName").val(res.result.name);
					$("input[name='bannerType']").prop("checked",false);
					$("input[id='bannerType"+res.result.type+"']").prop("checked",true);
					$("input[name='pageTo']").prop("checked",false);
					$("input[id='pageTo"+res.result.pageTo+"']").prop("checked",true);
					$("input[name='isShow']").prop("checked",false);
					$("input[id='isShow"+res.result.isShow+"']").prop("checked",true);
					$("#imageUpload").remove();
					var imgHtml = "";
					imgHtml += '<div class="form-group banner_image">';
					imgHtml += '<label>图片</label>';
					imgHtml += '<p>';
					$.each(res.result.images,function(key,obj){
						imgHtml += '<img src="'+staticPath+obj+'">';
					});
					imgHtml += '</p>';
					imgHtml += '</div>';
					$("#bannerForm").append(imgHtml);
					$("#bannerSubmit").remove();
					$("#bannerReset").remove();
					$("#bannerForm").append('<button type="button" id="pageBack" class="btn btn-info">返回</button>');
					$("#pageBack").on("click",function(){
						history.go(-1);
					});
	            }else{
	                alert("查找失败");
	            }
            });
		},
		//编辑banner
		editBanner : function(id){
			model.findOneBannerData(id,function(res){
				if(res.success == 1){
					$("#bannerName").val(res.result.name);
					$("input[name='bannerType']").prop("checked",false);
					$("input[id='bannerType"+res.result.type+"']").prop("checked",true);
					$("input[name='pageTo']").prop("checked",false);
					$("input[id='pageTo"+res.result.pageTo+"']").prop("checked",true);
					$("input[name='isShow']").prop("checked",false);
					$("input[id='isShow"+res.result.isShow+"']").prop("checked",true);
					$("#bannerSubmit").remove();
					$("#imageUpload").remove();
					var imgHtml = "";
					imgHtml += '<div class="form-group banner_image">';
					imgHtml += '<label>图片</label>';
					imgHtml += '<span id="bannerImageEdit" style="margin-left:20px;cursor:pointer;">';
					imgHtml += '<i class="fa fa-pencil-square"></i>编辑图片';
					imgHtml += '</span>';
					imgHtml += '<p>';
					$.each(res.result.images,function(key,obj){
						imgHtml += '<img src="'+staticPath+obj+'">';
					});
					imgHtml += '</p>';
					imgHtml += '</div>';
					$("#bannerForm").append(imgHtml);
					$("#bannerReset").remove();
					$("#bannerForm").append('<button type="button" id="bannerSubmit" class="btn btn-primary">提交</button>');
					$("#bannerForm").append('<button type="button" id="pageBack" class="btn btn-info">返回</button>');
					$("#bannerImageEdit").on("click",function(){
						window.location.href="/index-banner-image?id="+id;
					});
					$("#bannerSubmit").on("click",function(){
						cIndex.updateBanner(id);
					});
					$("#pageBack").on("click",function(){
						history.go(-1);
					});
	            }else{
	                alert("查找失败");
	            }
            });
		},
		//修改banner
		updateBanner : function(id){
			var bannerName = $("#bannerName").val();
			if(bannerName == ''){
				$("#bannerName").parent().addClass("has-warning has-feedback").find(".help-block").text("banner名称不能为空");
				return false;
			}
			var bannerType = $("input[name='bannerType']:checked").val();
			var pageTo = $("input[name='pageTo']:checked").val();
			var isShow = $("input[name='isShow']:checked").val();
			var data = {"name":bannerName,"type":bannerType,"pageTo":pageTo,"isShow":isShow};
			var flag = true;
			if(flag == true){
				flag = false;
				model.updateBannerData(id,data,function(res){
					if(res.success == 1){
	                    alert("修改成功");
						flag = true;
						window.location.href="/index-banner";
	                }else{
	                    alert("修改失败");
	                }
				});
			}
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
							history.go(-1);
		                }else{
		                    alert("删除失败");
		                }
					});
				}
			}
		},
		//删除banner图片
		deleteBannerImage : function(id){
			if(confirm("确认删除该数据吗？")){
				var flag = true;
				if(flag == true){
					flag = false;
					model.deleteBannerImageData(id,function(res){
						if(res.success == 1){
		                    alert("删除成功");
							flag = true;
							history.go(-1);
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