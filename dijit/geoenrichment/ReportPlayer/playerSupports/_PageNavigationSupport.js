// COPYRIGHT © 2017 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.22/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/on","dojo/keys","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/string","../PlayerSelect","esri/dijit/geoenrichment/utils/DomUtil","esri/dijit/geoenrichment/utils/MouseUtil","dojo/i18n!../../../../nls/jsapi"],function(e,t,i,a,n,r,o,s,g,h,d){return d=d.geoenrichment.dijit.ReportPlayer.ReportPlayer,e(null,{_currentPageIndex:null,pageSelect:null,postCreate:function(){this.inherited(arguments),this._initPageNavigationControls()},_initPageNavigationControls:function(){var e=this;t(this.prevPageButton,"click",function(){e._showPrevPage()}),t(this.nextPageButton,"click",function(){e._showNextPage()}),g.hide([this.headerPageNavigator,this.pageSelectDiv]),this.pageSelect=(new this._getPageSelectClass)({onUserChange:function(t){e.showPageAt(t)}}).placeAt(this.pageSelectDiv),this.own(this.pageSelect)},_getPageSelectClass:function(){return s},showPageAt:function(e){this.isSlidesView||(e=Math.max(0,e),e=Math.min(this.getCurrentReportContainer().getNumberOfPages()-1,e),this._currentPageIndex=e,this.getCurrentReportContainer().showPageAt(e),this._updatePageNavigator())},_updatePageNavigator:function(){if(this.getCurrentReportContainer()){if(this.isSlidesView)return void g.hide([this.headerPageNavigator,this.pageSelectDiv]);var e=this.getCurrentReportContainer().getNumberOfPages();g[1==e?"hide":"show"]([this.headerPageNavigator,this.pageSelectDiv]),a[0==this._currentPageIndex?"add":"remove"](this.prevPageButton,"disabled"),a[this._currentPageIndex==e-1?"add":"remove"](this.nextPageButton,"disabled");var t=n.position(this.getCurrentReportContainer().stackContainer);r.set(this.headerPageNavigator,"left",Math.min(t.x+t.w+20,document.body.clientWidth-50)+"px"),r.set(this.headerPageNavigator,"top",Math.max(60,t.y+10)+"px");for(var i=[],s=0;e>s;s++)i.push({label:o.substitute(d.pageIndex,{index:s+1}),value:s});this.pageSelect.update(i,this._currentPageIndex)}},_showPrevPage:function(){0!==this._currentPageIndex&&(this._currentPageIndex--,this.showPageAt(this._currentPageIndex))},_showNextPage:function(){this._currentPageIndex!==this.getCurrentReportContainer().getNumberOfPages()-1&&(this._currentPageIndex++,this.showPageAt(this._currentPageIndex))},resize:function(){return this._updatePageNavigator(),this.inherited(arguments)},_onZoomChanged:function(){this.inherited(arguments),this._updatePageNavigator()}})});