var banner = require("../models/banner");

/** 
 * 调用公共add方法并且传入操作数据库的模型
 * @returns {Function} 
 */  
exports.addBanner = function(conditions,dbHelper,callback) {  
    //获取user模型  
    var dbModel =banner.getModel();  
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
exports.findBanner = function(conditions,dbHelper,callback) {  
    var dbModel =banner.getModel();  
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
exports.findOneBanner = function(conditions,dbHelper,callback) {  
    var dbModel =banner.getModel();  
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
exports.removeBanner = function(conditions,dbHelper,callback) {  
    var dbModel =banner.getModel();  
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
exports.updateBanner = function(conditions,update,options,dbHelper,callback) {  
    var dbModel =banner.getModel();  
    dbHelper.updateData(dbModel,conditions,update,options,function(result){  
        callback(result);  
    });  
}  