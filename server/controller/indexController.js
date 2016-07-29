var dbHelper = require("../DBHelper/dbHelper");
var userInfoDao = require("../DBSql/userInfoDao");
var userWorksDao = require("../DBSql/userWorksDao");
var newsDao = require("../DBSql/newsDao");

module.exports = function(app){
    //获取用户信息
    app.all("/userInfoFindAction",function(req,res){
        var conditions = {};
        userInfoDao.findUserInfo(conditions,dbHelper,function(result){  
            console.log(JSON.stringify(result));
            res.json(result);
        });    
    });

    //获取作品列表
    app.all("/userWorksFindAction",function(req,res){
        var conditions = {};
        userWorksDao.findUserWorks(conditions,dbHelper,function(result){  
            console.log(JSON.stringify(result));
            res.json(result);
        });    
    });

    //获取新闻列表
    app.all("/newsListAction",function(req,res){
        var conditions = {};
        newsDao.findNews(conditions,dbHelper,function(result){  
            console.log(JSON.stringify(result));
            res.json(result);
        });    
    });
}