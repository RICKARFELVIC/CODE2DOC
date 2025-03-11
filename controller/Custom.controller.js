sap.ui.define([
		"sap/ui/core/mvc/Controller",
        "sap/m/MessageBox",
        "sap/m/MessageToast",
		"sap/m/Dialog",
		"sap/m/DialogType",
		"sap/m/Button",
		"sap/m/ButtonType",
		"sap/m/Label",
		"sap/m/Text",
		"sap/m/TextArea",
		"sap/m/ObjectStatus"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller, MessageBox, MessageToast, Dialog, DialogType, Button, ButtonType, Label, Text, TextArea, ObjectStatus) {
		"use strict";

		return Controller.extend("yit.CODE2DOC.controller.Custom", {
			onInit: function () {// FILTRO AMBIENTE
			var StatusSel = this.getView().byId("filStatus").getSelectedKey();
			var TagSolicitada = '';
			var TagGerada = '';
			var DocGerado = '';
			
			if (StatusSel === 'TODOS'){
				TagSolicitada = 'X';
				TagGerada = 'X';
				DocGerado = 'X';
			}
			if (StatusSel === 'PEND'){
				TagSolicitada = '';
				TagGerada = '';
				DocGerado = '';
			}
			if (StatusSel === 'PROCTAG'){
				TagSolicitada = 'X';
				TagGerada = '';
				DocGerado = '';
			}
			if (StatusSel === 'PROCDOC'){
				TagSolicitada = '';
				TagGerada = 'X';
				DocGerado = '';
			}
			if (StatusSel === 'FIN'){
				TagSolicitada = '';
				TagGerada = '';
				DocGerado = 'X';
			}
			
			var fil_filter1 = TagSolicitada;
			var filter1= new sap.ui.model.Filter({
				path: "TAG_SOLICITADA",
				// caso seja equal
				operator: sap.ui.model.FilterOperator.EQ,
				// caso seja texto
				// operator: sap.ui.model.FilterOperator.Contains,
				value1: fil_filter1	
			});
			
			var fil_filter2 = TagGerada;
			var filter2= new sap.ui.model.Filter({
				path: "TAG_GERADA",
				// caso seja equal
				operator: sap.ui.model.FilterOperator.EQ,
				// caso seja texto
				// operator: sap.ui.model.FilterOperator.Contains,
				value1: fil_filter2	
			});
			
			var fil_filter3 = DocGerado;
			var filter3= new sap.ui.model.Filter({
				path: "DOC_GERADO",
				// caso seja equal
				operator: sap.ui.model.FilterOperator.EQ,
				// caso seja texto
				// operator: sap.ui.model.FilterOperator.Contains,
				value1: fil_filter3	
			});
			
			var fil_filter4 = this.byId("filNome").getValue();
			var filter4= new sap.ui.model.Filter({
				path: "COD_REQ",
				// caso seja equal
				// operator: sap.ui.model.FilterOperator.EQ,
				// caso seja texto
				operator: sap.ui.model.FilterOperator.Contains,
				value1: fil_filter4	
			});
			
			var fil_filter5 = this.byId("filData").getValue();
			var filter5= new sap.ui.model.Filter({
				path: "DT_CRIACAO",
				// caso seja equal
				operator: sap.ui.model.FilterOperator.EQ,
				// caso seja texto
				// operator: sap.ui.model.FilterOperator.Contains,
				value1: fil_filter5
			});
			
			var fil_filter6 = 'BUSCA';
			var filter6= new sap.ui.model.Filter({
				path: "OBJECT_PAI",
				// caso seja equal
				operator: sap.ui.model.FilterOperator.EQ,
				// caso seja texto
				// operator: sap.ui.model.FilterOperator.Contains,
				value1: fil_filter6
			});
		
				
		var that = this;
				var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/YCODE2DOC_SRV");
				oModel.read("/GERADOR_TAGSSet", {
			     filters: [filter1, filter2, filter3,filter4, filter5, filter6], 
				 success : function(oData, oResponse) {
					
					//
					var userdata = new sap.ui.model.json.JSONModel({
						"Result" : oData.results
					});
					if (oData.results[0].TYPE_MSG === 'E') {
						MessageToast.show(oData.results[0].MSG);
                		that.byId("btExecuta").setVisible(false);
                		that.byId("btExclui").setVisible(false);
					} else {
                		that.byId("btExecuta").setVisible(true);
                		that.byId("btExclui").setVisible(true);
					var tab = that.getView().byId("tableGer");
					tab.setModel(userdata);
					// var i = 0;
					tab.bindAggregation("items", {
						path : "/Result",
						// template: "favTableItemTemplate"
						template : new sap.m.ColumnListItem({
							cells : [ 
							new  sap.m.CheckBox({
								// id: i++,	
								visible: false
							}),
							// new  sap.m.Text({
							// 	visible: true,
							// 	text : "{OBJ_NAME_PAI}",
							// 	textAlign: "Center"
							// }),
							new  sap.m.ObjectStatus({
								visible: true,
								text: "{OBJ_NAME_PAI}",
								icon: "{AMBIENTE}",
								state: "{GERENTE}"
							}),
							new  sap.m.Text({
								text : "{COD_REQ}",
								textAlign: "Center"
							}), new sap.m.Text({
								text : "{DT_CRIACAO}",
								textAlign: "Center"
							}), new sap.m.Text({
								text : "{ULT_ATUALIZA}",
								textAlign: "Center"
							}), new sap.m.Text({
								text : "{TIPO_OBJETO}",
								textAlign: "Center"
							}), new sap.m.Text({
								text : "{NOME_OBJETO}",
								textAlign: "Center"
							}), 
							new sap.m.Text({
								text : "{ENTRY}",
								textAlign: "Center"
							})
							]
						})
					});
					}
				},
				error : function(err) {
					//debugger;
				}
				});
			}, 
            Voltar: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Home");
            },
            Processar: function(oEvent) {
            var nomeReq = this.getView().byId("txtNomeReq").getValue();  
			MessageBox.success("Solicitação processada com sucesso.");
            },
            Excluir: function(oEvent) {
            var nomeReq = this.getView().byId("txtNomeReq").getValue();  
			MessageBox.success("Solicitação excluída com sucesso !");
            },
            
			onSearch: function(oEvent) { 
///////////////////////////////////// BUSCAR //////////////////////////////////////////////////
			// FILTRO AMBIENTE
			var StatusSel = this.getView().byId("filStatus").getSelectedKey();
			var TagSolicitada = '';
			var TagGerada = '';
			var DocGerado = '';
			
			if (StatusSel === 'TODOS'){
				TagSolicitada = 'X';
				TagGerada = 'X';
				DocGerado = 'X';
			}
			if (StatusSel === 'PEND'){
				TagSolicitada = '';
				TagGerada = '';
				DocGerado = '';
			}
			if (StatusSel === 'PROCTAG'){
				TagSolicitada = 'X';
				TagGerada = '';
				DocGerado = '';
			}
			if (StatusSel === 'PROCDOC'){
				TagSolicitada = '';
				TagGerada = 'X';
				DocGerado = '';
			}
			if (StatusSel === 'FIN'){
				TagSolicitada = '';
				TagGerada = '';
				DocGerado = 'X';
			}
			
			var fil_filter1 = TagSolicitada;
			var filter1= new sap.ui.model.Filter({
				path: "TAG_SOLICITADA",
				// caso seja equal
				operator: sap.ui.model.FilterOperator.EQ,
				// caso seja texto
				// operator: sap.ui.model.FilterOperator.Contains,
				value1: fil_filter1	
			});
			
			var fil_filter2 = TagGerada;
			var filter2= new sap.ui.model.Filter({
				path: "TAG_GERADA",
				// caso seja equal
				operator: sap.ui.model.FilterOperator.EQ,
				// caso seja texto
				// operator: sap.ui.model.FilterOperator.Contains,
				value1: fil_filter2	
			});
			
			var fil_filter3 = DocGerado;
			var filter3= new sap.ui.model.Filter({
				path: "DOC_GERADO",
				// caso seja equal
				operator: sap.ui.model.FilterOperator.EQ,
				// caso seja texto
				// operator: sap.ui.model.FilterOperator.Contains,
				value1: fil_filter3	
			});
			
			var fil_filter4 = this.byId("filNome").getValue();
			var filter4= new sap.ui.model.Filter({
				path: "COD_REQ",
				// caso seja equal
				// operator: sap.ui.model.FilterOperator.EQ,
				// caso seja texto
				operator: sap.ui.model.FilterOperator.Contains,
				value1: fil_filter4	
			});
			
			var fil_filter5 = this.byId("filData").getValue();
			var filter5= new sap.ui.model.Filter({
				path: "DT_CRIACAO",
				// caso seja equal
				operator: sap.ui.model.FilterOperator.EQ,
				// caso seja texto
				// operator: sap.ui.model.FilterOperator.Contains,
				value1: fil_filter5
			});
			
			var fil_filter6 = 'BUSCA';
			var filter6= new sap.ui.model.Filter({
				path: "OBJECT_PAI",
				// caso seja equal
				operator: sap.ui.model.FilterOperator.EQ,
				// caso seja texto
				// operator: sap.ui.model.FilterOperator.Contains,
				value1: fil_filter6
			});
		
				
		var that = this;
				var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/YCODE2DOC_SRV");
				oModel.read("/GERADOR_TAGSSet", {
			     filters: [filter1, filter2, filter3,filter4, filter5, filter6], 
				 success : function(oData, oResponse) {
					
					//
					var userdata = new sap.ui.model.json.JSONModel({
						"Result" : oData.results
					});
					if (oData.results[0].TYPE_MSG === 'E') {
						MessageToast.show(oData.results[0].MSG);
                		that.byId("btExecuta").setVisible(false);
                		that.byId("btExclui").setVisible(false);
						location.reload();
					} else {
                		that.byId("btExecuta").setVisible(true);
                		that.byId("btExclui").setVisible(true);
					var tab = that.getView().byId("tableGer");
					tab.setModel(userdata);
					// var i = 0;
					tab.bindAggregation("items", {
						path : "/Result",
						// template: "favTableItemTemplate"
						template : new sap.m.ColumnListItem({
							cells : [ 
							new  sap.m.CheckBox({
								// id: i++,	
								visible: false
							}),
							// new  sap.m.Text({
							// 	visible: true,
							// 	text : "{OBJ_NAME_PAI}",
							// 	textAlign: "Center"
							// }),
							new  sap.m.ObjectStatus({
								visible: true,
								text: "{OBJ_NAME_PAI}",
								icon: "{AMBIENTE}",
								state: "{GERENTE}"
							}),
							new  sap.m.Text({
								text : "{COD_REQ}",
								textAlign: "Center"
							}), new sap.m.Text({
								text : "{DT_CRIACAO}",
								textAlign: "Center"
							}), new sap.m.Text({
								text : "{ULT_ATUALIZA}",
								textAlign: "Center"
							}), new sap.m.Text({
								text : "{TIPO_OBJETO}",
								textAlign: "Center"
							}), new sap.m.Text({
								text : "{NOME_OBJETO}",
								textAlign: "Center"
							}), 
							new sap.m.Text({
								text : "{ENTRY}",
								textAlign: "Center"
							})
							]
						})
					});
					}
				},
				error : function(err) {
					//debugger;
				}
				});
			}, 
			
			
///////////////////////  EXECUTAR   /////////////////////////////////////			
			Executa: function(oEvent) {
/////////////////////////////////////  SELECIONA LISTA DE PROGRAMAS  //////////////////////////////////////////

			var aSelectedProducts, i, sPath, oProductObject;
			aSelectedProducts = this.byId("tableGer").getSelectedItems();
			if (aSelectedProducts.length) {
					var LISTAREQ = [];
				for (i = 0; i < aSelectedProducts.length; i++) {
					sPath = aSelectedProducts[i].getBindingContext().getPath();
					oProductObject = aSelectedProducts[i].getBindingContext().getObject();
					LISTAREQ.push(oProductObject.COD_REQ) ;
				}

			} 

				
/////////////////////////////////////  INPUTS  //////////////////////////////////////////////////
			// TEXTO EMPRESA
			// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
			var txt_field1 = LISTAREQ;
			var field1= new sap.ui.model.Filter({
				path: "COD_REQ",
				// caso seja equal
				operator: sap.ui.model.FilterOperator.EQ,
				// caso seja texto
				// operator: sap.ui.model.FilterOperator.Contains,
				value1: txt_field1
			});
			// TEXTO PROJETO
			// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
			var txt_field2 = 'EXECUTA';
			var field2= new sap.ui.model.Filter({
				path: "OBJECT_PAI",
				// caso seja equal
				operator: sap.ui.model.FilterOperator.EQ,
				// caso seja texto
				// operator: sap.ui.model.FilterOperator.Contains,
				value1: txt_field2
			});
				
		var that = this;
				var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/YCODE2DOC_SRV");
				oModel.read("/GERADOR_TAGSSet", {
			     filters: [field1, field2], 
				 success : function(oData, oResponse) {
					//debugger;
					var userdata = new sap.ui.model.json.JSONModel({
						"Result" : oData.results
						
					});
                		that.onSearch();
					// if (oData.results[0].TYPE_MSG === 'E') {
						MessageToast.show(oData.results[0].MSG);
                		// this.byId("btSolicita").setVisible(true);
					// }
				},
				error : function(err) {
					//debugger;
				}
				});
			
			},
			
			
				
///////////////////////  EXCLUI   /////////////////////////////////////	
			Exclui: function(oEvent) {
				// MessageBox.warning("Deseja realmente excluir essa requisição?", {
				// 	actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
				// 	emphasizedAction: this.Confirma_Exc(),
				// 	onClose: function (sAction) {
				// 	}
				// });
									if (!this.oApproveDialog) {
										this.oApproveDialog = new Dialog({
											type: DialogType.Message,
											title: "Confirmação",
											content: new Text({ text: "Deseja realmente excluir essa requisição?" }),
											beginButton: new Button({
												type: ButtonType.Emphasized,
												text: "Sim",
												press: function () {
													this.Confirma_Exc();
													this.oApproveDialog.close();
												}.bind(this)
											}),
											endButton: new Button({
												text: "Não",
												press: function () {
													this.oApproveDialog.close();
												}.bind(this)
											})
										});
									}
						
									this.oApproveDialog.open();
            },
            
            
			Confirma_Exc: function(oEvent) { 	
/////////////////////////////////////  SELECIONA LISTA DE PROGRAMAS  //////////////////////////////////////////

			var aSelectedProducts, i, sPath, oProductObject;
			aSelectedProducts = this.byId("tableGer").getSelectedItems();
			if (aSelectedProducts.length) {
					var LISTAREQ = [];
				for (i = 0; i < aSelectedProducts.length; i++) {
					sPath = aSelectedProducts[i].getBindingContext().getPath();
					oProductObject = aSelectedProducts[i].getBindingContext().getObject();
					LISTAREQ.push(oProductObject.COD_REQ) ;
				}

			} 

				
/////////////////////////////////////  INPUTS  //////////////////////////////////////////////////
			// TEXTO EMPRESA
			// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
			var txt_field1 = LISTAREQ;
			var field1= new sap.ui.model.Filter({
				path: "COD_REQ",
				// caso seja equal
				operator: sap.ui.model.FilterOperator.EQ,
				// caso seja texto
				// operator: sap.ui.model.FilterOperator.Contains,
				value1: txt_field1
			});
			// TEXTO PROJETO
			// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
			var txt_field2 = 'EXCLUI';
			var field2= new sap.ui.model.Filter({
				path: "OBJECT_PAI",
				// caso seja equal
				operator: sap.ui.model.FilterOperator.EQ,
				// caso seja texto
				// operator: sap.ui.model.FilterOperator.Contains,
				value1: txt_field2
			});
				
		var that = this;
				var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/YCODE2DOC_SRV");
				oModel.read("/GERADOR_TAGSSet", {
			     filters: [field1, field2], 
				 success : function(oData, oResponse) {
					//debugger;
					
						that.onSearch();
					var userdata = new sap.ui.model.json.JSONModel({
						"Result" : oData.results
						
					});
					// if (oData.results[0].TYPE_MSG === 'E') {
						MessageToast.show(oData.results[0].MSG);
                		// this.byId("btSolicita").setVisible(true);
					// }
				},
				error : function(err) {
					//debugger;
				}
				});
			
			}

		});
	});