// COPYRIGHT © 2016 Esri
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
// See http://js.arcgis.com/4.0/esri/copyright.txt for details.

define(["require","exports","./Texture","./Util"],function(t,e,i,r){var n=function(){function t(t,e,i){this._idHint=i,this._text=t,this._textLines=t.split(/\r?\n/),this._params=e||{color:[0,0,0]},this._params.size=this._params.size||18,this._params.font=this._params.font||{family:"Arial"},this._params.font.family=this._params.font.family||"Arial",this._params.font.weight=this._params.font.weight||"normal",this._params.font.style=this._params.font.style||"normal",this._fillStyle="rgb("+this._params.color.map(function(t){return Math.floor(255*t)}).toString()+")"}return t.prototype.getId=function(){return null==this._id&&(this._id=i.idGen.gen(this._idHint)),this._id},t.prototype.getParams=function(){return this._params},t.prototype.getString=function(){return this._text},t.prototype.renderGl=function(t,e){this._createTextTexture(t,e),e._isTracingEnabled&&(t._debugTracingType="TextTexture")},t.prototype.getTextWidth=function(){var t=this._create2DCanvas(),e=t.getContext("2d");this._setTextProperties(e,this._params.size);var i=0;for(var r in this._textLines){var n=e.measureText(this._textLines[r]).width;n>i&&(i=n)}var a=this._params.font;return("italic"===a.style||"oblique"===a.style||"string"==typeof a.weight&&("bold"===a.weight||"bolder"===a.weight)||"number"==typeof a.weight&&a.weight>600)&&(i+=.3*e.measureText("A").width),i},t.prototype.getTextHeight=function(){return this.getLineHeight()*this._textLines.length},t.prototype.getTexcoordScale=function(){if(this._params.enableMipmapping){var t=this.getTextHeight(),e=this.getTextWidth();return[e/r.nextHighestPowerOfTwo(e),t/r.nextHighestPowerOfTwo(t)]}return[1,1]},t.prototype.getLineHeight=function(){return Math.floor(1.2*this._params.size)},t.prototype.setUnloadFunc=function(t){this._unloadFunc=t},t.prototype.unload=function(){this._unloadFunc&&(this._unloadFunc(this._id),this._unloadFunc=null)},t.prototype.renderText=function(t,e,i,r,n,a){void 0===n&&(n=0),void 0===a&&(a=0);var s=this.getLineHeight()*t;this._setTextProperties(r,this._params.size*t);var o="center"===r.textAlign?.5*e:"right"===r.textAlign?e:0;o+=n;var h=0;h+=a;for(var _ in this._textLines)r.fillText(this._textLines[_],o,h),h+=s},t.prototype._create2DCanvas=function(){return null==t._textCanvas2D&&(t._textCanvas2D=document.createElement("canvas"),t._textCanvas2D.setAttribute("id","canvas2d"),t._textCanvas2D.setAttribute("width","1024"),t._textCanvas2D.setAttribute("height","1024"),t._textCanvas2D.setAttribute("style","display:none")),t._textCanvas2D},t.prototype._setTextProperties=function(t,e){t.fillStyle=this._fillStyle;var i=this._params.font,n=i.style+" "+i.weight+" "+e+"px "+i.family;t.font=n,t.textAlign="left",t.textBaseline="top",this._params.canvasStyle&&r.mergeObjects(t,this._params.canvasStyle,t)},t.prototype._createTextTexture=function(e,i){var n=this._create2DCanvas(),a=n.getContext("2d");a.save();var s=this.getTextWidth(),o=this.getTextHeight();this._params.enableMipmapping&&(s=r.nextHighestPowerOfTwo(s),o=r.nextHighestPowerOfTwo(o)),i.bindTexture(i.TEXTURE_2D,e),n.setAttribute("width",s.toString()),n.setAttribute("height",o.toString()),this.renderText(1,s,o,a),i.texImage2D(i.TEXTURE_2D,0,i.RGBA,i.RGBA,i.UNSIGNED_BYTE,n);var h=i.LINEAR;this._params.enableMipmapping&&(i.generateMipmap(i.TEXTURE_2D),t.MIPMAP_CREATE?(t.MIPMAP_CREATE(n,i),h=i.LINEAR_MIPMAP_LINEAR):(this._renderMipmap(i),h=i.LINEAR_MIPMAP_NEAREST)),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,h),i.bindTexture(i.TEXTURE_2D,null),a.restore()},t.prototype._renderMipmap=function(t){var e=this._create2DCanvas(),i=e.getContext("2d"),r=parseInt(e.getAttribute("width"),10)/2,n=parseInt(e.getAttribute("height"),10)/2,a=.5,s=1;do e.setAttribute("width",r.toString()),e.setAttribute("height",n.toString()),this.renderText(a,r,n,i),t.texSubImage2D(t.TEXTURE_2D,s,0,0,t.RGBA,t.UNSIGNED_BYTE,e),a*=.5,r*=.5,n*=.5,s++;while(r>1&&n>1)},t}();return n});