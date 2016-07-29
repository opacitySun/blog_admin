
define(['require','fnbase','jquery'],function(require,fnbase,$){
    function controllerBase(id){
        this.id = id;
    }

    controllerBase.prototype = {
        closeDiv:function(id){
            $("#"+id).hide();
        },
        openDiv:function(id){
            $("#"+id).show();
        }
    };

    return controllerBase;
});