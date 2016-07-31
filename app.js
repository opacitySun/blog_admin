var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var expressSession = require('express-session');
var partials = require('express-partials');
var nodexcn = require('nodexcn');

var routes = require('./routes/index');
var users = require('./routes/users');

var routesController = require('./server/controller/routesController');

var app = express();

// view engine setup
app.set('views', __dirname + '/views');
app.engine('.html',ejs.__express);
app.set('view engine', 'html');
app.use(partials());
app.use(nodexcn());
/*
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
*/

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  cookie: {maxAge:14400000}, //14400s即4个小时后session和相应的cookie失效过期
  resave: true, //是指每次请求都重新设置session cookie
  saveUninitialized: false, //是指无论有没有session cookie，每次请求都设置个session cookie，默认给个标示为connect.sid
  secret: '3boy'
}));
app.use(express.static(path.join(__dirname, 'public')));

//将express与控制器相关联来达到路由的目的
routesController(app);

//判断是否存在session并选择跳转路径
app.use(function(req,res,next){
  if (!req.session.username) {
    if(req.url == "/login" || req.url == "/ucenter"){
      next(); //如果请求的地址是登录则通过，进行下一个请求
    }else{
      res.redirect('/login');
    }
  }else if(req.session.username) {
    next();
  }
}, routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
