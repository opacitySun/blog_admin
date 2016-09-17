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

/* works-edit */
router.get('/works-edit', function(req, res, next) {
  res.render('works-edit', { title: '作品 -- 编辑',layout: 'layout.html' });
});

/* study */
router.get('/study', function(req, res, next) {
  res.render('study', { title: '学习分享',layout: 'layout.html' });
});

/* study-edit */
router.get('/study-edit', function(req, res, next) {
  res.render('study-edit', { title: '学习分享 -- 编辑详情',layout: 'layout.html' });
});

/* study-type */
router.get('/study-type', function(req, res, next) {
  res.render('study-type', { title: '学习分享 -- 编辑类型',layout: 'layout.html' });
});

/* news */
router.get('/news', function(req, res, next) {
  res.render('news', { title: '新闻消息',layout: 'layout.html' });
});

/* news-edit */
router.get('/news-edit', function(req, res, next) {
  res.render('news-edit', { title: '新闻消息 -- 编辑详情',layout: 'layout.html' });
});

/* news-type */
router.get('/news-type', function(req, res, next) {
  res.render('news-type', { title: '新闻消息 -- 编辑类型',layout: 'layout.html' });
});

/* recreation */
router.get('/recreation', function(req, res, next) {
  res.render('recreation', { title: '娱乐',layout: 'layout.html' });
});

/* recreation-edit */
router.get('/recreation-edit', function(req, res, next) {
  res.render('recreation-edit', { title: '娱乐 -- 编辑详情',layout: 'layout.html' });
});

/* recreation-type */
router.get('/recreation-type', function(req, res, next) {
  res.render('recreation-type', { title: '娱乐 -- 编辑类型',layout: 'layout.html' });
});

/* fairy */
router.get('/fairy', function(req, res, next) {
  res.render('fairy', { title: '精灵',layout: 'layout.html' });
});

/* fairy-edit */
router.get('/fairy-edit', function(req, res, next) {
  res.render('fairy-edit', { title: '精灵 -- 编辑详情',layout: 'layout.html' });
});

/* fairy-type */
router.get('/fairy-type', function(req, res, next) {
  res.render('fairy-type', { title: '精灵 -- 类型列表',layout: 'layout.html' });
});

/* fairy-type-edit */
router.get('/fairy-type-edit', function(req, res, next) {
  res.render('fairy-type-edit', { title: '精灵 -- 类型编辑',layout: 'layout.html' });
});

/* fairy-level */
router.get('/fairy-level', function(req, res, next) {
  res.render('fairy-level', { title: '精灵 -- 等级列表',layout: 'layout.html' });
});

/* fairy-level-edit */
router.get('/fairy-level-edit', function(req, res, next) {
  res.render('fairy-level-edit', { title: '精灵 -- 等级编辑',layout: 'layout.html' });
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
