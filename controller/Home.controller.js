sap.ui.define([
		"sap/ui/core/mvc/Controller"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller) {
		"use strict";

		return Controller.extend("yit.EXPERTDOCS.controller.Home", {
			onInit: function () { },
			
			onAfterRendering: function() {
				var oGlobalBusyDialog = new sap.m.BusyDialog();
				oGlobalBusyDialog.open();
			
				var that = this;
				var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/YEXPERTDOCS_SRV");
				oModel.read("/CHECK_USERSet", {
					// filters: [filter1, filter2, filter3, filter4, filter5, filter6, filter7, filter8],
					success: function(oData, oResponse) {
						//debugger;

						//that.getView().byId("btProxTela1").setVisible(true);
						var userdata = new sap.ui.model.json.JSONModel({
							"Result": oData.results
						});
						
						if (oData.results[0].TILE_CRIA_DOC ==='X'){
							that.getView().byId("tile_criadoc").setVisible(true);
						}else{
							that.getView().byId("tile_criadoc").setVisible(false);
						}
						if (oData.results[0].TILE_ADD_OBJ ==='X'){
							that.getView().byId("tile_addobj").setVisible(true);
						}else{
							that.getView().byId("tile_addobj").setVisible(false);
						}
						if (oData.results[0].TILE_CONS_DOC ==='X'){
							that.getView().byId("tile_consdoc").setVisible(true);
						}else{
							that.getView().byId("tile_consdoc").setVisible(false);
						}
						if (oData.results[0].TILE_DADOS_PESS ==='X'){
							that.getView().byId("tile_pess").setVisible(true);
						}else{
							that.getView().byId("tile_pess").setVisible(false);
						}
						if (oData.results[0].TILE_ACESSOS ==='X'){
							that.getView().byId("tile_acessos").setVisible(true);
						}else{
							that.getView().byId("tile_acessos").setVisible(false);
						}
						if (oData.results[0].TILE_CUSTOMIZA ==='X'){
							that.getView().byId("tile_custom").setVisible(true);
						}else{
							that.getView().byId("tile_custom").setVisible(false);
						}
					},
					error: function(err) {
						oGlobalBusyDialog.close();
					}
				});
				oGlobalBusyDialog.close();
			},
            
            // TILE 1    
            Go_CriaDoc: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("CriaDoc");
            },
            
            // TILE 2
            Go_Extracao: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Extracao");
            },
            
            // TILE 3
            Go_Consulta: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Relat");
            // oRouter.navTo("Custom");
            },
            
            // TILE 4
            Go_DadosPessoais: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("DadosPessoais");
            },
            
            // TILE 5
            Go_GestaoAcessos: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("GestaoAcessos");
            },
            
            // TILE 6
            Go_CustomEmpresa: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("CustomEmpresa");
            },
            
            // TILE 7
            Go_Relatorios: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RelatDocGer");
            },
                
            Go_Upload: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Upload");
            },
                
            Go_Param: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Param");
            },
                
            Go_Relat: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Relat");
            },
                
            Go_Tcode: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Tcode");
            }
		});
	});