/* graphane - 1.0.0 */ (()=>{var m=n=>Math.round(n*1e4)/1e4;function f(n){return(n-90)*Math.PI/180}function c(n,e,i,t){let o=f(t);return{x:m(n+i*Math.cos(o)),y:m(e+i*Math.sin(o))}}function u(n,e,i,t,o=0){o=Math.abs(o)>=360?o%360:o,t=Math.abs(t)>360?t%360:t,t=Math.abs(t)===360?t>0?359.9:-359.9:t;let l=o+t,a=t>0?1:0,s=Math.abs(l-o)<=180?0:1,M=o<0?(360+o)%360:o,b=l<0?(360+l)%360:l,r=c(n,e,i,M),$=c(n,e,i,b);return`M${r.x},${r.y}A${i},${i},0,${s},${a},${$.x},${$.y}`}function d(n,e,i,t,o,l=0){let a=u(n,e,i+t/2,o,l),s=u(n,e,i-t/2,-o,l+o);return a+"L"+s.substring(1)+"Z"}function x(n,e,i,t,o=0){return`${u(n,e,i,t,o)}L${n},${e}Z`}function P(n){n.extendConstructor({polar2cartesian:c,degrees2radians:f}),n.extendComposer&&n.extendComposer({polar2cartesian:c,degrees2radians:f}),n.extendPath({arc:u,barArc:d,circleSlice:x})}var h=P;globalThis.gSVG&&globalThis.gSVG.install(h);customElements.whenDefined("g-composer").then(n=>{n.install(h)});})();