var ObjectID = require("mongodb").ObjectID,
    fs = require("fs"),
    dbHelper = require("../DBHelper/dbHelper"),
    uploadHelper = require("../DBHelper/uploadHelper"); 

/**  
 * 删除图片  
 * @returns {Function}  
 */  
exports.removeImgAction = function(req, res) { 
    var result = {};  
    var file = req.body.path;
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