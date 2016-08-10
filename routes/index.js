var express = require('express');
var router = express.Router();
var userController = require('../server/controller/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'welcome to sun admin',layout: 'layout.html' });
});

/* banner */
router.get('/banner', function(req, res, next) {
  res.render('banner', { title: 'banner图',layout: 'layout.html' });
});

/* banner-edit */
router.get('/banner-edit', function(req, res, next) {
  res.render('banner-edit', { title: 'banner图 -- 编辑',layout: 'layout.html' });
});

/* banner-image */
router.get('/banner-image', function(req, res, next) {
  res.render('banner-image', { title: 'banner图 -- 图片',layout: 'layout.html' });
});

/* banner-image-edit */
router.get('/banner-image-edit', function(req, res, next) {
  res.render('banner-image-edit', { title: 'banner图 -- 图片编辑',layout: 'layout.html' });
});

/* index-show */
router.get('/index-show', function(req, res, next) {
  res.render('index-show', { title: '首页 -- 显示模块管理',layout: 'layout.html' });
});

/* user-list */
router.get('/user', function(req, res, next) {
  res.render('user', { title: '用户',layout: 'layout.html' });
});

/* user-edit */
router.get('/user-edit', function(req, res, next) {
  res.render('user-edit', { title: '用户 -- 编辑',layout: 'layout.html' });
});

/* user-info-edit */
router.get('/user-info-edit', function(req, res, next) {
  res.render('user-info-edit', { title: '用户信息 -- 编辑',layout: 'layout.html' });
});

/* works */
router.get('/works', function(req, res, next) {
  res.render('works', { title: '作品',layout: 'layout.html' });
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
