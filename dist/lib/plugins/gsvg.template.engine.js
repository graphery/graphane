/* graphane - 0.1.0-alpha.3 */ var lt="function",K="undefined",F="object",pt="string",Q="array",D="number";var x=t=>typeof t===F,T=t=>typeof t===pt,L=t=>typeof t===lt,G=t=>typeof t===D&&!isNaN(t),k=t=>typeof t===K;var A=t=>Array.isArray(t);var V=new Map;function z(t,e){let n=`${t.join(",")} ${e}`;if(V.has(n))return V.get(n);let i=new Function(...t,e);return V.set(n,i),i}function mt(t){return t===null?null:t.constructor?new t.constructor:{}}function Y(t){if(!x(t))return t;let e=t===null?null:Object.assign(mt(t),t);for(let n in e)x(e[n])&&(e[n]=Y(e[n]));return e}function q(t,e){let n=t,i=T(e)?e.split("."):e;for(let a=0;a<i.length;a++){if(k(n[i[a]]))return;n=n[i[a]]}return n}var Z=Symbol(),J=Symbol();function dt(t,e){return e===Z?t:q(t,e)}function W(t){let e={};function n(s,f,w,_){return e[s]||(e[s]={}),(S=void 0,$=Z)=>{if(T(S)||k(S)){if($=S||Z,$ in e[s])return e[s][$]}else t=S;let y=t.reduce((E,r)=>{let c=dt(r,$);return typeof c>"u"?E:E===J?c:w(E,c)},f);return y=typeof _=="function"?_(y):y,t!==S&&(e[s][$]=y),y}}let i=n("min",J,(s,f)=>f>s?s:f),a=n("max",J,(s,f)=>f<s?s:f),u=n("count",0,s=>s+1),l=n("sum",0,(s,f)=>f+s),o=n("avg",{n:0,i:0},(s,f)=>(s.n++,s.i+=Number(f),s),s=>s.i/s.n),m=n("distinct",new Set,(s,f)=>(s.add(f),s),s=>[...s]);return{min:i,max:a,sum:l,count:u,avg:o,distinct:m}}var j="SVG",X="animate",ht="none",$t="freeze",yt="path",tt="d",Nt="transform",it="rotate",b="translate",gt="offset",et="inherit",nt="finished",xt=[it,"skewX","skewY"],St="deg",I="px",rt="ms",Et=["width","height"],v=!1;if(window.matchMedia){let t=window.matchMedia("(prefers-reduced-motion: reduce)");v=t.matches,t.addEventListener("change",()=>{v=t.matches})}var Tt=t=>t.replace(/([A-Z])/g,"-$1").toLowerCase();function At(t,e={duration:200},n=null,i=null){let a=this.gSVG,u=r=>{let c=x(r)?Object.assign({},r):{duration:r};return v&&(c.duration=0),c.fill=ht,c},l=r=>{r=A(r)?r:[r];let c=window.getComputedStyle(this._el),p=[],d=new Set;for(let g of r){let N=Object.assign({},g);for(let h in N)!(h in c)||Et.includes(h)?d.add(h):h===tt?N.d=`${yt}("${N.d}")`:h===Nt&&(N.transform=s(N.transform));p.push(N)}return m(d,p),p},o=[],m=(r,c)=>{if(r.size){let p=new KeyframeEffect(null,c).getKeyframes(),d=this.closest(j)?this.closest(j).getCurrentTime()*1e3:0;for(let g of r){let N=a(X).attributeName(g).dur($.duration+rt).begin((0|d+(e.delay||0))+rt).fill($t);if(c.length===1)N.to(c[0][g]);else{let h=[],M=[];for(let B in p){let at=p[B];g in c[B]&&(h.push(at.computedOffset),M.push(c[B][g]))}h[0]!==0&&(h.unshift(0),M.unshift(this[g]()||et)),h[h.length-1]!==1&&(h.push(1),M.push(this[g]()||et)),N.keyTimes(h.join(";")).values(M.join(";"))}o.push(N),N.attachTo(this)}}},s=r=>{T(r)&&(r=JSON.parse("{"+r.replace(/\s*\(\s*/g,":[").replace(/\s*\)\s*/g,"],").split(/\s*,\s*|\s.*/).join(",").replace(/(\w+):/g,'"$1":').replace(/,$/,"")+"}"));let c="";for(let p in r)if(p===it){let d=f(r[p]);d.length>1&&(c+=`${b}(${d[1]}${I},${d[2]}${I}) `),c+=`${p}(${d[0]}${w(p)}) `,d.length>1&&(c+=`${b}(-${d[1]}${I},-${d[2]}${I}) `)}else c+=`${p}(${f(r[p]).map(d=>d+w(p)).join(",")}) `;return c},f=r=>A(r)?r:String(r).split(/\s+|,/),w=r=>xt.includes(r)?St:r===b?I:"",_=r=>T(r)?r.replace(/(deg)|(px)/g,"").trim():r,S=r=>r.replace(/(path\s*\(\s*["'])|(["']\s*\)\s*$)/g,"").trim().replace(/([a-zA-Z])\s*/g,"$1").replace(/\s+/g,","),$=u(e),y=l(t),E=this._el.animate(y,$);return E.ready.then(()=>L(n)&&n.call(this,E)),E.finished.then(()=>{let r=y[y.length-1];for(let c in r){let p=Tt(c);/^text-/.test(p)?this._el.style[c]=r[c]:c!==gt&&c in r&&this._el.setAttribute(p,p===tt?S(r[c]):_(r[c]))}o.forEach(c=>{c[nt](!0);let p=this._el.querySelectorAll(X),d=this._el.querySelectorAll(`${X}[${nt}]`);p.length===d.length&&p.forEach(g=>g.remove())}),L(i)&&i.call(this,E)}),this}function ot(t){t.extendInstance({animateTo:At})}var st=Symbol(),ct=Symbol(),O=Symbol(),C=Symbol(),U=Symbol(),Ot="unknown",ft="Graphane SVG Template Engine:",H=[],wt=t=>t.reduce((e,n)=>(e[n]=(...i)=>`${n}(${i.join(",")}) `,e),{}),_t=["transform","gradientTransform","patternTransform"],Lt=wt(["matrix","matrix3d","perspective","rotate","rotate3d","rotateX","rotateY","rotateZ","scale","scale3d","scaleX","scaleY","scaleZ","skew","skewX","skewY","translate","translate3d","translateX","translateY","translateZ"]);R({name:"g-content",execute(t,{expression:e,data:n,evalExpression:i}){t.content(i(e,n))}});R({name:"g-if",execute(t,{expression:e,data:n,evalExpression:i}){t.style.visibility(i(e,n)?"inherit":"hidden")}});R({name:"g-bind",alias:":",argument:!0,execute(t,{expression:e,argument:n,data:i,evalExpression:a}){let u={...i,..._t.includes(n)?Lt:{},$:{...i.$,d:n==="d"?t.$d:void 0,dynamic(o,m=200,s=0){console.log((A(o)?o:[o]).map(f=>x(f)&&"offset"in f?{[n]:f.value,offset:f.offset}:{[n]:f})),t.animateTo((A(o)?o:[o]).map(f=>x(f)&&"offset"in f?{[n]:f.value,offset:f.offset}:{[n]:f}),{duration:m,delay:s})}}},l=a(e,u);if(n==="class"){if(A(l)){t.classList.add(...l.filter(o=>!!o));return}if(x(l)){Object.entries(l).forEach(([o,m])=>{m?t.classList.add(o):t.classList.remove(o)});return}l&&t.classList.add(l);return}if(n==="style"){Object.entries(l).forEach(([o,m])=>t.style[o](m));return}k(l)||t[n](n==="d"?""+l:l)}});R({name:"g-on",alias:"@",argument:!0,execute(t,{expression:e,argument:n,data:i,evalExpression:a}){t[U]=t[U]||{};let u=t[U][n]=t[U][n]||new Map;u.has(e)&&t.removeEventListener(n,u.get(e));let l=function(o){let m=a(e,i);L(m)&&m.call(t,o)};t.addEventListener(n,l),u.set(e,l),n==="init"&&!t[st]&&(t[st]=!0,t.dispatchEvent(new Event("init")))}});R({name:"g-for",template:!0,execute(t,{expression:e,data:n}){t[O]=t[O]||[];let i=0;It(e,n,a=>{if(t[O][i])P(t[O][i],a,!1);else{let u=t.gSVG("g");t.children().forEach(l=>{u.add(l.cloneNode(!0))}),P(u,a),t.before(u.el),u[ct]=!0,t[O].push(u)}i++},a=>{for(;t[O].length>a.length;)t[O].pop().remove()})}});function R({name:t,alias:e,argument:n,template:i,execute:a}){let u=`^(${t}${n?":":""}${e?`|${e})`:")"}${n?"(.*)$":"$"}`,l=new RegExp(u,"i");H.push({name:t,alias:e,argument:n,template:i,execute:a,check:l})}function kt(t){for(let e of H){let n=e.check.exec(t);if(n){let i=n[2];return{...e,argument:i}}}}function Rt(t){return t.replace(/[{}()[\]]/g,"").split(",").map(e=>e.includes(":")?e.split(":")[1]:e).map(e=>e.trim())}function Ft(t){return t[Symbol.iterator]?{iterator:[...t],type:Q}:G(t)?{iterator:Array(t<0?0:t).fill(0).map((e,n)=>n),type:D}:x(t)?{iterator:Object.entries(t).map(e=>e.reverse()),type:F}:{iterator:t,type:Ot}}function ut(t,e){try{return z(Object.keys(e).filter(i=>!G(i)),`return ( ${t} ); `)(...Object.values(e))}catch(n){console.warn(ft,n.message)}}function It(t,e,n,i){let a="__$$iterator",u="__$$callback",l="__$$final";try{let[o,m]=t.split(" of ");o=o.trim(),m=m.trim();let s=ut(m,e)||[],{iterator:f,type:w}=Ft(s);w===F&&o[0]!=="["&&(o=`[${o.replace(/(^\()|(\)$)/g,"")}]`);let _=Rt(o),S=o[0]!=="("?`(${o})`:o,$=Object.keys(e),y=` ${a}.forEach(${S} => { ${u}({${$}${$.length?",":""}${_.join(",")}}); }); ${l}(${a}); `;return z([...$,a,u,l],y)(...Object.values(e),f,n,i)}catch(o){console.warn(ft,o)}}function P(t,e,n=!0){if(n&&t[ct])return;t[C]=t[C]||[];let i=t.attributes();for(let u of[...i]){let l=u.name,o=kt(l);o&&(t[C].push({...o,expression:u.value}),t.removeAttribute(l))}let a=!1;for(let u of t[C])u.execute(t,{...u,data:e,evalExpression:ut}),a=u.template||a;if(!a)for(let u of t.children())P(u,e)}function Mt(t={}){P(this,{...t,...Array.isArray(t.data)?{}:t.data,$:t.data?{...t.$,...W(t.data),data:t.data,rawData:Y(t.data)}:{}})}function Kt(t){t.install(ot),t.extendInstance({render:Mt}),t.extendSetup({extendTemplate:{defineDirective:R,obtainDirective(e){return H.find(n=>n.name===e)}}})}export{Kt as svgPlugin}; //# sourceMappingURL=gsvg.template.engine.js.map