/*eslint-disable no-console, no-alert */
sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ClinicalTrials.ClinicalTrials.controller.CTL1", {
		doNavBack: function (evt) {
		 	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("home", {
			});
		},

		onNavButtonTo: function (evt) {
		 	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail", {
			});
		}
	});
});