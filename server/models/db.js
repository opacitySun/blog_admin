var mongodb = require('mongodb');
var server  = new mongodb.Server('123.57.50.14', 27017, {auto_reconnect:true});

module.exports = {
	getDB : function(){
		return _getDB();
	}
}

var _getDB = function(){
	var db = new mongodb.Db('my_blog', server, {safe:true});
	db.open();
	return db;
}