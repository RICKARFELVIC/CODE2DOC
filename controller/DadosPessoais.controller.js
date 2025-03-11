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

		return Controller.extend("yit.CODE2DOC.controller.DadosPessoais", {

			onInit: function() {
				// this.byId("Page2").setVisible(false);
				// this.byId("Page1").setVisible(true);
				//that = this;
				// Create Model Instance of the oData service
				var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/YCODE2DOC_SRV");
				sap.ui.getCore().setModel(oModel, "myModel");
				this.i_de = 0;
				this.i_para = 0;

				// this.byId("btSolicita").setVisible(false);
				// this.byId("btProxTela1").setVisible(false);

			},
			DadosAcesso: function() {
				this.byId("btDados").setVisible(false);
				this.byId("btVoltar").setVisible(true);
				this.getView().byId("WizDadosPessoais").nextStep();

			},
			VoltarDadosPess: function() {
				this.byId("btDados").setVisible(true);
				this.byId("btVoltar").setVisible(false);
				this.getView().byId("WizDadosPessoais").previousStep();

			},
			Escopo: function() {
				this.byId("btSalvar").setVisible(true);
				this.byId("btEscopo").setVisible(false);
				this.getView().byId("WizCriaDoc").nextStep();
			},
			Voltar: function(oEvent) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Home");
				// location.reload();
			},
			Salvar: function() {
				var that = this;
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

				var senha1 = this.byId("txtNovaSenha").getValue();
				var senha2 = this.byId("txtRepSenha").getValue();

				if (senha1 !== senha2) {
					MessageBox.confirm("Favor inserir senhas idênticas");
				} else {

					MessageBox.confirm("Confirma a alteração dos dados ?", {
						                actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
						                styleClass: "messageBoxError",
						                onClose: function(oAction) {
						                    if (oAction === sap.m.MessageBox.Action.YES) {
						                        //////////////////////////////////	
													// sap.m.MessageToast.show("Dados atualizados com sucesso !");
													that.atualizarDados();
						                        //////////////////////////////////
						                    } else {
						                        sap.m.MessageToast.show("Dados não foram salvos.");
						                    }
						                }
					});
				}
			},
			
			atualizarDados: function(){
				var Nome = this.byId("txtNome").getValue();
				var Sobrenome = this.byId("txtSobrenome").getValue();
				var NmCompleto = this.byId("txtNmCompleto").getValue();
				var Departamento = this.byId("txtDepartamento").getValue();
				var Email = this.byId("txtEmail").getValue();
				var Celular = this.byId("txtCelular").getValue();
				var Usuario = this.byId("txtUser").getValue();
				var Senha = this.byId("txtNovaSenha").getValue();
				
				// that.getView().byId("txtNome").setValue(oData.results[0].NOME);
				// that.getView().byId("txtSobrenome").setValue(oData.results[0].SOBRENOME);
				// that.getView().byId("txtNmCompleto").setValue(oData.results[0].NOME_EXIB);
				// that.getView().byId("txtDepartamento").setValue(oData.results[0].DEPARTAMENTO);
				// that.getView().byId("txtCelular").setValue(oData.results[0].CELULAR);
				// that.getView().byId("txtEmail").setValue(oData.results[0].EMAIL);
				// that.getView().byId("txtUser").setValue(oData.results[0].USUARIO);
				
				/////////////////////////////////////  INPUTS  //////////////////////////////////////////////////
				// NOME DA REQUISIÇÃO
				var txt_field1 = Nome;
				var field1 = new sap.ui.model.Filter({
					path: "NOME",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: txt_field1
				});

				// TEXTO PROJETO
				var txt_field2 = Sobrenome;
				var field2 = new sap.ui.model.Filter({
					path: "SOBRENOME",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: txt_field2
				});

				// VERSAO
				var txt_field3 = NmCompleto;
				var field3 = new sap.ui.model.Filter({
					path: "NOME_EXIB",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: txt_field3
				});

				// TEMPLATE
				var txt_field4 = Departamento;
				var field4 = new sap.ui.model.Filter({
					path: "DEPARTAMENTO",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: txt_field4
				});

				//JSONTIPOOBJ
				var txt_field5 = Celular;
				var field5 = new sap.ui.model.Filter({
					path: "CELULAR",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: txt_field5
				});

				//JSONNOMEOBJ
				var txt_field6 = Email;
				var field6 = new sap.ui.model.Filter({
					path: "EMAIL",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: txt_field6
				});

				//JSONPACOTE
				var txt_field7 = Usuario;
				var field7 = new sap.ui.model.Filter({
					path: "USUARIO",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: txt_field7
				});

				//JSONDATACRIACAO
				var txt_field8 = 'ATUALIZA';
				var field8 = new sap.ui.model.Filter({
					path: "ACAO",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: txt_field8
				});

				//JSONREQUEST
				var txt_field9 = Senha;
				var field9 = new sap.ui.model.Filter({
					path: "PASS",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: txt_field9
				});

				var that = this;
				var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/YCODE2DOC_SRV");
				oModel.read("/DADOS_PESSSet", {
					filters: [field1, field2, field3, field4, field5, field6, field7, field8, field9],
					success: function(oData, oResponse) {
						//debugger;
						var userdata = new sap.ui.model.json.JSONModel({
							"Result": oData.results

						});
						if (oData.results[0].TYPE_MSG === 'E') {
							MessageToast.show(oData.results[0].MSG);
							location.reload();
						}else{
							MessageToast.show(oData.results[0].MSG);
							location.reload();
						}
					},
					error: function(err) {
						//debugger;
					}
				});
				
			},
			
			onBeforeRendering: function() {

			},

		
			onAfterRendering: function() {
				var oGlobalBusyDialog = new sap.m.BusyDialog();
				oGlobalBusyDialog.open();
			
				var that = this;
				var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/YCODE2DOC_SRV");
				oModel.read("/DADOS_PESSSet", {
					// filters: [filter1, filter2, filter3, filter4, filter5, filter6, filter7, filter8],
					success: function(oData, oResponse) {
						//debugger;

						//that.getView().byId("btProxTela1").setVisible(true);
						var userdata = new sap.ui.model.json.JSONModel({
							"Result": oData.results
						});
						
						that.getView().byId("txtNome").setValue(oData.results[0].NOME);
						that.getView().byId("txtSobrenome").setValue(oData.results[0].SOBRENOME);
						that.getView().byId("txtNmCompleto").setValue(oData.results[0].NOME_EXIB);
						that.getView().byId("txtDepartamento").setValue(oData.results[0].DEPARTAMENTO);
						that.getView().byId("txtCelular").setValue(oData.results[0].CELULAR);
						that.getView().byId("txtEmail").setValue(oData.results[0].EMAIL);
						that.getView().byId("txtUser").setValue(oData.results[0].USUARIO);
						
						if (oData.results[0].TILE_CRIA_DOC ==='X'){
							that.getView().byId("__box1").setSelected(true);
						}else{
							that.getView().byId("__box1").setSelected(false);
						}
						if (oData.results[0].TILE_ADD_OBJ ==='X'){
							that.getView().byId("__box2").setSelected(true);
						}else{
							that.getView().byId("__box2").setSelected(false);
						}
						if (oData.results[0].TILE_CONS_DOC ==='X'){
							that.getView().byId("__box3").setSelected(true);
						}else{
							that.getView().byId("__box3").setSelected(false);
						}
						if (oData.results[0].TILE_DADOS_PESS ==='X'){
							that.getView().byId("__box4").setSelected(true);
						}else{
							that.getView().byId("__box4").setSelected(false);
						}
						if (oData.results[0].TILE_ACESSOS ==='X'){
							that.getView().byId("__box5").setSelected(true);
						}else{
							that.getView().byId("__box5").setSelected(false);
						}
						if (oData.results[0].TILE_CUSTOMIZA ==='X'){
							that.getView().byId("__box6").setSelected(true);
						}else{
							that.getView().byId("__box6").setSelected(false);
						}
					},
					error: function(err) {
						oGlobalBusyDialog.close();
					}
				});
				oGlobalBusyDialog.close();
			}
		});
	});