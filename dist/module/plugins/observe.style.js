/* graphane - 1.0.0-beta.4 */ var f=0,i=0,r=new Map,y=!1;function d(l,s=()=>{}){let n=this.el;typeof l=="string"&&(l=[l]);let e;r.has(n)?e=r.get(n):(e={computedStyles:getComputedStyle(n),styles:{},keys:[]},r.set(n,e));for(let t of l)e.styles[t]||(e.styles[t]={lastValue:e.computedStyles[t],callbacks:new Set},e.keys.push(t)),e.styles[t].callbacks.add(s);return u(),this}function u(l){if(!y||l-i<100){y=!0,f=window.requestAnimationFrame(u);return}if(!l)return;i=l;let s=null;for(let[n,e]of r.entries()){for(let t of e.keys){let a=e.computedStyles.getPropertyValue(t),o=e.styles[t].lastValue;if(a!==o){s||(s=new Map);for(let c of e.styles[t].callbacks)s.has(c)?s.get(c)[t]={current:a,last:o}:s.set(c,{[t]:{current:a,last:o}});e.styles[t].lastValue=a}}if(s){for(let[t,a]of s.entries())t.call(n,a);s=null}}f=window.requestAnimationFrame(u)}function b(l){l.extendInstance({styleObserver:d})}var k=b;export{k as default};