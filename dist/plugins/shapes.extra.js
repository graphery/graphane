/* graphane - 1.0.0-beta.7 */ (()=>{var _=t=>Math.round(t*1e4)/1e4;function d(t){return(t-90)*Math.PI/180}function $(t,o,n,l){return{x:_(t+n*Math.cos(l)),y:_(o+n*Math.sin(l))}}function h(t,o,n,l){let c=d(l);return $(t,o,n,c)}function C(t,o,n,l,c=0){let r=360/l,s="";for(let e=0;e<l;e++){let a=h(t,o,n,r*e+c);s+=`${e?"L":"M"}${a.x},${a.y}`}return s+="Z",s}function D(t,o,n,l,c,r=0){let s=360/c,e="";for(let a=0;a<c;a++){let f=h(t,o,n,s*a+r);e+=`${a?"L":"M"}${f.x},${f.y}`;let u=h(t,o,l,s*a+r+s/2);e+=`L${u.x},${u.y}`}return e+="Z",e}function E(t,o,n){return`M${t-n},${o}a${n},${n},0,1,0,${n*2},0a${n},${n},0,1,0,-${n*2},0`}function I(t,o,n,l,c=0,r=360){let s=(r-c)/10,e=(l-n)/s,a=d(c),u=(d(r)-a)/s,{x:p,y}=h(t,o,n,c),x=`M${p},${y}`;for(let i=1;i<=s;i++){let M=n+i*e,T=a+i*u,{x:m,y:P}=$(t,o,M,T),L=n+(i-.33)*e,b=a+(i-.33)*u,{x:G,y:S}=$(t,o,L,b),V=n+(i-.66)*e,Z=a+(i-.66)*u,{x:v,y:w}=$(t,o,V,Z);x+=`C${G},${S},${v},${w},${m},${P}`}return x}function R(t){t.extendPath({regularPolygon:C,star:D,circle:E,spiral:I})}var g=R;globalThis.gSVG&&globalThis.gSVG.install(g);customElements.whenDefined("g-composer").then(t=>{t.install(g)});})();