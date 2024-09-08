/* graphane - 1.0.0-beta.2 */ (()=>{var ct="function",at="undefined",U="object",ut="string",Y="array",O="number";var S=t=>typeof t===U,V=t=>typeof t===ut,C=t=>typeof t===ct,q=t=>typeof t===O&&!isNaN(t),B=t=>typeof t===at;var w=t=>Array.isArray(t);var J=t=>t.replace(/-([a-z0-9])/g,(e,n)=>n.toUpperCase());var v=new Map;var ft=async function(){}.constructor;function P(t,e,n=!1){let a=`${t.join(",")} ${e}`;if(v.has(a))return v.get(a);let f=new(n?ft:Function)(...t,e);return v.set(a,f),f}function W(t){try{return new Function(`let ${t} = 0`),!0}catch{return!1}}var j="animate",lt="path",X="d",K="transform",tt="rotate",N="translate",Z="inherit",Q="finished",pt=[tt,"skewX","skewY"],mt=[N,"width","height","x","y","cx","cy","r","rx","ry","dx","dy"],dt=(t,e)=>["text","tspan"].includes(t)&&["x","y"].includes(e),z=!1;if(window.matchMedia){let t=window.matchMedia("(prefers-reduced-motion: reduce)");z=t.matches,t.addEventListener("change",()=>{z=t.matches})}var ht=t=>t.replace(/([A-Z])/g,"-$1").toLowerCase();function $t(t,e={duration:200},n=null,a=null){let f=this.gSVG,l=i=>{let o=S(i)?{...i}:{duration:i};return z&&(o.duration=0),o.fill="none",o},s=i=>{i=w(i)?i:[i];let o=window.getComputedStyle(this._el),c=[],p=new Set;for(let x of i){let h={};for(let g in x){let $=J(g);h[$]=y(x[g],$),!($ in o)||dt(this.tagName(),$)?p.add($):$===X?h.d=`${lt}("${h.d}")`:$===K&&(h.transform=d(h.transform))}c.push(h)}return u(p,c),c},r=[],u=(i,o)=>{if(i.size){let c=new KeyframeEffect(null,o).getKeyframes();for(let p of i){let x=f(j).attributeName(p).dur(L.duration+"ms").fill("freeze");if(o.length===1)x.to(o[0][p]);else{let h=[],g=[];for(let $ in c){let st=c[$];p in o[$]&&(h.push(st.computedOffset),g.push(o[$][p]))}h[0]!==0&&(h.unshift(0),g.unshift(this[p]()||Z)),h[h.length-1]!==1&&(h.push(1),g.push(this[p]()||Z)),x.keyTimes(h.join(";")).values(g.join(";"))}r.push(x),x.attachTo(this),x.beginElementAt(L.delay||0)}}},d=i=>{V(i)&&(i=JSON.parse("{"+i.replace(/\s*\(\s*/g,":[").replace(/\s*\)\s*/g,"],").split(/\s*,\s*|\s.*/).join(",").replace(/(\w+):/g,'"$1":').replace(/,$/,"")+"}"));let o="";for(let c in i)if(c===tt){let p=m(i[c]);p.length>1&&(o+=`${N}(${y(p[1],N)},${y(p[2],N)}) `),o+=`${c}(${y(p[0],c)}) `,p.length>1&&(o+=`${N}(-${y(p[1],N)},-${y(p[2],N)}) `)}else o+=`${c}(${m(i[c]).map(p=>y(p,c)).join(",")}) `;return o},m=i=>w(i)?i:String(i).split(/\s+|,/),y=(i,o)=>pt.includes(o)?i+"deg":mt.includes(o)?i+"px":i,k=i=>V(i)?i.replace(/(deg)|(px)/g,"").trim():i,D=i=>i.replace(/(path\s*\(\s*["'])|(["']\s*\)\s*$)/g,"").trim().replace(/([a-zA-Z])\s*/g,"$1").replace(/\s+/g,","),b=i=>{let o=/translate\((.*)px,(.*)px\) rotate\((.*)deg\) translate\((.*)px,(.*)px\)\s+/,c=o.exec(i);return c&&Number(c[1])===Number(c[4])*-1&&Number(c[2])===Number(c[5])*-1?i=i.replace(o,`rotate(${c[3]}, ${c[1]}, ${c[2]})`):i=k(i),i},L=l(e),M=s(t),A=this._el.animate(M,L);return A.ready.then(()=>C(n)&&n.call(this,A)),A.finished.then(()=>{let i=M[M.length-1];for(let o in i){let c=ht(o);c.startsWith("text-")?this._el.style[o]=i[o]:o!=="offset"&&o in i&&this._el.setAttribute(c,c===X?D(i[o]):c===K?b(i[o]):k(i[o]))}r.forEach(o=>{o[Q](!0);let c=this._el.querySelectorAll(j),p=this._el.querySelectorAll(`${j}[${Q}]`);c.length===p.length&&c.forEach(x=>x.remove())}),C(a)&&a.call(this,A)}),this}function xt(t){t.extendInstance({animateTo:$t})}var et=xt;var nt=Symbol(),rt=Symbol(),E=Symbol(),F=Symbol(),I=Symbol(),G=Symbol(),yt="unknown",R={},gt=(t,e,n)=>{throw new Error(t+` in ${e} `+n)},Nt=(t=>e=>t[e]||e)("attributeName attributeType baseFrequency calcMode clipPathUnits diffuseConstant edgeMode gradientTransform gradientUnits kernelMatrix kernelUnitLength lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY requiredExtensions requiredFeatures specularConstant specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength viewBox xChannelSelector yChannelSelector zoomAndPan".split(" ").reduce((t,e)=>(t[e.toLowerCase()]=e,t),{}));function it(t){if(!t?.el?.parentNode)return;let e=document.createComment(" ref ");t.parentNode().insertBefore(e,t.el),t.remove(),e[G]=t}function Et(t){let e=t[G];return t.parentNode.insertBefore(e.el,t),t.remove(),e}T({name:"g-content",execute(t,{expression:e,data:n,evalExpression:a}){let f={...n,$$:{fromURL:async u=>{let d=await fetch(u);if(d.status===200)return d.text();console.warn(`Failed to load URL: ${u} (${d.status})`)},currentContent:t.content}},l=a(e,f),s=new CustomEvent("load",{bubbles:!0,detail:t}),r=u=>B(u)?"":u;typeof l=="object"&&l.then?l.then(u=>{t.content(r(u)),t.dispatchEvent(s)}):(t.content(r(l)),t.dispatchEvent(s))}});T({name:"g-if",execute(t,{expression:e,data:n,evalExpression:a}){a(e,n)||it(t)}});T({name:"g-bind",alias:":",argument:!0,execute(t,{expression:e,argument:n,data:a,evalExpression:f}){n=Nt(n);let l={...a,$$:["d","transform"].includes(n)?t["$"+n]:{}};l.$$.currentValue=t[n],l.$$.dynamic=(r,u=200,d=0)=>{t.animateTo((w(r)?r:[r]).map(m=>S(m)&&"offset"in m?{[n]:m.value,offset:m.offset}:{[n]:m}),{duration:u,delay:d})};let s=f(e,l);if(n==="class"){if(w(s)){t.classList.add(...s.filter(r=>!!r));return}if(S(s)){Object.entries(s).forEach(([r,u])=>{u?t.classList.add(r):t.classList.remove(r)});return}s&&t.classList.add(s);return}if(n==="style"){Object.entries(s).forEach(([r,u])=>t.style[r](u));return}B(s)||t[n](s)}});T({name:"g-on",alias:"@",argument:!0,execute(t,{expression:e,argument:n,data:a,evalExpression:f,error:l,outerCode:s}){t[I]=t[I]||{};let r=t[I][n]=t[I][n]||new Map;r.has(e)&&t.removeEventListener(n,r.get(e));let u=function(d){try{let m=f(e,a,t);C(m)&&m.call(t,d)}catch(m){l(m.message,`g-on:${n}="${e}"`,s)}};t.addEventListener(n,u),r.set(e,u),n==="init"&&!t[nt]&&(t[nt]=!0,t.dispatchEvent(new Event("init")))}});T({name:"g-for",template:!0,execute(t,{expression:e,data:n,error:a}){t[E]=t[E]||[];let f=0;wt(e,n,l=>{if(t[E][f])_(t[E][f],l,a,!1);else{let s=t.gSVG("g");t.children().forEach(r=>{s.add(r.cloneNode(!0))}),_(s,l,a),t.before(s.el),s[rt]=!0,t[E].push(s)}f++},l=>{for(;t[E].length>l.length;)t[E].pop().remove()}),it(t)}});function T({name:t,alias:e,argument:n,template:a,execute:f}){let l=`^(${t}${n?":":""}${e?`|${e})`:")"}${n?"(.*)$":"$"}`,s=new RegExp(l,"i");R[t]={name:t,alias:e,argument:n,template:a,execute:f,check:s}}function bt(t){for(let e in R){let n=R[e],a=n.check.exec(t);if(a){let f=a[2];return{...n,argument:f}}}}function At(t){return t.replace(/[{}()[\]]/g,"").split(",").map(e=>(e.includes(":")?e.split(":")[1].trim():e).trim())}function St(t){return t[Symbol.iterator]?{iterator:[...t],type:Y}:q(t)?{iterator:Array(t<0?0:0|t).fill(0).map((e,n)=>n),type:O}:S(t)?{iterator:Object.entries(t).map(e=>e.reverse()),type:U}:{iterator:t,type:yt}}function ot(t,e,n=null){let a=Object.keys(e).filter(W);return P(a,`return ( ${t} ); `).apply(n,a.map(l=>e[l]))}function wt(t,e,n,a){let f="__$$iterator",l="__$$callback",s="__$$final",[r,u]=t.split(" of ");r=r.trim(),u=u.trim();let d=ot(u,e)||[],{iterator:m,type:y}=St(d);y===U&&!r.startsWith("[")&&(r=`[${r.replace(/(^\()|(\)$)/g,"")}]`);let k=At(r),D=r.startsWith("(")?r:`(${r})`,b=Object.keys(e).filter(W),L=` ${f}.forEach(${D} => { ${l}({${b}${b.length?",":""}${k.join(",")}}); }); ${s}(${f}); `;return P([...b,f,l,s],L)(...b.map(A=>e[A]),m,n,a)}function _(t,e,n,a=!0){if(a&&t[rt])return;let f=t.outerHTML();t[F]=t[F]||[];let l=t.attributes();for(let r of[...l]){let u=r.name,d=bt(u);d&&(t[F].push({...d,expression:r.value}),t.removeAttribute(u))}let s=!1;for(let r of t[F]){try{r.execute(t,{...r,data:e,evalExpression:ot,error:n,outerCode:f})}catch(u){n(u.message,`${r.name}${r.argument?":"+r.argument:""}="${r.expression}"`,f)}s=r.template||s}if(!s)for(let r of t.childNodes())r.el[G]?_(Et(r.el),e,n):r.el?.nodeType===1&&_(r,e,n)}function Tt(t={},e=gt){_(this,t,e),this.dispatchEvent(new Event("render"))}function Lt(){return this.outerHTML().replaceAll("<!-- ref -->","")}function Ct(t){t.install(et),t.extendInstance({render:Tt,source:Lt}),t.extendSetup({extendTemplate:{defineDirective:T,obtainDirective(e){return R[e]}}})}var H=Ct;globalThis.gSVG&&globalThis.gSVG.install(H);customElements.whenDefined("g-composer").then(t=>{t.install(H)});})();