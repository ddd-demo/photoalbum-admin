define(function(require, exports, module) {
	require("easyui-js");
	function AdminTool() {
		this.initConfig = function(view, config, defaultConfig) {
			// 拷贝系统常用方法。
			$.extend(view, ViewBase);
			// 考本默认参数
			if (defaultConfig) {
				$.extend(view, defaultConfig);
			}
			view.service = new this.BaseService({});
			view.initVAR(config);
			//如果使用iframe
			$(window).on('beforeunload', function() {
				view.destroy();
			});
		};
		// viewBase模板,用于拷贝到view中使用的。
		var ViewBase = {
			generateUUID : function() {
				var d = new Date().getTime();
				var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
						/[xy]/g, function(c) {
							var r = (d + Math.random() * 16) % 16 | 0;
							d = Math.floor(d / 16);
							return (c == 'x' ? r : (r & 0x3 | 0x8))
									.toString(16);
						});
				if (name) {
					uuid = name + uuid;
				}
				return uuid;
			},
			ID_NAME_MAP : {
				FIND_DIALOG_ID_NAME : "FIND_DIALOG_ID",
				FIND_FORM_ID_NAME : "INPUT_DIALOG_ID",
				DATAGRID_ID_NAME : "DATAGRID_ID",
				INPUT_DIALOG_ID_NAME : "INPUT_DIALOG_ID",
				INPUT_FORM_ID_NAME : "INPUT_FORM_ID",
				EDIT_DIALOG_ID_NAME : "EDIT_DIALOG_ID",
				EDIT_FORM_ID_NAME : "EDIT_FORM_ID",
				VIEW_DIALOG_ID_NAME : "VIEW_DIALOG_ID",
				VIEW_FORM_ID_NAME : "VIEW_FORM_ID",
				FORM_ID_NAME : "FORM_ID"// 重复使用的form
			},
			initVAR : function(config) {
				// 拷贝外部传入参数
				if (config) {
					$.extend(this, config);
				}
				var ID_VALUE_MAP = {

				};
				// 如果外面出入ID_VALUE_MAP，对特定ID有默认设置，这里就不会动态设置ID
				if (config.ID_VALUE_MAP) {
					$.extend(ID_VALUE_MAP, config.ID_VALUE_MAP);
				}
				for ( var idProperty in this.ID_NAME_MAP) {
					var property = this.ID_NAME_MAP[idProperty];
					var idValue = ID_VALUE_MAP[property];
					if (!idValue) {
						idValue = this.generateUUID();
					}
					// 这个表示在HTML页面用的ID，前面没有加#
					this[property + "_H"] = idValue;
					// 这个表示Juery中使用的ID，前面加#。
					this[property] = "#" + idValue;
					var htmlUIId = "#" + property;
					if ($(htmlUIId)) {
						// 修改模板的ID值
						$(htmlUIId).attr("id", idValue);
					}
				}
				// 重置补全相对URI
				var uriMap = config.uriMap;
				for ( var property in uriMap) {
					var uri = uriMap[property];
					this[property] = this.getUri(uri);
				}

			},
			openDialog : function(config) {
				this.closeDialog("#" + config.id);
				$(this.DIV).dialog(config);
			},
			closeDialog : function(dialogId) {
				if ($(dialogId)) {
					$(dialogId).dialog('destroy');
				}
			},
			destroy : function(destroyIds) {
				if (typeof destroyIds == 'string') {
					$(destroyIds).dialog('destroy');
				} else if (destroyIds instanceof Array) {
					for (var i = 0; i < destroyIds.length; i++) {
						try {
							$(destroyIds[i]).dialog('destroy');
						} catch (e) {

						}
					}
				} else {
					$(this.INPUT_DIALOG_ID).dialog('destroy');
					$(this.EDIT_DIALOG_ID).dialog('destroy');
					$(this.VIEW_DIALOG_ID).dialog('destroy');
				}

			},
			getUri : function(uri) {
				return WebCommon.getWebPath(uri);
			},
			DIV : "<div></div>"
		};
		this.BaseService = function(config) {
			var me = this;
			if (config) {
				$.extend(this, config);
			}
			// ============函数==============================
			/** 增加、修改、删除操作后的默认回调函数。 */
			this.CUDHandler = function(datagridId, message) {
				// 对应的本次操作消息
				this.message = message;
				// 要刷新的datagrid控件ID
				this.datagridId = datagridId;
				this.callback = function(isSuccess) {
					var msg;
					if (isSuccess) {
						msg = '操作成功!';
						if (this.message) {
							msg = this.message + msg;
						}
						$.messager.alert('系统提示:', msg, 'info');
						if (this.datagridId) {
							$(this.datagridId).datagrid('reload');
						}
					} else {
						msg = '操作失败!';
						if (this.message) {
							msg = this.message + msg;
						}
						$.messager.alert('系统提示:', msg, 'error');
					}
				}
			};
			this.doSave = function(config) {
				var url = config.url;
				var handler = new me.CUDHandler(config.datagridId);
				var data = $(config.inputFormId).serialize();
				$.ajax({
					url : url,
					type : "post",
					dataType : "json",
					data : data,
					success : function(data) {
						handler.callback(data)
					},
					error : function(xrequest, textStatus, errorThrown) {
						$.messager.alert('系统提示:', '请求失败！错误:'
								+ xrequest.responseText, 'error');
					}
				});
			};
			this.doUpdate = function(config) {
				var url = config.url;
				var handler = new me.CUDHandler(config.datagridId);
				var data = $(config.editFormId).serialize();
				$.ajax({
					url : url,
					type : "post",
					dataType : "json",
					data : data,
					success : function(data) {
						handler.callback(data)
					},
					error : function(xrequest, textStatus, errorThrown) {
						$.messager.alert('系统提示:', '请求失败！错误:'
								+ xrequest.responseText, 'error');
					}
				});
			};
			this.doDelete = function(config) {
				var handler = new me.CUDHandler(config.datagridId);
				var row = $(config.datagridId).datagrid('getSelected');
				if (row) {
					$.messager
							.confirm(
									'删除提示',
									'你确认删除选中的记录吗?',
									function(r) {
										if (r) {
											var keyValue = row[config.primaryKey];
											if (!keyValue) {
												$.messager
														.alert(
																'删除提示',
																'没有唯一标示的ID，请检查唯一标示的字段名称!',
																'warning');
											}
											var url = config.url;
											var url = url + "/" + keyValue
											$
													.ajax({
														url : url,
														type : "get",
														dataType : "json",
														success : function(data) {
															if (data == true) {
																var rowIndex = $(
																		config.datagridId)
																		.datagrid(
																				'getRowIndex',
																				row);
																$(
																		config.datagridId)
																		.datagrid(
																				'deleteRow',
																				rowIndex);
																$(
																		config.datagridId)
																		.datagrid(
																				'reload');
															} else {
																$.messager
																		.alert(
																				'系统提示:',
																				"删除失败",
																				'error');
															}

														},
														error : function(
																xrequest,
																textStatus,
																errorThrown) {
															$.messager
																	.alert(
																			'系统提示:',
																			'请求失败！错误:'
																					+ xrequest.responseText,
																			'error');
														}
													});
										}
									});
				} else {
					$.messager.alert('系统提示', '至少选择一条记录后才能删除!', 'warning');
				}

			};
			this.doEdit = function(config) {
				var row = $(config.datagridId).datagrid('getSelected');
				if (row) {
					var keyValue = row[config.primaryKey];
					var url = config.url;
					var url = url + "/" + keyValue
					$.ajax({
						url : url,
						type : "get",
						dataType : "json",
						success : function(data) {
							config.handler(data);
						},
						error : function(xrequest, textStatus, errorThrown) {
							$.messager.alert('系统提示:', '请求失败！错误:'
									+ xrequest.responseText, 'error');
						}
					});
				} else {
					$.messager.alert('系统提示', '至少选择一条记录后才能编辑!', 'warning');
				}

			};
			this.doView = function(config) {
				var row = $(config.datagridId).datagrid('getSelected');
				if (row) {
					var keyValue = row[config.primaryKey];
					var url = config.url;
					var url = url + "/" + keyValue
					$.ajax({
						url : url,
						type : "get",
						dataType : "json",
						success : function(data) {
							config.handler(data);
						},
						error : function(xrequest, textStatus, errorThrown) {
							$.messager.alert('系统提示:', '请求失败！错误:'
									+ xrequest.responseText, 'error');
						}
					});
				} else {
					$.messager.alert('系统提示', '至少选择一条记录后才能加载数据!', 'warning');
				}

			};
			this.doFind = function(config) {
				// alert(config.url);
				// $(config.datagridId).datagrid({
				// url : config.url,
				// queryParams : {}
				// });
				$(config.datagridId).datagrid("load", config.url);
			};
		}
	}
	return new AdminTool();
});
