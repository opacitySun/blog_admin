define(["./Base","jquery","fnbase","../model/m-fairy"], function (Base,$,fnbase,model) {
	var staticPath = $("#staticPath").val();

	var cFairy = {
		//获取精灵列表
        getFairyList : function(currentPage,callback){
        	var pageSize = $("#pageSize").val();
        	var formData = {
        		"currentPage":currentPage,
				"pageSize":pageSize
        	};
        	model.getFairyList(formData,function(res){
        		html = "";
        		$.each(res.result,function(key,obj){
        			html += '<tr>';
        			html += '<td>'+Number(((currentPage-1)*pageSize)+(key+1))+'</td>';
        			html += '<td>'+obj.name+'</td>';
        			html += '<td>'+obj.typeName+'</td>';
        			html += '<td><img style="width:50px;height:auto;" src="'+staticPath+obj.image+'" /></td>';
        			html += '<td>'+obj.owner+'</td>';
        			html += '<td>'+fnbase.getSmpFormatDateByLong(obj.updateTime,true)+'</td>';
        			html += '<td>';
					html += '<input type="hidden" class="fairy_id" value="'+obj._id.toString()+'" />';
					html += '<button type="button" class="btn btn-link fairy_edit">编辑</button>';
					html += '</td>';
        			html += '</tr>';
        		});
        		$("#fairyList").html(html);
        		$("button.fairy_edit").on("click",function(){
					var id = $(this).parent().find(".fairy_id").val();
					window.location.href = "/fairy-edit?type=edit&&id="+id;
				});
				callback(res.total);
        	});
        },
        //获取精灵类型列表
        getFairyTypeList : function(currentPage,callback){
        	var pageSize = $("#pageSize").val();
        	var formData = {
        		"currentPage":currentPage,
				"pageSize":pageSize
        	};
        	model.getFairyTypeList(formData,function(res){
        		html = "";
        		$.each(res.result,function(key,obj){
        			html += '<tr>';
        			html += '<td>'+Number(((currentPage-1)*pageSize)+(key+1))+'</td>';
        			html += '<td>'+obj.name+'</td>';
        			html += '<td><img style="width:50px;height:auto;" src="'+staticPath+obj.image+'" /></td>';
        			html += '<td>'+fnbase.getSmpFormatDateByLong(obj.updateTime,true)+'</td>';
        			html += '<td>';
					html += '<input type="hidden" class="fairy_type_id" value="'+obj._id.toString()+'" />';
					html += '<button type="button" class="btn btn-link fairy_type_edit">编辑</button>';
					html += '<button type="button" class="btn btn-link fairy_type_delete">删除</button>';
					html += '</td>';
        			html += '</tr>';
        		});
        		$("#fairyTypeList").html(html);
        		$("button.fairy_type_edit").on("click",function(){
					var id = $(this).parent().find(".fairy_type_id").val();
					window.location.href = "/fairy-type-edit?type=edit&&id="+id;
				});
				$("button.fairy_type_delete").on("click",function(){
					var id = $(this).parent().find(".fairy_type_id").val();
					cFairy.deleteFairyType(id);
				});
				callback(res.total);
        	});
        },
        //获取精灵等级列表
        getFairyLevelList : function(currentPage,callback){
        	var pageSize = $("#pageSize").val();
        	var formData = {
        		"currentPage":currentPage,
				"pageSize":pageSize
        	};
        	model.getFairyLevelList(formData,function(res){
        		html = "";
        		$.each(res.result,function(key,obj){
        			html += '<tr>';
        			html += '<td>'+Number(((currentPage-1)*pageSize)+(key+1))+'</td>';
        			html += '<td>'+obj.level+'</td>';
        			html += '<td>'+obj.exp+'</td>';
        			html += '<td>'+fnbase.getSmpFormatDateByLong(obj.updateTime,true)+'</td>';
        			html += '<td>';
					html += '<input type="hidden" class="fairy_level_id" value="'+obj._id.toString()+'" />';
					html += '<button type="button" class="btn btn-link fairy_level_edit">编辑</button>';
					html += '<button type="button" class="btn btn-link fairy_level_delete">删除</button>';
					html += '</td>';
        			html += '</tr>';
        		});
        		$("#fairyLevelList").html(html);
        		$("button.fairy_level_edit").on("click",function(){
					var id = $(this).parent().find(".fairy_level_id").val();
					window.location.href = "/fairy-level-edit?type=edit&&id="+id;
				});
				$("button.fairy_level_delete").on("click",function(){
					var id = $(this).parent().find(".fairy_level_id").val();
					cFairy.deleteFairyLevel(id);
				});
				callback(res.total);
        	});
        },
        //编辑精灵
        editFairy : function(id){
        	model.getFairyById(id,function(res){
        		model.getFairyTypeListNoFields(function(resType){	//获取类型
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
						$("#fairyId").val(id);
						$("#fairyType").append(html);
						$("#fairyName").val(res.result.name);
		        		$("input[name='type']").prop("checked",false);
		        		$("input[id='type"+res.result.type+"']").prop("checked",true);
		        		$("#fairyLevel").val(res.result.level);
		        		$("#fairyExp").val(res.result.exp);
		        		$("#fairySubmit").on("click",function(){
							cFairy.fairyEditSubmit(id);
						});
					}else{
						console.log(resType);
					}
				});
        	});
        },
        //提交精灵编辑信息
		fairyEditSubmit : function(id){
			var fairyName = $("#fairyName").val();
			if(fairyName == ''){
				$("#fairyName").parent().addClass("has-error has-feedback").find(".help-block").text("名称不能为空");
				return false;
			}
			var fairyExp = $("#fairyExp").val();
			if(fairyExp == '' || !fnbase.fnValidate.PositiveInteger.test(fairyExp)){
				$("#fairyExp").parent().addClass("has-error has-feedback").find(".help-block").text("经验值不能为空且必须为正整数");
				return false;
			}
			if(fairyExp > 4000){
				$("#fairyExp").parent().addClass("has-error has-feedback").find(".help-block").text("经验值不能大于4000");
				return false;
			}
			model.getFairyLevelListNoField(function(resLevel){
				if(resLevel.success == 1){
					var type = $("input[name='type']:checked").val();
					var fairyLevel = $("#fairyLevel").val();
					var levelArr = [];
					$.each(resLevel.result,function(key,obj){
						var o = {"level":obj.level,"exp":obj.exp};
						levelArr.push(o);
					});
					levelArr.push({"exp":Number(fairyExp)});
					levelArr.sort(function(a,b){return a.exp-b.exp;});
					$.each(levelArr,function(key,obj){
						if(!obj.level){
							fairyLevel = levelArr[key-1].level;
						}
					});
					if(confirm("确认提交新的用户信息数据吗？")){
						var flag = true;
						var formData = {
							"id":id,
							"name":fairyName,
							"type":type,
							"level":fairyLevel,
							"exp":fairyExp
						};
						if(flag == true){
							flag = false;
							model.editFairy(formData,function(res){
				                if(res.success == 1){
				                    alert("修改成功");
									flag = true;
									window.location.href = "/fairy";
				                }else{
				                    alert("修改失败");
				                }
				            });
						}
					}
				}else{
					console.log(resLevel);
				}
			});		
		},
		//编辑精灵类型
        editFairyType : function(id){
        	model.getFairyTypeById(id,function(res){
        		$("#fairyTypeId").val(id);
				$("#fairyTypeName").val(res.result.name);
        		$("#desc").val(res.result.desc);
        		$("#fairyTypeImg").css({
					"width":"20px",
					"height":"20px"
				});
				$("#fairyTypeImg").parent().css({
					"position":"relative",
					"height":"200px"
				}).append('<img src="'+res.result.image+'" />');
				$("#fairyTypeImg").parent().find("img").css({
					"position":"absolute",
					"width":"200px",
					"height":"200px",
					"top":"0",
					"left":"0"
				}).on("click",function(){
					$("#fairyTypeImg").click();
				});
        		$("#fairyTypeSubmit").on("click",function(){
					cFairy.fairyTypeEditSubmitNoImg(id);
				});
				$("#fairyTypeImg").on("change",function(){
					$("#fairyTypeImg").parent().removeAttr("style").find("img").remove();
					$("#fairyTypeImg").removeAttr("style");
					$("#fairyTypeSubmit").off("click");
					$("#fairyTypeSubmit").on("click",function(){
						cFairy.fairyTypeEditSubmit();
					});
				});
        	});
        },
        //提交类型(无图片时)
		fairyTypeEditSubmitNoImg : function(id){
			var fairyTypeName = $("#fairyTypeName").val();
			if(fairyTypeName == ''){
				$("#fairyTypeName").parent().addClass("has-error has-feedback").find(".help-block").text("名称不能为空");
				return false;
			}
			var desc = $("#desc").val();
			if(confirm("确认提交新的用户信息数据吗？")){
				var flag = true;
				var formData = {
					"id":id,
					"name":fairyTypeName,
					"desc":desc
				};
				if(flag == true){
					flag = false;
					model.editFairyTypeNoImg(formData,function(res){
		                if(res.success == 1){
		                    alert("提交成功");
							flag = true;
							window.location.href = "/fairy-type";
		                }else{
		                    alert("提交失败");
		                }
		            });
				}
			}
		},
        //提交类型
        fairyTypeEditSubmit : function(){
        	var fairyTypeName = $("#fairyTypeName").val();
			if(fairyTypeName == ''){
				$("#fairyTypeName").parent().addClass("has-error has-feedback").find(".help-block").text("名称不能为空");
				return false;
			}
			if(confirm("确认提交数据吗？")){
				var flag = true;
				var formData = new FormData($("#fairyTypeForm")[0]);
				if(flag == true){
					flag = false;
					model.editFairyType(formData,function(res){
		                if(res.success == 1){
		                    alert("提交成功");
							flag = true;
							window.location.href = "/fairy-type";
		                }else{
		                    alert("提交失败");
		                }
		            });
				}
			}
        },
        //提交等级
		fairyLevelSubmit : function(){
			var level = $("#level").val();
			if(level == ''){
				$("#level").parent().addClass("has-error has-feedback").find(".help-block").text("等级不能为空且必须是正整数");
				return false;
			}
			var exp = $("#exp").val();
			if(exp == '' || !fnbase.fnValidate.PositiveInteger.test(exp)){
				$("#exp").parent().addClass("has-error has-feedback").find(".help-block").text("经验值不能为空且必须是正整数");
				return false;
			}
			if(confirm("确认提交新的用户信息数据吗？")){
				var flag = true;
				var formData = {
					"level":level,
					"exp":exp
				};
				if(flag == true){
					flag = false;
					model.addFairyLevel(formData,function(res){
		                if(res.success == 1){
		                    alert("提交成功");
							flag = true;
							window.location.href = "/fairy-level";
		                }else{
		                    alert("提交失败");
		                }
		            });
				}
			}
		},
        //编辑等级
        editFairyLevel : function(id){
        	model.getFairyLevelById(id,function(res){
        		$("#fairyLevelId").val(id);
				$("#level").val(res.result.level);
        		$("#exp").val(res.result.exp);
        		$("#fairyLevelSubmit").on("click",function(){
					cFairy.fairyLevelEditSubmit(id);
				});
        	});
        },
        //修改等级
		fairyLevelEditSubmit : function(id){
			var level = $("#level").val();
			if(level == ''){
				$("#level").parent().addClass("has-error has-feedback").find(".help-block").text("等级不能为空且必须是正整数");
				return false;
			}
			var exp = $("#exp").val();
			if(exp == '' || !fnbase.fnValidate.PositiveInteger.test(exp)){
				$("#exp").parent().addClass("has-error has-feedback").find(".help-block").text("经验值不能为空且必须是正整数");
				return false;
			}
			if(confirm("确认提交新的用户信息数据吗？")){
				var flag = true;
				var formData = {
					"id":id,
					"level":level,
					"exp":exp
				};
				if(flag == true){
					flag = false;
					model.editFairyLevel(formData,function(res){
		                if(res.success == 1){
		                    alert("提交成功");
							flag = true;
							window.location.href = "/fairy-level";
		                }else{
		                    alert("提交失败");
		                }
		            });
				}
			}
		},
        //删除类型
        deleteFairyType : function(id){
        	if(confirm("确认删除该数据吗？")){
				var flag = true;
				if(flag == true){
					flag = false;
					model.deleteFairyType(id,function(res){
						if(res.success == 1){
		                    alert("删除成功");
							flag = true;
							window.location.href="/fairy-type";
		                }else{
		                    alert("删除失败");
		                }
					});
				}
			}
        },
        //删除等级
        deleteFairyLevel : function(id){
        	if(confirm("确认删除该数据吗？")){
				var flag = true;
				if(flag == true){
					flag = false;
					model.deleteFairyLevel(id,function(res){
						if(res.success == 1){
		                    alert("删除成功");
							flag = true;
							window.location.href="/fairy-level";
		                }else{
		                    alert("删除失败");
		                }
					});
				}
			}
        }
	};

	return cFairy;
});