/* graphane - 0.1.0-alpha.12 */ (()=>{var ct="function",at="undefined",O="object",ft="string",Y="array",R="number";var S=t=>typeof t===O,D=t=>typeof t===ft,C=t=>typeof t===ct,q=t=>typeof t===R&&!isNaN(t),v=t=>typeof t===at;var T=t=>Array.isArray(t);var J=t=>t.replace(/-([a-z0-9])/g,(e,n)=>n.toUpperCase());var j=new Map;var ut=async function(){}.constructor;function V(t,e,n=!1){let c=`${t.join(",")} ${e}`;if(j.has(c))return j.get(c);let f=new(n?ut:Function)(...t,e);return j.set(c,f),f}function B(t){try{return new Function(`let ${t} = 0`),!0}catch{return!1}}var P="animate",lt="path",X="d",K="transform",tt="rotate",N="translate",Z="inherit",Q="finished",pt=[tt,"skewX","skewY"],mt=[N,"width","height","x","y","cx","cy","r","rx","ry","dx","dy"],dt=(t,e)=>["text","tspan"].includes(t)&&["x","y"].includes(e),W=!1;if(window.matchMedia){let t=window.matchMedia("(prefers-reduced-motion: reduce)");W=t.matches,t.addEventListener("change",()=>{W=t.matches})}var ht=t=>t.replace(/([A-Z])/g,"-$1").toLowerCase();function $t(t,e={duration:200},n=null,c=null){let f=this.gSVG,l=r=>{let o=S(r)?{...r}:{duration:r};return W&&(o.duration=0),o.fill="none",o},a=r=>{r=T(r)?r:[r];let o=window.getComputedStyle(this._el),s=[],u=new Set;for(let x of r){let d={};for(let y in x){let h=J(y);d[h]=g(x[y],h),!(h in o)||dt(this.tagName(),h)?u.add(h):h===X?d.d=`${lt}("${d.d}")`:h===K&&(d.transform=$(d.transform))}s.push(d)}return p(u,s),s},i=[],p=(r,o)=>{if(r.size){let s=new KeyframeEffect(null,o).getKeyframes();for(let u of r){let x=f(P).attributeName(u).dur(L.duration+"ms").fill("freeze");if(o.length===1)x.to(o[0][u]);else{let d=[],y=[];for(let h in s){let st=s[h];u in o[h]&&(d.push(st.computedOffset),y.push(o[h][u]))}d[0]!==0&&(d.unshift(0),y.unshift(this[u]()||Z)),d[d.length-1]!==1&&(d.push(1),y.push(this[u]()||Z)),x.keyTimes(d.join(";")).values(y.join(";"))}i.push(x),x.attachTo(this),x.beginElementAt(L.delay||0)}}},$=r=>{D(r)&&(r=JSON.parse("{"+r.replace(/\s*\(\s*/g,":[").replace(/\s*\)\s*/g,"],").split(/\s*,\s*|\s.*/).join(",").replace(/(\w+):/g,'"$1":').replace(/,$/,"")+"}"));let o="";for(let s in r)if(s===tt){let u=m(r[s]);u.length>1&&(o+=`${N}(${g(u[1],N)},${g(u[2],N)}) `),o+=`${s}(${g(u[0],s)}) `,u.length>1&&(o+=`${N}(-${g(u[1],N)},-${g(u[2],N)}) `)}else o+=`${s}(${m(r[s]).map(u=>g(u,s)).join(",")}) `;return o},m=r=>T(r)?r:String(r).split(/\s+|,/),g=(r,o)=>pt.includes(o)?r+"deg":mt.includes(o)?r+"px":r,k=r=>D(r)?r.replace(/(deg)|(px)/g,"").trim():r,U=r=>r.replace(/(path\s*\(\s*["'])|(["']\s*\)\s*$)/g,"").trim().replace(/([a-zA-Z])\s*/g,"$1").replace(/\s+/g,","),E=r=>{let o=/translate\((.*)px,(.*)px\) rotate\((.*)deg\) translate\((.*)px,(.*)px\)\s+/,s=o.exec(r);return s&&Number(s[1])===Number(s[4])*-1&&Number(s[2])===Number(s[5])*-1?r=r.replace(o,`rotate(${s[3]}, ${s[1]}, ${s[2]})`):r=k(r),r},L=l(e),M=a(t),A=this._el.animate(M,L);return A.ready.then(()=>C(n)&&n.call(this,A)),A.finished.then(()=>{let r=M[M.length-1];for(let o in r){let s=ht(o);s.startsWith("text-")?this._el.style[o]=r[o]:o!=="offset"&&o in r&&this._el.setAttribute(s,s===X?U(r[o]):s===K?E(r[o]):k(r[o]))}i.forEach(o=>{o[Q](!0);let s=this._el.querySelectorAll(P),u=this._el.querySelectorAll(`${P}[${Q}]`);s.length===u.length&&s.forEach(x=>x.remove())}),C(c)&&c.call(this,A)}),this}function xt(t){t.extendInstance({animateTo:$t})}var et=xt;var nt=Symbol(),rt=Symbol(),b=Symbol(),I=Symbol(),F=Symbol(),z=Symbol(),gt="unknown",G=[],yt=(t,e,n)=>{throw new Error(t+` in ${e} `+n)},Nt=(t=>e=>t[e]||e)("attributeName attributeType baseFrequency calcMode clipPathUnits diffuseConstant edgeMode gradientTransform gradientUnits kernelMatrix kernelUnitLength lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY requiredExtensions requiredFeatures specularConstant specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength viewBox xChannelSelector yChannelSelector zoomAndPan".split(" ").reduce((t,e)=>(t[e.toLowerCase()]=e,t),{}));function it(t){if(!t?.el?.parentNode)return;let e=document.createComment(" ref ");t.parentNode().insertBefore(e,t.el),t.remove(),e[z]=t}function bt(t){let e=t[z];return t.parentNode.insertBefore(e.el,t),t.remove(),e}w({name:"g-content",execute(t,{expression:e,data:n,evalExpression:c}){t.content(c(e,n))}});w({name:"g-if",execute(t,{expression:e,data:n,evalExpression:c}){c(e,n)||it(t)}});w({name:"g-bind",alias:":",argument:!0,execute(t,{expression:e,argument:n,data:c,evalExpression:f}){n=Nt(n);let l={...c,$$:["d","transform"].includes(n)?t["$"+n]:()=>t[n]()};l.$$.dynamic=(i,p=200,$=0)=>{t.animateTo((T(i)?i:[i]).map(m=>S(m)&&"offset"in m?{[n]:m.value,offset:m.offset}:{[n]:m}),{duration:p,delay:$})};let a=f(e,l);if(n==="class"){if(T(a)){t.classList.add(...a.filter(i=>!!i));return}if(S(a)){Object.entries(a).forEach(([i,p])=>{p?t.classList.add(i):t.classList.remove(i)});return}a&&t.classList.add(a);return}if(n==="style"){Object.entries(a).forEach(([i,p])=>t.style[i](p));return}v(a)||t[n](a)}});w({name:"g-on",alias:"@",argument:!0,execute(t,{expression:e,argument:n,data:c,evalExpression:f,error:l,outerCode:a}){t[F]=t[F]||{};let i=t[F][n]=t[F][n]||new Map;i.has(e)&&t.removeEventListener(n,i.get(e));let p=function($){try{let m=f(e,c,t);C(m)&&m.call(t,$)}catch(m){l(m.message,`g-on:${n}="${e}"`,a)}};t.addEventListener(n,p),i.set(e,p),n==="init"&&!t[nt]&&(t[nt]=!0,t.dispatchEvent(new Event("init")))}});w({name:"g-for",template:!0,execute(t,{expression:e,data:n,error:c}){t[b]=t[b]||[];let f=0;Tt(e,n,l=>{if(t[b][f])_(t[b][f],l,c,!1);else{let a=t.gSVG("g");t.children().forEach(i=>{a.add(i.cloneNode(!0))}),_(a,l,c),t.before(a.el),a[rt]=!0,t[b].push(a)}f++},l=>{for(;t[b].length>l.length;)t[b].pop().remove()}),it(t)}});function w({name:t,alias:e,argument:n,template:c,execute:f}){let l=`^(${t}${n?":":""}${e?`|${e})`:")"}${n?"(.*)$":"$"}`,a=new RegExp(l,"i");G.push({name:t,alias:e,argument:n,template:c,execute:f,check:a})}function Et(t){for(let e of G){let n=e.check.exec(t);if(n){let c=n[2];return{...e,argument:c}}}}function At(t){return t.replace(/[{}()[\]]/g,"").split(",").map(e=>(e.includes(":")?e.split(":")[1].trim():e).trim())}function St(t){return t[Symbol.iterator]?{iterator:[...t],type:Y}:q(t)?{iterator:Array(t<0?0:0|t).fill(0).map((e,n)=>n),type:R}:S(t)?{iterator:Object.entries(t).map(e=>e.reverse()),type:O}:{iterator:t,type:gt}}function ot(t,e,n=null){let c=Object.keys(e).filter(B);return V(c,`return ( ${t} ); `).apply(n,c.map(l=>e[l]))}function Tt(t,e,n,c){let f="__$$iterator",l="__$$callback",a="__$$final",[i,p]=t.split(" of ");i=i.trim(),p=p.trim();let $=ot(p,e)||[],{iterator:m,type:g}=St($);g===O&&!i.startsWith("[")&&(i=`[${i.replace(/(^\()|(\)$)/g,"")}]`);let k=At(i),U=i.startsWith("(")?i:`(${i})`,E=Object.keys(e).filter(B),L=` ${f}.forEach(${U} => { ${l}({${E}${E.length?",":""}${k.join(",")}}); }); ${a}(${f}); `;return V([...E,f,l,a],L)(...E.map(A=>e[A]),m,n,c)}function _(t,e,n,c=!0){if(c&&t[rt])return;let f=t.outerHTML();t[I]=t[I]||[];let l=t.attributes();for(let i of[...l]){let p=i.name,$=Et(p);$&&(t[I].push({...$,expression:i.value}),t.removeAttribute(p))}let a=!1;for(let i of t[I]){try{i.execute(t,{...i,data:e,evalExpression:ot,error:n,outerCode:f})}catch(p){n(p.message,`${i.name}${i.argument?":"+i.argument:""}="${i.expression}"`,f)}a=i.template||a}if(!a)for(let i of t.childNodes())i.el[z]?_(bt(i.el),e,n):i.el?.nodeType===1&&_(i,e,n)}function wt(t={},e=yt){_(this,t,e),this.dispatchEvent(new Event("render"))}function Lt(){return this.outerHTML().replaceAll("<!-- ref -->","")}function Ct(t){t.install(et),t.extendInstance({render:wt,source:Lt}),t.extendSetup({extendTemplate:{defineDirective:w,obtainDirective(e){return G.find(n=>n.name===e)}}})}var H=Ct;globalThis.gSVG&&globalThis.gSVG.install(H);customElements.whenDefined("g-composer").then(t=>{t.install(H)});})();