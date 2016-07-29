var dbHelper = require("../DBHelper/dbHelper");
var recreationDao = require("../DBSql/recreationDao");
var recreationTypeDao = require("../DBSql/recreationTypeDao");

module.exports = function(app){
    //获取全部项目列表
    app.all("/recreationAllListFindAction",function(req,res){
    	var result = {};

        var conditions = {};
        recreationTypeDao.findRecreationType(conditions,dbHelper,function(recreationTypeResult){  
            console.log(JSON.stringify(recreationTypeResult));
            result = recreationTypeResult;
            recreationDao.findRecreation(conditions,dbHelper,function(recreationResult){  
            	console.log(JSON.stringify(recreationResult));
            	result.result.forEach(function(obj){
            		var recreationArr = [];
            		recreationResult.result.forEach(function(o){
            			if(obj.type == o.type){
            				recreationArr.push(o);
            			}
            		});
            		if(recreationArr.length > 0){
            			obj["data"] = recreationArr;
            		}
            	});
            	res.json(result);
        	});    
        });     
    });
}