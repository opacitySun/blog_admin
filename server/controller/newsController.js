var ObjectID = require("mongodb").ObjectID;
var dbHelper = require("../DBHelper/dbHelper");
var newsDao = require("../DBSql/newsDao");
var newsTypeDao = require("../DBSql/newsTypeDao");

module.exports = function(app){
    //获取全部项目列表
    app.all("/newsAllListFindAction",function(req,res){
    	var result = {};

        var conditions = {};
        newsTypeDao.findNewsType(conditions,dbHelper,function(newsTypeResult){  
            console.log(JSON.stringify(newsTypeResult));
            result = newsTypeResult;
            newsDao.findNews(conditions,dbHelper,function(newsResult){  
            	console.log(JSON.stringify(newsResult));
            	result.result.forEach(function(obj){
            		var newsArr = [];
            		newsResult.result.forEach(function(o){
            			if(obj.type == o.type){
            				newsArr.push(o);
            			}
            		});
            		if(newsArr.length > 0){
            			obj["data"] = newsArr;
            		}
            	});
            	res.json(result);
        	});    
        });     
    });
    //新闻详情
    app.all("/newsDetailAction",function(req,res){
        var id = req.body.id;
        var conditions = {"_id":ObjectID(id)};
        newsDao.findOneNews(conditions,dbHelper,function(result){  
            console.log(JSON.stringify(result));
            res.json(result);
        });    
    });
}