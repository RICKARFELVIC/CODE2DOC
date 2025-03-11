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
    function (Controller, UIComponent, Core, HorizontalLayout, VerticalLayout, Dialog, DialogType, Button, ButtonType, Label, MessageToast, Text, TextArea, CheckBox, Input, MessageBox, JSONModel) {
		"use strict";

		return Controller.extend("yit.CODE2DOC.controller.CustomEmpresa", {
			
			onInit: function () {
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
			CreateNew : function(){
                this.byId("btCriarNovo").setVisible(false);
                this.byId("btVoltar").setVisible(true);
                this.byId("btSalvar").setVisible(true);
                this.byId("tabListaDoc").setVisible(false);
				this.getView().byId("WizCustomEmpresa").nextStep();
				
			}, 
			NewVersion : function(){
                this.byId("btCriarNovo").setVisible(false);
                this.byId("btVoltar").setVisible(true);
                this.byId("btSalvar").setVisible(true);
				this.getView().byId("WizCustomEmpresa").nextStep();
				
			}, 
			VoltarIni : function(){
                this.byId("btCriarNovo").setVisible(true);
                this.byId("btVoltar").setVisible(false);
                this.byId("btSalvar").setVisible(false);
                this.byId("tabListaDoc").setVisible(true);
				this.getView().byId("WizCustomEmpresa").previousStep();
			}, 
			Voltar: function(oEvent) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
	            oRouter.navTo("Home");
				// location.reload();
            },
			Salvar: function () {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
               //MessageBox.confirm("Confirma a criação do documento ?");
               MessageBox.confirm("Confirma a criação do documento ?", {
                        actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                        styleClass: "messageBoxError",
                        onClose: function(oAction) {
                            if (oAction === sap.m.MessageBox.Action.YES) {
                                //////////////////////////////////	
								sap.m.MessageToast.show("Documento criado com sucesso !");
                                MessageBox.confirm("Gostaria de prosseguir para a tela de seleção de objetos ?", {
				                        actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
				                        styleClass: "messageBoxError",
				                        onClose: function(oAction) {
				                            if (oAction === sap.m.MessageBox.Action.YES) {
				                                sap.m.MessageToast.show("OK, redirecioando...");
				                                oRouter.navTo("Extracao");
				                            } else {
				                                sap.m.MessageToast.show("Sem problemas");
				                            }
				                        }
				                    });
                                //////////////////////////////////
                            } else {
                                sap.m.MessageToast.show("Documento não salvo");
                            }
                        }
                    });
            },
			onBeforeRendering : function(){
			
			}, 
			
			onAfterRendering: function () {
			},
			
			AddMore: function () {
				MessageToast.show("Item adicionado com sucesso !");
			},
			
			
			onSearch: function(oEvent) { 
				var oGlobalBusyDialog = new sap.m.BusyDialog();
// 			    oGlobalBusyDialog.open();						
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
			
// 			// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
// 			var fil_filter2 = this.byId("srcPacote").getValue();
// 			var filter2= new sap.ui.model.Filter({
// 				path: "PACOTE",
// 				// caso seja equal
// 				// operator: sap.ui.model.FilterOperator.EQ,
// 				// caso seja texto
// 				operator: sap.ui.model.FilterOperator.Contains,
// 				value1: fil_filter2	
// 			});
			
// 			// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
// 			var fil_filter3 = this.byId("srcRequest").getValue();
// 			var filter3= new sap.ui.model.Filter({
// 				path: "REQUEST",
// 				// caso seja equal
// 				// operator: sap.ui.model.FilterOperator.EQ,
// 				// caso seja texto
// 				operator: sap.ui.model.FilterOperator.Contains,
// 				value1: fil_filter3	
// 			});
			
// 			// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
// 			var fil_filter4 = this.byId("srcTipoObjeto").getSelectedKey();
// 			var filter4= new sap.ui.model.Filter({
// 				path: "TIPOOBJ",
// 				// caso seja equal
// 				// operator: sap.ui.model.FilterOperator.EQ,
// 				// caso seja texto
// 				operator: sap.ui.model.FilterOperator.Contains,
// 				value1: fil_filter4
// 			});
			
// 			// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
// 			var fil_filter5 = this.byId("srcNomeObjeto").getValue();
// 			var filter5= new sap.ui.model.Filter({
// 				path: "NOMEOBJ",
// 				// caso seja equal
// 				// operator: sap.ui.model.FilterOperator.EQ,
// 				// caso seja texto
// 				operator: sap.ui.model.FilterOperator.Contains,
// 				value1: fil_filter5
// 			});
			
// 			// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
// 			var fil_filter6 = this.byId("srcDtCriacao").getValue();
// 			var filter6= new sap.ui.model.Filter({
// 				path: "DATACRIA",
// 				// caso seja equal
// 				// operator: sap.ui.model.FilterOperator.EQ,
// 				// caso seja texto
// 				operator: sap.ui.model.FilterOperator.Contains,
// 				value1: fil_filter6
// 			});
			
// 			// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
// 			var fil_filter7 = this.byId("srcRequest").getValue();
// 			var filter7= new sap.ui.model.Filter({
// 				path: "REQUEST",
// 				// caso seja equal
// 				// operator: sap.ui.model.FilterOperator.EQ,
// 				// caso seja texto
// 				operator: sap.ui.model.FilterOperator.Contains,
// 				value1: fil_filter7
// 			});
			
// 			// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
// 			var fil_filter8 = this.byId("srcAutor").getValue();
// 			var filter8= new sap.ui.model.Filter({
// 				path: "AUTOR",
// 				// caso seja equal
// 				// operator: sap.ui.model.FilterOperator.EQ,
// 				// caso seja texto
// 				operator: sap.ui.model.FilterOperator.Contains,
// 				value1: fil_filter8
// 			});
			
		
		
				
// 		var that = this;
// 				var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/YCODE2DOC_SRV");
// 				oModel.read("/LISTA_PROGRAMASSet", {
// 			     filters: [filter1, filter2, filter3, filter4, filter5, filter6, filter7, filter8], 
// 				 success : function(oData, oResponse) {
// 					//debugger;
					
//                 	//that.getView().byId("btProxTela1").setVisible(true);
// 					var userdata = new sap.ui.model.json.JSONModel({
// 						"Result" : oData.results
// 					});
// 					var tab = that.getView().byId("TabCustomEmpresa");
// 					tab.setModel(userdata);
// 					// var i = 0;
// 					oGlobalBusyDialog.close();
// 					tab.bindAggregation("items", {
// 						path : "/Result",
// 						// template: "favTableItemTemplate"
// 						template : new sap.m.ColumnListItem({
// 							cells : [ 
// 							new  sap.m.CheckBox({
// 								// id: i++,	
// 								visible: false
// 							// }),
// 							// new  sap.m.Text({
// 							// 	visible: false,
// 							// 	value : "{PROGRAMAZ}"
// 							}), new  sap.m.Text({
// 								text : "{TIPOOBJ}"
// 							}), new sap.m.Text({
// 								text : "{NOMEOBJ}"
// 							}), new sap.m.Text({
// 								text : "{AMBIENTE}"
// 							}), new sap.m.Text({
// 								  text: "{PACOTE}"
// 							}), new sap.m.Text({
// 								text : "{DATACRIA}"
// 							}), new sap.m.Text({
// 								text : "{REQUEST}"
// 							}), new sap.m.Text({
// 								text : "{AUTOR}"
// 							}) ]
// 						})
// 					});
// 				},
// 				error : function(err) {
// 					oGlobalBusyDialog.close();
// 				}
// 				});
// 			},



// ///////////////////////  CARREGA   /////////////////////////////////////			
// 			Carrega: function(oEvent) {
// /////////////////////////////////////  SELECIONA LISTA DE PROGRAMAS  //////////////////////////////////////////

// 			var aSelectedProducts, i, sPath, oProductObject;
// 			aSelectedProducts = this.byId("TabCustomEmpresa").getSelectedItems();
// 			if (aSelectedProducts.length) {
// 					var LISTAPGM = [];
// 					var NOMEOBJ = [];
// 					var TIPOOBJ = [];
// 					var oneMoreEntity= {};
// 				for (i = 0; i < aSelectedProducts.length; i++) {
// 					sPath = aSelectedProducts[i].getBindingContext().getPath();
// 					oProductObject = aSelectedProducts[i].getBindingContext().getObject();
// 					LISTAPGM.push(oProductObject.PROGRAMAZ) ;
// 					NOMEOBJ.push(oProductObject.NOMEOBJ) ;
// 					TIPOOBJ.push(oProductObject.TIPOOBJ) ;
// 					// this.getModel().update(sPath, oProductObject, {
// 					// 	success : this._handleReorderActionResult.bind(this, oProductObject.ProductID, true, i+1, aSelectedProducts.length),
// 					// 	error : this._handleReorderActionResult.bind(this, oProductObject.ProductID, false, i+1, aSelectedProducts.length)
// 					// });
// 				}
// 				var JSONLISTAPGM = JSON.stringify(LISTAPGM);
// 				var JSONNOMEOBJ = JSON.stringify(NOMEOBJ);
// 				var JSONTIPOOBJ = JSON.stringify(TIPOOBJ);


// 			} else {
// 				// this._showErrorMessage(this.getModel("i18n").getResourceBundle().getText("PROGRAMAS"));
// 			}

// /////////////////////////////////////  SELECIONA LISTA DE   //////////////////////////////////////////
			
// 					var LISTADE =      "[{'TXTDE1':'" + this.byId("txtDe1").getValue();
// 					LISTADE = LISTADE + "','TXTDE2':'" + this.byId("txtData1").getValue();
// 					LISTADE = LISTADE + "','TXTDE3':'" + this.byId("txtFoneDe1").getValue();
// 					LISTADE = LISTADE + "'},{'TXTDE1':'" + this.byId("txtDe2").getValue();
// 					LISTADE = LISTADE + "','TXTDE2':'" + this.byId("txtData2").getValue();
// 					LISTADE = LISTADE + "','TXTDE3':'" + this.byId("txtFoneDe2").getValue();
// 					LISTADE = LISTADE + "'},{'TXTDE1':'" + this.byId("txtDe3").getValue();
// 					LISTADE = LISTADE + "','TXTDE2':'" + this.byId("txtData3").getValue();
// 					LISTADE = LISTADE + "','TXTDE3':'" + this.byId("txtFoneDe3").getValue() + "'}]";
					
// 				var JSONLISTADE = JSON.stringify(LISTADE);
				
				
// /////////////////////////////////////  SELECIONA LISTA PARA   //////////////////////////////////////////
			
					
// 					var LISTAPARA =      "[{'TXTPARA1':'" + this.byId("txtPara1").getValue();
// 					LISTAPARA = LISTAPARA + "','TXTPARA2':'" + this.byId("txtAcao1").getValue();
// 					LISTAPARA = LISTAPARA + "','TXTPARA3':'" + this.byId("txtPrazo1").getValue();
// 					LISTAPARA = LISTAPARA + "','TXTPARA4':'" + this.byId("txtFonePara1").getValue();
// 					LISTAPARA = LISTAPARA + "'},{'TXTPARA1':'" + this.byId("txtPara2").getValue();
// 					LISTAPARA = LISTAPARA + "','TXTPARA2':'" + this.byId("txtAcao2").getValue();
// 					LISTAPARA = LISTAPARA + "','TXTPARA3':'" + this.byId("txtPrazo2").getValue();
// 					LISTAPARA = LISTAPARA + "','TXTPARA4':'" + this.byId("txtFonePara2").getValue();
// 					LISTAPARA = LISTAPARA + "'},{'TXTPARA1':'" + this.byId("txtPara3").getValue();
// 					LISTAPARA = LISTAPARA + "','TXTPARA2':'" + this.byId("txtAcao3").getValue();
// 					LISTAPARA = LISTAPARA + "','TXTPARA3':'" + this.byId("txtPrazo3").getValue();
// 					LISTAPARA = LISTAPARA + "','TXTPARA4':'" + this.byId("txtFonePara3").getValue() + "'}]";
					
// 				var JSONLISTAPARA = JSON.stringify(LISTAPARA);

				
// /////////////////////////////////////  INPUTS  //////////////////////////////////////////////////
// 			// TEXTO EMPRESA
// 			// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
// 			var txt_field1 = this.byId("txtEmpresa").getValue();
// 			var field1= new sap.ui.model.Filter({
// 				path: "EMPRESA",
// 				// caso seja equal
// 				operator: sap.ui.model.FilterOperator.EQ,
// 				// caso seja texto
// 				// operator: sap.ui.model.FilterOperator.Contains,
// 				value1: txt_field1
// 			});
// 			// TEXTO PROJETO
// 			// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
// 			var txt_field2 = this.byId("txtProjeto").getValue();
// 			var field2= new sap.ui.model.Filter({
// 				path: "PROJETO",
// 				// caso seja equal
// 				operator: sap.ui.model.FilterOperator.EQ,
// 				// caso seja texto
// 				// operator: sap.ui.model.FilterOperator.Contains,
// 				value1: txt_field2
// 			});
// 			// TEXTO GERENTE
// 			// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
// 			var txt_field3 = this.byId("txtGerente").getValue();
// 			var field3= new sap.ui.model.Filter({
// 				path: "GERENTE",
// 				// caso seja equal
// 				operator: sap.ui.model.FilterOperator.EQ,
// 				// caso seja texto
// 				// operator: sap.ui.model.FilterOperator.Contains,
// 				value1: txt_field3
// 			});
// 			// TEXTO NOTA
// 			// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
// 			var txt_field4 = this.byId("txtNota").getValue();
// 			var field4= new sap.ui.model.Filter({
// 				path: "NOTA",
// 				// caso seja equal
// 				operator: sap.ui.model.FilterOperator.EQ,
// 				// caso seja texto
// 				// operator: sap.ui.model.FilterOperator.Contains,
// 				value1: txt_field4
// 			});
// 			// TEXTO SELTAB TABCustomEmpresa - LISTA DE PROGRAMAS
// 			// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
// 			var txt_field5 = LISTAPGM;
// 			var field5= new sap.ui.model.Filter({
// 				path: "PROGRAMAS",
// 				// caso seja equal
// 				operator: sap.ui.model.FilterOperator.EQ,
// 				// caso seja texto
// 				// operator: sap.ui.model.FilterOperator.Contains,
// 				value1: txt_field5
// 			});
// 			// TEXTO SELTAB TABCustomEmpresa - LISTA DE PROGRAMAS
// 			// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
// 			var txt_field6 = LISTADE;
// 			var field6= new sap.ui.model.Filter({
// 				path: "LISTADE",
// 				// caso seja equal
// 				operator: sap.ui.model.FilterOperator.EQ,
// 				// caso seja texto
// 				// operator: sap.ui.model.FilterOperator.Contains,
// 				value1: txt_field6
// 			});
// 			// TEXTO SELTAB TABCustomEmpresa - LISTA DE PROGRAMAS
// 			// var fil_filter1 = this.byId("srcAmbiente").getSelectedKey();
// 			var txt_field7 = LISTAPARA;
// 			var field7= new sap.ui.model.Filter({
// 				path: "LISTAPARA",
// 				// caso seja equal
// 				operator: sap.ui.model.FilterOperator.EQ,
// 				// caso seja texto
// 				// operator: sap.ui.model.FilterOperator.Contains,
// 				value1: txt_field7
// 			});
			
// 			// TEXTO SELTAB TABCustomEmpresa - LISTA DE PROGRAMAS
// 			var txt_field8 = Core.byId("nomeRequisicao").getValue();
// 			var field8= new sap.ui.model.Filter({
// 				path: "COD_REQ",
// 				// caso seja equal
// 				operator: sap.ui.model.FilterOperator.EQ,
// 				// caso seja texto
// 				// operator: sap.ui.model.FilterOperator.Contains,
// 				value1: txt_field8
// 			});
			
			
// 			// TEXTO SELTAB TABCustomEmpresa - LISTA DE PROGRAMAS
// 			var Agrupar = "";
// 			// if(Core.byId("chkAgrupar").getSelected() === true){
// 			// 	Agrupar = "X";
// 			// }else{
// 			// 	Agrupar = "";
// 			// }
// 			var txt_field9 = Agrupar;
// 			var field9 = new sap.ui.model.Filter({
// 				path: "AGRUPAR",
// 				// caso seja equal
// 				operator: sap.ui.model.FilterOperator.EQ,
// 				// caso seja texto
// 				// operator: sap.ui.model.FilterOperator.Contains,
// 				value1: txt_field9
// 			});
			
// 			//JSONNOMEOBJ
// 			var txt_field10 = JSONNOMEOBJ;
// 			var field10 = new sap.ui.model.Filter({
// 				path: "NOME_OBJETO",
// 				// caso seja equal
// 				operator: sap.ui.model.FilterOperator.EQ,
// 				// caso seja texto
// 				// operator: sap.ui.model.FilterOperator.Contains,
// 				value1: txt_field10
// 			});
			
// 			//JSONTIPOOBJ
// 			var txt_field11 = JSONTIPOOBJ;
// 			var field11 = new sap.ui.model.Filter({
// 				path: "TIPO_OBJETO",
// 				// caso seja equal
// 				operator: sap.ui.model.FilterOperator.EQ,
// 				// caso seja texto
// 				// operator: sap.ui.model.FilterOperator.Contains,
// 				value1: txt_field11
// 			});
			
				
// 		var that = this;
// 				var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/YCODE2DOC_SRV");
// 				oModel.read("/CustomEmpresaSet", {
// 			     filters: [field1, field2, field3, field4, field5, field6, field7, field8, field9, field10, field11], 
// 				 success : function(oData, oResponse) {
// 					//debugger;
// 					var userdata = new sap.ui.model.json.JSONModel({
// 						"Result" : oData.results
						
// 					});
// 					// if (oData.results[0].TYPE_MSG === 'E') {
// 						MessageToast.show(oData.results[0].MSG);
// 						that.Voltar();
//                 		this.byId("btSolicita").setVisible(false);
// 					// }
// 				},
// 				error : function(err) {
// 					//debugger;
// 				}
// 				});
			
// 			},
			
//             Voltar: function(oEvent) {
// 			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
//             oRouter.navTo("Custom");
// 			location.reload();
//             },
//             ProximaTela: function(oEvent) {
//                 this.getView().byId("Page1").setVisible(false);
//                 this.getView().byId("Page2").setVisible(true);
//         		this.byId("btSolicita").setVisible(true);
//             },
//             TelaAnterior: function(oEvent) {
//                 this.getView().byId("Page1").setVisible(true);
//                 this.getView().byId("Page2").setVisible(false);
//             },

//             CustomEmpresa: function(oEvent) {
//                 // var filtro = this.getView().byId("FitroCustomEmpresa");
//                 // var tab = this.getView().byId("TabCustomEmpresa");
//                 // filtro.setVisible(false);
//                 // tab.setVisible(false);
                
//                 if (!this.oSubmitDialog) {
//                     this.oSubmitDialog = new Dialog({
//                         type: DialogType.Message,
//                         title: "Confirmação de Dados",
//                         content: [
//                             new Label({
//                                 text: "Nome da Requisição",
//                                 labelFor: "nomeRequisicao"
//                             }),
//                             new Input("nomeRequisicao", {
//                                 width: "100%",
//                                 placeholder: "",
//                                 liveChange: function (oEvent) {
//                                     var sText = oEvent.getParameter("value");
//                                     this.oSubmitDialog.getBeginButton().setEnabled(sText.length > 0);
//                                 }.bind(this)
//                             }),
//                             new CheckBox("chkAgrupar", {
//                                 text: "Agrupar arquivos", 
//                             	id: "chkAgrupar",
//                             	visible: false
//                             })
//                         ],
//                         beginButton: new Button({
//                             type: ButtonType.Emphasized,
//                             text: "Salvar Requisição",
//                             enabled: false,
//                             press: function () {
//                                 // var sText = Core.byId("nomeRequisicao").getValue();
//                                 // MessageToast.show("Requisição: " + sText + " criada com sucesso !");
//                                 this.oSubmitDialog.close();
//                                 this.Carrega();
//                             }.bind(this)
//                         }),
//                         endButton: new Button({
//                             text: "Cancelar",
//                             press: function () {
//                                 this.oSubmitDialog.close();
//                             }.bind(this)
//                         })
//                     });
//                 }

//                 this.oSubmitDialog.open();
//             },

//             Salvar: function(oEvent) {
//                 var nomeReq = this.getView().byId("txtNomeReq").getValue();  
//                 MessageBox.success("Extração " + nomeReq  + " solicitada com sucesso !");
//             },
            
//             onAdd : function(oEvent) {
//             	this.i_de++;
//             	var cp_De = "DE" + this.i_de;
//             	var cp_Data = "DATA" + this.i_de;
//             	var cp_Fone = "FONE" + this.i_de;
//                 var oItem = new sap.m.ColumnListItem({
//                 cells : [ 
//                 	new sap.m.Input({id : cp_De}), 
//                 	new sap.m.Input({id : cp_Data}), 
//                 	new sap.m.Input({id : cp_Fone}),  
//                 	new sap.m.Button({
// 		                text : "Delete",
// 		                press : [ this.remove, this ]
// 		            }) ]
//                 });
			
//                 var oTable = this.getView().byId('tabListaDe');
//                 oTable.addItem(oItem);
//             },

//             deleteRow : function(oEvent) {
//                 var oTable = this.getView().byId('tabListaDe');
//                 oTable.removeItem(oEvent.getParameter('listItem'));
//             },

//             remove : function(oEvent) {
//                 var oTable = this.getView().byId('tabListaDe');
//                 oTable.removeItem(oEvent.getSource().getParent());
//             },
            
//             onAddPara : function(oEvent) {
//                 var oItem = new sap.m.ColumnListItem({
//                 cells : [ new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Input(), new sap.m.Button({
//                 text : "Delete",
//                 press : [ this.remove, this ]
//                 }) ]
//                 });

//                 var oTable = this.getView().byId('tabListaPara');
//                 oTable.addItem(oItem);
//             },

//             deleteRowPara : function(oEvent) {
//                 var oTable = this.getView().byId('tabListaPara');
//                 oTable.removeItem(oEvent.getParameter('listItem'));
//             },

//             removePara : function(oEvent) {
//                 var oTable = this.getView().byId('tabListaPara');
//                 oTable.removeItem(oEvent.getSource().getParent());
            }
		});
	});