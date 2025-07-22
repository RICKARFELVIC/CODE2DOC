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
		"sap/ui/model/json/JSONModel"
	],

	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function(Controller, UIComponent, Core, HorizontalLayout, VerticalLayout, Dialog, DialogType, Button, ButtonType, Label, MessageToast,
		Text, TextArea, CheckBox, Input, MessageBox) {
		"use strict";

		return Controller.extend("yit.EXPERTDOCS.controller.CriaDoc", {

			onInit: function() {

				this.byId("btReiniciar").setVisible(false);

				var fil_filter1 = 'BUSCAR';
				var filter1 = new sap.ui.model.Filter({
					path: "CLIENTE",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: fil_filter1
				});

				var that = this;
				var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/YEXPERTDOCS_SRV");
				
				oModel.read("/LISTA_TEMPLATESSet", {
					//filters: [filter1, filter2, filter3, filter4, filter5, filter6, filter7, filter8], 
					success: function(oData) {
						//debugger;

						//that.getView().byId("btProxTela1").setVisible(true);
						var userdata = new sap.ui.model.json.JSONModel({
							"Result": oData.results
						});
						var cbotemplate = that.getView().byId("cboTemplate");

						var oItemTemplate = new sap.ui.core.Item({
							text: '{NOME_TEMPLATE}'
						});
						cbotemplate.setModel(userdata);
						cbotemplate.bindItems("/Result", oItemTemplate);
					},
					error: function(err) {}
				});
				
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

				///////////////////////////////////////////////////

				// ///////////////////////////////////// FILTROS //////////////////////////////////////////////////
				// 			// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
				// 			var fil_filter1 = this.byId("srcAmbiente").getValue();
				// 			var filter1= new sap.ui.model.Filter({
				// 				path: "AMBIENTE",
				// 				// caso seja equal
				// 				// operator: sap.ui.model.FilterOperator.EQ,
				// 				// caso seja texto
				// 				operator: sap.ui.model.FilterOperator.Contains,
				// 				value1: fil_filter1	
				// 			});

				///////////////////////////////////////////////////
			},
			CreateNew: function() {
				this.byId("tabListaDoc").setVisible(false);
				this.byId("btCriarNovo").setVisible(false);
				this.byId("btCriarVersao").setVisible(false);
				this.byId("msgRodape").setVisible(false);
				this.byId("btEscopo").setVisible(true);
				this.getView().byId("WizCriaDoc").nextStep();
				this.byId("btReiniciar").setVisible(true);

				var that = this;
				var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/YEXPERTDOCS_SRV");
				
				oModel.read("/LISTA_TEMPLATESSet", {
					//filters: [filter1, filter2, filter3, filter4, filter5, filter6, filter7, filter8], 
					success: function(oData) {
						//debugger;

						//that.getView().byId("btProxTela1").setVisible(true);
						var userdata = new sap.ui.model.json.JSONModel({
							"Result": oData.results
						});
						var cbotemplate = that.getView().byId("cboTemplate");

						var oItemTemplate = new sap.ui.core.Item({
							text: '{NOME_TEMPLATE}'
						});
						cbotemplate.setModel(userdata);
						cbotemplate.bindItems("/Result", oItemTemplate);
					},
					error: function(err) {}
				});
			},
			NewVersion: function() {
				this.byId("tabListaDoc").setVisible(false);
				this.byId("btCriarNovo").setVisible(false);
				this.byId("btCriarVersao").setVisible(false);
				this.byId("btEscopo").setVisible(true);
				this.getView().byId("WizCriaDoc").nextStep();
				this.byId("btReiniciar").setVisible(true);

			},
			Escopo: function() {
				this.byId("btSalvar").setVisible(true);
				this.byId("btEscopo").setVisible(false);
				this.getView().byId("WizCriaDoc").nextStep();
			},
			SelListaDoc: function(oEvent) {
				this.byId("tabListaDoc").setVisible(false);
				var rows = this.byId("tabListaDoc").getSelectedItems();
				// alert(rows[0].getCells()[0].getText());
				this.byId("cboTemplate").setValue(rows[0].getCells()[5].getText());
				this.byId("txtIDDoc").setValue(rows[0].getCells()[0].getText());

				this.byId("txtTitET").setValue(rows[0].getCells()[6].getText());
				this.byId("cboVersao").setValue(rows[0].getCells()[2].getText());
				this.byId("txtNmProj").setValue(rows[0].getCells()[3].getText());
				this.byId("txtGerente").setValue(rows[0].getCells()[7].getText());

				this.byId("txtCriado").setValue(rows[0].getCells()[8].getText());
				this.byId("txtRevisado").setValue(rows[0].getCells()[9].getText());
				this.byId("txtNota").setValue(rows[0].getCells()[10].getText());
				this.byId("txtIntro").setValue(rows[0].getCells()[11].getText());
				this.byId("txtReqNeg").setValue(rows[0].getCells()[12].getText());
				this.byId("txtDescSol").setValue(rows[0].getCells()[13].getText());
				this.byId("txtMacroArq").setValue(rows[0].getCells()[14].getText());
				this.byId("txtDiaSeq").setValue(rows[0].getCells()[15].getText());

				this.CreateNew();
			},
			Voltar: function(oEvent) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Home");
				// location.reload();
			},
			Reiniciar: function(oEvent) {
				// var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				//         oRouter.navTo("Home");	
				MessageToast.show("Reiniciando...");
				location.reload();
			},

			Salvar: function() {

				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				//MessageBox.confirm("Confirma a criação do documento ?");
				var that = this;
				MessageBox.confirm("Confirma a criação do documento ?", {
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					styleClass: "messageBoxError",
					onClose: function(oAction) {
						if (oAction === sap.m.MessageBox.Action.YES) {
							//////////////////////////////////	

							//**********************************************************

							var fil_filter1 = 'CRIAR';
							var filter1 = new sap.ui.model.Filter({
								path: "CLIENTE",
								// caso seja equal
								operator: sap.ui.model.FilterOperator.EQ,

								// caso seja texto
								// operator: sap.ui.model.FilterOperator.Contains,
								value1: fil_filter1
							});
							var fil_filter2 = that.byId("cboTemplate").getValue();
							var filter2 = new sap.ui.model.Filter({
								path: "TEMPLATE",
								// caso seja equal
								operator: sap.ui.model.FilterOperator.EQ,

								// caso seja texto
								// operator: sap.ui.model.FilterOperator.Contains,
								value1: fil_filter2
							});
							var fil_filter3 = that.byId("txtTitET").getValue();
							var filter3 = new sap.ui.model.Filter({
								path: "TITULO_ET",
								// caso seja equal
								operator: sap.ui.model.FilterOperator.EQ,

								// caso seja texto
								// operator: sap.ui.model.FilterOperator.Contains,
								value1: fil_filter3
							});
							var fil_filter4 = that.byId("cboVersao").getValue();
							var filter4 = new sap.ui.model.Filter({
								path: "VERSAO",
								// caso seja equal
								operator: sap.ui.model.FilterOperator.EQ,

								// caso seja texto
								// operator: sap.ui.model.FilterOperator.Contains,
								value1: fil_filter4
							});
							var fil_filter5 = that.byId("txtNmProj").getValue();
							var filter5 = new sap.ui.model.Filter({
								path: "NOME_PROJETO",
								// caso seja equal
								operator: sap.ui.model.FilterOperator.EQ,

								// caso seja texto
								// operator: sap.ui.model.FilterOperator.Contains,
								value1: fil_filter5
							});
							var fil_filter6 = that.byId("cboVersao").getValue();
							var filter6 = new sap.ui.model.Filter({
								path: "VERSAO",
								// caso seja equal
								operator: sap.ui.model.FilterOperator.EQ,

								// caso seja texto
								// operator: sap.ui.model.FilterOperator.Contains,
								value1: fil_filter6
							});
							var fil_filter7 = that.byId("txtGerente").getValue();
							var filter7 = new sap.ui.model.Filter({
								path: "GERENTE",
								// caso seja equal
								operator: sap.ui.model.FilterOperator.EQ,

								// caso seja texto
								// operator: sap.ui.model.FilterOperator.Contains,
								value1: fil_filter7
							});
							var fil_filter8 = that.byId("txtCriado").getValue();
							var filter8 = new sap.ui.model.Filter({
								path: "CRIADO_POR",
								// caso seja equal
								operator: sap.ui.model.FilterOperator.EQ,

								// caso seja texto
								// operator: sap.ui.model.FilterOperator.Contains,
								value1: fil_filter8
							});
							var fil_filter9 = that.byId("txtRevisado").getValue();
							var filter9 = new sap.ui.model.Filter({
								path: "REVISADO_POR",
								// caso seja equal
								operator: sap.ui.model.FilterOperator.EQ,

								// caso seja texto
								// operator: sap.ui.model.FilterOperator.Contains,
								value1: fil_filter9
							});
							var fil_filter10 = that.byId("txtNota").getValue();
							var filter10 = new sap.ui.model.Filter({
								path: "NOTA",
								// caso seja equal
								operator: sap.ui.model.FilterOperator.EQ,

								// caso seja texto
								// operator: sap.ui.model.FilterOperator.Contains,
								value1: fil_filter10
							});

							var fil_filter11 = that.byId("txtIntro").getValue();
							var filter11 = new sap.ui.model.Filter({
								path: "INTRODUCAO",
								// caso seja equal
								operator: sap.ui.model.FilterOperator.EQ,

								// caso seja texto
								// operator: sap.ui.model.FilterOperator.Contains,
								value1: fil_filter11
							});
							var fil_filter12 = that.byId("txtReqNeg").getValue();
							var filter12 = new sap.ui.model.Filter({
								path: "REQUISITO",
								// caso seja equal
								operator: sap.ui.model.FilterOperator.EQ,

								// caso seja texto
								// operator: sap.ui.model.FilterOperator.Contains,
								value1: fil_filter12
							});
							var fil_filter13 = that.byId("txtDescSol").getValue();
							var filter13 = new sap.ui.model.Filter({
								path: "DESC_SOLUCAO",
								// caso seja equal
								operator: sap.ui.model.FilterOperator.EQ,

								// caso seja texto
								// operator: sap.ui.model.FilterOperator.Contains,
								value1: fil_filter13
							});
							var fil_filter14 = that.byId("txtMacroArq").getValue();
							var filter14 = new sap.ui.model.Filter({
								path: "MACRO_ARQ",
								// caso seja equal
								operator: sap.ui.model.FilterOperator.EQ,

								// caso seja texto
								// operator: sap.ui.model.FilterOperator.Contains,
								value1: fil_filter14
							});
							var fil_filter15 = that.byId("txtDiaSeq").getValue();
							var filter15 = new sap.ui.model.Filter({
								path: "DIAGRAMA",
								// caso seja equal
								operator: sap.ui.model.FilterOperator.EQ,

								// caso seja texto
								// operator: sap.ui.model.FilterOperator.Contains,
								value1: fil_filter15
							});
							var fil_filter16 = that.byId("txtIDDoc").getValue();
							var filter16 = new sap.ui.model.Filter({
								path: "ID_DOC",
								// caso seja equal
								operator: sap.ui.model.FilterOperator.EQ,

								// caso seja texto
								// operator: sap.ui.model.FilterOperator.Contains,
								value1: fil_filter16
							});

							var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/YEXPERTDOCS_SRV");
							oModel.read("/CRIA_DOCSet", {
								filters: [filter1, filter2, filter3, filter4, filter5, filter6, filter7, filter8, filter9, filter10, filter11, filter12,
									filter13, filter14, filter15, filter16
								],
								success: function(oData, oResponse) {

									//
									var userdata = new sap.ui.model.json.JSONModel({
										"Result": oData.results
									});
									if (oData.results[0].TYPE_MSG === 'E') {
										sap.m.MessageToast.show(oData.results[0].MSG);
									} else {
										sap.m.MessageToast.show("Documento criado com sucesso !");
										MessageBox.confirm("Gostaria de prosseguir para a tela de seleção de objetos ?", {
											actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
											styleClass: "messageBoxError",
											onClose: function(oAction) {
												if (oAction === sap.m.MessageBox.Action.YES) {
													sap.m.MessageToast.show("OK, redirecionando...");
													oRouter.navTo("Extracao");
												} else {
													sap.m.MessageToast.show("Sem problemas");
													location.reload();
												}
											}
										});
									}
								},
								error: function(err) {
									//debugger;
								}
							});

							//**********************************************************
							//////////////////////////////////
						} else {
							sap.m.MessageToast.show("Documento não salvo");
						}
					}
				});
			},
			onBeforeRendering: function() {

			},

			onAfterRendering: function() {},

			AddMore: function() {
				MessageToast.show("Item adicionado com sucesso !");
			},

			onSearch: function(oEvent) {
				// var oGlobalBusyDialog = new sap.m.BusyDialog();
				// 			    oGlobalBusyDialog.open();	
			}
		});
	});