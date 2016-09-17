
define(['./Base',"../model/m-login"], function (Base,model) {
    var cLogin = {
        //验证表单
        submitForm : function(){
        	var loginName = $("#loginName").val();
            var loginPwd = $("#loginPwd").val();
            var rememberStatus = $("#rememberMe").is(":checked");
            if(loginName == ''){
                alert("用户名不能为空");
                return false;
            }
            if(loginPwd == ''){
                alert("密码不能为空");
                return false;
            }
            model.findUser(loginName,loginPwd,function(res){
                if(res.success == 1){
                    $("#loginFrom").submit();
                }else{
                    alert("用户名或密码不正确");
                }
            });
        }
    };

    return cLogin;
});