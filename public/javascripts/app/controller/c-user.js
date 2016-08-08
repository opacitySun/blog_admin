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
					html += '<button type="button" class="btn btn-link user_look">查看</button>';
					html += '<button type="button" class="btn btn-link user_edit">修改</button>';
					html += '<button type="button" class="btn btn-link user_delete">删除</button>';
					html += '</td>';
        			html += '</tr>';
        		});
        		$("#userList").html(html);
        		$("button.user_look").on("click",function(){
					var id = $(this).parent().find(".user_id").val();
					window.location.href = "/user-edit?type=look&id="+id;
				});
				$("button.user_edit").on("click",function(){
					var id = $(this).parent().find(".user_id").val();
					window.location.href = "/user-edit?type=edit&id="+id;
				});
				$("button.user_delete").on("click",function(){
					var id = $(this).parent().find(".user_id").val();
					cUser.deleteUser(id);
				});
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