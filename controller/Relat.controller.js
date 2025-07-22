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
		"sap/ui/core/util/File"
	],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function(Controller, MessageBox, MessageToast, Dialog, DialogType, Button, ButtonType, Label, Text, TextArea, File) {
		"use strict";

		return Controller.extend("yit.EXPERTDOCS.controller.Relat", {
			onInit: function() {
				this.byId("btExclui").setVisible(false);
			},

			onAfterRendering: function() {
				this.onSearch();
				this.onSearch();
			},

			selecionaItem: function() {
				this.byId("btExclui").setVisible(true);
			},

			Voltar: function(oEvent) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Home");
			},

			Baixar: function(oEvent) {
				MessageBox.success("Arquivo(s) baixado(s) com sucesso.");
			},
			Excluir: function(oEvent) {
				MessageBox.success("Arquivo(s) excluído(s) com sucesso.");
			},

			onSearch: function(oEvent) {
				///////////////////////////////////// BUSCAR //////////////////////////////////////////////////
				// FILTRO AMBIENTE

				var fil_filter1 = this.byId("inpNomeReq").getValue();
				var filter1 = new sap.ui.model.Filter({
					path: "COD_REQ",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: fil_filter1
				});

				var fil_filter2 = this.byId("inpDocumento").getValue();
				var filter2 = new sap.ui.model.Filter({
					path: "NM_ARQUIVO",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: fil_filter2
				});

				var fil_filter3 = this.byId("inpProjeto").getValue();
				var filter3 = new sap.ui.model.Filter({
					path: "PROJETO",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: fil_filter3
				});

				var fil_filter4 = this.byId("inpDtCriacao").getValue();
				var filter4 = new sap.ui.model.Filter({
					path: "DT_CRIACAO",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: fil_filter4
				});

				var fil_filter5 = 'BUSCA';
				var filter5 = new sap.ui.model.Filter({
					path: "STATUS",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: fil_filter5
				});

				var that = this;
				var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/YEXPERTDOCS_SRV");
				oModel.read("/DOCUMENTOSet", {
					filters: [filter1, filter2, filter3, filter4, filter5],
					success: function(oData, oResponse) {

						//
						var userdata = new sap.ui.model.json.JSONModel({
							"Result": oData.results
						});
						if (oData.results[0].TYPE_MSG === 'E') {
							MessageToast.show(oData.results[0].MSG);
							that.byId("btExclui").setVisible(false);
							that.byId("tableGer").setVisible(false);

						} else {
							MessageToast.show(oData.results[0].MSG);
							that.byId("btExclui").setVisible(false);
							that.byId("tableGer").setVisible(true);
							var tab = that.getView().byId("tableGer");
							tab.setModel(userdata);
							// var i = 0;

							var oLink = new sap.m.Link();
							// oLink.setText(objItem.links[0].title);
							oLink.setHref("onDownloadPress");
							oLink.setTarget("_blank");

							tab.bindAggregation("items", {
								path: "/Result",
								// template: "template"

								/////////////////////////

								template: new sap.m.ColumnListItem({
									cells: [
										new sap.m.Text({
											text: "{COD_REQ}",
											textAlign: "Center"
										}),
										new sap.m.Link({
											visible: true,
											text: "{NM_ARQUIVO}",
											textAlign: "Center",
											//target: "_blank",
											//href: "{BASE64}"//,
											// press: "onDownloadPress"
											press: function(oEvent) {
												that.onDownloadPress3(oEvent);
											}
										}),
										new sap.m.Text({
											visible: true,
											text: "{VERSAO}",
											textAlign: "Center"
										}),
										new sap.m.Text({
											visible: true,
											text: "{PROJETO}",
											textAlign: "Center"
										}),
										new sap.m.Text({
											visible: true,
											text: "{TEMPLATE}",
											textAlign: "Center"
										}),
										new sap.m.Text({
											text: "{DT_CRIACAO}",
											textAlign: "Center"
										}),
										new sap.m.Text({
											text: "{STATUS}",
											textAlign: "Center"
										})
									]
								})
							});
						}
					},
					error: function(err) {
						//debugger;
					}
				});
			},
			onDownloadPress3: function(oEvent) {
				var oLink = oEvent.getSource();
				var oBindingContext = oLink.getBindingContext();
				var sBase64 = oBindingContext.getProperty("BASE64");
				var sFileName = oBindingContext.getProperty("NM_ARQUIVO");

				// Detectar tipo MIME (opcional, aqui assume PDF como exemplo)
				var mimeType = "application/pdf"; // ou "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" para Excel, etc.

				try {
					// Converter Base64 para Blob
					var byteCharacters = atob(sBase64);
					var byteNumbers = new Array(byteCharacters.length);
					for (var i = 0; i < byteCharacters.length; i++) {
						byteNumbers[i] = byteCharacters.charCodeAt(i);
					}
					var byteArray = new Uint8Array(byteNumbers);
					var blob = new Blob([byteArray], {
						type: mimeType
					});

					// Criar URL temporária e forçar download
					var url = URL.createObjectURL(blob);
					var a = document.createElement("a");
					a.href = url;
					a.download = sFileName || "arquivo";
					document.body.appendChild(a);
					a.click();
					document.body.removeChild(a);
					URL.revokeObjectURL(url);
				} catch (e) {
					sap.m.MessageToast.show("Erro ao processar o download.");
					console.error("Erro ao converter Base64:", e);
				}
			},

			onDownloadPress2: function(oEvent) {
				////////////////////////////////////////////////////////
				var fName = oEvent.getSource().getBindingContext().getProperty("NM_ARQUIVO");
				var fType = oEvent.getSource().getBindingContext().getProperty("STATUS");
				// var fMres = oEvent.getSource().getBindingContext().getProperty("ARQUIVO_FINAL");
				var fMres = oEvent.getSource().getBindingContext().getProperty("BASE64");
				fType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

				fMres = atob(fMres);
				if (fType === "text/plain") {
					sap.ui.core.util.File.save(fMres, fName, fType, "utf-8", true);
				} else {
					var byteNumbers = new Array(fMres.length);
					for (var i = 0; i < fMres.length; i++) {
						byteNumbers[i] = fMres.charCodeAt(i);
					}
					var byteArray = new Uint8Array(byteNumbers);
					var blob = new Blob([byteArray], {
						type: fType,
						filename: fName
					});
					// antigo download
					//var url = URL.createObjectURL(blob);
					//window.open(url, 'blank');

					///// Download do Blob			
					var a = document.createElement('a');
					document.body.appendChild(a);
					var url = window.URL.createObjectURL(blob);
					a.href = url;
					a.download = fName;
					a.click();
					window.URL.revokeObjectURL(url);
					document.body.removeChild(a);
					/////					

				}
				///////////////////////////////////////////////////////
				//sap.ui.core.util.File.save(sFileContent, sFileName, sFileType, null, null);
			},

			onDownloadPress: function(oEvent) {
				var fName = oEvent.getSource().getBindingContext().getProperty("NM_ARQUIVO");
				var fType = oEvent.getSource().getBindingContext().getProperty("STATUS");
				var fMres = oEvent.getSource().getBindingContext().getProperty("BASE64");

				// Defina o tipo MIME corretamente, se necessário
				fType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

				// Decodifica o base64 em partes para evitar estouros de memória
				var byteCharacters = atob(fMres);
				var byteArrays = [];

				for (var offset = 0; offset < byteCharacters.length; offset += 512) {
					var slice = byteCharacters.slice(offset, offset + 512);
					var byteNumbers = new Array(slice.length);
					for (var i = 0; i < slice.length; i++) {
						byteNumbers[i] = slice.charCodeAt(i);
					}
					var byteArray = new Uint8Array(byteNumbers);
					byteArrays.push(byteArray);
				}

				var blob = new Blob(byteArrays, {
					type: fType
				});

				// Cria o link para download
				var a = document.createElement('a');
				document.body.appendChild(a);
				var url = window.URL.createObjectURL(blob);
				a.href = url;
				a.download = fName;
				a.click();
				window.URL.revokeObjectURL(url);
				document.body.removeChild(a);
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
						content: new Text({
							text: "Deseja realmente excluir essa requisição?"
						}),
						beginButton: new Button({
							type: ButtonType.Emphasized,
							text: "Sim",
							press: function() {
								this.Confirma_Exc();
								this.oApproveDialog.close();
							}.bind(this)
						}),
						endButton: new Button({
							text: "Não",
							press: function() {
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
						LISTAREQ.push(oProductObject.COD_REQ);
					}

				}

				/////////////////////////////////////  INPUTS  //////////////////////////////////////////////////
				// TEXTO EMPRESA
				// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
				var txt_field1 = LISTAREQ;
				var field1 = new sap.ui.model.Filter({
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
				var field2 = new sap.ui.model.Filter({
					path: "STATUS",
					// caso seja equal
					operator: sap.ui.model.FilterOperator.EQ,
					// caso seja texto
					// operator: sap.ui.model.FilterOperator.Contains,
					value1: txt_field2
				});

				var that = this;
				var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/YEXPERTDOCS_SRV");
				oModel.read("/DOCUMENTOSet", {
					filters: [field1, field2],
					success: function(oData, oResponse) {
						//debugger;

						that.onSearch();
						var userdata = new sap.ui.model.json.JSONModel({
							"Result": oData.results

						});
						// if (oData.results[0].TYPE_MSG === 'E') {
						MessageToast.show(oData.results[0].MSG);
						// this.byId("btSolicita").setVisible(true);
						// }
					},
					error: function(err) {
						//debugger;
					}
				});

			}

		});
	});