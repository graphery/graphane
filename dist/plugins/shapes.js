/* graphane - 0.1.0-alpha.6 */ (()=>{var b=n=>Math.round(n*1e4)/1e4;function h(n){return(n-90)*Math.PI/180}function a(n,l,o,e){let t=h(e);return{x:b(n+o*Math.cos(t)),y:b(l+o*Math.sin(t))}}function f(n,l,o,e,t=0){t=Math.abs(t)>=360?t%360:t,e=Math.abs(e)>360?e%360:e,e=Math.abs(e)===360?e>0?359.9:-359.9:e;let i=t+e,$=e>0?1:0,c=Math.abs(i-t)<=180?0:1,u=t<0?(360+t)%360:t,s=i<0?(360+i)%360:i,r=a(n,l,o,u),m=a(n,l,o,s);return`M${r.x},${r.y}A${o},${o},0,${c},${$},${m.x},${m.y}`}function p(n,l,o,e,t,i=0){let $=f(n,l,o+e/2,t,i),c=f(n,l,o-e/2,-t,i+t);return $+"L"+c.substring(1)+"Z"}function x(n,l,o,e,t=0){return f(n,l,o,e,t)+`L${n},${l}Z`}function P(n,l,o,e,t=0){let i=360/e,$="";for(let c=0;c<e;c++){let u=a(n,l,o,i*c+t);$+=`${c?"L":"M"}${u.x},${u.y}`}return $+="Z",$}function g(n,l,o,e,t,i=0){let $=360/t,c="";for(let u=0;u<t;u++){let s=a(n,l,o,$*u+i);c+=`${u?"L":"M"}${s.x},${s.y}`;let r=a(n,l,e,$*u+i+$/2);c+=`L${r.x},${r.y}`}return c+="Z",c}function L(n,l,o){return`M${n-o},${l}a${o},${o},0,1,0,${o*2},0a${o},${o},0,1,0,-${o*2},0`}function d(n){n.extendConstructor({polar2cartesian:a,degrees2radians:h}),n.extendComposer&&n.extendComposer({polar2cartesian:a,degrees2radians:h}),n.extendPath({arc:f,barArc:p,circleSlice:x,regularPolygon:P,star:g,circle:L})}var M=d;globalThis.gSVG&&globalThis.gSVG.install(M);customElements.whenDefined("g-composer").then(n=>{n.install(M)});})();