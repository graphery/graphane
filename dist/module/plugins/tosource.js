/* graphane - 0.1.0-alpha.12 */ function t(){return new XMLSerializer().serializeToString(this.el).replaceAll("<!-- ref -->","")}function n(e){e.extendInstance({toSource:t})}var l=n;export{l as default};