var jsAlias = {
	"jquery" : "commons/easyui1.5/jquery.min.js",
	"easyui-js" : "commons/easyui1.5/jquery.easyui.min.js",
	"admin-tool" : "commons/js/admin-tool.js"
};
var cssUrl = {
	"easyui-css" : "commons/easyui1.5/themes/default/easyui.css",
	"icon-css" : "commons/easyui1.5/themes/icon.css",
	"demo-css" : "commons/easyui1.5/demo/demo.css"
};
var WebCommon = {
	webBase : '/photoalbum-admin/admin/',
	getWebPath : function(moduleUri) {
		return this.webBase + moduleUri;
	}
}
function loadJS(config) {
	var jsScript = document.createElement("script");
	jsScript.type = "text/javascript";
	// document.body.appendChild(jsScript);
	if (jsScript.readyState) { // IE
		jsScript.onreadystatechange = function() {
			if (jsScript.readyState == "loaded"
					|| jsScript.readyState == "complete") {
				jsScript.onreadystatechange = null;
				if (config.callback) {
					config.callback(config);
				}
			}
		};
	} else {
		jsScript.onload = function() {
			if (config.callback) {
				config.callback(config);
			}
		}
	}
	jsScript.src = WebCommon.getWebPath(url);
	document.getElementsByTagName("head")[0].appendChild(jsScript);
}
function seaCallback(config) {
	seajs.config({
		base : WebCommon.webBase,
		alias : jsAlias
	});
	for (property in jsAlias) {
		seajs.use(property);
	}
	for (property in cssUrl) {
		seajs.use(cssUrl[property]);
	}
	if (config.userJSMap) {
		for (property in config.userJSMap) {
			seajs.use(config.userJSMap[property]);
		}
	}
}
function loadJSMap(config) {
	loadJS({
		url : "commons/js/sea/sea.js",
		callback : seaCallback,
		userJSMap : config.userJSMap,
		userCallback : config.callback
	});
}
