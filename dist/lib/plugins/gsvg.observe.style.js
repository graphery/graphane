/* graphane - 0.1.0-alpha.1 */ (()=>{var i=0,y=0,r=new Map,d=!1;function b(l,s=()=>{}){let n=this.el;typeof l=="string"&&(l=[l]);let e;r.has(n)?e=r.get(n):(e={computedStyles:getComputedStyle(n),styles:{},keys:[]},r.set(n,e));for(let t of l)e.styles[t]||(e.styles[t]={lastValue:e.computedStyles[t],callbacks:new Set},e.keys.push(t)),e.styles[t].callbacks.add(s);return c(),this}function c(l){if(!d||l-y<100){d=!0,i=window.requestAnimationFrame(c);return}if(!l)return;y=l;let s=null;for(let[n,e]of r.entries()){for(let t of e.keys){let a=e.computedStyles.getPropertyValue(t),o=e.styles[t].lastValue;if(a!==o){s||(s=new Map);for(let u of e.styles[t].callbacks)s.has(u)?s.get(u)[t]={current:a,last:o}:s.set(u,{[t]:{current:a,last:o}});e.styles[t].lastValue=a}}if(s){for(let[t,a]of s.entries())t.call(n,a);s=null}}i=window.requestAnimationFrame(c)}function f(l){l.extendInstance({styleObserver:b})}gSVG&&gSVG.install(f);})(); //# sourceMappingURL=gsvg.observe.style.js.map