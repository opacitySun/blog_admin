var userWorks = require("../models/userWorks");

/** 
 * 调用公共add方法并且传入操作数据库的模型user 
 * @returns {Function} 
 */  
exports.addUserWorks = function(conditions,dbHelper,callback) {  
    //获取user模型  
    var dbModel =userWorks.getModel();  
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
exports.findUserWorks = function(conditions,dbHelper,callback) {  
    var dbModel =userWorks.getModel();  
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
exports.removeUserWorks = function(conditions,dbHelper,callback) {  
    var dbModel =userWorks.getModel();  
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
exports.updateUserWorks = function(conditions,update,options,dbHelper,callback) {  
    var dbModel =userWorks.getModel();  
    dbHelper.updateData(dbModel,conditions,update,options,function(result){  
        callback(result);  
    });  
}  