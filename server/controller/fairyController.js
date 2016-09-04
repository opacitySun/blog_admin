var ObjectID = require("mongodb").ObjectID,
    fs = require("fs"),
    dbHelper = require("../DBHelper/dbHelper"),
    uploadHelper = require("../DBHelper/uploadHelper"),
    fairyDao = require("../DBSql/fairyDao"),
    fairyTypeDao = require("../DBSql/fairyTypeDao"),
    fairyLevelDao = require("../DBSql/fairyLevelDao"),
    userDao = require("../DBSql/userDao");

module.exports = function(app){
    //获取全部列表
    app.all("/fairyAllListFindAction",function(req,res){
        var currentPage = req.body.currentPage;
        var pageSize = req.body.pageSize;
    	var result = {};
        var conditions = {};
        var fields = {
            "currentPage":currentPage,
            "pageSize":pageSize
        };
        fairyDao.findFairy(conditions,fields,dbHelper,function(fairyResult){  
            result = fairyResult;
            fairyTypeDao.findFairyType(conditions,{},dbHelper,function(fairyTypeResult){  
                userDao.findUser(conditions,dbHelper,function(userResult){
                    result.result.forEach(function(obj){
                        fairyTypeResult.result.forEach(function(o){
                            if(obj.type == o.type){
                                obj["typeName"] = o.name;
                                obj["image"] = o.image;
                            }
                        });
                    });
                    result.result.forEach(function(obj){
                        userResult.result.forEach(function(o){
                            if(obj.userId == o._id.toString()){
                                obj["owner"] = o.name;
                            }
                        });
                    });
                    res.json(result);
                });
        	});    
        });     
    });
    //获取类型列表
    app.all("/fairyTypeListFindAction",function(req,res){
        var currentPage = req.body.currentPage;
        var pageSize = req.body.pageSize;
        var conditions = {};
        var fields = {
            "currentPage":currentPage,
            "pageSize":pageSize
        };
        fairyTypeDao.findFairyType(conditions,fields,dbHelper,function(result){  
            res.json(result);
        });    
    });
    //获取等级列表
    app.all("/fairyLevelListFindAction",function(req,res){
        var currentPage = req.body.currentPage;
        var pageSize = req.body.pageSize;
        var conditions = {};
        var fields = {
            "currentPage":currentPage,
            "pageSize":pageSize
        };
        fairyLevelDao.findFairyLevel(conditions,fields,dbHelper,function(result){  
            res.json(result);
        });    
    });
    //获取类型列表（无页码）
    app.all("/fairyTypeListFindNoFieldAction",function(req,res){
        var conditions = {};
        var fields = {};
        fairyTypeDao.findFairyType(conditions,fields,dbHelper,function(result){  
            res.json(result);
        });    
    });
    //获取等级列表（无页码）
    app.all("/fairyLevelListFindNoFieldAction",function(req,res){
        var conditions = {};
        var fields = {};
        fairyLevelDao.findFairyLevel(conditions,fields,dbHelper,function(result){  
            res.json(result);
        });    
    });
    //根据id获取精灵详情
    app.all("/fairyFindByIdAction",function(req,res){
        var id = req.body.id;
        var conditions = {"_id":ObjectID(id)};
        fairyDao.findOneFairy(conditions,dbHelper,function(result){  
            res.json(result);
        });    
    });
    //根据id获取精灵类型详情
    app.all("/fairyTypeFindByIdAction",function(req,res){
        var id = req.body.id;
        var conditions = {"_id":ObjectID(id)};
        fairyTypeDao.findOneFairyType(conditions,dbHelper,function(result){  
            res.json(result);
        });    
    });
    //根据id获取等级详情
    app.all("/fairyLevelFindByIdAction",function(req,res){
        var id = req.body.id;
        var conditions = {"_id":ObjectID(id)};
        fairyLevelDao.findOneFairyLevel(conditions,dbHelper,function(result){  
            res.json(result);
        });    
    });
    //根据id修改精灵信息
    app.all("/updateFairyByIdAction",function(req,res){
        var thisTime = new Date().getTime();
        var conditions = {"_id":ObjectID(req.body.id)};
        var update = {
            "name":req.body.name,
            "type":Number(req.body.type),
            "level":Number(req.body.level),
            "exp":Number(req.body.exp),
            "updateTime":thisTime
        };
        fairyDao.updateFairy(conditions,update,dbHelper,function(result){  
            res.json(result);
        });    
    });
    //添加或修改精灵类型
    app.all("/editFairyTypeAction",function(req,res){
        uploadHelper.fileSingle(req,res,"fairyTypeImg",function(result0){
            var thisTime = new Date().getTime();
            var resourcesUrl = "/resources/";
            var imgUrl = resourcesUrl + result0.file.filename;
            var find = {"_id":"xxx"};
            if(result0.body.fairyTypeId != ''){
                find = {"_id":ObjectID(result0.body.fairyTypeId)};
            }
            fairyTypeDao.findOneFairyType(find,dbHelper,function(result1){  
                if(result1.success == 1){
                    var conditions = {"_id":ObjectID(result0.body.fairyTypeId)};
                    var update = {
                        "name":result0.body.fairyTypeName,
                        "desc":result0.body.desc,
                        "image":imgUrl,
                        "updateTime":thisTime
                    };
                    fairyTypeDao.updateFairyType(conditions,update,dbHelper,function(result2){  
                        var oldImg = result1.result.image;
                        if(oldImg != ''){
                            fs.unlinkSync('./public'+oldImg);   //删除老图片
                        }
                        res.json(result2);
                    }); 
                }else{
                    fairyTypeDao.findFairyType({},{},dbHelper,function(result3){
                        if(result3.success == 1){
                            var typeArr = [];
                            result3.result.forEach(function(obj){
                                typeArr.push(obj.type);
                            });
                            var typeMax = Math.max.apply(null,typeArr); //获取数组最大值
                            var conditions = {
                                "name":result0.body.fairyTypeName,
                                "type":Number(typeMax+1),
                                "desc":result0.body.desc,
                                "image":imgUrl,
                                "createTime":thisTime,
                                "updateTime":thisTime
                            };
                            fairyTypeDao.addFairyType(conditions,dbHelper,function(result2){  
                                res.json(result2);
                            });    
                        }else{
                            res.json(result3);
                        }
                    });    
                }
            });  
        });
    });
    //根据id修改精灵类型
    app.all("/updateFairyTypeByIdAction",function(req,res){
        var thisTime = new Date().getTime();
        var conditions = {"_id":ObjectID(req.body.id)};
        var update = {
            "name":req.body.name,
            "desc":req.body.desc,
            "updateTime":thisTime
        };
        fairyTypeDao.updateFairyType(conditions,update,dbHelper,function(result){  
            res.json(result);
        });    
    });
    //添加等级
    app.all("/addFairyLevelAction",function(req,res){
        var thisTime = new Date().getTime();
        var conditions = {
            "level":req.body.level,
            "exp":req.body.exp,
            "createTime":thisTime,
            "updateTime":thisTime
        };
        fairyLevelDao.addFairyLevel(conditions,dbHelper,function(result){  
            res.json(result);
        });    
    });
    //根据id修改等级
    app.all("/updateFairyLevelByIdAction",function(req,res){
        var thisTime = new Date().getTime();
        var conditions = {"_id":ObjectID(req.body.id)};
        var update = {
            "level":req.body.level,
            "exp":req.body.exp,
            "updateTime":thisTime
        };
        fairyLevelDao.updateFairyLevel(conditions,update,dbHelper,function(result){  
            res.json(result);
        });    
    });
    //删除精灵类型
    app.all("/deleteFairyTypeAction",function(req,res){
        var id = req.body.id;
        var conditions = {"_id":ObjectID(id)};
        fairyTypeDao.findOneFairyType(conditions,dbHelper,function(result0){  
            var imgUrl = result0.result.image;
            fairyTypeDao.removeFairyType(conditions,dbHelper,function(result1){  
                if(imgUrl != ''){
                    fs.unlinkSync('./public'+imgUrl);
                }
                res.json(result1);
            });    
        });  
    });
    //删除精灵等级
    app.all("/deleteFairyLevelAction",function(req,res){
        var id = req.body.id;
        var conditions = {"_id":ObjectID(id)};
        fairyLevelDao.removeFairyLevel(conditions,dbHelper,function(result){  
            res.json(result);
        });    
    });
}