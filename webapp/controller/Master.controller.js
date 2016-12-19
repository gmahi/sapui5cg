sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("sapui5.demo.mvcapp.controller.Master", {
		onListPress: function(oEvent) {
			var sPageId = oApp.getPages()[1].getId();
			oApp.to(sPageId);
			var oPage = oApp.getPage(sPageId);
			var oContenxt = oEvent.getSource().getBindingContext();
			oPage.setBindingContext(oContenxt);
		}

	});
});