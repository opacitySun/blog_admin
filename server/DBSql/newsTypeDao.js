var newsType = require("../models/newsType");

/** 
 * 调用公共add方法并且传入操作数据库的模型user 
 * @returns {Function} 
 */  
exports.addNewsType = function(conditions,dbHelper,callback) {  
    //获取user模型  
    var dbModel =newsType.getModel();  
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
exports.findNewsType = function(conditions,dbHelper,callback) {  
    var dbModel =newsType.getModel();  
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
exports.removeNewsType = function(conditions,dbHelper,callback) {  
    var dbModel =newsType.getModel();  
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
exports.updateNewsType = function(conditions,update,dbHelper,callback) {  
    var dbModel =newsType.getModel();  
    dbHelper.updateData(dbModel,conditions,update,function(result){  
        callback(result);  
    });  
}  