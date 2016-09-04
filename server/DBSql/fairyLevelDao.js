var fairyLevel = require("../models/fairyLevel");

/** 
 * 调用公共add方法并且传入操作数据库的模型
 * @returns {Function} 
 */  
exports.addFairyLevel = function(conditions,dbHelper,callback) {  
    //获取user模型  
    var dbModel =fairyLevel.getModel();  
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
exports.findFairyLevel = function(conditions,dbHelper,callback) {  
    var dbModel =fairyLevel.getModel();  
    var options  = {};  
    var fields = {};
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
exports.findOneFairyLevel = function(conditions,dbHelper,callback) {  
    var dbModel =fairyLevel.getModel();  
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
exports.removeFairyLevel = function(conditions,dbHelper,callback) {  
    var dbModel =fairyLevel.getModel();  
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
exports.updateFairyLevel = function(conditions,update,options,dbHelper,callback) {  
    var dbModel =fairyLevel.getModel();  
    dbHelper.updateData(dbModel,conditions,update,options,function(result){  
        callback(result);  
    });  
}  