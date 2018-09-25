/*eslint-disable no-console, no-alert */
sap.ui.jsview("ClinicalTrials.ClinicalTrials.view.CTL1", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf controller.CT
	 */
	getControllerName: function () {
		return "ClinicalTrials.ClinicalTrials.controller.CTL1";
	},
	
	createContent: function (oController) {

		var app = new sap.m.App("L1");

		var oVBI = new sap.ui.vbm.GeoMap('vbi', {
			vos: [
				new sap.ui.vbm.Spots("spotsFD", {
					// bind to an array in the model
					items: {
						path : "/modelData/0/Spots",
						template: new sap.ui.vbm.Spot(  { text: "{value}", position: "{pos}", text: "{tooltip}", type: sap.ui.vbm.SemanticType.Success}  )
					}
				}),
			]
		});

		var oMapConfig = {
            "MapProvider": [{
                "type": "",
                "name": "HEREMAPS",
                "description": "",
                "tileX": "256",
                "tileY": "256",
                "maxLOD": "20",
                "copyright": "Tiles Courtesy of HERE Maps",
                "Source": [{
                    "id": "s1",
                    "url": "https://1.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/{LOD}/{X}/{Y}/256/png8?app_id=iQA4VQrg3Pts1thv0MbD&app_code=MjsII_3Xaha17fKFj_kX4w"
                }, {
                    "id": "s2",
                    "url": "https://2.base.maps.cit.api.here.com/maptile/2.1/maptile/newest/normal.day/{LOD}/{X}/{Y}/256/png8?app_id=iQA4VQrg3Pts1thv0MbD&app_code=MjsII_3Xaha17fKFj_kX4w"
                }]
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

		var sf = new sap.m.SearchField({
            placeholder: "Search",
            showRefreshButton: true,
            liveChange: Search,
            search: Search,
            tooltip: "Search for info..",
        });

        function Search(evt) {
            var searchValue = evt.oSource.mProperties.value;

            var filters = new Array();
            var filter1 = new sap.ui.model.Filter("title", sap.ui.model.FilterOperator.Contains, searchValue);
            var filter2 = new sap.ui.model.Filter("nct_id", sap.ui.model.FilterOperator.Contains, searchValue);

            var oCombinedOr = new sap.ui.model.Filter([filter1, filter2]);
            filters.push(oCombinedOr);

            //get list created in view
            this.oList = sap.ui.getCore().byId("polist");
            this.oList.getBinding("items").filter(filters);
        }

		var oListTemplate = new sap.m.ObjectListItem({
            type: "Active",
            title: "{title}",
            //icon: "sap-icon://goal",
			/*
			icon:{
				path: "eligibility/gender",
				formatter: function(subject){
					if(subject == 'All')
						return "sap-icon://icon-gender-male-and-female";
					if(subject == 'Male')
						return "sap-icon://BusinessSuiteInAppSymbols/icon-male";

					if(subject == 'Female')
						return "sap-icon://BusinessSuiteInAppSymbols/icon-female";

					console.log(subject);					
				}
			},
			*/
            intro: "{nct_id}",
            //number: "{condition_summary}",
            //numberUnit: "{condition_summary}",
			attributes: [
				new sap.m.ObjectAttribute({text: "{eligibility/gender} | {eligibility/minimum_age}"}),
				new sap.m.ObjectAttribute({text: "{last_update_submitted}"})
			],
			firstStatus: new sap.m.ObjectStatus({text: "{condition_summary}", state: "Success"}),
			secondStatus: new sap.m.ObjectStatus({text: "{status/_} | {status/open}", state: "Success"}),
			/*
			markers: [
				new sap.m.ObjectMarker({type: sap.m.ObjectMarkerType.Favorite}),
				new sap.m.ObjectMarker({type: sap.m.ObjectMarkerType.Flagged}),
				new sap.m.ObjectMarker({type: sap.m.ObjectMarkerType.Draft})
			],
			*/
            press: handleOnPress
        });

		var oList = new sap.m.List("polist",{
			growing : true,
			//headerText : "Growing List",
			inset : false,
			//footerText : "List Footer",
			growingThreshold : 5,
			//mode : sap.m.ListMode.Delete,
			growingTriggerText : "",
			showNoData: true,
			scrollToLoad: false
		});

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

		function handleOnPress(oEvent) {
            var data = {};
            data.context = oEvent.getSource().getBindingContext();
            var selectedIndex = data.context.sPath.split("/")[4];

            var nct_id = data.context.oModel.oData.modelData[0].results[selectedIndex].nct_id;
            wasteTime();

            var position = '';

            oModel = new sap.ui.model.json.JSONModel();
            $.ajax({
                type: 'GET',
                async: true,
                cache: true,
                url: "/nodejs?q=2&nctid=" + nct_id,
                //url: "/nodejs?q=2&nctid=NCT01689584",
                //url: "http://10.44.136.115/nodejs?q=2&nctid=" + nct_id,

                success: function(data) {
                    if (data.results.length > 0) {
                        runNext();
                        console.log(data);

                        runNext();

                        var url = data.results[0].url;
                        var brief_title = data.results[0].brief_title;
                        var official_title = data.results[0].official_title;
                        var country = data.results[0].country;
                        var detailed_description = data.results[0].detailed_description;
                        var last_update_submitted = data.results[0].last_update_submitted;
                        var last_name = data.results[0].last_name;
                        var phone = data.results[0].phone;
                        var email = data.results[0].email;
                        var eligibility = data.results[0].eligibility;
                        var position = data.Spots[0].pos;
                        var Spots = data.Spots;


                        console.log(position);

                        var obj = [{
                            nct_id: nct_id,
                            url: url,
                            brief_title: brief_title,
                            official_title: official_title,
                            country: country,
                            //state: state,
                            detailed_description: detailed_description,
                            last_update_submitted: last_update_submitted,
                            last_name: last_name,
                            phone: phone,
                            email: email,
                            eligibility: eligibility,
                            position: position,
                            Spots: Spots
                        }];
                        console.log(obj);

                        oModel.setData({
                            modelData1: obj
                        });
                        oController.onNavButtonTo();

                    } else {
                        jQuery.sap.require("sap.m.MessageBox");
                        sap.m.MessageBox.show(jQuery.sap.resources({
                            url: "i18n/i18n.properties"
                        }).getText("NO_INFO"), {
                            icon: sap.m.MessageBox.Icon.INFORMATION,
                            title: "{i18n>WELCOME_TITLE}",
                            actions: sap.m.MessageBox.Action.OK,
                            onClose: null,
                            //styleClass: ""                        
                        });
                    }

                },
                error: function(jqXHR, textStatus, errorThrown) {
                    runNext();
                    if (errorThrown == '')
                        errorThrown = 'Cannot connect to the backend';
                    jQuery.sap.require("sap.m.MessageBox");
                    sap.m.MessageBox.show(errorThrown, {
                        icon: sap.m.MessageBox.Icon.INFORMATION,
                        title: "{i18n>WELCOME_TITLE}",
                        actions: sap.m.MessageBox.Action.OK,
                        onClose: null,
                        //styleClass: ""                        
                    });
                }
            });
        }

        function createListFromModel(oListContainer, modelPath, id) {
            if (oListContainer.hasModel() == false) {
                console.log(oListContainer + " Error");
                return;
            }
            oList.setModel(oModel);

            var oModelPath = new sap.ui.model.json.JSONModel(oModel);
            sap.ui.getCore().setModel(oModelPath, "pathmodel");

            oListContainer.bindAggregation("items", "/modelData/0/results", oListTemplate);
        }

		
        this.addEventDelegate({
            onBeforeShow: function(evt) {
                createListFromModel(oList, "/modelData/0/results", evt.data.context);
                //console.log(oModel.oData.modelData[0].length);
                               
				console.log(oModel);
				//oSpotsCollection.setModel(oModel);
				oVBI.setModel(oModel);

				if(oModel.oData.modelData[0].Spots.hasOwnProperty('0')) {
				    oVBI.setCenterPosition(oModel.oData.modelData[0].Spots[0].pos);
                }
            }
        }, this);

        var oPage = new sap.m.Page({
            showNavButton: true,
            enableScrolling: true,
            navButtonPress: [oController.doNavBack, oController],
            customHeader: new sap.m.Bar({
                contentLeft: [new sap.m.Button("BackButtonD", {
                    icon: "sap-icon://nav-back",
                    text: "Back",
                    tap: function() {
                        oController.doNavBack();
                    }
                })],
                contentMiddle: [new sap.m.Label("titleD", {
                    text: "Clinical Trials",
                    design: "Bold"
                })]
            })
        });

       
        
		//oSpotsCollection.setModel(sap.ui.getCore().getModel('oSpotsModelFD'));
        oVBI.setMapConfiguration(oMapConfig);
		//oVBI.setCenterPosition('0;0');
		oVBI.setZoomlevel(2);
		oVBI.setWidth('100%');
		oVBI.setHeight('40%');
		//oVBI.addVo(oSpotsCollection);

        oPage.addContent(oVBI);
        oPage.addContent(sf);
        oPage.addContent(oList);
        app.addPage(oPage);
        return app;
	}
	
});