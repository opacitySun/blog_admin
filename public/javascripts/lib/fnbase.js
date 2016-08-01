/**
 * Created by sun on 2016/4/11.
 */

define(function(){
    var fnBase = {};
    /*
     * 是否存在指定变量
     */
    fnBase.isExitsVariable = function(variableName){
        try {
            if (typeof(variableName) == "undefined") {
                console.log("value is undefined");
                return false;
            } else {
                console.log("value is true");
                return true;
            }
        } catch(e) {}
        return false;
    }
    /*
     * 判断是否为空对象
     */
    fnBase.isEmptyObject = function(obj){
        for(var name in obj){return false;}
        return true;
    }
    /*
     * 判断是否为json对象
     */
    fnBase.isJson = function(obj){
        var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
        return isjson;
    }
    /*
     * 检测数组中是否存在指定元素
     */
    fnBase.inArray = function(value,arr){
        if (arr.indexOf(value) > -1){return true;}
        return false;
    }
    /*
     * 检测字符串中是否存在指定字符
     */
    fnBase.inString = function(value,string){
        if(string.indexOf(value) > 0){
            return true;
        }else{
            return false;
        }
    }
    /*
     * 获取url参数
     */
    fnBase.GetRequest = function(){
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            str = decodeURI(str);
            var strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
    /*
     * 阻止冒泡时间方法
     * 兼容ie(e.cancleBubble)和ff(e.stopProgation)
     */
    fnBase.stopBubble = function(e){
        var evt = e||window.event;
        evt.stopPropagation?evt.stopPropagation():(evt.cancelBubble=true);//阻止冒泡
        evt.preventDefault();//阻止浏览器默认行为，这样链接就不会跳转
    }
    /*
     * 过滤script语句
     */
    fnBase.stripscript = function(s){
        return s.replace(/<script.*?>.*?<\/script>/ig,'');
    }
    /*
     * 计算小数保留多位小数
     * src是数值，pos是要保留几位
     */
    fnBase.formatFloat = function(src,pos){
        pos = pos || 0;
        if(pos == 0){
            return Math.round(src);
        }else{
            var num = Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
            num = num + "";
            var index = num.indexOf(".");
            var indexofNum = num.substr(index+1,num.length-1);
            var indexofNumLen = indexofNum.length;
            var zeroNum = "";
            if(index == -1){
                for(var i=0;i<pos;i++){
                    zeroNum += "0";
                }
                num = num + "." + zeroNum;
            }else if(indexofNumLen == 1){
                for(var i=0;i<pos-1;i++){
                    zeroNum += "0";
                }
                num = num + zeroNum;
            }
            return num;
        }
    }
    /*
     * 删除左右两端的空格
     */
    fnBase.trim = function(str){
        return str.replace(/(^\s*)|(\s*$)/g,"");
    }
    /*
     * 删除左边的空格
     */
    fnBase.ltrim = function(str){
        return str.replace(/(^\s*)/g,"");
    }
    /*
     * 删除右边的空格
     */
    fnBase.rtrim = function(str){
        return str.replace(/(\s*$)/g,"");
    }
    /*
     * 判断如果超过指定字数则显示省略号或进行截取
     * txt是要截取的文字,num是限定的字数
     * isEllipsis:true 添加省略号,false 不添加省略号
     */
    fnBase.overTxtEllipsis = function(txt,num,isEllipsis){
        if(txt == null){
            return txt;
        }else{
            var len = txt.length;
            var txtSubstr = "";
            if(len > num){
                txtSubstr = txt.substr(0,num);
                if(isEllipsis == true){
                    txtSubstr = txtSubstr+"...";
                }
            }else{
                txtSubstr = txt;
            }
            return txtSubstr;
        }
    }
    /**
     * 用于把用utf16编码的字符转换成实体字符，以供后台存储
     * @param  {string} str 将要转换的字符串，其中含有utf16字符将被自动检出
     * @return {string}     转换后的字符串，utf16字符将被转换成&#xxxx;形式的实体字符
     */
    fnBase.utf16toEntities = function(str){
        var patt=/[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
        str = str.replace(patt, function(char){
            var H, L, code;
            if (char.length===2) {
                H = char.charCodeAt(0); // 取出高位
                L = char.charCodeAt(1); // 取出低位
                code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
                return "&#" + code + ";";
            } else {
                return char;
            }
        });
        return str;
    }
    /*
     * 将时间戳转换为发表时间的格式
     */
    fnBase.getCreateTimeTxtByLong = function(dateTimeStamp){
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;

        var result = "";
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        if(diffValue < 0){
            //若日期不符则弹出窗口告之
            console.log("结束日期不能小于开始日期！");
            return false;
        }
        var monthC =diffValue/month;
        var weekC =diffValue/(7*day);
        var dayC =diffValue/day;
        var hourC =diffValue/hour;
        var minC =diffValue/minute;
        if(monthC>=1){
            result="发表于" + parseInt(monthC) + "个月前";
        }else if(weekC>=1){
            result="发表于" + parseInt(weekC) + "周前";
        }else if(dayC>=1){
            result="发表于"+ parseInt(dayC) +"天前";
        }else if(hourC>=1){
            result="发表于"+ parseInt(hourC) +"个小时前";
        }else if(minC>=1){
            result="发表于"+ parseInt(minC) +"分钟前";
        }else{
            result="刚刚发表";
        }
        return result;
    }
    /*
     * 扩展Date的format方法
     */
    fnBase.dateFormat = function(date,format){
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }
    /**
     *转换日期对象为日期字符串
     * @param date 日期对象
     * @param isFull 是否为完整的日期数据,
     * 为true时, 格式如"2000-03-05 01:05:04"
     * 为false时, 格式如 "2000-03-05"
     * @return 符合要求的日期字符串
     */
    fnBase.getSmpFormatDate = function(date, isFull){
        var pattern = "";
        if (isFull == true || isFull == undefined) {
            pattern = "yyyy-MM-dd hh:mm:ss";
        } else {
            pattern = "yyyy-MM-dd";
        }
        return fnBase.getFormatDate(date, pattern);
    }
    /**
     *转换当前日期对象为日期字符串
     * @param date 日期对象
     * @param isFull 是否为完整的日期数据,
     * 为true时, 格式如"2000-03-05 01:05:04"
     * 为false时, 格式如 "2000-03-05"
     * @return 符合要求的日期字符串
     */
    fnBase.getSmpFormatNowDate = function(isFull){
        return fnBase.getSmpFormatDate(new Date(), isFull);
    }
    /**
     *转换long值为日期字符串
     * @param l long值
     * @param isFull 是否为完整的日期数据,
     * 为true时, 格式如"2000-03-05 01:05:04"
     * 为false时, 格式如 "2000-03-05"
     * @return 符合要求的日期字符串
     */
    fnBase.getSmpFormatDateByLong = function(l, isFull){
        return fnBase.getSmpFormatDate(new Date(l), isFull);
    }
    /**
     *转换日期对象为日期字符串
     * @param l long值
     * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss
     * @return 符合要求的日期字符串
     */
    fnBase.getFormatDate = function(date, pattern){
        if (date == undefined) {
            date = new Date();
        }
        if (pattern == undefined) {
            pattern = "yyyy-MM-dd hh:mm:ss";
        }
        return fnBase.dateFormat(date,pattern);
    }
    /**
     *转换long值为日期字符串
     * @param l long值
     * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss
     * @return 符合要求的日期字符串
     */
    fnBase.getFormatDateByLong = function(l, pattern){
        return fnBase.getFormatDate(new Date(l), pattern);
    }
    /*
     * 获取滚动条当前的位置
     */
    fnBase.getScrollTop = function(){
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        }
        else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }
    /*
     * 获取当前可视范围的高度
     */
    fnBase.getClientHeight = function(){
        var clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
        }
        else {
            clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        }
        return clientHeight;
    }
    /*
     * 获取文档完整的高度
     */
    fnBase.getScrollHeight = function(){
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }
    /*
     * 向native发送链接地址信息
     */
    fnBase.sendObjectMessageToNative = function(url){
        var iframe = document.createElement('iframe');
        iframe.setAttribute('src', url);
        document.documentElement.appendChild(iframe);
        iframe.parentNode.removeChild(iframe);
        iframe = null;
    }
    /*
     * 判断是否为安卓设备
     */
    fnBase.isAndroid = function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
            return true;
        }else{
            return false;
        }
    }
    /*
     * 判断是否为苹果设备
     */
    fnBase.isIOS = function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
            return true;
        }else{
            return false;
        }
    }
    /*
     * 判断是否是微信中
     */
    fnBase.isWeiXin = function(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    }
    /*
     * 获取路由路径名称
     */
    fnBase.getRouterName = function(){
        var url = window.location.href;
        var host = window.location.host;
        var protocol = window.location.protocol;
        var urlFirstHalf = protocol + "//" + host;
        var urlFirstHalfLen = urlFirstHalf.length;
        var urlPath = url.substring(urlFirstHalfLen);
        return urlPath;
    }

    //将对象集合返回给外部
    return fnBase;
});
