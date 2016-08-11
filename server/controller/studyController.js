var ObjectID = require("mongodb").ObjectID;
var dbHelper = require("../DBHelper/dbHelper");
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