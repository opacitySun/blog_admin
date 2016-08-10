define(["./Base","jquery","fnbase","../model/m-user"], function (Base,$,fnbase,model) {
    var cUser = {
        //获取用户列表
        getUserList : function(){
        	model.getWorksList(function(res){
        		html = "";
        		$.each(res.result,function(key,obj){
        			var objType,objStatus;
        			html += '<tr>';
        			html += '<td>'+(key+1)+'</td>';
        			html += '<td>'+obj.workName+'</td>';
        			html += '<td><img src="'+obj.workImg+'" /></td>';
        			html += '<td><a target="_blank" href="'+obj.workUrl+'"></a></td>';
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
					window.location.href = "/works-edit?id="+id;
				});
				$("button.works_delete").on("click",function(){
					var id = $(this).parent().find(".works_id").val();
					cWorks.deleteWorks(id);
				});
        	});
        },
		//编辑作品
		editWorks : function(id){
			$("#userId").val(id);
			model.getUserInfo(id,function(res){
				if(res.success == 1){
					$("#userName").val(res.result.name);
					$("#userDesc").val(res.result.desc);
					$("#userImg").css({
						"width":"20px",
						"height":"20px"
					});
					$("#userImg").parent().css({
						"position":"relative",
						"height":"144px"
					}).append('<img src="'+res.result.image+'" />');
					$("#userImg").parent().find("img").css({
						"position":"absolute",
						"width":"120px",
						"height":"144px",
						"top":"0",
						"left":"0"
					}).on("click",function(){
						$("#userImg").click();
					});
					$("#userInfoSubmit").on("click",function(){
						cUser.userInfoEditSubmitNoImg(id);
					});
					$("#userImg").on("change",function(){
						$("#userImg").parent().removeAttr("style").find("img").remove();
						$("#userImg").removeAttr("style");
						$("#userInfoSubmit").off("click");
						$("#userInfoSubmit").on("click",function(){
							cUser.userInfoEditSubmit();
						});
					});
				}else{
					$("#userInfoSubmit").on("click",function(){
						cUser.userInfoEditSubmit();
					});
				}
			});
		},
		//作品提交(无图片时)
		worksEditSubmitNoImg : function(id){
			var userName = $("#userName").val();
			if(userName == ''){
				$("#userName").parent().addClass("has-error has-feedback").find(".help-block").text("名称不能为空");
				return false;
			}
			var userDesc = $("#userDesc").val();
			if(confirm("确认提交新的用户信息数据吗？")){
				var flag = true;
				var formData = {
					"userId":id,
					"name":userName,
					"desc":userDesc
				};
				if(flag == true){
					flag = false;
					model.editUserInfoNoImg(formData,function(res){
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
			var userName = $("#userName").val();
			if(userName == ''){
				$("#userName").parent().addClass("has-error has-feedback").find(".help-block").text("名称不能为空");
				return false;
			}
			if($("#userImg").val() == ''){
				alert("请上传用户头像");
				return false;
			}
			if(confirm("确认提交新的用户信息数据吗？")){
				var flag = true;
				var formData = new FormData($("#userInfoForm")[0]);
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

    return cUser;
});