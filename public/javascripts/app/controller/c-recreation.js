define(["./Base","jquery","fnbase","../model/m-recreation"], function (Base,$,fnbase,model) {
	var staticPath = $("#staticPath").val();

	var cRecreation = {
		//获取用户列表
        getRecreationList : function(){
        	model.getRecreationList(function(res){
        		html = "";
        		$.each(res.result,function(key,obj){
        			html += '<tr>';
        			html += '<td>'+(key+1)+'</td>';
        			html += '<td>'+obj.name+'</td>';
        			html += '<td>'+obj.typeName+'</td>';
        			html += '<td><img style="width:50px;height:auto;" src="'+staticPath+obj.image+'" /></td>';
        			html += '<td>'+fnbase.getSmpFormatDateByLong(obj.updateTime,false)+'</td>';
        			html += '<td>';
					html += '<input type="hidden" class="recreation_id" value="'+obj._id.toString()+'" />';
					html += '<button type="button" class="btn btn-link recreation_edit">编辑</button>';
					html += '<button type="button" class="btn btn-link recreation_delete">删除</button>';
					html += '</td>';
        			html += '</tr>';
        		});
        		$("#recreationList").html(html);
        		$("button.recreation_edit").on("click",function(){
					var id = $(this).parent().find(".recreation_id").val();
					window.location.href = "/recreation-edit?type=edit&&id="+id;
				});
				$("button.recreation_delete").on("click",function(){
					var id = $(this).parent().find(".recreation_id").val();
					cRecreation.deleteRecreation(id);
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
							html += '<div class="radio">';
							html += '<label>';
							if(key > 0){
								html += '<input type="radio" name="type" id="type'+obj.type+'" value="'+obj.type+'">'+obj.name;
							}else{
								html += '<input type="radio" name="type" id="type'+obj.type+'" value="'+obj.type+'" checked>'+obj.name;
							}
							html += '</label>';
							html += '</div>';
						});
						$("#newsType").append(html);
						$("#newsName").val(res.result.name);
		        		$("input[name='type']").prop("checked",false);
		        		$("input[id='type"+res.result.type+"']").prop("checked",true);
		        		$("#descEditor").Editor("setText",decodeURI(res.result.desc));
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
        //提交消息新闻
        newsEditSubmit : function(){
        	var newsName = $("#newsName").val();
			if(newsName == ''){
				$("#newsName").parent().addClass("has-error has-feedback").find(".help-block").text("名称不能为空");
				return false;
			}
			var desc = $("#descEditor").Editor("getText");
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
		                    alert("提交失败");
		                }
		            });
				}
			}
        },
        //类型提交
        newsTypeSubmit : function(){
        	var typeName = $("#typeName").val();
			if(typeName == ''){
				$("#typeName").parent().addClass("has-error has-feedback").find(".help-block").text("名称不能为空");
				return false;
			}
			if(confirm("确认提交新的数据吗？")){
				var flag = true;
				var formData = {
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
		                    alert("提交失败");
		                }
		            });
				}
			}
        },
        //删除娱乐
        deleteRecreation : function(id){
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
		                    alert("删除失败");
		                }
					});
				}
			}
        }
	};

	return cRecreation;
});