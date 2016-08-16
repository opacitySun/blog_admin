var ObjectID = require("mongodb").ObjectID;
var fs = require("fs");
var dbHelper = require("../DBHelper/dbHelper");
var uploadHelper = require("../DBHelper/uploadHelper");
var recreationDao = require("../DBSql/recreationDao");
var recreationTypeDao = require("../DBSql/recreationTypeDao");

module.exports = function(app){
    //获取全部项目列表
    app.all("/recreationAllListFindAction",function(req,res){
    	var result = {};
        var conditions = {};
        recreationDao.findRecreation(conditions,dbHelper,function(recreationResult){  
            result = recreationResult;
            recreationTypeDao.findRecreationType(conditions,dbHelper,function(recreationTypeResult){  
            	result.result.forEach(function(obj){
                    recreationTypeResult.result.forEach(function(o){
                        if(obj.type == o.type){
                            obj["typeName"] = o.name;
                        }
                    });
                });
            	res.json(result);
        	});    
        });     
    });
    //获取类型
    app.all("/recreationTypeListFindAction",function(req,res){
        var conditions = {};
        recreationTypeDao.findRecreationType(conditions,dbHelper,function(result){  
            res.json(result);
        });    
    });
    //根据id获取娱乐内容
    app.all("/recreationFindByIdAction",function(req,res){
        var id = req.body.id;
        var conditions = {"_id":ObjectID(id)};
        recreationDao.findOneRecreation(conditions,dbHelper,function(result){  
            res.json(result);
        });    
    });
    //添加或修改新闻消息
    app.all("/editRecreationAction",function(req,res){
        uploadHelper.fileSingle(req,res,"recreationImg",function(result0){
            var thisTime = new Date().getTime();
            var resourcesUrl = "/resources/";
            var imgUrl = resourcesUrl + result0.file.filename;
            var find = {"_id":"xxx"};
            if(result0.body.recreationId != ''){
                find = {"_id":ObjectID(result0.body.recreationId)};
            }
            recreationDao.findOneRecreation(find,dbHelper,function(result1){  
                if(result1.success == 1){
                    var conditions = {"_id":ObjectID(result0.body.recreationId)};
                    var update = {
                        "name":result0.body.recreationName,
                        "url":result0.body.recreationUrl,
                        "type":Number(result0.body.type),
                        "desc":result0.body.desc,
                        "image":imgUrl,
                        "updateTime":thisTime
                    };
                    recreationDao.updateRecreation(conditions,update,dbHelper,function(result2){  
                        res.json(result2);
                    }); 
                }else{
                    var conditions = {
                        "name":result0.body.recreationName,
                        "url":result0.body.recreationUrl,
                        "type":Number(result0.body.type),
                        "desc":result0.body.desc,
                        "image":imgUrl,
                        "createTime":thisTime,
                        "updateTime":thisTime
                    };
                    recreationDao.addRecreation(conditions,dbHelper,function(result2){  
                        res.json(result2);
                    });    
                }
            });  
        });
    });
    //根据id修改
    app.all("/updateRecreationByIdAction",function(req,res){
        var thisTime = new Date().getTime();
        var conditions = {"_id":ObjectID(req.body.id)};
        var update = {
            "name":req.body.name,
            "url":req.body.url,
            "type":req.body.type,
            "desc":req.body.desc,
            "updateTime":thisTime
        };
        recreationDao.updateRecreation(conditions,update,dbHelper,function(result){  
            res.json(result);
        });    
    });
    //添加或修改类型
    app.all("/editRecreationTypeAction",function(req,res){
        var conditions0 = {};
        recreationTypeDao.findRecreationType(conditions0,dbHelper,function(result0){
            if(result0.success == 1){
                var typeArr = [];
                result0.result.forEach(function(obj){
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
                recreationTypeDao.addRecreationType(conditions1,dbHelper,function(result1){  
                    res.json(result1);
                });    
            }else{
                res.json(result0);
            }
        });
    });
    //删除
    app.all("/deleteRecreationAction",function(req,res){
        var id = req.body.id;
        var conditions = {"_id":ObjectID(id)};
        recreationDao.findOneRecreation(conditions,dbHelper,function(result0){  
            var imgUrl = result0.result.image;
            recreationDao.removeRecreation(conditions,dbHelper,function(result1){  
                fs.unlinkSync(imgUrl);
                res.json(result1);
            });    
        });  
    });
}