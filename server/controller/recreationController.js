var dbHelper = require("../DBHelper/dbHelper");
var recreationDao = require("../DBSql/recreationDao");
var recreationTypeDao = require("../DBSql/recreationTypeDao");

module.exports = function(app){
    //获取全部项目列表
    app.all("/recreationAllListFindAction",function(req,res){
    	var result = {};
        var conditions = {};
        recreationDao.findRecreation(conditions,dbHelper,function(recreationResult){  
            result = recreationResult;
            recreationTypeDao.findRecreationType(conditions,dbHelper,function(recreationTypeResult){  
            	result.result.forEach(function(obj){
                    recreationTypeResult.result.forEach(function(o){
                        if(obj.type == o.type){
                            obj["typeName"] = o.name;
                        }
                    });
                });
            	res.json(result);
        	});    
        });     
    });
}