sap.ui.define([
		"sap/ui/core/mvc/Controller",
        "sap/m/MessageBox",
        "sap/m/MessageToast"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, MessageToast) {
		"use strict";

		return Controller.extend("yit.doc_dev.controller.Upload", {
			onInit: function () {

			},
            Voltar: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Home");
            },

            Salvar: function(oEvent) {
            var nomeReq = this.getView().byId("txtNomeReq").getValue();  
			MessageBox.success("Extração " + nomeReq  + " solicitada com sucesso !");
            },
		});
	});
