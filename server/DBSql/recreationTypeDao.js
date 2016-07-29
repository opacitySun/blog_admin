var recreationType = require("../models/recreationType");

/** 
 * 调用公共add方法并且传入操作数据库的模型user 
 * @returns {Function} 
 */  
exports.addRecreationType = function(conditions,dbHelper,callback) {  
    //获取user模型  
    var dbModel =recreationType.getModel();  
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
exports.findRecreationType = function(conditions,dbHelper,callback) {  
    var dbModel =recreationType.getModel();  
    var fields   = {};  
    var options  = {};  
    dbHelper.findData(dbModel,conditions,fields,options,function(result){  
        callback(result);
    });  
}  

/** 
 * 调用公共remove方法并且传入操作数据库的模型user 
 * @param conditions 
 * @param dbHelper 
 * @param callback 
 */  
exports.removeRecreationType = function(conditions,dbHelper,callback) {  
    var dbModel =recreationType.getModel();  
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
exports.updateRecreationType = function(conditions,update,options,dbHelper,callback) {  
    var dbModel =recreationType.getModel();  
    dbHelper.updateData(dbModel,conditions,update,options,function(result){  
        callback(result);  
    });  
}  