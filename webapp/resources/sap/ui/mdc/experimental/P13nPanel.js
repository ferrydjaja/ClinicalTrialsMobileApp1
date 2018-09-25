/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2018 SAP SE. All rights reserved
 */
sap.ui.define(['jquery.sap.global','sap/m/library','sap/ui/core/XMLComposite','./P13nPanelFormatter','sap/ui/model/ChangeReason'],function(q,M,X,P,C){"use strict";var a=X.extend("sap.ui.mdc.experimental.P13nPanel",{formatter:P,metadata:{"abstract":true,library:"sap.ui.mdc",defaultAggregation:"items",aggregations:{items:{type:"sap.ui.mdc.experimental.P13nItem",multiple:true,singularName:"item"}}}});a.prototype.init=function(){this._bInternalModelToBeUpdated=true;this.setModel(new sap.ui.model.resource.ResourceModel({bundleUrl:sap.ui.getCore().getLibraryResourceBundle("sap.m").oUrlInfo.url}),"i18n");};a.prototype.addItem=function(i){this._bInternalModelToBeUpdated=true;this.addAggregation("items",i);return this;};a.prototype.insertItem=function(i,I){this._bInternalModelToBeUpdated=true;this.insertAggregation("items",i,I);return this;};a.prototype.updateItems=function(r){this.updateAggregation("items");if(r===C.Change){this._bInternalModelToBeUpdated=true;}};a.prototype.removeItem=function(i){this._bInternalModelToBeUpdated=true;return this.removeAggregation("items",i);};a.prototype.removeAllItems=function(){this._bInternalModelToBeUpdated=true;return this.removeAllAggregation("items");};a.prototype.destroyItems=function(){this._bInternalModelToBeUpdated=true;this.destroyAggregation("items");return this;};a.prototype.onSearchFieldLiveChange=function(e){this._filterTableItems();};a.prototype._filterTableItems=function(){var f=[];var s=this._getSearchText();if(s){f.push(new sap.ui.model.Filter([new sap.ui.model.Filter("text",sap.ui.model.FilterOperator.Contains,s),new sap.ui.model.Filter("tooltip",sap.ui.model.FilterOperator.Contains,s)],false));}this._getTable().getBinding("items").filter(f);};a.prototype._getTable=function(){return sap.ui.getCore().byId(this.getId()+"--IDTable")||null;};a.prototype._getSearchField=function(){return sap.ui.getCore().byId(this.getId()+"--IDSearchField")||null;};a.prototype._getSearchText=function(){var s=this._getSearchField();return s?s.getValue():"";};a.prototype._isFilteredBySearchText=function(){return!!this._getSearchText().length;};return a;},true);
