/*eslint-disable no-console, no-alert */
sap.ui.jsview("ClinicalTrials.ClinicalTrials.view.CT", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf controller.CT
	 */
	getControllerName: function () {
		return "ClinicalTrials.ClinicalTrials.controller.CT";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away.
	 * @memberOf controller.CT
	 */
	createContent: function (oController) {

		var app = new sap.m.App("L0");

		var initialKey = 0;

		var busyDialog = (busyDialog) ? busyDialog : new sap.m.BusyDialog({text:'{i18n>MSG0}', title: '{i18n>MSG1}'});

		function wasteTime(){
			busyDialog.open();
        }
        
		function runNext(){
			busyDialog.close();
		}
		

		var oFormAS = new sap.ui.layout.form.SimpleForm({
			minWidth        : 1024,
			maxContainerCols: 2,
			editable        : true,
			layout          : "ResponsiveGridLayout",
			//title           : "Date Controls",
			labelSpanL : 3,
			labelSpanM : 3,
			labelSpanS : 3,
			emptySpanL : 2,
			emptySpanM : 2,
			emptySpanS : 2,
			columnsL   : 1,
			columnsM   : 1,		
			columnsS   : 1
		});
		
		var oConditionAS = new sap.m.Label({
			text : "Condition"
		});

		var oConditionTextAS = new sap.m.Input('selectConditionAS', {
			change: function(oEvent) {
				console.log(oEvent.getParameters());
			}.bind(this),
			showSuggestion: true
		});
		oConditionTextAS.setModel(sap.ui.getCore().getModel('oConditionModel'));
		oConditionTextAS.bindAggregation("suggestionItems",{
			path:"/",
			template: new sap.ui.core.Item({
				text:"{desc}",
				key: '{code}'
			})
		});
		
		var oCountryAS = new sap.m.Label({
			text : "Country",
		});
		var oCountryTextAS = new sap.m.Select('selectCountryAS', {
			selectedKey: initialKey,
			change: function(oEvent) {
				console.log(oEvent.getParameters().selectedItem.getKey());
				if(oEvent.getParameters().selectedItem.getKey() != 'US') {
					oStateTextAS.setValue("");
					oStateTextAS.setEnabled(false);
				}
				else {
					oStateTextAS.setValue("");
					oStateTextAS.setEnabled(true);
				}
			 }.bind(this)
		});
		oCountryTextAS.bindItems({
			path: '/',
			 template: new sap.ui.core.Item({
				text: '{country}',
				key: '{code}'
			 })
		});
		
		var oStateAS = new sap.m.Label({
			text : "State",
		});
		var oStateTextAS = new sap.m.Input('selectStateAS', {
			placeholder: "Enter state for U.S country",
			change: function(oEvent) {
				console.log(oEvent.getParameters());
			}.bind(this),
			showSuggestion: true,
		});
		oStateTextAS.bindAggregation("suggestionItems",{
			path:"/",
			template: new sap.ui.core.Item({
				text:"{state}",
				key: '{code}'
			})
		});

		var oCityAS = new sap.m.Label({
			text : "City",
		});
		var oCityTextAS = new sap.m.Input('selectCityAS', {
		});

		var oDistanceAS = new sap.m.Label({
			text : "Distance",
		});
		var oDistanceTextAS = new sap.m.Select('selectDistanceAS', {
			selectedKey: initialKey,
			change: function(oEvent) {
				console.log(oEvent.getParameters().selectedItem.getKey());
			 }.bind(this)
		});
		oDistanceTextAS.bindItems({
			path: '/',
			 template: new sap.ui.core.Item({
				text: '{distance}',
				key: '{code}'
			 })
		});

		var oGenderAS = new sap.m.Label({
			text : "Gender",
		});
		var oGenderTextAS = new sap.m.Select('selectGenderAS', {
			selectedKey: initialKey,
			change: function(oEvent) {
				console.log(oEvent.getParameters().selectedItem.getKey());
			 }.bind(this)
		});
		oGenderTextAS.bindItems({
			path: '/',
			 template: new sap.ui.core.Item({
				text: '{gender}',
				key: '{code}'
			 })
		});

		var oAgeAS = new sap.m.Label({
			text : "Age",
		});
		var oAgeTextAS = new sap.m.Select('selectAgeAS', {
			selectedKey: -1,
			change: function(oEvent) {
				console.log(oEvent.getParameters().selectedItem.getKey());
			 }.bind(this)
		});
		oAgeTextAS.bindItems({
			path: '/',
			 template: new sap.ui.core.Item({
				text: '{age}',
				key: '{code}'
			 })
		});

		var oTrialStatusAS = new sap.m.Label({
			text : "Trial Status",
		});
		var oTrialStatusTextAS = new sap.m.Select('selectTrialStatusAS', {
			selectedKey: initialKey,
			change: function(oEvent) {
				console.log(oEvent.getParameters().selectedItem.getKey());
			 }.bind(this)
		});
		oTrialStatusTextAS.bindItems({
			path: '/',
			 template: new sap.ui.core.Item({
				text: '{trialstatus}',
				key: '{code}'
			 })
		});
		
		oFormAS.addContent(oConditionAS);
		oFormAS.addContent(oConditionTextAS);
		oFormAS.addContent(oCountryAS);
		oFormAS.addContent(oCountryTextAS);
		oFormAS.addContent(oStateAS);
		oFormAS.addContent(oStateTextAS);
		oFormAS.addContent(oCityAS);
		oFormAS.addContent(oCityTextAS);
		oFormAS.addContent(oDistanceAS);
		oFormAS.addContent(oDistanceTextAS);
		oFormAS.addContent(oGenderAS);
		oFormAS.addContent(oGenderTextAS);
		oFormAS.addContent(oAgeAS);
		oFormAS.addContent(oAgeTextAS);
		oFormAS.addContent(oTrialStatusAS);
		oFormAS.addContent(oTrialStatusTextAS);

		
		function getInputToolbarContent () {
			return [
				new sap.m.Button({
		            text : "Search",
		        	press : function(evt){
						//var cond = oConditionTextAS.getSelectedKey().trim();
						var cond = oConditionTextAS.getValue().trim();
						var cntry = oCountryTextAS.getSelectedKey().trim();
						var state = oStateTextAS.getSelectedKey().trim();
						var city = oCityTextAS.getValue().trim();
						var gndr = oGenderTextAS.getSelectedKey().trim();
						var recrs = oTrialStatusTextAS.getSelectedKey().trim();
						var age = oAgeTextAS.getSelectedKey().trim();
						var dist = oDistanceTextAS.getSelectedKey().trim();

						if(cond.length > 0 && cntry.length > 0) {
							console.log(cond + ':' + cntry + ':' + state + ':' + city + ':' + gndr + ':' + recrs + ':' + ':' + age + ':' + dist);
					
							wasteTime();
							
							oModel = new sap.ui.model.json.JSONModel();
							oModel.setData(null);
							oModel.setSizeLimit(999999);

							$.ajax({
								type: 'GET',
								async: true,
								cache: true,
								url: "/nodejs?q=1&cond=" + cond + "&cntry=" + cntry + "&state=" + state +  "&city=" + city + "&recrs=" + recrs + "&gndr=" + gndr + "&age=" + age + "&dist=" + dist,
								success: function (data) {
									console.log(data);

									if(data != '{}') {
										console.log(data.results.length);

										if(data.results.length > 0) {
											runNext();
						
											oModel.setData({
												modelData : [data]
											});

											oController.onNavButtonTo();
										} else {
											runNext();
											jQuery.sap.require("sap.m.MessageBox");
											sap.m.MessageBox.show(jQuery.sap.resources({url : "i18n/i18n.properties"}).getText("NO_INFO"), {
												icon: sap.m.MessageBox.Icon.INFORMATION,      
												title: "{i18n>WELCOME_TITLE}",                             
												actions: sap.m.MessageBox.Action.OK,    
												onClose: null,                         
												//styleClass: ""                        
											});
										}
									} else {
										// No record {}
										runNext();
										jQuery.sap.require("sap.m.MessageBox");
										sap.m.MessageBox.show(jQuery.sap.resources({url : "i18n/i18n.properties"}).getText("NO_INFO"), {
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
									jQuery.sap.require("sap.m.MessageBox");
									sap.m.MessageBox.show("Error", {
										icon: sap.m.MessageBox.Icon.INFORMATION,     
										title: "{i18n>WELCOME_TITLE}",                             
										actions: sap.m.MessageBox.Action.OK,    
										onClose: null,                          
										//styleClass: ""                         
									});
								}
							});
							
						} else {
							jQuery.sap.require("sap.m.MessageBox");
							sap.m.MessageBox.show(jQuery.sap.resources({url : "i18n/i18n.properties"}).getText("VALID_KEYWORD"), {
								icon: sap.m.MessageBox.Icon.INFORMATION,      
								title: "{i18n>WELCOME_TITLE}",                             
								actions: sap.m.MessageBox.Action.OK,    
								onClose: null,                         
								//styleClass: ""                        
							});
						}	
						
		        	}
				})
			];
		}


		var oPage = new sap.m.Page({
			showNavButton: true,
            enableScrolling: true,
            navButtonPress: [oController.doNavBack, oController],
            customHeader: new sap.m.Bar({
                contentMiddle: [new sap.m.Label("title", {
                    text: "Clinical Trials",
                    design: "Bold"
                })]
            }),
            footer : new sap.m.Toolbar({
			  	content : [
			  		new sap.m.ToolbarSpacer(),
			  		getInputToolbarContent()
			  	]
			})
		});


		oPage.addContent(oFormAS);
        app.addPage(oPage);
        return app;


	}

});