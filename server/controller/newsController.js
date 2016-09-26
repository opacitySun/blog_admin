var ObjectID = require("mongodb").ObjectID;
var dbHelper = require("../DBHelper/dbHelper");
var uploadHelper = require("../DBHelper/uploadHelper");
var newsDao = require("../DBSql/newsDao");
var newsTypeDao = require("../DBSql/newsTypeDao");

module.exports = function(app){
    //获取全部项目列表
    app.all("/newsAllListFindAction",function(req,res){
        var currentPage = req.body.currentPage;
        var pageSize = req.body.pageSize;
    	var result = {};
        var conditions = {};
        var fields = {
            "currentPage":currentPage,
            "pageSize":pageSize
        };
        newsDao.findNews(conditions,fields,dbHelper,function(newsResult){  
            result = newsResult;
            newsTypeDao.findNewsType(conditions,dbHelper,function(newsTypeResult){  
            	result.result.forEach(function(obj){
                    newsTypeResult.result.forEach(function(o){
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
    app.all("/newsTypeListFindAction",function(req,res){
        var conditions = {};
        newsTypeDao.findNewsType(conditions,dbHelper,function(result){  
            res.json(result);
        });    
    });
    //根据id获取新闻内容
    app.all("/newsFindByIdAction",function(req,res){
        var id = req.body.id;
        var conditions = {"_id":ObjectID(id)};
        newsDao.findOneNews(conditions,dbHelper,function(result){  
            res.json(result);
        });    
    });
    //根据id获取新闻类型
    app.all("/newsTypeFindByIdAction",function(req,res){
        var id = req.body.id;
        var conditions = {"_id":ObjectID(id)};
        newsTypeDao.findOneNewsType(conditions,dbHelper,function(result){  
            res.json(result);
        });    
    });
    //添加或修改新闻消息
    app.all("/editNewsAction",function(req,res){
        uploadHelper.fileAny(req,res,function(result0){
            var thisTime = new Date().getTime();
            var find = {"_id":"xxx"};
            if(result0.body.newsId != ''){
                find = {"_id":ObjectID(result0.body.newsId)};
            }
            newsDao.findOneNews(find,dbHelper,function(result1){  
                if(result1.success == 1){
                    var conditions = {"_id":ObjectID(result0.body.newsId)};
                    var update = {
                        "name":result0.body.newsName,
                        "type":Number(result0.body.type),
                        "desc":result0.body.desc,
                        "updateTime":thisTime
                    };
                    newsDao.updateNews(conditions,update,dbHelper,function(result2){  
                        res.json(result2);
                    }); 
                }else{
                    var conditions = {
                        "name":result0.body.newsName,
                        "type":Number(result0.body.type),
                        "desc":result0.body.desc,
                        "createTime":thisTime,
                        "updateTime":thisTime
                    };
                    newsDao.addNews(conditions,dbHelper,function(result2){  
                        res.json(result2);
                    });    
                }
            });  
        });
    });
    //添加或修改类型
    app.all("/editNewsTypeAction",function(req,res){
        var id = req.body.id;
        var conditions0 = {"_id":"xxx"};
        if(id != ''){
            conditions0 = {"_id":ObjectID(id)};
        }
        newsTypeDao.findOneNewsType(conditions0,dbHelper,function(result0){
            if(result0.success == 1){
                var thisTime = new Date().getTime();
                var update = {
                    "name":req.body.name,
                    "updateTime":thisTime
                };
                newsTypeDao.updateNewsType(conditions0,update,dbHelper,function(result1){  
                    res.json(result1);
                });
            }else{
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
                newsTypeDao.addNewsType(conditions1,dbHelper,function(result1){  
                    res.json(result1);
                });
            }
        });
    });
    //删除消息新闻
    app.all("/deleteNewsAction",function(req,res){
        var id = req.body.id;
        var conditions = {"_id":ObjectID(id)};
        newsDao.removeNews(conditions,dbHelper,function(result){  
            res.json(result);
        });    
    });
    //删除消息类型
    app.all("/deleteNewsTypeAction",function(req,res){
        var id = req.body.id;
        var conditions = {"_id":ObjectID(id)};
        newsTypeDao.findOneNewsType(conditions,dbHelper,function(result1){  
            if(result1.success == 1){
                var conditions2 = {"type":result1.result.type};
                newsDao.findNews(conditions2,{},dbHelper,function(result2){  
                    if(result2.success == 1){
                        res.json({success:0,flag:"此类型下还有新闻数据，不可删除"});
                    }else{
                        newsTypeDao.removeNewsType(conditions,dbHelper,function(result3){  
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