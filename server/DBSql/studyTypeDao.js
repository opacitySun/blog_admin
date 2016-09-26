var studyType = require("../models/studyType");

/** 
 * 调用公共add方法并且传入操作数据库的模型user 
 * @returns {Function} 
 */  
exports.addStudyType = function(conditions,dbHelper,callback) {  
    //获取user模型  
    var dbModel =studyType.getModel();  
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
exports.findStudyType = function(conditions,dbHelper,callback) {  
    var dbModel =studyType.getModel();  
    var fields   = {};  
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
exports.findOneStudyType = function(conditions,dbHelper,callback) {  
    var dbModel =studyType.getModel();  
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
exports.removeStudyType = function(conditions,dbHelper,callback) {  
    var dbModel =studyType.getModel();  
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
exports.updateStudyType = function(conditions,update,dbHelper,callback) {  
    var dbModel =studyType.getModel();  
    dbHelper.updateData(dbModel,conditions,update,function(result){  
        callback(result);  
    });  
}  