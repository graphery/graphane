/* graphane - 1.0.0-beta.4 */ var x=n=>Math.round(n*1e4)/1e4;function h(n){return(n-90)*Math.PI/180}function a(n,c,o,e){let t=h(e);return{x:x(n+o*Math.cos(t)),y:x(c+o*Math.sin(t))}}function M(n,c,o,e,t=0){t=Math.abs(t)>=360?t%360:t,e=Math.abs(e)>360?e%360:e,e=Math.abs(e)===360?e>0?359.9:-359.9:e;let $=t+e,l=e>0?1:0,i=Math.abs($-t)<=180?0:1,u=t<0?(360+t)%360:t,f=$<0?(360+$)%360:$,r=a(n,c,o,u),s=a(n,c,o,f);return`M${r.x},${r.y}A${o},${o},0,${i},${l},${s.x},${s.y}`}function b(n,c,o,e,t,$=0){let l=M(n,c,o+e/2,t,$),i=M(n,c,o-e/2,-t,$+t);return l+"L"+i.substring(1)+"Z"}function p(n,c,o,e,t=0){return M(n,c,o,e,t)+`L${n},${c}Z`}function L(n,c,o,e,t=0){let $=360/e,l="";for(let i=0;i<e;i++){let u=a(n,c,o,$*i+t);l+=`${i?"L":"M"}${u.x},${u.y}`}return l+="Z",l}function P(n,c,o,e,t,$=0){let l=360/t,i="";for(let u=0;u<t;u++){let f=a(n,c,o,l*u+$);i+=`${u?"L":"M"}${f.x},${f.y}`;let r=a(n,c,e,l*u+$+l/2);i+=`L${r.x},${r.y}`}return i+="Z",i}function m(n,c,o){return`M${n-o},${c}a${o},${o},0,1,0,${o*2},0a${o},${o},0,1,0,-${o*2},0`}function Z(n){n.extendConstructor({polar2cartesian:a,degrees2radians:h}),n.extendComposer&&n.extendComposer({polar2cartesian:a,degrees2radians:h}),n.extendPath({arc:M,barArc:b,circleSlice:p,regularPolygon:L,star:P,circle:m})}var d=Z;export{d as default};