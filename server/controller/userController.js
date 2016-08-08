var ObjectID = require("mongodb").ObjectID;
var dbHelper = require("../DBHelper/dbHelper");
var userDao = require("../DBSql/userDao");
var userInfoDao = require("../DBSql/userInfoDao");

/**  
 * 提供操作表的公共路由，以供ajax访问  
 * @returns {Function}  
 */ 
exports.outerConnectAction = function(app){
    //查找用户列表
    app.all("/outerUserListAction",function(req,res){
        var conditions ={};  
        userDao.findUser(conditions,dbHelper,function(result){  
            res.json(result); 
        });    
    });
    //查找用户
    app.all("/outerUserFindAction",function(req,res){
        var conditions ={'name':req.body.name,'password':req.body.password};  
        userDao.findOneUser(conditions,dbHelper,function(result){  
            res.json(result); 
        });    
    });
    //删除用户
    app.all("/outerDeleteUserAction",function(req,res){
        var id = req.body.id;
        var conditions0 ={"_id":ObjectID(id)};  
        userDao.removeUser(conditions0,dbHelper,function(result0){  
            if(result0.success == 1){
                var conditions1 ={"userId":id};  
                userInfoDao.removeUserInfo(conditions1,dbHelper,function(result1){
                    res.json(result1);
                });
            }else{
                res.json(result0); 
            }
        });    
    });
    //获取session信息
    app.all("/outerGetSessionAction",function(req,res){
        var result = req.session;
        res.json(result); 
    });
    //获取用户信息
    app.all("/outerUserInfoFindAction",function(req,res){
        var conditions = {"userId":req.body.userId};
        userInfoDao.findOneUserInfo(conditions,dbHelper,function(result){  
            console.log(JSON.stringify(result));
            res.json(result);
        });    
    });
    //退出登录
    app.all("/outerLogOut",function(req,res){
        req.session.destroy(function (err) {
            if(err){
                console.log("session销毁失败.");
            }else{
                console.log("session被销毁.");
            } 
        });   
        return res.redirect('/login');
    });
}

/**  
 * add user  
 * @returns {Function}  
 */  
exports.userAddAction = function() {  
    return function(req, res) {  
        var user = {
        	_id   : new global.mongoose.Types.ObjectId(),  
            name  : req.name,
            password : req.password
        };  
        /*
        for(var i=0;i<10;i++){  
            user.push({  
                _id   : new global.mongoose.Types.ObjectId(),  
                name  : req.name,
                password : req.password
            });  
        }  
        */
        userDao.addUser(user,dbHelper,function(result){  
            res.json(result);  
        });  
    }  
}  

/**  
 * get User  
 * @returns {Function}  
 */  
exports.userFindAction = function(req, res) {   
    var conditions ={'name':req.body.loginName,'password':req.body.loginPwd};  
    userDao.findOneUser(conditions,dbHelper,function(result){  
        if(result.success == 1){
            console.log(JSON.stringify(result));
            req.session.username=result.result.name;          
            req.session.password=result.result.password;
            req.session.regenerate(function (err) {
                if(err){
                    console.log("session重新初始化失败.");
                }else{
                    console.log("session被重新初始化.");
                } 
            });   
            return res.redirect('/');
        }else{
            console.log(JSON.stringify(result));
            req.session.destroy(function (err) {
                if(err){
                    console.log("session销毁失败.");
                }else{
                    console.log("session被销毁.");
                } 
            });   
            return res.redirect('/login');
        }
        //res.json(result);  
    });    
}  

/**  
 * remove User  
 * @returns {Function}  
 */  
exports.userRemoveAction = function() {  
    return function(req, res) {  
        var conditions ={};  
        userDao.removeUser(conditions,dbHelper,function(result){  
            res.json(result);  
        });  
    }  
}  

/**  
 * update User  
 * @returns {Function}  
 */  
exports.userUpdateAction = function() {  
    return function (req, res) {    
        var conditions = {};  
        var update = {}//{$set : {userName:xxx}};  
        var options = {}//{upsert:false};  
        userDao.updateUser(conditions, update, options, dbHelper, function (result) {  
            res.json(result);  
        });  
    }  
}  