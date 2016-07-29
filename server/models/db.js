var mongodb = require('mongodb');
var server  = new mongodb.Server('123.57.50.14', 27017, {auto_reconnect:true});

module.exports = function(){
	var db = new mongodb.Db('my_blog', server, {safe:true});
	return db;
}
