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
    //添加banner
    app.all("/addBannerAction",function(req,res){
        var conditions = req.body;
        bannerDao.addBanner(conditions,dbHelper,function(result){  
            console.log(JSON.stringify(result));
            res.json(result);
        });    
    });
}