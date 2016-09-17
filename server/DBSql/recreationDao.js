var recreation = require("../models/recreation");

/** 
 * 调用公共add方法并且传入操作数据库的模型user 
 * @returns {Function} 
 */  
exports.addRecreation = function(conditions,dbHelper,callback) {  
    //获取user模型  
    var dbModel =recreation.getModel();  
    dbHelper.addData(dbModel,conditions,function(result) {  
        callback(result); 
    });  
};  

/** 
 * 调用公共find方法并且传入操作数据库的模型user 
 * @param conditions 
 * @param dbHelper 
 * @param callback 
 */  
exports.findRecreation = function(conditions,fields,dbHelper,callback) {  
    var dbModel =recreation.getModel();   
    var options  = {};  
    dbHelper.findData(dbModel,conditions,fields,options,function(result){  
        callback(result);
    });  
}  

/** 
 * 调用公共findOne方法并且传入操作数据库的模型user 
 * @param conditions 
 * @param dbHelper 
 * @param callback 
 */  
exports.findOneRecreation = function(conditions,dbHelper,callback) {  
    var dbModel =recreation.getModel();  
    var fields   = {};  
    var options  = {};  
    dbHelper.findOneData(dbModel,conditions,fields,options,function(result){  
        callback(result);
    });  
}  

/** 
 * 调用公共remove方法并且传入操作数据库的模型user 
 * @param conditions 
 * @param dbHelper 
 * @param callback 
 */  
exports.removeRecreation = function(conditions,dbHelper,callback) {  
    var dbModel =recreation.getModel();  
    dbHelper.removeData(dbModel,conditions,function(result){  
        callback(result); 
    });  
}  

/** 
 * 调用公共update方法并且传入操作数据库的模型user 
 * @param conditions 
 * @param update 
 * @param options 
 * @param dbHelper 
 * @param callback 
 */  
exports.updateRecreation = function(conditions,update,dbHelper,callback) {  
    var dbModel =recreation.getModel();  
    dbHelper.updateData(dbModel,conditions,update,function(result){  
        callback(result);  
    });  
}  