/* graphane - 1.0.0-beta.8 */ function t(){return new XMLSerializer().serializeToString(this.el).replaceAll("<!-- ref -->","")}function n(e){e.extendInstance({toSource:t})}var l=n;export{l as default};