var multer  = require('multer');
var basedest = './public/resources/';	//上传路径
var rename = function(){
	var now = new Date();
    // 重命名为 年+月+日+时+分+秒+5位随机数
    return now.getFullYear() +
      ( '0' + (now.getMonth() + 1) ).slice(-2) +
      ( '0' + now.getDate() ).slice(-2) +
      ( '0' + now.getHours() ).slice(-2) +
      ( '0' + now.getMinutes() ).slice(-2) +
      ( '0' + now.getSeconds() ).slice(-2) +
      parseInt(10000 + Math.random() * 90000);
};

/** 
 * 接收一个叫做<fieldname>名字的附件，该附件将被保存到req.file属性中
 * Accept a single file with the name fieldname. The single file will be stored in req.file.
 * @param req 请求
 * @param res 响应
 * @param detaildest 详细路径
 * @param fieldname 所接收附件的名字
 * @param callback 回调方法 
 */ 
exports.fileSingle = function(req,res,detaildest,fieldname,callback){
	var upload = multer({dest:basedest+detaildest,rename:rename}).single(fieldname);
	upload(req, res, function(err){
		if(err){
			console.log(err);
			return;
		}else{
			console.log(req.file);
			callback(req);
		}
	});
}

/** 
 * 接收一个所有附件的名字是<fieldname>的附件数组，如果附件的数量大于<maxCountfiles>则抛出异常。文件数组将被储存到req.files属性中
 * Accept an array of files, all with the name fieldname. Optionally error out if more than maxCountfiles are uploaded. The array of files will be stored in req.files.
 * @param req 请求
 * @param res 响应
 * @param detaildest 详细路径
 * @param fieldname 所接收附件的名字
 * @param maxnum 允许的最大数量
 * @param callback 回调方法 
 */ 
exports.fileArray = function(req,res,detaildest,fieldname,maxnum,callback){
	var upload = multer({dest:basedest+detaildest,rename:rename}).array(fieldname,maxnum);
	upload(req, res, function(err){
		if(err){
			console.log(err);
			return;
		}else{
			console.log(req.files);
			callback(req);
		}
	});
}

/** 
 * 接收所有名称的附件，附件将被保存到req.files属性中（是一个对象数组）
 * Accept a mix of files, specified by fields. An object with arrays of files will be stored inreq.files.fields should be an array of objects with name and optionally a maxCount.
 * @param req 请求
 * @param res 响应
 * @param detaildest 详细路径
 * @param fieldsarray 配置数组,例如：
   [
	{ name: 'avatar', maxCount: 1 },
	{ name: 'gallery', maxCount: 8 }
   ]
 */ 
exports.fileFields = function(req,res,detaildest,fieldsarray,callback){
	var upload = multer({dest:basedest+detaildest,rename:rename}).fields(fieldsarray);
	upload(req, res, function(err){
		if(err){
			console.log(err);
			return;
		}else{
			console.log(req.files);
			callback(req);
		}
	});
}

/** 
 * 接收所有提交的数据，保存到req.files属性中
 * Accepts all files that comes over the wire. An array of files will be stored in req.files.
 * @param req 请求
 * @param res 响应
 * @param detaildest 详细路径
 * @param fieldsarray 配置数组,例如：
   [
	{ name: 'avatar', maxCount: 1 },
	{ name: 'gallery', maxCount: 8 }
   ]
 */ 
exports.fileAny = function(req,res,detaildest,callback){
	var upload = multer({dest:basedest+detaildest,rename:rename}).any();
	upload(req, res, function(err){
		if(err){
			console.log(err);
			return;
		}else{
			console.log(req.files);
			callback(req);
		}
	});
}