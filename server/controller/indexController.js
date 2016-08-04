var ObjectID = require("mongodb").ObjectID;
var dbHelper = require("../DBHelper/dbHelper");
var uploadHelper = require("../DBHelper/uploadHelper");
var bannerDao = require("../DBSql/bannerDao");
var bannerImageDao = require("../DBSql/bannerImageDao");
var multer  = require('multer');
var rename = function(){
    var now = new Date();
    // 重命名为 年+月+日+时+分+秒+5位随机数
    return now.getFullYear() +
      ( '0' + (now.getMonth() + 1) ).slice(-2) +
      ( '0' + now.getDate() ).slice(-2) +
      ( '0' + now.getHours() ).slice(-2) +
      ( '0' + now.getMinutes() ).slice(-2) +
      ( '0' + now.getSeconds() ).slice(-2) +
      parseInt(10000 + Math.random() * 90000);
};
var upload = multer({ dest: '../../public/resources/images/',rename:rename});

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
        var conditions = req.body;
        bannerDao.addBanner(conditions,dbHelper,function(result){  
            console.log(JSON.stringify(result));
            res.json(result);
        });    
    });
    //添加banner图片
    app.all("/addBannerImageAction",upload,function(req,res){
        var tmp_path = req.file.path;
        console.log(tmp_path);
        /*
        uploadHelper.fileSingle(req,res,"images/banner/","bannerImg",function(file){
            console.log(file.path);
            console.log(req.body);
        });
        */
        /*
        var conditions = req.body;
        bannerImageDao.addBannerImage(conditions,dbHelper,function(result){  
            console.log(JSON.stringify(result));
            res.json(result);
        });    
        */
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