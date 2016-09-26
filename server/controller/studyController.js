var ObjectID = require("mongodb").ObjectID;
var dbHelper = require("../DBHelper/dbHelper");
var uploadHelper = require("../DBHelper/uploadHelper");
var studyDao = require("../DBSql/studyDao");
var studyDetailDao = require("../DBSql/studyDetailDao");
var studyTypeDao = require("../DBSql/studyTypeDao");

module.exports = function(app){
    //获取全部文章列表
    app.all("/studyAllListFindAction",function(req,res){
        var currentPage = req.body.currentPage;
        var pageSize = req.body.pageSize;
    	var result = {};
        var conditions = {};
        var fields = {
            "currentPage":currentPage,
            "pageSize":pageSize
        };
        studyDao.findStudy(conditions,fields,dbHelper,function(studyResult){  
            result = studyResult;
            studyTypeDao.findStudyType(conditions,dbHelper,function(studyTypeResult){  
            	result.result.forEach(function(obj){
            		studyTypeResult.result.forEach(function(o){
            			if(obj.type == o.type){
                            obj["typeName"] = o.name;
                        }
            		});
            	});
            	res.json(result);
        	});    
        });     
    });
    //获取分享文章类型
    app.all("/studyTypeListFindAction",function(req,res){
        var conditions = {};
        studyTypeDao.findStudyType(conditions,dbHelper,function(result){  
            res.json(result);
        });    
    });
    //根据id获取新闻类型
    app.all("/studyTypeByIdAction",function(req,res){
        var id = req.body.id;
        var conditions = {"_id":ObjectID(id)};
        studyTypeDao.findOneStudyType(conditions,dbHelper,function(result){  
            res.json(result);
        });    
    });
    //根据id获取文章内容
    app.all("/studyInfoFindByIdAction",function(req,res){
        var id = req.body.id;
        var conditions0 = {"_id":ObjectID(id)};
        var jsonRes = {};
        studyDao.findOneStudy(conditions0,dbHelper,function(result0){  
            if(result0.success == 1){
                jsonRes = result0;
                var conditions1 = {"studyId":id};
                studyDetailDao.findOneStudyDetail(conditions1,dbHelper,function(result1){
                    if(result1.success == 1){
                        jsonRes.result["article"] = result1.result.article;
                        res.json(jsonRes);
                    }else{
                        res.json(result1);
                    }
                });
            }else{
                res.json(result0);
            }
        });    
    });
    //添加或修改分享文章
    app.all("/editStudyAction",function(req,res){
        uploadHelper.fileAny(req,res,function(result0){
            var thisTime = new Date().getTime();
            var find = {"_id":"xxx"};
            if(result0.body.studyId != ''){
                find = {"_id":ObjectID(result0.body.studyId)};
            }
            studyDao.findOneStudy(find,dbHelper,function(result1){  
                if(result1.success == 1){
                    var conditions = {"_id":ObjectID(result0.body.studyId)};
                    var update = {
                        "name":result0.body.studyName,
                        "author":result0.body.author,
                        "type":Number(result0.body.type),
                        "updateTime":thisTime
                    };
                    studyDao.updateStudy(conditions,update,dbHelper,function(result2){  
                        if(result2.success == 1){
                            var conditions1 = {"studyId":result0.body.studyId};
                            var update1 = {
                                "name":result0.body.studyName,
                                "author":result0.body.author,
                                "article":result0.body.article,
                                "updateTime":thisTime
                            };
                            studyDetailDao.updateStudyDetail(conditions1,update1,dbHelper,function(result3){
                                res.json(result3);
                            });
                        }else{
                            res.json(result2);
                        }
                    }); 
                }else{
                    var conditions = {
                        "name":result0.body.studyName,
                        "author":result0.body.author,
                        "type":Number(result0.body.type),
                        "createTime":thisTime,
                        "updateTime":thisTime
                    };
                    studyDao.addStudy(conditions,dbHelper,function(result2){  
                        if(result2.success == 1){
                            var conditions1 = {"createTime":thisTime};
                            studyDao.findOneStudy(conditions1,dbHelper,function(result3){
                                var conditions2 = {
                                    "studyId":result3.result._id.toString(),
                                    "name":result0.body.studyName,
                                    "author":result0.body.author,
                                    "article":result0.body.article,
                                    "createTime":thisTime,
                                    "updateTime":thisTime
                                };
                                studyDetailDao.addStudyDetail(conditions2,dbHelper,function(result4){
                                    res.json(result4);
                                });
                            });  
                        }else{
                            res.json(result2);
                        }
                    });    
                }
            });  
        });
    });
    //添加或修改分享类型
    app.all("/editStudyTypeAction",function(req,res){
        var id = req.body.id;
        var conditions0 = {"_id":"xxx"};
        if(id != ''){
            conditions0 = {"_id":ObjectID(id)};
        }
        studyTypeDao.findOneStudyType(conditions0,dbHelper,function(result0){
            if(result0.success == 1){
                var thisTime = new Date().getTime();
                var update = {
                    "name":req.body.name,
                    "updateTime":thisTime
                };
                studyTypeDao.updateStudyType(conditions0,update,dbHelper,function(result2){  
                    res.json(result2);
                });
            }else{
                studyTypeDao.findStudyType({},dbHelper,function(result1){
                    if(result1.success == 1){
                        var typeArr = [];
                        result1.result.forEach(function(obj){
                            typeArr.push(obj.type);
                        });
                        var typeMax = Math.max.apply(null,typeArr); //获取数组最大值
                        var thisTime = new Date().getTime();
                        var conditions1 = {
                            "name":req.body.name,
                            "type":Number(typeMax+1),
                            "createTime":thisTime,
                            "updateTime":thisTime
                        };
                        studyTypeDao.addStudyType(conditions1,dbHelper,function(result2){  
                            res.json(result2);
                        });
                    }else{
                        res.json(result1);
                    }
                });  
            }
        });
    });
    //删除分享资料
    app.all("/deleteStudyAction",function(req,res){
        var id = req.body.id;
        var conditions0 = {"_id":ObjectID(id)};
        studyDao.removeStudy(conditions0,dbHelper,function(result0){  
            if(result0.success == 1){
                var conditions1 = {"studyId":id};
                studyDetailDao.removeStudyDetail(conditions1,dbHelper,function(result1){  
                    res.json(result1);
                });    
            }else{
                res.json(result0);
            }
        });    
    });
    //删除类型
    app.all("/deleteStudyTypeAction",function(req,res){
        var id = req.body.id;
        var conditions = {"_id":ObjectID(id)};
        studyTypeDao.findOneStudyType(conditions,dbHelper,function(result1){  
            if(result1.success == 1){
                var conditions2 = {"type":result1.result.type};
                studyDao.findStudy(conditions2,{},dbHelper,function(result2){  
                    if(result2.success == 1){
                        res.json({success:0,flag:"此类型下还有学习数据，不可删除"});
                    }else{
                        studyTypeDao.removeStudyType(conditions,dbHelper,function(result3){  
                            res.json(result3);
                        });
                    }
                });  
            }else{
                res.json(result1);
            }
        });               
    });
}