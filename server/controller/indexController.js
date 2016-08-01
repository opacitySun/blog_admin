var ObjectID = require("mongodb").ObjectID;
var dbHelper = require("../DBHelper/dbHelper");
var bannerDao = require("../DBSql/bannerDao");
var bannerImageDao = require("../DBSql/bannerImageDao");

module.exports = function(app){
    //获取banner列表
    app.all("/getBannerListAction",function(req,res){
        var conditions = {};
        bannerDao.findBanner(conditions,dbHelper,function(result){  
            console.log(JSON.stringify(result));
            res.json(result);
        });    
    });
    //查找一个banner
    app.all("/findOneBannerAction",function(req,res){
        var id = req.body.id;
        var conditions = {"_id":ObjectID(id)};
        var imageConditions = {"bannerId":id};
        bannerDao.findOneBanner(conditions,dbHelper,function(result){  
            bannerImageDao.findBannerImage(imageConditions,dbHelper,function(imageResult){
                var images = [];
                imageResult.result.forEach(function(obj){
                    images.push(obj.url);
                });
                result.result["images"] = images;
                console.log(JSON.stringify(result));
                res.json(result);
            });       
        });    
    });
    //添加banner
    app.all("/addBannerAction",function(req,res){
        var conditions = req.body;
        bannerDao.addBanner(conditions,dbHelper,function(result){  
            console.log(JSON.stringify(result));
            res.json(result);
        });    
    });
    //添加banner
    app.all("/deleteBannerAction",function(req,res){
        var id = req.body.id;
        var conditions = {"_id":ObjectID(id)};
        bannerDao.removeBanner(conditions,dbHelper,function(result){  
            console.log(JSON.stringify(result));
            res.json(result);
        });    
    });
}