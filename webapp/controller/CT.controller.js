/*eslint-disable no-console, no-alert */
sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ClinicalTrials.ClinicalTrials.controller.CT", {
		onInit: function() {
			/*this below code for get the JSON Model form Manifest.json file*/
			var oModelCountry = this.getOwnerComponent().getModel("CountryModel");
			sap.ui.getCore().byId("selectCountryAS").setModel(oModelCountry);
			
			var oModelState = this.getOwnerComponent().getModel("StateModel");
			sap.ui.getCore().byId("selectStateAS").setModel(oModelState);
			
			var oModelDistance = this.getOwnerComponent().getModel("DistanceModel");
			sap.ui.getCore().byId("selectDistanceAS").setModel(oModelDistance);
		
			var oModelCondition = this.getOwnerComponent().getModel("ConditionModel");
			sap.ui.getCore().byId("selectConditionAS").setModel(oModelCondition);
			
			var oModelGender = this.getOwnerComponent().getModel("GenderModel");
			sap.ui.getCore().byId("selectGenderAS").setModel(oModelGender);
			
			var oModelAge = this.getOwnerComponent().getModel("AgeModel");
			sap.ui.getCore().byId("selectAgeAS").setModel(oModelAge);
			
			var oModelTrialStatus = this.getOwnerComponent().getModel("TrialStatusModel");
			sap.ui.getCore().byId("selectTrialStatusAS").setModel(oModelTrialStatus);
		},
		
		onNavButtonTo: function (evt) {
		 	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("list", {
			});
		}
	});
});