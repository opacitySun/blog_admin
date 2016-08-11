define(["./Base","jquery","fnbase","../model/m-works"], function (Base,$,fnbase,model) {
	var staticPath = $("#staticPath").val();

    var cWorks = {
        //获取用户列表
        getWorksList : function(){
        	model.getWorksList(function(res){
        		html = "";
        		$.each(res.result,function(key,obj){
        			var objType,objStatus;
        			html += '<tr>';
        			html += '<td>'+(key+1)+'</td>';
        			html += '<td>'+obj.workName+'</td>';
        			html += '<td><img style="width:50px;height:auto;" src="'+staticPath+obj.workImg+'" /></td>';
        			html += '<td><a target="_blank" href="'+obj.workUrl+'">'+obj.workUrl+'</a></td>';
        			switch(Number(obj.type)){
						case 1:
							objType = "手机";
							break;
						default:
							objType = "PC";
					}
        			html += '<td>'+objType+'</td>';
        			switch(Number(obj.status)){
						case 1:
							objStatus = "静态";
							break;
						default:
							objStatus = "在线";
					}
        			html += '<td>'+objStatus+'</td>';
        			html += '<td>'+fnbase.getSmpFormatDateByLong(obj.updateTime,false)+'</td>';
        			html += '<td>';
					html += '<input type="hidden" class="works_id" value="'+obj._id.toString()+'" />';
					html += '<button type="button" class="btn btn-link works_edit">编辑</button>';
					html += '<button type="button" class="btn btn-link works_delete">删除</button>';
					html += '</td>';
        			html += '</tr>';
        		});
        		$("#worksList").html(html);
        		$("button.works_edit").on("click",function(){
					var id = $(this).parent().find(".works_id").val();
					window.location.href = "/works-edit?type=edit&&id="+id;
				});
				$("button.works_delete").on("click",function(){
					var id = $(this).parent().find(".works_id").val();
					cWorks.deleteWorks(id);
				});
        	});
        },
		//编辑作品
		editWorks : function(id){
			model.getWorkById(id,function(res){
				if(res.success == 1){
					model.getWorkById(function(resUser){	//获取关联用户列表
						if(resUser.success == 1){
							var html = "";
							$.each(resUser.result,function(obj){
								html += '<div class="radio">';
								html += '<label>';
								html += '<input type="radio" name="userId" value="'+obj._id.toString()+'">'+obj.name;
								html += '</label>';
								html += '</div>';
							});
						}else{
							console.log(resUser);
						}
					});
					$("#workId").val(res.result._id.toString());
					$("#workName").val(res.result.workName);
					$("#workUrl").val(res.result.workUrl);
					$("input[name='type']").prop("checked",false);
					$("input[id='type"+res.result.type+"']").prop("checked",true);
					$("input[name='status']").prop("checked",false);
					$("input[id='status"+res.result.status+"']").prop("checked",true);
					$("#workImg").css({
						"width":"20px",
						"height":"20px"
					});
					$("#workImg").parent().css({
						"position":"relative",
						"height":"140px"
					}).append('<img src="'+res.result.workImg+'" />');
					$("#workImg").parent().find("img").css({
						"position":"absolute",
						"width":"188px",
						"height":"140px",
						"top":"0",
						"left":"0"
					}).on("click",function(){
						$("#workImg").click();
					});
					$("#workSubmit").on("click",function(){
						cWorks.worksEditSubmitNoImg(id);
					});
					$("#workImg").on("change",function(){
						$("#workImg").parent().removeAttr("style").find("img").remove();
						$("#workImg").removeAttr("style");
						$("#workSubmit").off("click");
						$("#workSubmit").on("click",function(){
							cWorks.worksEditSubmit();
						});
					});
				}else{
					$("#workSubmit").on("click",function(){
						cWorks.worksEditSubmit();
					});
				}
			});
		},
		//作品提交(无图片时)
		worksEditSubmitNoImg : function(id){
			var workName = $("#workName").val();
			if(workName == ''){
				$("#workName").parent().addClass("has-error has-feedback").find(".help-block").text("名称不能为空");
				return false;
			}
			var workUrl = $("#workUrl").val();
			if(workUrl == ''){
				workUrl = "javascript:void(0)";
			}
			var type = $("input[name='type']").is(":checked").val();
			var status = $("input[name='status']").is(":checked").val();
			var userId = $("input[name='userId']").is(":checked").val();
			if(confirm("确认提交新的用户信息数据吗？")){
				var flag = true;
				var formData = {
					"id":id,
					"workName":workName,
					"workUrl":workUrl,
					"type":type,
					"status":status,
					"userId",userId
				};
				if(flag == true){
					flag = false;
					model.editWorkNoImg(formData,function(res){
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
        //作品提交
		worksEditSubmit : function(){
			var workName = $("#workName").val();
			if(workName == ''){
				$("#workName").parent().addClass("has-error has-feedback").find(".help-block").text("名称不能为空");
				return false;
			}
			var workUrl = $("#workUrl").val();
			if(workUrl == ''){
				$("#workUrl").val("javascript:void(0)");
			}
			if($("#workImg").val() == ''){
				alert("请上传作品截图");
				return false;
			}
			if(confirm("确认提交新的用户信息数据吗？")){
				var flag = true;
				var formData = new FormData($("#workForm")[0]);
				if(flag == true){
					flag = false;
					model.editUserInfo(formData,function(res){
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
        //删除作品
        deleteWorks : function(id){
        	if(confirm("确认删除该数据吗？")){
				var flag = true;
				if(flag == true){
					flag = false;
					model.deleteWorks(id,function(res){
						if(res.success == 1){
		                    alert("删除成功");
							flag = true;
							window.location.href="/user";
		                }else{
		                    alert("删除失败");
		                }
					});
				}
			}
        }
    };

    return cWorks;
});