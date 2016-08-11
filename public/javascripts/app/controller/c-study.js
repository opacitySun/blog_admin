define(["./Base","jquery","fnbase","../model/m-study"], function (Base,$,fnbase,model) {
	var staticPath = $("#staticPath").val();

	var cStudy = {
		//获取用户列表
        getStudyList : function(){
        	model.getStudyList(function(res){
        		html = "";
        		$.each(res.result,function(key,obj){
        			html += '<tr>';
        			html += '<td>'+(key+1)+'</td>';
        			html += '<td>'+obj.name+'</td>';
        			html += '<td>'+obj.author+'</td>';
        			html += '<td>'+obj.typeName+'</td>';
        			html += '<td>'+fnbase.getSmpFormatDateByLong(obj.updateTime,false)+'</td>';
        			html += '<td>';
					html += '<input type="hidden" class="study_id" value="'+obj._id.toString()+'" />';
					html += '<button type="button" class="btn btn-link study_edit">编辑</button>';
					html += '<button type="button" class="btn btn-link study_delete">删除</button>';
					html += '</td>';
        			html += '</tr>';
        		});
        		$("#studyList").html(html);
        		$("button.study_edit").on("click",function(){
					var id = $(this).parent().find(".study_id").val();
					window.location.href = "/study-edit?type=edit&&id="+id;
				});
				$("button.study_delete").on("click",function(){
					var id = $(this).parent().find(".study_id").val();
					cStudy.deleteStudy(id);
				});
        	});
        },
        //删除作品
        deleteStudy : function(id){
        	if(confirm("确认删除该数据吗？")){
				var flag = true;
				if(flag == true){
					flag = false;
					model.deleteStudy(id,function(res){
						if(res.success == 1){
		                    alert("删除成功");
							flag = true;
							window.location.href="/study";
		                }else{
		                    alert("删除失败");
		                }
					});
				}
			}
        }
	};

	return cStudy;
});