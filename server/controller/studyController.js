var ObjectID = require("mongodb").ObjectID;
var dbHelper = require("../DBHelper/dbHelper");
var studyDao = require("../DBSql/studyDao");
var studyDetailDao = require("../DBSql/studyDetailDao");
var studyTypeDao = require("../DBSql/studyTypeDao");

module.exports = function(app){
    //获取全部项目列表
    app.all("/studyAllListFindAction",function(req,res){
    	var result = {};

        var conditions = {};
        studyTypeDao.findStudyType(conditions,dbHelper,function(studyTypeResult){  
            console.log(JSON.stringify(studyTypeResult));
            result = studyTypeResult;
            studyDao.findStudy(conditions,dbHelper,function(studyResult){  
            	console.log(JSON.stringify(studyResult));
            	result.result.forEach(function(obj){
            		var studyArr = [];
            		studyResult.result.forEach(function(o){
            			if(obj.type == o.type){
            				studyArr.push(o);
            			}
            		});
            		if(studyArr.length > 0){
            			obj["data"] = studyArr;
            		}
            	});
            	res.json(result);
        	});    
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
}