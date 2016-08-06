var ObjectID = require("mongodb").ObjectID;
var dbHelper = require("../DBHelper/dbHelper");
var uploadHelper = require("../DBHelper/uploadHelper");
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
    //获取banner图片列表
    app.all("/getBannerImageListAction",function(req,res){
        var conditions = {"bannerId":req.body.id};
        bannerImageDao.findBannerImage(conditions,dbHelper,function(result){  
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
        var thisTime = new Date().getTime();
        var conditions0 = {
            "name":req.body.bannerName,
            "type":req.body.bannerType,
            "pageTo":req.body.pageTo,
            "isShow":req.body.isShow,
            "createTime":thisTime,
            "updateTime":thisTime
        };
        bannerDao.addBanner(conditions0,dbHelper,function(result0){  
            if(result.success == 1){
                uploadHelper.fileArray(req,res,"bannerImg",6,function(result1){
                    var resourcesUrl = "/resources/";
                    var imgUrl = [];
                    result1.files.forEach(function(obj){
                        var imgOne = resourcesUrl + obj.filename;
                        imgUrl.push(imgOne);
                    });
                    var conditions1 = {
                        "bannerId":result0.result._id.toString(),
                        "name":"banner"+thisTime,
                        "url":imgUrl,
                        "createTime":thisTime,
                        "updateTime":thisTime
                    };
                    bannerImageDao.addBannerImage(conditions1,dbHelper,function(result2){  
                        if(result2.success == 1){
                            res.json(result0);
                        }else{
                            res.json(result2);
                        }
                    });    
                });   
            }
        });
        
    });
    //添加banner图片
    app.all("/addBannerImageAction",function(req,res){
        uploadHelper.fileSingle(req,res,"bannerImg",function(result){
            var thisTime = new Date().getTime();
            var resourcesUrl = "/resources/";
            var imgUrl = resourcesUrl + result.file.filename;
            var conditions = {
                "bannerId":result.body.bannerId,
                "name":result.body.bannerImageName,
                "url":imgUrl,
                "createTime":thisTime,
                "updateTime":thisTime
            };
            bannerImageDao.addBannerImage(conditions,dbHelper,function(result){  
                console.log(JSON.stringify(result));
                res.json(result);
            });    
        });
    });
    //修改banner
    app.all("/updateBannerAction",function(req,res){
        var timestamp=new Date().getTime();
        var conditions = {"_id":ObjectID(req.body.id)};
        var update = {"name":req.body.name,"type":req.body.type,"pageTo":req.body.pageTo,"isShow":req.body.isShow,"updateTime":timestamp};
        bannerDao.updateBanner(conditions,update,dbHelper,function(result){  
            console.log(JSON.stringify(result));
            res.json(result);
        });    
    });
    //删除banner
    app.all("/deleteBannerAction",function(req,res){
        var id = req.body.id;
        var conditions = {"_id":ObjectID(id)};
        bannerDao.removeBanner(conditions,dbHelper,function(result){  
            console.log(JSON.stringify(result));
            res.json(result);
        });    
    });
    //删除banner图片
    app.all("/deleteBannerImageAction",function(req,res){
        var id = req.body.id;
        var conditions = {"_id":ObjectID(id)};
        bannerImageDao.removeBannerImage(conditions,dbHelper,function(result){  
            console.log(JSON.stringify(result));
            res.json(result);
        });    
    });
}