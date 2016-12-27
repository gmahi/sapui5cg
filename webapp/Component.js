sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(UIComponent, ResourceModel, JSONModel, Device) {
	"use strict";

	return UIComponent.extend("sapui5.demo.mvcapp.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * In this function, the resource and application models are set and the router is initialized.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// createthedevicemodelhere
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			this.setModel(oModel, "Device");

			// create the views based on the url/hash
			this.getRouter().initialize();
		}
	});
});