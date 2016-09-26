define(['jquery','fnbase','ZeroClipboard','../model/m-news'], function($,fnbase,ZeroClipboard,model) {
	window['ZeroClipboard']=ZeroClipboard;
	var staticPath = $("#staticPath").val();

	var cNews = {
		//获取新闻列表
        getNewsList : function(currentPage,callback){
        	var pageSize = $("#pageSize").val();
        	var formData = {
        		"currentPage":currentPage,
				"pageSize":pageSize
        	};
        	model.getNewsList(formData,function(res){
        		html = "";
        		$.each(res.result,function(key,obj){
        			html += '<tr>';
        			html += '<td>'+Number(((currentPage-1)*pageSize)+(key+1))+'</td>';
        			html += '<td>'+obj.name+'</td>';
        			html += '<td>'+obj.typeName+'</td>';
        			html += '<td>'+fnbase.getSmpFormatDateByLong(obj.updateTime,true)+'</td>';
        			html += '<td>';
					html += '<input type="hidden" class="news_id" value="'+obj._id.toString()+'" />';
					html += '<button type="button" class="btn btn-link news_edit">编辑</button>';
					html += '<button type="button" class="btn btn-link news_delete">删除</button>';
					html += '</td>';
        			html += '</tr>';
        		});
        		$("#newsList").html(html);
        		$("button.news_edit").on("click",function(){
					var id = $(this).parent().find(".news_id").val();
					window.location.href = "/news-edit?type=edit&&id="+id;
				});
				$("button.news_delete").on("click",function(){
					var id = $(this).parent().find(".news_id").val();
					cNews.deleteNews(id);
				});
				callback(res.total);
        	});
        },
        //获取类型列表
        getNewsTypeList : function(){
        	model.getNewsTypeList(function(res){
        		html = "";
        		$.each(res.result,function(key,obj){
        			html += '<tr>';
        			html += '<td>'+Number(key+1)+'</td>';
        			html += '<td>'+obj.name+'</td>';
        			html += '<td>'+fnbase.getSmpFormatDateByLong(obj.updateTime,true)+'</td>';
        			html += '<td>';
					html += '<input type="hidden" class="news_type_id" value="'+obj._id.toString()+'" />';
					html += '<button type="button" class="btn btn-link news_type_edit">编辑</button>';
					html += '<button type="button" class="btn btn-link news_type_delete">删除</button>';
					html += '</td>';
        			html += '</tr>';
        		});
        		$("#newsTypeList").html(html);
        		$("button.news_type_edit").on("click",function(){
					var id = $(this).parent().find(".news_type_id").val();
					window.location.href = "/news-type-edit?type=edit&&id="+id;
				});
				$("button.news_type_delete").on("click",function(){
					var id = $(this).parent().find(".news_type_id").val();
					cNews.deleteNewsType(id);
				});
        	});
        },
        //编辑文章
        editNews : function(id){
        	model.getNewsById(id,function(res){
        		model.getNewsTypeList(function(resType){	//获取类型
					if(resType.success == 1){
						var html = "";
						$.each(resType.result,function(key,obj){
							html += '<option value="'+obj.type+'">'+obj.name+'</option>';
						});
						$("#newsType").append(html);
						$("#newsId").val(id);
						$("#newsName").val(res.result.name);
						$("#newsType").val(res.result.type);
		        		$("#newsType").find("option[value='"+res.result.type+"']").attr("selected",true);
		        		UE.getEditor('descEditor').setContent(decodeURI(res.result.desc));
		        		$("#desc").val(decodeURI(res.result.desc));
		        		$("#newsSubmit").on("click",function(){
							cNews.newsEditSubmit();
						});
					}else{
						console.log(resType);
					}
				});
        	});
        },
        //编辑类型
        editNewsType : function(id){
        	model.getNewsTypeById(id,function(res){
        		$("#newsTypeId").val(id);
        		$("#typeName").val(res.result.name);
        		$("#newsSubmit").on("click",function(){
					cNews.newsTypeSubmit();
				});
        	});
        },
        //提交消息新闻
        newsEditSubmit : function(){
        	var newsName = $("#newsName").val();
			if(newsName == ''){
				$("#newsName").parent().addClass("has-error has-feedback").find(".help-block").text("名称不能为空");
				return false;
			}
			var desc = UE.getEditor('descEditor').getContent();
			$("#desc").val(encodeURI(desc));
			if(confirm("确认提交数据吗？")){
				var flag = true;
				var formData = new FormData($("#newsForm")[0]);
				if(flag == true){
					flag = false;
					model.editNews(formData,function(res){
		                if(res.success == 1){
		                    alert("提交成功");
							flag = true;
							history.go(-1);
		                }else{
		                    alert(res.flag);
		                }
		            });
				}
			}
        },
        //类型提交
        newsTypeSubmit : function(){
        	var newsTypeId = $("#newsTypeId").val();
        	var typeName = $("#typeName").val();
			if(typeName == ''){
				$("#typeName").parent().addClass("has-error has-feedback").find(".help-block").text("名称不能为空");
				return false;
			}
			if(confirm("确认提交新的数据吗？")){
				var flag = true;
				var formData = {
					"id":newsTypeId,
					"name":typeName
				};
				if(flag == true){
					flag = false;
					model.editNewsType(formData,function(res){
		                if(res.success == 1){
		                    alert("提交成功");
							flag = true;
							window.location.href = "/news-type";
		                }else{
		                    alert(res.flag);
		                }
		            });
				}
			}
        },
        //删除新闻
        deleteNews : function(id){
        	if(confirm("确认删除该数据吗？")){
				var flag = true;
				if(flag == true){
					flag = false;
					model.deleteNews(id,function(res){
						if(res.success == 1){
		                    alert("删除成功");
							flag = true;
							window.location.href="/news";
		                }else{
		                    alert(res.flag);
		                }
					});
				}
			}
        },
        //删除类型
        deleteNewsType : function(id){
        	if(confirm("确认删除该数据吗？")){
				var flag = true;
				if(flag == true){
					flag = false;
					model.deleteNewsType(id,function(res){
						if(res.success == 1){
		                    alert("删除成功");
							flag = true;
							window.location.href="/news-type";
		                }else{
		                    alert(res.flag);
		                }
					});
				}
			}
        }
	};

	return cNews;
});