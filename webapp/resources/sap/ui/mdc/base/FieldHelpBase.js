/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2018 SAP SE. All rights reserved
 */
sap.ui.define(['sap/ui/core/Element'],function(E){"use strict";var P;var l;var F=E.extend("sap.ui.mdc.base.FieldHelpBase",{metadata:{library:"sap.ui.mdc",properties:{selectedKey:{type:"string",defaultValue:""},filterValue:{type:"string",defaultValue:""}},aggregations:{_popover:{type:"sap.m.Popover",multiple:false,visibility:"hidden"}},events:{select:{parameters:{value:{type:"any"},additionalValue:{type:"any"},key:{type:"string"}}},navigate:{parameters:{value:{type:"any"},additionalValue:{type:"any"},key:{type:"string"}}},dataUpdate:{},disconnect:{}}}});F.prototype.init=function(){};F.prototype.exit=function(){};F.prototype.setSelectedKey=function(k){this.setProperty("selectedKey",k,true);return this;};F.prototype.setFilterValue=function(f){this.setProperty("filterValue",f,true);return this;};F.prototype.connect=function(f){if(this._oField&&this._oField!==f){var p=this.getAggregation("_popover");if(p){p._oPreviousFocus=null;}this.close();this.setSelectedKey("");this.setFilterValue("");this.fireDisconnect();}this._oField=f;return this;};F.prototype._getField=function(){if(this._oField){return this._oField;}else{return this.getParent();}};F.prototype.open=function(){var f=this._getField();if(f){var p=this._getPopover();if(p){if(!p.isOpen()){var w=f.$().outerWidth();p.setContentMinWidth(w+"px");p.openBy(f);}}else{this._bOpen=true;}}else{jQuery.sap.log.warning("FieldHelp not assigned to field -> can not be opened.",this);}};F.prototype.close=function(){var p=this.getAggregation("_popover");if(p){this._bClosing=true;p.close();}this._bReopen=false;};F.prototype.toggleOpen=function(){var p=this._getPopover();if(p){if(p.isOpen()){var e=p.oPopup.getOpenState();if(e!=="CLOSED"&&e!=="CLOSING"){this.close();}else{this._bReopen=true;}}else{this.open();}}else{this._bOpen=!this._bOpen;}};F.prototype._createPopover=function(){var p;if((!P||!l)&&!this._bPopoverRequested){P=sap.ui.require("sap/m/Popover");l=sap.ui.require("sap/m/library");if(!P||!l){sap.ui.require(["sap/m/Popover","sap/m/library"],_.bind(this));this._bPopoverRequested=true;}}if(P&&l&&!this._bPopoverRequested){p=new P(this.getId()+"-pop",{placement:l.PlacementType.Bottom,showHeader:false,showArrow:false,afterOpen:this._handleAfterOpen.bind(this),afterClose:this._handleAfterClose.bind(this)});this.setAggregation("_popover",p,true);if(this._oContent){this._setContent(this._oContent);}}return p;};function _(p,L){P=p;l=L;this._bPopoverRequested=false;if(!this._bIsBeingDestroyed){this._createPopover();if(this._bOpen){this.open();delete this._bOpen;}}}F.prototype._getPopover=function(){var p=this.getAggregation("_popover");if(!p){p=this._createPopover();}return p;};F.prototype._handleAfterOpen=function(e){};F.prototype._handleAfterClose=function(e){this._bClosing=false;if(this._bReopen){this._bReopen=false;this.open();}};F.prototype.openByTyping=function(){return false;};F.prototype.navigate=function(s){};F.prototype.getTextForKey=function(k){return"";};F.prototype.getKeyForText=function(t){return"";};F.prototype._setContent=function(c){var p=this.getAggregation("_popover");if(p){p.removeAllContent();p.addContent(c);this._oContent=undefined;}else{this._oContent=c;}return this;};return F;},true);
