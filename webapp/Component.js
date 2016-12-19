sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel"
], function(UIComponent, JSONModel) {
	"use strict";

	return UIComponent.extend("sapui5.demo.mvcapp.Component", {
		metadata: {
			"rootView": "sapui5.demo.mvcapp.view.App",
			"config": {
				"serviceUrl": "webapp/service/data.json"
			}
		},

		createContent: function() {
			UIComponent.prototype.createContent.apply(this, arguments);

			var oModel = new JSONModel(this.getMetadata().getConfig().serviceUrl);

			// important to set the model on the component
			// and not on the sapui5 core anymore!
			this.setModel(oModel);

			/*	var oRootView = sap.ui.view("appview", {
					type: sap.ui.core.mvc.ViewType.XML,
					viewName: "sapui5.demo.mvcapp.view.App"
				});*/

			var oRootView =
				UIComponent.prototype.createContent.apply(this, arguments);

			oApp = oRootView.byId("app");
			return oRootView;
		}
	});
});