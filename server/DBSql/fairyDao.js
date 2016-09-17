var fairy = require("../models/fairy");

/** 
 * 调用公共add方法并且传入操作数据库的模型
 * @returns {Function} 
 */  
exports.addFairy = function(conditions,dbHelper,callback) {  
    //获取user模型  
    var dbModel =fairy.getModel();  
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
exports.findFairy = function(conditions,fields,dbHelper,callback) {  
    var dbModel =fairy.getModel();  
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
exports.findOneFairy = function(conditions,dbHelper,callback) {  
    var dbModel =fairy.getModel();  
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
exports.removeFairy = function(conditions,dbHelper,callback) {  
    var dbModel =fairy.getModel();  
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
exports.updateFairy = function(conditions,update,dbHelper,callback) {  
    var dbModel =fairy.getModel();  
    dbHelper.updateData(dbModel,conditions,update,function(result){  
        callback(result);  
    });  
}  