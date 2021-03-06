define(['jquery','fnbase','ZeroClipboard','../model/m-study'], function($,fnbase,ZeroClipboard,model) {
	window['ZeroClipboard']=ZeroClipboard;
	var staticPath = $("#staticPath").val();

	var cStudy = {
		//获取学习列表
        getStudyList : function(currentPage,callback){
        	var pageSize = $("#pageSize").val();
        	var formData = {
        		"currentPage":currentPage,
				"pageSize":pageSize
        	};
        	model.getStudyList(formData,function(res){
        		html = "";
        		$.each(res.result,function(key,obj){
        			html += '<tr>';
        			html += '<td>'+Number(((currentPage-1)*pageSize)+(key+1))+'</td>';
        			html += '<td>'+obj.name+'</td>';
        			html += '<td>'+obj.author+'</td>';
        			html += '<td>'+obj.typeName+'</td>';
        			html += '<td>'+fnbase.getSmpFormatDateByLong(obj.updateTime,true)+'</td>';
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
				callback(res.total);
        	});
        },
        //获取类型列表
        getStudyTypeList : function(){
        	model.getStudyTypeList(function(res){
        		html = "";
        		$.each(res.result,function(key,obj){
        			html += '<tr>';
        			html += '<td>'+Number(key+1)+'</td>';
        			html += '<td>'+obj.name+'</td>';
        			html += '<td>'+fnbase.getSmpFormatDateByLong(obj.updateTime,true)+'</td>';
        			html += '<td>';
					html += '<input type="hidden" class="study_type_id" value="'+obj._id.toString()+'" />';
					html += '<button type="button" class="btn btn-link study_type_edit">编辑</button>';
					html += '<button type="button" class="btn btn-link study_type_delete">删除</button>';
					html += '</td>';
        			html += '</tr>';
        		});
        		$("#studyTypeList").html(html);
        		$("button.study_type_edit").on("click",function(){
					var id = $(this).parent().find(".study_type_id").val();
					window.location.href = "/study-type-edit?type=edit&&id="+id;
				});
				$("button.study_type_delete").on("click",function(){
					var id = $(this).parent().find(".study_type_id").val();
					cStudy.deleteStudyType(id);
				});
        	});
        },
        //编辑文章
        editStudy : function(id){
        	model.getStudyInfoById(id,function(res){
        		model.getStudyTypeList(function(resType){	//获取分享文章类型
					if(resType.success == 1){
						var html = "";
						$.each(resType.result,function(key,obj){
							html += '<option value="'+obj.type+'">'+obj.name+'</option>';
						});
						$("#studyType").append(html);
						$("#studyId").val(id);
						$("#studyName").val(res.result.name);
		        		$("#author").val(res.result.author);
		        		$("#studyType").val(res.result.type);
		        		$("#studyType").find("option[value='"+res.result.type+"']").attr("selected",true);
		        		UE.getEditor('articleEditor').setContent(decodeURI(res.result.article));
		        		$("#article").val(decodeURI(res.result.article));
		        		$("#studySubmit").on("click",function(){
							cStudy.studyEditSubmit();
						});
					}else{
						console.log(resType);
					}
				});
        	});
        },
        //编辑类型
        editStudyType : function(id){
        	model.getStudyTypeById(id,function(res){
        		$("#studyTypeId").val(id);
        		$("#typeName").val(res.result.name);
        		$("#studySubmit").on("click",function(){
					cStudy.studyTypeSubmit();
				});
        	});
        },
        //提交分享文章
        studyEditSubmit : function(){
        	var studyName = $("#studyName").val();
			if(studyName == ''){
				$("#studyName").parent().addClass("has-error has-feedback").find(".help-block").text("名称不能为空");
				return false;
			}
			var author = $("#author").val();
			if(author == ''){
				$("#author").parent().addClass("has-error has-feedback").find(".help-block").text("作者不能为空");
				return false;
			}
			var article = UE.getEditor('articleEditor').getContent();
			$("#article").val(encodeURI(article));
			if(confirm("确认提交数据吗？")){
				var flag = true;
				var formData = new FormData($("#studyForm")[0]);
				if(flag == true){
					flag = false;
					model.editStudy(formData,function(res){
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
        //分享类型提交
        studyTypeSubmit : function(){
        	var studyTypeId = $("#studyTypeId").val();
        	var typeName = $("#typeName").val();
			if(typeName == ''){
				$("#typeName").parent().addClass("has-error has-feedback").find(".help-block").text("名称不能为空");
				return false;
			}
			if(confirm("确认提交新的数据吗？")){
				var flag = true;
				var formData = {
					"id":studyTypeId,
					"name":typeName
				};
				if(flag == true){
					flag = false;
					model.editStudyType(formData,function(res){
		                if(res.success == 1){
		                    alert("提交成功");
							flag = true;
							window.location.href = "/study-type";
		                }else{
		                    alert(res.flag);
		                }
		            });
				}
			}
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
		                    alert(res.flag);
		                }
					});
				}
			}
        },
        //删除类型
        deleteStudyType : function(id){
        	if(confirm("确认删除该数据吗？")){
				var flag = true;
				if(flag == true){
					flag = false;
					model.deleteStudyType(id,function(res){
						if(res.success == 1){
		                    alert("删除成功");
							flag = true;
							window.location.href="/study-type";
		                }else{
		                    alert(res.flag);
		                }
					});
				}
			}
        }
	};

	return cStudy;
});