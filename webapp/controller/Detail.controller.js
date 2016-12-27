sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sapui5/demo/mvcapp/model/formatter",
	"sapui5/demo/mvcapp/model/types",
	"sap/ui/layout/VerticalLayout"
], function(Controller, History, formatter, types, VerticalLayout) {
	"use strict";
	return Controller.extend("sapui5.demo.mvcapp.controller.Detail", {
		formatter: formatter,
		types: types,
		onInit: function() {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("detail").attachPatternMatched(this._onDetailMatched, this);
			var oModel = new sap.ui.model.json.JSONModel({
				buttonPrev: false,
				buttonNext: false
			});
			this.getView().setModel(oModel, "viewModel");
		},

		_onDetailMatched: function(oEvent) {
			this.sObjectID = oEvent.getParameter("arguments").ID;
			var sObjectPath =
				"/Suppliers/" + oEvent.getParameter("arguments").ID;
			var oView = this.getView();
			oView.bindElement(sObjectPath);
			// this._createProductsAggregation();
			this._updateViewModel();
		},

		/**
		 * Updatestheviewmodelaccording towhetherthereareprevious
		 * and/ornextsuppliers.
		 *
		 * @function
		 * @param{string}sObjectIDpath tothecurrentsupplierobject
		 * @private
		 */

		_updateViewModel: function() {
			//find outifthereisanextobjectintheline:
			var oModel = this.getView().getModel();
			var oViewModel = this.getView().getModel("viewModel");
			var nextObjectId = parseInt(this.sObjectID) + 1;
			var prevObjectId = parseInt(this.sObjectID) - 1;
			// checkifthereisanextobjectbyadding+1tothesupplierID
			//we assumewegetafieldwecan safely orderfromtheserver
			var bNext = !!oModel.getProperty("/Suppliers/" + nextObjectId);
			var bPrev = !!oModel.getProperty("/Suppliers/" + prevObjectId);
			oViewModel.setProperty("/buttonNext", bNext);
			oViewModel.setProperty("/buttonPrev", bPrev);

		},

		/**
		 * Creates the line items for the products table using a factory.
		 *
		 * @function
		 * @private
		 */
		/*	_createProductsAggregation: function() {
				var oTable = this.getView().byId("table");

				oTable.bindAggregation("items", "Products", function(sId, oContext) {
					var sAllergenics = oContext.getProperty("Allergenics");
					var oColumnListItem = new sap.m.ColumnListItem(sId);
					oColumnListItem.addCell(new sap.m.ObjectIdentifier({
						text: "{ID}"
					}));

					if (sAllergenics) {
						// we have found allergenics, so we provide a VerticalLayout instead
						// of just displaying the product name. The VerticalLayout then takes
						// the product name plus the allergenics into its own content aggregation
						oColumnListItem.addCell(new VerticalLayout({
							content: [
								new sap.m.Text({
									text: "{Name}"
								}),
								new sap.m.Text({
									text: "{Allergenics}"
								})
							]
						}));
					} else {
						// no allergenics there, we display the name as usual
						oColumnListItem.addCell(new sap.m.ObjectIdentifier({
							text: "{Name}"
						}));
					}

					oColumnListItem.addCell(new sap.m.ObjectNumber({
						number: "{Price}",
						unit: "USD"
					}));
					return oColumnListItem;
				});
			},*/

		onPageUp: function(oEvent) {
			var sID = oEvent.getSource().getBindingContext().sPath;
			sID = parseInt(sID.substr(sID.lastIndexOf("/") + 1));
			sID = sID - 1;
			sap.ui.core.UIComponent.getRouterFor(this).navTo("detail", {
				ID: sID
			});
		},
		onPageDown: function(oEvent) {
			var sID = oEvent.getSource().getBindingContext().sPath;
			sID = parseInt(sID.substr(sID.lastIndexOf("/") + 1));
			sID += 1;
			
			sap.ui.core.UIComponent.getRouterFor(this).navTo("detail", {
				ID: sID
			});
		},

		onNavPress: function() {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				// historycontainsapreviousentry
				window.history.go(-1);
			} else {
				this._oRouter.navTo("master");
			}
		},

		/* ======================================================= */
		/* formatters*/
		/* ======================================================= */
		/**
		 * Formatsagivenstringtouppercase.
		 *
		 * @function
		 * @param{string}sNamestringtobeformatted
		 * @public
		 */

		toUpperCase: function(sName) {
			return sName && sName.toUpperCase();
		}

	});
});