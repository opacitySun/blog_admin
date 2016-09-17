
(function(){
    var basePath = document.getElementById("basePath").value;
    require.config({
        baseUrl : basePath+'/javascripts',
        paths : {
            'jquery':'lib/jquery-1.11.3.min',
            'fnbase':'lib/fnbase',
            'fnvalidate':'lib/fnvalidate',
            'bootstrap':'lib/bootstrap-sb-admin/js/bootstrap.min',
            'editor':'lib/LineControl-Editor/js/editor',
            'ueditor':'../ueditor/ueditor.all.min',
            'ueditor-config':'../ueditor/ueditor.config',
            'ZeroClipboard':'../ueditor/third-party/zeroclipboard/ZeroClipboard.min',
            'pagination':'lib/jBootstrapPage/jBootstrapPage'
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
            },
            'ueditor':{
                deps:['ueditor-config'],
                exports:'ueditor'
            },
            'pagination':{
                deps:['jquery','bootstrap','fnvalidate'],
                exports:'pagination'
            }
        }
    });
})();
