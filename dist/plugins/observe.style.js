/* graphane - 1.0.0 */ (()=>{var f=0,y=0,o=new Map,d=!1;function m(l,s=()=>{}){let n=this.el;typeof l=="string"&&(l=[l]);let e;o.has(n)?e=o.get(n):(e={computedStyles:getComputedStyle(n),styles:{},keys:[]},o.set(n,e));for(let t of l)e.styles[t]||(e.styles[t]={lastValue:e.computedStyles[t],callbacks:new Set},e.keys.push(t)),e.styles[t].callbacks.add(s);return u(),this}function u(l){if(!d||l-y<100){d=!0,f=window.requestAnimationFrame(u);return}if(!l)return;y=l;let s=null;for(let[n,e]of o.entries()){for(let t of e.keys){let a=e.computedStyles.getPropertyValue(t),r=e.styles[t].lastValue;if(a!==r){s||(s=new Map);for(let c of e.styles[t].callbacks)s.has(c)?s.get(c)[t]={current:a,last:r}:s.set(c,{[t]:{current:a,last:r}});e.styles[t].lastValue=a}}if(s){for(let[t,a]of s.entries())t.call(n,a);s=null}}f=window.requestAnimationFrame(u)}function b(l){l.extendInstance({styleObserver:m})}var i=b;globalThis.gSVG&&globalThis.gSVG.install(i);customElements.whenDefined("g-composer").then(l=>{l.install(i)});})();