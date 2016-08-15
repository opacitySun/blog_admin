var ObjectID = require("mongodb").ObjectID;
var dbHelper = require("../DBHelper/dbHelper");
var uploadHelper = require("../DBHelper/uploadHelper");
var studyDao = require("../DBSql/studyDao");
var studyDetailDao = require("../DBSql/studyDetailDao");
var studyTypeDao = require("../DBSql/studyTypeDao");

module.exports = function(app){
    //获取全部文章列表
    app.all("/studyAllListFindAction",function(req,res){
    	var result = {};
        var conditions = {};
        studyDao.findStudy(conditions,dbHelper,function(studyResult){  
            console.log(studyResult);
            result = studyResult;
            studyTypeDao.findStudyType(conditions,dbHelper,function(studyTypeResult){  
            	console.log(studyTypeResult);
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
    //详情
    app.all("/studyDetailAction",function(req,res){
        var id = req.body.id;
        var conditions = {"studyId":id};
        studyDetailDao.findOneStudyDetail(conditions,dbHelper,function(result){  
            console.log(JSON.stringify(result));
            res.json(result);
        });    
    });
    //根据id获取文章内容
    app.all("/studyInfoFindByIdAction",function(req,res){
        var id = req.body.id;
        var conditions0 = {"_id":ObjectID(id)};
        studyDao.findOneStudy(conditions0,dbHelper,function(result0){  
            
        });    
    });
    //添加或修改分享文章
    app.all("/editStudyAction",function(req,res){
        uploadHelper.fileAny(req,res,function(result0){
            var thisTime = new Date().getTime();
            var find = {"_id":"xxx"};
            if(result0.body.workId != ''){
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
                            var conditions1 = {
                                "studyId":result2.result._id.toString(),
                                "name":result0.body.studyName,
                                "author":result0.body.author,
                                "article":result0.body.article,
                                "createTime":thisTime,
                                "updateTime":thisTime
                            };
                            studyDetailDao.addStudyDetail(conditions1,dbHelper,function(result3){
                                res.json(result3);
                            });
                        }else{
                            res.json(result2);
                        }
                    });    
                }
            });  
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
}