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

		return Controller.extend("yit.CODE2DOC.controller.Tcode", {
			onInit: function () {

			},
            Voltar: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView1");
            },
            GerarDoc: function(oEvent) {
			    MessageBox.success("Documento gerado com sucesso !");
                window.open("https://b4a07b6d-d8a2-4887-bb0c-b31045e0662e.usrfiles.com/ugd/b4a07b_5d4707ce038b4b03b2039929fc299f00.docx");    
            },
		});
	});
