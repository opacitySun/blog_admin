
define(['require','jquery','./controller/c-login','./model/m-login'],function(require,$,controller,model){
    /*
    var controller = require('./controller/c-login'),
        model = require('./model/m-login');
        */

    $("#loginFrom").on("keydown",function(event){
        if(event.keyCode == 13){
            controller.submitForm();
        }
    });
    $("#loginSubmit").on("click",function(){
        controller.submitForm();
    });
});
