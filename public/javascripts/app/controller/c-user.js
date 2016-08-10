define(["./Base","jquery","fnbase","../model/m-user"], function (Base,$,fnbase,model) {
    var cUser = {
        //获取用户列表
        getUserList : function(){
        	model.getUserList(function(res){
        		html = "";
        		$.each(res.result,function(key,obj){
        			html += '<tr>';
        			html += '<td>'+(key+1)+'</td>';
        			html += '<td>'+obj.name+'</td>';
        			html += '<td>'+fnbase.getSmpFormatDateByLong(obj.updateTime,false)+'</td>';
        			html += '<td>';
					html += '<input type="hidden" class="user_id" value="'+obj._id.toString()+'" />';
					html += '<button type="button" class="btn btn-link user_edit_info">编辑详情</button>';
					html += '<button type="button" class="btn btn-link user_edit_password">修改密码</button>';
					html += '<button type="button" class="btn btn-link user_delete">删除</button>';
					html += '</td>';
        			html += '</tr>';
        		});
        		$("#userList").html(html);
        		$("button.user_edit_info").on("click",function(){
					var id = $(this).parent().find(".user_id").val();
					window.location.href = "/user-info-edit?id="+id;
				});
				$("button.user_edit_password").on("click",function(){
					var id = $(this).parent().find(".user_id").val();
					window.location.href = "/user-edit?type=edit_password&id="+id;
				});
				$("button.user_delete").on("click",function(){
					var id = $(this).parent().find(".user_id").val();
					cUser.deleteUser(id);
				});
        	});
        },
        //用户提交
		userEditSubmit : function(){
			var userName = $("#userName").val();
			if(userName == ''){
				$("#userName").parent().addClass("has-error has-feedback").find(".help-block").text("用户名不能为空");
				return false;
			}
			var pwd = $("#pwd").val();
			if(pwd == '' || pwd.length < 6){
				$("#pwd").parent().addClass("has-error has-feedback").find(".help-block").text("密码不能小于6位");
				return false;
			}
			var comfirmPwd = $("#comfirmPwd").val();
			if(comfirmPwd != pwd){
				$("#comfirmPwd").parent().addClass("has-error has-feedback").find(".help-block").text("两次密码输入不一致");
				return false;
			}
			if(confirm("确认提交新的用户信息数据吗？")){
				var flag = true;
				var data = {
					"name":userName,
					"password":pwd
				};
				if(flag == true){
					flag = false;
					model.addUser(data,function(res){
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
		//编辑用户信息
		editUserInfo : function(id){
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
		//用户信息提交(无图片时)
		userInfoEditSubmitNoImg : function(id){
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
        //用户信息提交
		userInfoEditSubmit : function(){
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
		//修改用户密码
		editPassword : function(id){
			model.getUserById(id,function(res){
				if(res.success == 1){
					$("#userName").val(res.result.name);
					$("#userName").attr("disabled",true);
					$("#userSubmit").on("click",function(){
						cUser.updatePassword(id);
					});
				}else{
					console.log(res);
				}
			});
		},
		//修改用户密码
		updatePassword : function(id){
			var pwd = $("#pwd").val();
			if(pwd == '' || pwd.length < 6){
				$("#pwd").parent().addClass("has-error has-feedback").find(".help-block").text("密码不能小于6位");
				return false;
			}
			var comfirmPwd = $("#comfirmPwd").val();
			if(comfirmPwd != pwd){
				$("#comfirmPwd").parent().addClass("has-error has-feedback").find(".help-block").text("两次密码输入不一致");
				return false;
			}
			model.updateUserPwd(id,pwd,function(res){
				if(res.success == 1){
					alert("修改成功");
					flag = true;
					history.go(-1);
				}else{
					console.log(res);
					alert("修改失败");
				}
			});
		},
        //删除用户
        deleteUser : function(id){
        	if(confirm("确认删除该数据吗？")){
				var flag = true;
				if(flag == true){
					flag = false;
					model.deleteUser(id,function(res){
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