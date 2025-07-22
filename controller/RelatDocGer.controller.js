sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
  "use strict";

  return Controller.extend("yit.EXPERTDOCS.controller.RelatDocGer", {

    onInit: function () {
      // Modelo de dados simples para exemplo (normalmente viria de um OData ou JSON)
      var oData = {
        dados: [
          { cliente: "Cliente A", mes: "01", ano: "2025", qtde_gerados: 150 },
          { cliente: "Cliente B", mes: "02", ano: "2025", qtde_gerados: 200 },
          { cliente: "Cliente C", mes: "03", ano: "2025", qtde_gerados: 100 }
        ]
      };
      var oModel = new JSONModel(oData);
      this.getView().setModel(oModel);
    },

    onFilter: function () {
      var oView = this.getView();
      var oTable = oView.byId("relatorioTable");
      var oBinding = oTable.getBinding("rows");

      // Obtendo os valores dos campos de filtro
      var sCliente = oView.byId("cliente").getValue();
      var sMes = oView.byId("mes").getValue();
      var sAno = oView.byId("ano").getValue();

      // Criando os filtros
      var aFilters = [];
      if (sCliente) {
        aFilters.push(new Filter("cliente", FilterOperator.Contains, sCliente));
      }
      if (sMes) {
        aFilters.push(new Filter("mes", FilterOperator.Contains, sMes));
      }
      if (sAno) {
        aFilters.push(new Filter("ano", FilterOperator.Contains, sAno));
      }

      // Aplicando os filtros
      oBinding.filter(aFilters);
    }
  });
});