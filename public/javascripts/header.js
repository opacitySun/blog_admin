
define(['require','jquery','fnbase'],function(require,$,fnbase){
	//创建头部
	var html = "";
	html += '<div class="header_top">';
	html += '	<div class="top_center">';
	html += '		<div class="logo">SUN</div>';
	html += '		<ul>';
	html += '		<li id="setHome"><a href="javascript:void(0)" title="设为首页">设为首页</a></li>';
	html += '		<span>|</span>';
	html += '		<li id="addFavorite"><a href="javascript:void(0)" title="收藏本站">收藏本站</a></li>';
	html += '		</ul>';
	html += '	</div>';
	html += '</div>';
	html += '<nav>';
	html += '	<ul>';
	html += '		<li><a href="/" title="网站首页">网站首页</a></li>';
	html += '		<li><a href="/works-list" title="我的作品">我的作品</a></li>';
	html += '		<li><a href="/study-list" title="学习分享">学习分享</a></li>';
	html += '		<li><a href="/recreation" title="我的娱乐">我的娱乐</a></li>';
	html += '		<li><a href="/news-list" title="消息新闻">消息新闻</a></li>';
	html += '	</ul>';
	html += '</nav>';
	$("#header").html(html);

	//设置菜单选中状态
	var url = window.location.href;
	var navLiNo = 0;
	if(fnbase.inString("works",url)){
		navLiNo = 1;
	}else if(fnbase.inString("study",url)){
		navLiNo = 2;
	}else if(fnbase.inString("recreation",url)){
		navLiNo = 3;
	}else if(fnbase.inString("news",url)){
		navLiNo = 4;
	}else{
		navLiNo = 0;
	}
	$("#header nav li").eq(navLiNo).find("a").addClass("sel");

	//设为首页
	function setHome(obj,indexUrl){
		try{
			obj.style.behavior='indexUrl(#default#homepage)';
			obj.setHomePage(indexUrl);
		}catch(e){
			if(window.netscape){
				try{
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
				}catch(e){
					alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
				}
			}else{
				alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【"+protocol+"//"+host+"】设置为首页。");
			}
		}
	}
	$("#setHome").click(function(){
		setHome(this,protocol+"//"+host);
	});

	//收藏本站
	function addFavorite(title, url) {
		try {
			window.external.addFavorite(url, title);
		}
		catch (e) {
			try {
				window.sidebar.addPanel(title, url, "");
			}
			catch (e) {
				alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请进入新网站后使用Ctrl+D进行添加");
			}
		}
	}
	$("#addFavorite").click(function(){
		addFavorite("孙博为的个人站",protocol+"//"+host);
	});
});