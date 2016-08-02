var express = require('express');
var router = express.Router();
var userController = require('../server/controller/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'welcome to sun admin',layout: 'layout.html' });
});

/* index-banner */
router.get('/index-banner', function(req, res, next) {
  res.render('index-banner', { title: '首页 -- banner图',layout: 'layout.html' });
});

/* index-banner-edit */
router.get('/index-banner-edit', function(req, res, next) {
  res.render('index-banner-edit', { title: '首页 -- banner图 -- 编辑',layout: 'layout.html' });
});

/* index-banner-image */
router.get('/index-banner-image', function(req, res, next) {
  res.render('index-banner-image', { title: '首页 -- banner图 -- 图片',layout: 'layout.html' });
});

/* banner-image-edit */
router.get('/banner-image-edit', function(req, res, next) {
  res.render('banner-image-edit', { title: '首页 -- banner图 -- 图片编辑',layout: 'layout.html' });
});

/* login */
router.get('/login', function(req, res) {
	res.render('login', { title: 'login',layout: false });
});

/* ucenter */
router.post('/ucenter', function(req, res) {
	userController.userFindAction(req, res);
});

module.exports = router;
