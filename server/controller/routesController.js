/*
 *此文件用于让express关联不同的控制器
 *sun create in 2016.7.19
 */

var user = require("./userController").outerConnectAction;
var index = require("./indexController");
var works = require("./worksController");
var study = require("./studyController");
var news = require("./newsController");
var recreation = require("./recreationController");
var fairy = require("./fairyController");

module.exports = function(app){
	user(app);
	index(app);
	works(app);
	study(app);
	news(app);
	recreation(app);
	fairy(app);
}