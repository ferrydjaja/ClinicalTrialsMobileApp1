sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ClinicalTrials.ClinicalTrials.controller.Detail", {

		onInit: function() {
			var oView = this.getView();
			this.getView().addEventDelegate({
				onBeforeShow: function(evt) {
					oView.setModel(oModel);
					oView.bindElement("/modelData1/0");

					// create model and set the data
					oView.setModel(oModel);
					console.log(oModel);
					this.oVBI = oView.byId("vbi");

					var conf = {
						"MapProvider": [{
							"type": "",
							"name": "BING",
							"description": "Bing",
							"tileX": "256",
							"tileY": "256",
							"minLOD": "0",
							"maxLOD": "19",
							"copyright": "Microsoft Corp.",
							"Source": [{
								"id": "1",
								"url": "http://ecn.t0.tiles.virtualearth.net/tiles/r{QUAD}?g=685&&shading=hill"
							}]
						}],
						"MapLayerStacks": [{
							"name": "Default",
							"MapLayer": [{
								"name": "layer1",
								"refMapProvider": "BING",
								"opacity": "1.0",
								"colBkgnd": "RGB(255,255,255)"
							}]
						}]
					};

					var oMapConfig = {
					  "MapProvider": [{
						"type": "",
						"name": "HEREMAPS",
						"description": "",
						"tileX": "256",
						"tileY": "256",
						"maxLOD": "20",
						"copyright": "Tiles Courtesy of HERE Maps",
						"Source": [
							{
							"id": "s1",
							"url": "https://1.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/{LOD}/{X}/{Y}/256/png8?app_id=iQA4VQrg3Pts1thv0MbD&app_code=MjsII_3Xaha17fKFj_kX4w"
						  }, {
							"id": "s2",
							"url": "https://2.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/{LOD}/{X}/{Y}/256/png8?app_id=iQA4VQrg3Pts1thv0MbD&app_code=MjsII_3Xaha17fKFj_kX4w"
						  }
							]
						}],
						"MapLayerStacks": [{
							"name": "Default",
							"MapLayer": [{
								"name": "layer1",
								"refMapProvider": "HEREMAPS",
								"opacity": "1.0",
								"colBkgnd": "RGB(255,255,255)"
							}]
						}]
					};

					this.oVBI.setMapConfiguration(oMapConfig);
				}
			});

		},
		
		doNavBack: function() {
			var busyDialog = (busyDialog) ? busyDialog : new sap.m.BusyDialog({
				text: '{i18n>MSG0}',
				title: '{i18n>MSG1}'
			});

			function wasteTime() {
				busyDialog.open();
			}

			function runNext() {
				busyDialog.close();
			}

			wasteTime();

			oModel = new sap.ui.model.json.JSONModel(sap.ui.getCore().getModel('pathmodel').oData.oData);
			oModel.setSizeLimit(999999);
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("list", {
			});

			runNext();
		},
	});
});