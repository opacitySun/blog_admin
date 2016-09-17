var ObjectID = require("mongodb").ObjectID,
    fs = require("fs"),
    url=require('url'); 

/**  
 * 删除图片  
 * @returns {Function}  
 */  
exports.removeImgAction = function(req, res) { 
    var result = {};  
    var params=url.parse(req.url,true).query;
    var file = params.path;
    if(file){
        fs.unlinkSync(file);
        result['state'] = 'success';
        result['message'] = '删除完成';
    }else{
        result['state'] = 'error';
        result['message'] = '删除失败，未找到'+file;
    }
    res.json(result);
} 