var ObjectID = require("mongodb").ObjectID;
var fs = require("fs");
var dbHelper = require("../DBHelper/dbHelper");
var uploadHelper = require("../DBHelper/uploadHelper");
var userWorksDao = require("../DBSql/userWorksDao");

module.exports = function(app){
    //获取项目列表
    app.all("/worksListFindAction",function(req,res){
    	//type:0是PC,1是手机;status:0是在线,1是静态
        var conditions = {"type":Number(req.body.type),"status":Number(req.body.status)};
        userWorksDao.findUserWorks(conditions,dbHelper,function(result){  
            console.log(result);
            res.json(result);
        });    
    });

    //获取全部项目列表
    app.all("/worksAllListFindAction",function(req,res){
        var currentPage = req.body.currentPage;
        var pageSize = req.body.pageSize;
        var conditions = {};
        var fields = {
            "currentPage":currentPage,
            "pageSize":pageSize
        };
        userWorksDao.findUserWorks(conditions,fields,dbHelper,function(result){  
            console.log(result);
            res.json(result);
        });    
    });

    //根据id获取作品信息
    app.all("/getWorkByIdAction",function(req,res){
        var conditions = {"_id":ObjectID(req.body.id)};
        userWorksDao.findOneUserWorks(conditions,dbHelper,function(result){  
            console.log(result);
            res.json(result);
        });    
    });

    //根据id修改作品信息
    app.all("/updateWorkByIdAction",function(req,res){
        var thisTime = new Date().getTime();
        var conditions = {"_id":ObjectID(req.body.id)};
        var update = {
            "workName":req.body.workName,
            "workUrl":req.body.workUrl,
            "type":req.body.type,
            "status":req.body.status,
            "userId":req.body.userId,
            "updateTime":thisTime
        };
        userWorksDao.updateUserWorks(conditions,update,dbHelper,function(result){  
            console.log(result);
            res.json(result);
        });    
    });

    //编辑作品信息
    app.all("/editWorkAction",function(req,res){
        uploadHelper.fileSingle(req,res,"workImg",function(result0){
            var thisTime = new Date().getTime();
            var resourcesUrl = "/resources/";
            var imgUrl = resourcesUrl + result0.file.filename;
            var find = {"_id":"xxx"};
            if(result0.body.workId != ''){
                find = {"_id":ObjectID(result0.body.workId)};
            }
            userWorksDao.findOneUserWorks(find,dbHelper,function(result1){  
                if(result1.success == 1){
                    var conditions = {"_id":ObjectID(result0.body.workId)};
                    var update = {
                        "workName":result0.body.workName,
                        "workUrl":result0.body.workUrl,
                        "workImg":imgUrl,
                        "type":Number(result0.body.type),
                        "status":Number(result0.body.status),
                        "userId":result0.body.userId,
                        "updateTime":thisTime
                    };
                    userWorksDao.updateUserWorks(conditions,update,dbHelper,function(result3){  
                        var oldImg = result1.result.workImg;
                        fs.unlinkSync('./public'+oldImg);
                        res.json(result3);
                    }); 
                }else{
                    var conditions = {
                        "workName":result0.body.workName,
                        "workUrl":result0.body.workUrl,
                        "workImg":imgUrl,
                        "type":Number(result0.body.type),
                        "status":Number(result0.body.status),
                        "userId":result0.body.userId,
                        "createTime":thisTime,
                        "updateTime":thisTime
                    };
                    userWorksDao.addUserWorks(conditions,dbHelper,function(result2){  
                        res.json(result2);
                    });    
                }
            });  
        });   
    });

    //删除作品
    app.all("/deleteWorkAction",function(req,res){
        var id = req.body.id;
        var conditions ={"_id":ObjectID(id)};  
        userWorksDao.findOneUserWorks(conditions,dbHelper,function(result1){
            var imgUrl = result1.result.workImg;
            userWorksDao.removeUserWorks(conditions,dbHelper,function(result){  
                fs.unlinkSync('./public'+imgUrl);
                res.json(result);
            });   
        });   
    });
}