/* graphane - 0.1.0-alpha.3 */ function M(t){return(t-90)*Math.PI/180}function f(t,$,n,c){let e=M(c);return{x:t+n*Math.cos(e),y:$+n*Math.sin(e)}}function u(t,$,n,c,e,l=1){let r=f(t,$,n,c),o=f(t,$,n,e),a=e-c<=180?"0":"1";return`M${r.x},${r.y}A${n},${n},0,${a},${l},${o.x},${o.y}`}function y(t,$,n,c,e,l){let r=f(t,$,n,l),o=f(t,$,n,e),a=f(t,$,n-c,e),x=f(t,$,n-c,l),s=l-e<=180?"0":"1";return`M${r.x},${r.y}A${n},${n},0,${s},0,${o.x},${o.y}L${a.x},${a.y}A${n-c},${n-c},0,${s},1,${x.x},${x.y}Z`}function g(t,$,n,c,e=0){let l=360/c,r="";for(let o=0;o<c;o++){let a=f(t,$,n,l*o+e);r+=`${o?"L":"M"}${a.x},${a.y}`}return r+="Z",r}function i(t,$,n,c,e,l=0){let r=360/e,o="";for(let a=0;a<e;a++){let x=f(t,$,n,r*a+l);o+=`${a?"L":"M"}${x.x},${x.y}`;let s=f(t,$,c,r*a+l+r/2);o+=`L${s.x},${s.y}`}return o+="Z",o}function L(t,$,n){return`M${t-n},${$}a${n},${n},0,1,0,${n*2},0a${n},${n},0,1,0,-${n*2},0`}function P(t){t.extendConstructor({polar2cartesian:f,degrees2radians:M}),t.extendPath({arc:u,barArc:y,regularPolygon:g,star:i,circle:L})}export{P as svgPlugin}; //# sourceMappingURL=gsvg.shapes.js.map