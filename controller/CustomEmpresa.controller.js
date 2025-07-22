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
		Text, TextArea, CheckBox, Input, MessageBox, JSONModel) {
		"use strict";

		return Controller.extend("yit.EXPERTDOCS.controller.CustomEmpresa", {

			onInit: function() {
				// this.byId("Page2").setVisible(false);
				// this.byId("Page1").setVisible(true);
				//that = this;
				// Create Model Instance of the oData service
				var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/YEXPERTDOCS_SRV");
				sap.ui.getCore().setModel(oModel, "myModel");
				this.i_de = 0;
				this.i_para = 0;
				this.onSearch();
				// this.byId("btSolicita").setVisible(false);
				// this.byId("btProxTela1").setVisible(false);

			},
			CreateNew: function() {
				this.byId("btCriarNovo").setVisible(false);
				this.byId("btVoltar").setVisible(true);
				this.byId("btSalvar").setVisible(true);
				this.byId("tabListaEmp").setVisible(false);
				this.getView().byId("WizCustomEmpresa").nextStep();

			},
			NewVersion: function() {
				this.byId("btCriarNovo").setVisible(false);
				this.byId("btVoltar").setVisible(true);
				this.byId("btSalvar").setVisible(true);
				this.getView().byId("WizCustomEmpresa").nextStep();

			},
			VoltarIni: function() {
				this.byId("btCriarNovo").setVisible(true);
				this.byId("btVoltar").setVisible(false);
				this.byId("btSalvar").setVisible(false);
				this.byId("tabListaEmp").setVisible(true);
				this.getView().byId("WizCustomEmpresa").previousStep();
			},
			Voltar: function(oEvent) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Home");
				// location.reload();
			},
			Salvar: function() {
				var that = this;
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

				if (this.byId("txtNmEmp").getValue() === '') {
					MessageBox.error("É necessário informar o Nome da Empresa");
					exit();
				}
				if (this.byId("txtNmProj").getValue() === '') {
					MessageBox.error("É necessário informar o Nome do Projeto");
					exit();
				}
				if (this.byId("txtNmTemp").getValue() === '') {
					MessageBox.error("É necessário informar o Nome do Template");
					exit();
				}
				if (this.byId("uploadArqTemp").getValue() === '') {
					MessageBox.error("É necessário carregar um template de modelo");
					exit();
				}

				// MessageBox.confirm("Confirma a criação do template ?", {
				// 	actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
				// 	styleClass: "messageBoxError",
				// 	onClose: function(oAction) {
				// 		if (oAction === sap.m.MessageBox.Action.YES) {
				// 			//////////////////////////////////	

				// 			var oGlobalBusyDialog = new sap.m.BusyDialog();
				// 			oGlobalBusyDialog.open();
				// 			//////////////////////////////////
				// 		} else {
				// 			sap.m.MessageToast.show("Template não gravado");
				// 			exit();
				// 		}

				// 	}
				// });

				//***********//

				// ///////////////////////////////////// FILTROS //////////////////////////////////////////////////
				var fil_filter1 = this.byId("txtNmEmp").getValue();
				var filter1 = new sap.ui.model.Filter({
					path: "NOME_EMPRESA",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: fil_filter1
				});
				var fil_filter2 = this.byId("uploadLogoEmp").getValue();
				var filter2 = new sap.ui.model.Filter({
					path: "LOGO_EMPRESA",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: fil_filter2
				});
				var fil_filter3 = this.byId("txtNmProj").getValue();
				var filter3 = new sap.ui.model.Filter({
					path: "NOME_PROJETO",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: fil_filter3
				});
				var fil_filter4 = this.byId("uploadLogoProj").getValue();
				var filter4 = new sap.ui.model.Filter({
					path: "LOGO_PROJETO",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: fil_filter4
				});
				var fil_filter5 = this.byId("txtNmTemp").getValue();
				var filter5 = new sap.ui.model.Filter({
					path: "NOME_TEMPLATE",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: fil_filter5
				});
				var fil_filter6 = this.byId("uploadArqTemp").getValue();
				var filter6 = new sap.ui.model.Filter({
					path: "ARQUIVO_TEMPLATE",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: fil_filter6
				});
				var fil_filter7 = this.byId("valAtivo").getState();
				var filter7 = new sap.ui.model.Filter({
					path: "ATIVO",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: fil_filter7
				});
				var fil_filter8 = "INCLUSAO";
				var filter8 = new sap.ui.model.Filter({
					path: "MSG",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: fil_filter8
				});

				var oGlobalBusyDialog = new sap.m.BusyDialog();
				var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/YEXPERTDOCS_SRV");
				oModel.read("/LISTA_TEMPLATESSet", {
					filters: [filter1, filter2, filter3, filter4, filter5, filter6, filter7, filter8],
					success: function(oData) {
						//debugger;

						//that.getView().byId("btProxTela1").setVisible(true);
						var userdata = new sap.ui.model.json.JSONModel({
							"Result": oData.results
						});
						if (oData.results[0].TYPE_MSG === "S") {
							MessageToast.show(oData.results[0].MSG);
						}
						oGlobalBusyDialog.close();
						location.reload();

					},
					error: function(err) {
						oGlobalBusyDialog.close();
					}
				});
				//***********//
			},

			onBeforeRendering: function() {

			},

			onAfterRendering: function() {},

			AddMore: function() {
				MessageToast.show("Item adicionado com sucesso !");
			},

			onSearch: function(oEvent) {
				var oGlobalBusyDialog = new sap.m.BusyDialog();
				oGlobalBusyDialog.open();
				// ///////////////////////////////////// FILTROS //////////////////////////////////////////////////
				// 			// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
				var fil_filter1 = "ALL";
				var filter1 = new sap.ui.model.Filter({
					path: "TYPE_MSG",
					// caso seja equal
					// operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					operator: sap.ui.model.FilterOperator.Contains,
					value1: fil_filter1
				});

				var that = this;
				var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/YEXPERTDOCS_SRV");
				oModel.read("/LISTA_TEMPLATESSet", {
					filters: [filter1],
					success: function(oData, oResponse) {
						//debugger;

						//that.getView().byId("btProxTela1").setVisible(true);
						var userdata = new sap.ui.model.json.JSONModel({
							"Result": oData.results
						});
						var tab = that.getView().byId("tabListaEmp");
						tab.setModel(userdata);
						// var i = 0;
						oGlobalBusyDialog.close();
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
									// 	visible: false,
									// 	value : "{PROGRAMAZ}"
									// }), 
									new sap.m.Text({
										text: "{NOME_EMPRESA}"
									}), new sap.m.Text({
										text: "{NOME_PROJETO}"
									}), new sap.m.Text({
										text: "{NOME_TEMPLATE}"
									}), new sap.m.Text({
										text: "{LOGO_EMPRESA}"
									}), new sap.m.Text({
										text: "{LOGO_PROJETO}"
									}), new sap.m.Text({
										text: "{ARQUIVO_TEMPLATE}"
									}), new sap.m.Text({
										text: "{ATIVO}"
									})
								]
							})
						});
					},
					error: function(err) {
						oGlobalBusyDialog.close();
					}
				});
			}

		});
	});