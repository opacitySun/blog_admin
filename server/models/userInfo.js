var mongodb = require('mongodb');
var server = require('./db').getServer();
var db = require('./db').getDB();

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