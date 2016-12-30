define(function(require, exports, module) {
	// 通过 require 引入依赖
	var sysbase = require('ts1');
	function Album() {
		this.init = function() {
			alert("album init" + sysbase.name);
		}
	}
	module.exports = new Album();
	// 通过 exports 对外提供接口
	// exports.doSomething = new Album();

});