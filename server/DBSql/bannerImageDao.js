var bannerImage = require("../models/bannerImage");

/** 
 * 调用公共add方法并且传入操作数据库的模型
 * @returns {Function} 
 */  
exports.addBannerImage = function(conditions,dbHelper,callback) {  
    //获取user模型  
    var dbModel =bannerImage.getModel();  
    dbHelper.addData(dbModel,conditions,function(result) {  
        callback(result); 
    });  
};  

/** 
 * 调用公共find方法并且传入操作数据库的模型
 * @param conditions 
 * @param dbHelper 
 * @param callback 
 */  
exports.findBannerImage = function(conditions,dbHelper,callback) {  
    var dbModel =bannerImage.getModel();  
    var fields   = {};  
    var options  = {};  
    dbHelper.findData(dbModel,conditions,fields,options,function(result){  
        callback(result);
    });  
}  

/** 
 * 调用公共findOne方法并且传入操作数据库的模型
 * @param conditions 
 * @param dbHelper 
 * @param callback 
 */  
exports.findOneBannerImage = function(conditions,dbHelper,callback) {  
    var dbModel =bannerImage.getModel();  
    var fields   = {};  
    var options  = {};  
    dbHelper.findOneData(dbModel,conditions,fields,options,function(result){  
        callback(result);
    });  
} 

/** 
 * 调用公共remove方法并且传入操作数据库的模型
 * @param conditions 
 * @param dbHelper 
 * @param callback 
 */  
exports.removeBannerImage = function(conditions,dbHelper,callback) {  
    var dbModel =bannerImage.getModel();  
    dbHelper.removeData(dbModel,conditions,function(result){  
        callback(result); 
    });  
}  

/** 
 * 调用公共update方法并且传入操作数据库的模型
 * @param conditions 
 * @param update 
 * @param options 
 * @param dbHelper 
 * @param callback 
 */  
exports.updateBannerImage = function(conditions,update,options,dbHelper,callback) {  
    var dbModel =bannerImage.getModel();  
    dbHelper.updateData(dbModel,conditions,update,options,function(result){  
        callback(result);  
    });  
}  