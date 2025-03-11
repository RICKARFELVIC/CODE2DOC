// @ts-nocheck
sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/core/UIComponent",
		"sap/ui/core/Core",
		"sap/ui/layout/HorizontalLayout",
		"sap/ui/layout/VerticalLayout",

		"sap/m/Dialog",
		"sap/m/DialogType",
		"sap/m/Button",
		"sap/m/ButtonType",
		"sap/m/Label",
		"sap/m/MessageToast",
		"sap/m/Text",
		"sap/m/TextArea",
		"sap/m/CheckBox",
		"sap/m/Input",
		"sap/m/MessageBox",
		"sap/ui/model/json/JSONModel",
		'sap/ui/core/Fragment'
	],

	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function(Controller, UIComponent, Core, HorizontalLayout, VerticalLayout, Dialog, DialogType, Button, ButtonType, Label, MessageToast,
		Text, TextArea, CheckBox, Input, MessageBox, JSONModel, Fragment) {
		"use strict";

		return Controller.extend("yit.doc_dev.controller.Extracao", {
			// INICIAR
			onInit: function() {
				this.byId("btSolicita0").setVisible(false);

				// this.byId("btReiniciar").setVisible(false);

				var fil_filter1 = 'PENDENTES';
				var filter1 = new sap.ui.model.Filter({
					path: "CLIENTE",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: fil_filter1
				});

				var that = this;
				var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/YCODE2DOC_SRV");
				oModel.read("/CRIA_DOCSet", {
					filters: [filter1],
					success: function(oData, oResponse) {

						//
						var userdata = new sap.ui.model.json.JSONModel({
							"Result": oData.results
						});
						// if (oData.results[0].TYPE_MSG === 'E') {
						// 	MessageToast.show(oData.results[0].MSG);
						//           		that.byId("btExecuta").setVisible(false);
						//           		that.byId("btExclui").setVisible(false);
						// } else {
						//           		that.byId("btExecuta").setVisible(true);
						//           		that.byId("btExclui").setVisible(true);
						var tab = that.getView().byId("tabListaDoc");
						tab.setModel(userdata);
						// var i = 0;
						tab.bindAggregation("items", {
							path: "/Result",
							// template: "favTableItemTemplate"
							template: new sap.m.ColumnListItem({
								cells: [
									// new  sap.m.CheckBox({
									// 	// id: i++,	
									// 	visible: false
									// }),
									// new  sap.m.Text({
									// 	visible: true,
									// 	text : "{OBJ_NAME_PAI}",
									// 	textAlign: "Center"
									// }),
									new sap.m.ObjectStatus({
										visible: true,
										text: "{ID_DOC}"
											// icon: "{AMBIENTE}",
											// state: "{GERENTE}"
									}),
									new sap.m.Text({
										text: "{TITULO_ET}",
										textAlign: "Center"
									}), new sap.m.Text({
										text: "{VERSAO}",
										textAlign: "Center"
									}), new sap.m.Text({
										text: "{NOME_PROJETO}",
										textAlign: "Center"
									}), new sap.m.Text({
										text: "{DATA_CRIACAO}",
										textAlign: "Center"
									}), new sap.m.Text({
										text: "{TEMPLATE}",
										textAlign: "Center"
									}), new sap.m.Text({
										text: "{TITULO_ET}",
										textAlign: "Center"
									}), new sap.m.Text({
										text: "{GERENTE}",
										textAlign: "Center"
									}), new sap.m.Text({
										text: "{CRIADO_POR}",
										textAlign: "Center"
									}), new sap.m.Text({
										text: "{REVISADO_POR}",
										textAlign: "Center"
									}), new sap.m.Text({
										text: "{NOTA}",
										textAlign: "Center"
									}), new sap.m.Text({
										text: "{INTRODUCAO}",
										textAlign: "Center"
									}), new sap.m.Text({
										text: "{REQUISITO}",
										textAlign: "Center"
									}), new sap.m.Text({
										text: "{DESC_SOLUCAO}",
										textAlign: "Center"
									}), new sap.m.Text({
										text: "{MACRO_ARQ}",
										textAlign: "Center"
									}), new sap.m.Text({
										text: "{DIAGRAMA}",
										textAlign: "Center"
									})
								]
							})
						});
						// }
					},
					error: function(err) {
						//debugger;
					}
				});
			},

			SelListaDoc: function() {
				this.byId("btSolicita0").setVisible(true);
			},

			//SELECIONAR DOCUMENTO
			SelecDoc: function() {
				// alert("OK");
				var rows = this.byId("tabListaDoc").getSelectedItems();

				this.byId("titIDDocumento").setText(rows[0].getCells()[0].getText());
				this.byId("titET").setText(rows[0].getCells()[1].getText());
				this.byId("titVersao").setText(rows[0].getCells()[2].getText());
				this.byId("titProjeto").setText(rows[0].getCells()[3].getText());
				this.byId("titTemplate").setText(rows[0].getCells()[5].getText());
				this.byId("tabListaDoc").setVisible(false);
				this.byId("msgTab").setVisible(false);
				this.byId("btSolicita0").setVisible(false);
				this.byId("Page0").setVisible(false);
				this.byId("formDadosDoc").setVisible(true);
				this.byId("Page1").setVisible(true);
				this.byId("Page2").setVisible(true);
				this.byId("otbFooter").setVisible(false);
				this.byId("otbFooter2").setVisible(false);
			},

			onBeforeRendering: function() {

			},

			onAfterRendering: function() {},

			//SELECIONAR ITEM
			selItem: function() {
				this.byId("btProxTela1").setVisible(true);
				this.byId("AddMore").setVisible(true);
				this.byId("AddObj").setVisible(true);
				this.byId("Page2").setVisible(false);
				this.byId("otbFooter").setVisible(true);
			},

			addMaisObj: function() {
				this.getView().byId("Page1").setVisible(true);
				this.getView().byId("Page2").setVisible(false);
				this.byId("btSolicita").setVisible(false);
			},

			AddMore: function(oEvent) {

				this.byId("Page2").setVisible(true);
				var oButton = oEvent.getSource(),
					oView = this.getView();

				/////////////////////////////////
				//
				var rows = this.byId("TabExtracao").getSelectedItems();

				var vTipoObj = rows[0].getCells()[1].getText();
				var vNome = rows[0].getCells()[2].getText();
				var vPacote = rows[0].getCells()[3].getText();
				var vDtCriacao = rows[0].getCells()[4].getText();
				var vRequest = rows[0].getCells()[5].getText();
				var vAutor = rows[0].getCells()[6].getText();

				// add ao popup de itens
				var columnListItemNewLine = new sap.m.ColumnListItem({
					cells: [
						new sap.m.Text({
							text: vTipoObj
						}),
						new sap.m.Text({
							text: vNome
						})
					]
				});

				var columnListItemNewLine2 = new sap.m.ColumnListItem({
					cells: [
						new sap.m.Text({
							text: vTipoObj
						}),
						new sap.m.Text({
							text: vNome
						}),
						new sap.m.Text({
							text: vPacote
						}),
						new sap.m.Text({
							text: vDtCriacao
						}),
						new sap.m.Text({
							text: vRequest
						}),
						new sap.m.Button({
							icon: "sap-icon://delete",
							type: "Reject",
							press: [this.delItem, this]
						}), new sap.m.Input(), new sap.m.Input(), new sap.m.Input({
							showValueHelp: true

						})
					]
				});
				// create popover
				if (!this._pPopover) {
					this._pPopover = Fragment.load({
						id: oView.getId(),
						name: "sap.m.sample.Popover.view.Popover",
						controller: this
					}).then(function(oPopover) {
						oView.addDependent(oPopover);
						oPopover.bindElement("/ProductCollection/0");
						return oPopover;
					});
				}
				this._pPopover.then(function(oPopover) {
					oPopover.openBy(oButton);
				});
				this._oTable = this.getView().byId("TabPop");
				// this._oTable.addItem(columnListItemNewLine);
				this._oTable2 = this.getView().byId("TabObjetos");

				var libera_add = 1;
				this.ProximaTela();
				this.addMaisObj();

				// if (this.first_time === 0){
				if (this._oTable2.getItems.length === 0) {
					this._oTable2.addItem(columnListItemNewLine2);
					MessageToast.show("Item adicionado na lista.");
					this.first_time = 1;
				} else {
					for (var i = 0; i < this._oTable2.mAggregations.items.length; i++) {
						// if (b.indexOf(this._oTable2[i].PersonnelNumber) === -1) {
						if (this._oTable2.mAggregations.items.length >= 1) {
							if (this._oTable2.mAggregations.items[i].mAggregations.cells[1].mProperties.text === vNome) {
								MessageToast.show("Este item já está na lista !");
								libera_add = 0;
							}
						}
					}
					if (libera_add === 1) {
						this._oTable2.addItem(columnListItemNewLine2);
						MessageToast.show("Item adicionado na lista.");
					}
				}

				this.byId("Page2").setVisible(false);

			},

			delItem: function(oEvent) {
				var oTable = this.getView().byId("TabObjetos");
				oTable.removeItem(oEvent.getSource().getParent());
			},

			onOpenPopover: function(oEvent) {
				var oButton = oEvent.getSource(),
					oView = this.getView();

				// var a = [];
				// for (var i = 0; i < this._oTable.length; i++) {
				// 	// if (a.indexOf(this._oTable[i].PersonnelNumber) === -1) {
				// 	if (a.indexOf(this._oTable[i]) === -1) {
				// 		a.push(this._oTable[i]);
				// 	} else {
				// 		MessageToast.show("The record is already added");
				// 	}
				// }

				//	this._oTable.addItem(columnListItemNewLine);

				// add à lista de itens próxima tela				

				// create popover
				if (!this._pPopover) {
					this._pPopover = Fragment.load({
						id: oView.getId(),
						// name: "sap.m.sample.PopoverNavCon.view.Popover",
						name: "yit.CODE2DOC.view.Popover",
						controller: this
					}).then(function(oPopover) {
						oView.addDependent(oPopover);
						return oPopover;
					});
				}

				this._pPopover.then(function(oPopover) {
					oPopover.openBy(oButton);
				});

				// this.byId("txtQuantidade").setValue(rows[0].getCells()[2].getText());
				// this.byId("lblPosSelect").setText(rows[0].getCells()[1].getText());
				// this.byId("lblTpDeposOrig").setText(rows[0].getCells()[0].getText());
				// this.byId("txtTpDeposito").setValue(rows[0].getCells()[0].getText());

				// this.byId("lblQtdeTot").setText(rows[0].getCells()[2].getText());

				// if (vQuantidade === "") {
				// 	MessageToast.show("Informar a quantidade.");

				// } else {
				// 	if (vCorredor === "") {
				// 		MessageToast.show("Escolher uma posição.");

				// 	} else {
				// 		this.somaQtde = parseInt(this.somaQtde) + parseInt(vQuantidade);
				// 		if (parseInt(this.somaQtde) > parseInt(qtdeatual1)) {
				// 			MessageToast.show('Quantidade somada ultrapassa o total disponível.');
				// 			this.somaQtde = parseInt(this.somaQtde) - parseInt(vQuantidade);
				// 		} else {
				// 			var columnListItemNewLine = new sap.m.ColumnListItem({
				// 				cells: [
				// 					new sap.m.Text({
				// 						text: vCorredor
				// 					}),
				// 					new sap.m.Text({
				// 						text: vPosicao
				// 					}),
				// 					new sap.m.Text({
				// 						text: vAndar
				// 					}),
				// 					new sap.m.Text({
				// 						text: vQuantidade
				// 					}),
				// 					new sap.m.Text({
				// 						text: vConcat
				// 					}),

				// 					new sap.m.Bar({
				// 						text: "Ler QR Code",
				// 						press: this.onPress,
				// 						icon: "sap-icon://bar-code"
				// 					})

				// ]
				// });
			},

			//BOTAO INICIAR
			onSearch: function(oEvent) {

				this.getView().byId("formDadosDoc").setVisible(false);
				this.byId("Page2").setVisible(false);

				var oGlobalBusyDialog = new sap.m.BusyDialog();
				oGlobalBusyDialog.open();
				///////////////////////////////////// FILTROS //////////////////////////////////////////////////
				// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
				// var fil_filter1 = this.byId("srcAmbiente").getValue();
				// var filter1 = new sap.ui.model.Filter({
				// 	path: "AMBIENTE",
				// 	// caso seja equal
				// 	// operator: sap.ui.model.FilterOperator.EQ,
				// 	// caso seja texto
				// 	operator: sap.ui.model.FilterOperator.Contains,
				// 	value1: fil_filter1
				// });

				// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
				var fil_filter2 = this.byId("srcPacote").getValue();
				var filter2 = new sap.ui.model.Filter({
					path: "PACOTE",
					// caso seja equal
					// operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					operator: sap.ui.model.FilterOperator.Contains,
					value1: fil_filter2
				});

				// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
				var fil_filter3 = this.byId("srcRequest").getValue();
				var filter3 = new sap.ui.model.Filter({
					path: "REQUEST",
					// caso seja equal
					// operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					operator: sap.ui.model.FilterOperator.Contains,
					value1: fil_filter3
				});

				// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
				var fil_filter4 = this.byId("srcTipoObjeto").getSelectedKey();
				var filter4 = new sap.ui.model.Filter({
					path: "TIPOOBJ",
					// caso seja equal
					// operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					operator: sap.ui.model.FilterOperator.Contains,
					value1: fil_filter4
				});

				// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
				var fil_filter5 = this.byId("srcNomeObjeto").getValue();
				var filter5 = new sap.ui.model.Filter({
					path: "NOMEOBJ",
					// caso seja equal
					// operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					operator: sap.ui.model.FilterOperator.Contains,
					value1: fil_filter5
				});

				// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
				var fil_filter6 = this.byId("srcDtCriacao").getValue();
				var filter6 = new sap.ui.model.Filter({
					path: "DATACRIA",
					// caso seja equal
					// operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					operator: sap.ui.model.FilterOperator.Contains,
					value1: fil_filter6
				});

				// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
				var fil_filter7 = this.byId("srcRequest").getValue();
				var filter7 = new sap.ui.model.Filter({
					path: "REQUEST",
					// caso seja equal
					// operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					operator: sap.ui.model.FilterOperator.Contains,
					value1: fil_filter7
				});

				// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
				// var fil_filter8 = this.byId("srcAutor").getValue();
				// var filter8 = new sap.ui.model.Filter({
				// 	path: "AUTOR",
				// 	// caso seja equal
				// 	// operator: sap.ui.model.FilterOperator.EQ,
				// 	// caso seja texto
				// 	operator: sap.ui.model.FilterOperator.Contains,
				// 	value1: fil_filter8
				// });

				var that = this;
				var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/YCODE2DOC_SRV");
				oModel.read("/LISTA_PROGRAMASSet", {
					filters: [filter2, filter3, filter4, filter5, filter6, filter7],
					success: function(oData, oResponse) {
						//debugger;

						//that.getView().byId("btProxTela1").setVisible(true);
						var userdata = new sap.ui.model.json.JSONModel({
							"Result": oData.results
						});
						var tab = that.getView().byId("TabExtracao");
						tab.setModel(userdata);
						// var i = 0;
						oGlobalBusyDialog.close();
						tab.bindAggregation("items", {
							path: "/Result",
							// template: "favTableItemTemplate"
							template: new sap.m.ColumnListItem({
								cells: [
									new sap.m.CheckBox({
										// id: i++,	
										visible: false
											// }),
											// new  sap.m.Text({
											// 	visible: false,
											// 	value : "{PROGRAMAZ}"
									}), new sap.m.Text({
										text: "{TIPOOBJ}"
									}), new sap.m.Text({
										text: "{NOMEOBJ}"
											// }), new sap.m.Text({
											// 	text: "{AMBIENTE}"
									}), new sap.m.Text({
										text: "{PACOTE}"
									}), new sap.m.Text({
										text: "{DATACRIA}"
									}), new sap.m.Text({
										text: "{REQUEST}"
									}), new sap.m.Text({
										text: "{AUTOR}"
									})
								]
							})
						});
					},
					error: function(err) {
						oGlobalBusyDialog.close();
					}
				});
			},

			///////////////////////  CARREGA   /////////////////////////////////////			
			Carrega: function(oEvent) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				/////////////////////////////////////  SELECIONA LISTA DE PROGRAMAS  //////////////////////////////////////////

				var aSelectedProducts, i, sPath, oProductObject;
				// aSelectedProducts = this.byId("TabExtracao").getSelectedItems();
				aSelectedProducts = this.byId("TabObjetos").getItems();
				if (aSelectedProducts.length) {
					var TIPOOBJ = [];
					var NOMEOBJ = [];
					var PACOTE = [];
					var DATACRIACAO = [];
					var REQUEST = [];
					var oneMoreEntity = {};
					for (i = 0; i < aSelectedProducts.length; i++) {
						// sPath = aSelectedProducts[i].getBindingContext().getPath();
						// oProductObject = aSelectedProducts[i].getBindingContext().getObject();
						oProductObject = this.byId("TabObjetos").getItems()[i].mAggregations;
						TIPOOBJ.push(oProductObject.cells[0].mProperties.text);
						NOMEOBJ.push(oProductObject.cells[1].mProperties.text);
						PACOTE.push(oProductObject.cells[2].mProperties.text);
						DATACRIACAO.push(oProductObject.cells[3].mProperties.text);
						REQUEST.push(oProductObject.cells[4].mProperties.text);
					}
					var JSONTIPOOBJ = JSON.stringify(TIPOOBJ);
					var JSONNOMEOBJ = JSON.stringify(NOMEOBJ);
					var JSONPACOTE = JSON.stringify(PACOTE);
					var JSONDATACRIACAO = JSON.stringify(DATACRIACAO);
					var JSONREQUEST = JSON.stringify(REQUEST);

				} else {
					// this._showErrorMessage(this.getModel("i18n").getResourceBundle().getText("PROGRAMAS"));
				}

				/////////////////////////////////////  INPUTS  //////////////////////////////////////////////////
				// NOME DA REQUISIÇÃO
				var txt_field1 = Core.byId("nomeRequisicao").getValue();
				var field1 = new sap.ui.model.Filter({
					path: "COD_REQ",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: txt_field1
				});

				// TEXTO PROJETO
				var txt_field2 = this.byId("titIDDocumento").getText();
				var field2 = new sap.ui.model.Filter({
					path: "ID_DOC",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: txt_field2
				});

				// VERSAO
				var txt_field3 = this.byId("titVersao").getText();
				var field3 = new sap.ui.model.Filter({
					path: "VERSAO",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: txt_field3
				});

				// TEMPLATE
				var txt_field4 = this.byId("titTemplate").getText();
				var field4 = new sap.ui.model.Filter({
					path: "TEMPLATE",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: txt_field4
				});

				//JSONTIPOOBJ
				var txt_field5 = JSONTIPOOBJ;
				var field5 = new sap.ui.model.Filter({
					path: "JSONTIPOOBJ",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: txt_field5
				});

				//JSONNOMEOBJ
				var txt_field6 = JSONNOMEOBJ;
				var field6 = new sap.ui.model.Filter({
					path: "JSONNOMEOBJ",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: txt_field6
				});

				//JSONPACOTE
				var txt_field7 = JSONPACOTE;
				var field7 = new sap.ui.model.Filter({
					path: "JSONPACOTE",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: txt_field7
				});

				//JSONDATACRIACAO
				var txt_field8 = JSONDATACRIACAO;
				var field8 = new sap.ui.model.Filter({
					path: "JSONDATACRIACAO",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: txt_field8
				});

				//JSONREQUEST
				var txt_field9 = JSONREQUEST;
				var field9 = new sap.ui.model.Filter({
					path: "JSONREQUEST",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: txt_field9
				});

				var that = this;
				var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/YCODE2DOC_SRV");
				oModel.read("/EXTRACAOSet", {
					filters: [field1, field2, field3, field4, field5, field6, field7, field8, field9],
					success: function(oData, oResponse) {
						//debugger;
						var userdata = new sap.ui.model.json.JSONModel({
							"Result": oData.results

						});
						if (oData.results[0].TYPE_MSG === 'E') {
							MessageToast.show(oData.results[0].MSG);
							that.Voltar();
							this.byId("btSolicita").setVisible(false);
						}else{
							MessageToast.show(oData.results[0].MSG);
							// alert("AQUI");
							// var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
							oRouter.navTo("Relat");
							// location.reload();
						}
					},
					error: function(err) {
						//debugger;
					}
				});

			},

			Voltar: function(oEvent) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Home");
				location.reload();
			},
			ProximaTela: function(oEvent) {
				this.getView().byId("Page1").setVisible(false);
				this.getView().byId("Page2").setVisible(true);
				this.byId("btSolicita").setVisible(true);
				this.byId("otbFooter2").setVisible(true);
			},
			TelaAnterior: function(oEvent) {
				this.getView().byId("Page1").setVisible(true);
				this.getView().byId("Page2").setVisible(false);
			},

			Extracao: function(oEvent) {
				// var filtro = this.getView().byId("FitroExtracao");
				// var tab = this.getView().byId("TabExtracao");
				// filtro.setVisible(false);
				// tab.setVisible(false);

				if (!this.oSubmitDialog) {
					this.oSubmitDialog = new Dialog({
						type: DialogType.Message,
						title: "Confirmação de Dados",
						content: [
							new Label({
								text: "Apelido para a Requisição do Documento",
								labelFor: "nomeRequisicao"
							}),
							new Input("nomeRequisicao", {
								width: "100%",
								placeholder: "",
								liveChange: function(oEvent) {
									var sText = oEvent.getParameter("value");
									this.oSubmitDialog.getBeginButton().setEnabled(sText.length > 0);
								}.bind(this)
							}),
							new CheckBox("chkAgrupar", {
								text: "Agrupar arquivos",
								id: "chkAgrupar",
								visible: false
							})
						],
						beginButton: new Button({
							type: ButtonType.Emphasized,
							text: "Salvar Requisição",
							enabled: false,
							press: function() {
								// var sText = Core.byId("nomeRequisicao").getValue();
								// MessageToast.show("Requisição: " + sText + " criada com sucesso !");
								this.oSubmitDialog.close();
								this.Carrega();
							}.bind(this)
						}),
						endButton: new Button({
							text: "Cancelar",
							press: function() {
								this.oSubmitDialog.close();
							}.bind(this)
						})
					});
				}

				this.oSubmitDialog.open();
			},

			Salvar: function(oEvent) {
				var nomeReq = this.getView().byId("txtNomeReq").getValue();
				MessageBox.success("Extração " + nomeReq + " solicitada com sucesso !");
			},

			onAdd: function(oEvent) {
				this.i_de++;
				var cp_De = "DE" + this.i_de;
				var cp_Data = "DATA" + this.i_de;
				var cp_Fone = "FONE" + this.i_de;
				var oItem = new sap.m.ColumnListItem({
					cells: [
						new sap.m.Input({
							id: cp_De
						}),
						new sap.m.Input({
							id: cp_Data
						}),
						new sap.m.Input({
							id: cp_Fone
						}),
						new sap.m.Button({
							text: "Delete",
							press: [this.remove, this]
						})
					]
				});

				var oTable = this.getView().byId('tabListaDe');
				oTable.addItem(oItem);
			},

			deleteRow: function(oEvent) {
				var oTable = this.getView().byId('tabListaDe');
				oTable.removeItem(oEvent.getParameter('listItem'));
			},

			remove: function(oEvent) {
				var oTable = this.getView().byId('tabListaDe');
				oTable.removeItem(oEvent.getSource().getParent());
			},

			onAddPara: function(oEvent) {
				var oItem = new sap.m.ColumnListItem({
					cells: [new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Button({
						text: "Delete",
						press: [this.remove, this]
					})]
				});

				var oTable = this.getView().byId('tabListaPara');
				oTable.addItem(oItem);
			},

			deleteRowPara: function(oEvent) {
				var oTable = this.getView().byId('tabListaPara');
				oTable.removeItem(oEvent.getParameter('listItem'));
			},

			removePara: function(oEvent) {
				var oTable = this.getView().byId('tabListaPara');
				oTable.removeItem(oEvent.getSource().getParent());
			}
		});
	});