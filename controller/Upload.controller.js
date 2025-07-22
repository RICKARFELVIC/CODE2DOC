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

		return Controller.extend("yit.EXPERTDOCS.controller.Param", {
			onInit: function () {

			},   
            Voltar: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView1");
            },
            GerarDoc: function(oEvent) {
                window.open("https://b4a07b6d-d8a2-4887-bb0c-b31045e0662e.usrfiles.com/ugd/b4a07b_4ad77e24bfec4669b725319eac715875.docx");    
            },
            Upload: function(oEvent) {
			MessageBox.success("Upload realizado com sucesso !");
            },


		});
	});