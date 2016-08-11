
(function(){
    var basePath = document.getElementById("basePath").value;
    require.config({
        baseUrl : basePath+'/javascripts',
        paths : {
            'jquery':'lib/jquery-1.11.3.min',
            'fnbase':'lib/fnbase',
            'bootstrap':'lib/bootstrap-sb-admin/js/bootstrap.min',
            'editor':'lib/LineControl-Editor/js/editor'
        },
        map : {
            '*':{
                'css':'lib/require-css.min'
            }
        },
        shim : {
            //声明依赖
            'bootstrap':{
                deps:['jquery'],
                exports:'bootstrap'
            },
            'editor':{
                deps:[
                'jquery',
                'bootstrap',
                'css!../javascripts/lib/LineControl-Editor/css/editor.css'
                ],
                exports:'editor'
            }
        }
    });
})();
