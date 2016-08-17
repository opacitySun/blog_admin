define(["./Base","jquery","fnbase","../model/m-recreation"], function (Base,$,fnbase,model) {
	var staticPath = $("#staticPath").val();

	var cRecreation = {
		//获取用户列表
        getRecreationList : function(currentPage,callback){
        	var pageSize = $("#pageSize").val();
        	var formData = {
        		"currentPage":currentPage,
				"pageSize":pageSize
        	};
        	model.getRecreationList(formData,function(res){
        		html = "";
        		$.each(res.result,function(key,obj){
        			html += '<tr>';
        			html += '<td>'+Number(((currentPage-1)*pageSize)+(key+1))+'</td>';
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
				callback(res.total);
        	});
        },
        //编辑
        editRecreation : function(id){
        	model.getRecreationById(id,function(res){
        		model.getRecreationTypeList(function(resType){	//获取类型
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
						$("#recreationId").val(id);
						$("#recreationType").append(html);
						$("#recreationName").val(res.result.name);
						$("#recreationUrl").val(res.result.url);
		        		$("input[name='type']").prop("checked",false);
		        		$("input[id='type"+res.result.type+"']").prop("checked",true);
		        		$("#desc").val(res.result.desc);
		        		$("#recreationImg").css({
							"width":"20px",
							"height":"20px"
						});
						if(res.result.type == 0 || res.result.type == 1){
							$("#recreationImg").parent().css({
								"position":"relative",
								"height":"200px"
							}).append('<img src="'+res.result.image+'" />');
							$("#recreationImg").parent().find("img").css({
								"position":"absolute",
								"width":"150px",
								"height":"200px",
								"top":"0",
								"left":"0"
							}).on("click",function(){
								$("#recreationImg").click();
							});
						}else{
							$("#recreationImg").parent().css({
								"position":"relative",
								"height":"130px"
							}).append('<img src="'+res.result.image+'" />');
							$("#recreationImg").parent().find("img").css({
								"position":"absolute",
								"width":"184px",
								"height":"130px",
								"top":"0",
								"left":"0"
							}).on("click",function(){
								$("#recreationImg").click();
							});
						}
		        		$("#recreationSubmit").on("click",function(){
							cRecreation.recreationEditSubmitNoImg(id);
						});
						$("#recreationImg").on("change",function(){
							$("#recreationImg").parent().removeAttr("style").find("img").remove();
							$("#recreationImg").removeAttr("style");
							$("#recreationSubmit").off("click");
							$("#recreationSubmit").on("click",function(){
								cRecreation.recreationEditSubmit();
							});
						});
					}else{
						console.log(resType);
					}
				});
        	});
        },
        //提交(无图片时)
		recreationEditSubmitNoImg : function(id){
			var recreationName = $("#recreationName").val();
			if(recreationName == ''){
				$("#recreationName").parent().addClass("has-error has-feedback").find(".help-block").text("名称不能为空");
				return false;
			}
			var recreationUrl = $("#recreationUrl").val();
			if(recreationUrl == ''){
				$("#recreationUrl").parent().addClass("has-error has-feedback").find(".help-block").text("链接地址不能为空");
				return false;
			}
			var type = $("input[name='type']:checked").val();
			var desc = $("#desc").val();
			if(confirm("确认提交新的用户信息数据吗？")){
				var flag = true;
				var formData = {
					"id":id,
					"name":recreationName,
					"url":recreationUrl,
					"type":type,
					"desc":desc
				};
				if(flag == true){
					flag = false;
					model.editRecreationNoImg(formData,function(res){
		                if(res.success == 1){
		                    alert("提交成功");
							flag = true;
							window.location.href = "/recreation";
		                }else{
		                    alert("提交失败");
		                }
		            });
				}
			}
		},
        //提交
        recreationEditSubmit : function(){
        	var recreationName = $("#recreationName").val();
			if(recreationName == ''){
				$("#recreationName").parent().addClass("has-error has-feedback").find(".help-block").text("名称不能为空");
				return false;
			}
			var recreationUrl = $("#recreationUrl").val();
			if(recreationUrl == ''){
				$("#recreationUrl").parent().addClass("has-error has-feedback").find(".help-block").text("链接地址不能为空");
				return false;
			}
			if(confirm("确认提交数据吗？")){
				var flag = true;
				var formData = new FormData($("#recreationForm")[0]);
				if(flag == true){
					flag = false;
					model.editRecreation(formData,function(res){
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
        recreationTypeSubmit : function(){
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
					model.editRecreationType(formData,function(res){
		                if(res.success == 1){
		                    alert("提交成功");
							flag = true;
							window.location.href = "/recreation-type";
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
					model.deleteRecreation(id,function(res){
						if(res.success == 1){
		                    alert("删除成功");
							flag = true;
							window.location.href="/recreation";
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