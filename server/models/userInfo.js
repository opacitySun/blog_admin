var mongodb = require('mongodb');
var db = require("./db").getDB();   //连接数据库

db.open(function(err){
	
});

module.exports = {
	getModel : function(){
		return _getModel();
	},
	closeModel : function(){
		db.close();
	}
};

var _getModel = function(type,err){
	var dbModel = db.collection('user_info');
	return dbModel;
}
