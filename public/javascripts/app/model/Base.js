
define(['require','jquery'],function(require,$){
    function modelBase(id){
        this.id = id;
    }

    modelBase.prototype = {
        getAjax:function(url,data,fn){
            $.ajax({
                cache : false,
                data : data,
                url : url,
                timeout:1000,
                dataType : "json",
                async : true,
                type : "get",
                //contentType: "application/json; charset=utf-8",
                success : function(data) {
                    console.log(data);
                    fn(data);//执行自定义的回调方法 fn
                },
                error:function(err){
                    console.log(err);
                }
            });
        },
        postAjax:function(url,data,fn){
            $.ajax({
                cache : false,
                data : data,
                url : url,
                timeout:1000,
                dataType : "json",
                async : true,
                type : "post",
                //contentType: "application/json; charset=utf-8",
                success : function(data) {
                    console.log(data);
                    fn(data);//执行自定义的回调方法 fn
                },
                error:function(err){
                    console.log(err);
                }
            });
        },
        postFormDataAjax:function(url,data,fn){
            $.ajax({
                url : url,
                type : 'post',
                data : formData,
                async : false,
                cache : false,
                contentType : false,
                processData : false,
                timeout:1000,
                //contentType: "application/json; charset=utf-8",
                success : function(data) {
                    console.log(data);
                    fn(data);//执行自定义的回调方法 fn
                },
                error:function(err){
                    console.log(err);
                }
            });
        }
    };

    return modelBase;
});