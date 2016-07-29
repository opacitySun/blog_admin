var dbHelper = require("../DBHelper/dbHelper");
var userWorksDao = require("../DBSql/userWorksDao");

module.exports = function(app){
    //获取项目列表
    app.all("/worksListFindAction",function(req,res){
    	//type:0是PC,1是手机;status:0是在线,1是静态
        var conditions = {"type":Number(req.body.type),"status":Number(req.body.status)};
        userWorksDao.findUserWorks(conditions,dbHelper,function(result){  
            console.log(JSON.stringify(result));
            res.json(result);
        });    
    });

    //获取全部项目列表
    app.all("/worksAllListFindAction",function(req,res){
        var conditions = {};
        userWorksDao.findUserWorks(conditions,dbHelper,function(result){  
            console.log(JSON.stringify(result));
            res.json(result);
        });    
    });
}