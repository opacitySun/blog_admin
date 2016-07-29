var mongodb = require('mongodb');
var db = require('./db').getDB();	//连接数据库

db.open(function(err){
	if(!err){
		console.log('connect db user_info');
	}else{
		console.log(err);
		return false;
	}
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