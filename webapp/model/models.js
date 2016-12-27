sap.ui.define([
			"sap/ui/model/resource/ResourceModel",
			"sap/ui/model/json/JSONModel",
			"sap/ui/Device"
		], function(ResourceModel, JSONModel, Device) {
			"use strict";

			return {
				createResourceModel: function(sBundleName) {
					var oResourceModel = new ResourceModel({
						"bundleName": sBundleName
					});
					return oResourceModel;
				},

				createDeviceModel: function() {
					var oModel = new JSONModel(Device);
					oModel.setDefaultBindingMode("OneWay");
					return oModel;
				}

				};
			});