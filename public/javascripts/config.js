
(function(){
    var basePath = document.getElementById("basePath").value;
    require.config({
        baseUrl : basePath+'/javascripts',
        paths : {
            'jquery':'lib/jquery-1.11.3.min',
            'fnbase':'lib/fnbase',
            'bootstrap':'lib/bootstrap-sb-admin/js/bootstrap.min'
        },
        map : {
            '*':{
                'css':'lib/require-css.min'
            }
        },
        shim : {
            //声明依赖
            /*
            'bootstrap':{
                deps:['jquery'],
                exports:'bootstrap'
            }
            */
        }
    });
})();
