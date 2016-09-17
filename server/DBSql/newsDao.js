var news = require("../models/news");

/** 
 * 调用公共add方法并且传入操作数据库的模型news 
 * @returns {Function} 
 */  
exports.addNews = function(conditions,dbHelper,callback) {  
    //获取user模型  
    var dbModel =news.getModel();  
    dbHelper.addData(dbModel,conditions,function(result) {  
        callback(result); 
    });  
};  

/** 
 * 调用公共find方法并且传入操作数据库的模型news 
 * @param conditions 
 * @param dbHelper 
 * @param callback 
 */  
exports.findNews = function(conditions,fields,dbHelper,callback) {  
    var dbModel =news.getModel();  
    var options  = {};  
    dbHelper.findData(dbModel,conditions,fields,options,function(result){  
        callback(result);
    });  
}  

/** 
 * 调用公共findOne方法并且传入操作数据库的模型news 
 * @param conditions 
 * @param dbHelper 
 * @param callback 
 */  
exports.findOneNews = function(conditions,dbHelper,callback) {  
    var dbModel =news.getModel();  
    var fields   = {};  
    var options  = {};  
    dbHelper.findOneData(dbModel,conditions,fields,options,function(result){  
        callback(result);
    });  
}  

/** 
 * 调用公共remove方法并且传入操作数据库的模型news 
 * @param conditions 
 * @param dbHelper 
 * @param callback 
 */  
exports.removeNews = function(conditions,dbHelper,callback) {  
    var dbModel =news.getModel();  
    dbHelper.removeData(dbModel,conditions,function(result){  
        callback(result); 
    });  
}  

/** 
 * 调用公共update方法并且传入操作数据库的模型news 
 * @param conditions 
 * @param update 
 * @param options 
 * @param dbHelper 
 * @param callback 
 */  
exports.updateNews = function(conditions,update,dbHelper,callback) {  
    var dbModel =news.getModel();  
    dbHelper.updateData(dbModel,conditions,update,function(result){  
        callback(result);  
    });  
}  