/* graphane - 1.0.0-beta.2 */ var st="function",ct="undefined",U="object",at="string",Y="array",O="number";var S=t=>typeof t===U,V=t=>typeof t===at,C=t=>typeof t===st,G=t=>typeof t===O&&!isNaN(t),B=t=>typeof t===ct;var w=t=>Array.isArray(t);var q=t=>t.replace(/-([a-z0-9])/g,(e,n)=>n.toUpperCase());var W=new Map;var ut=async function(){}.constructor;function j(t,e,n=!1){let a=`${t.join(",")} ${e}`;if(W.has(a))return W.get(a);let f=new(n?ut:Function)(...t,e);return W.set(a,f),f}function v(t){try{return new Function(`let ${t} = 0`),!0}catch{return!1}}var z="animate",ft="path",J="d",X="transform",Q="rotate",N="translate",K="inherit",Z="finished",lt=[Q,"skewX","skewY"],pt=[N,"width","height","x","y","cx","cy","r","rx","ry","dx","dy"],mt=(t,e)=>["text","tspan"].includes(t)&&["x","y"].includes(e),H=!1;if(window.matchMedia){let t=window.matchMedia("(prefers-reduced-motion: reduce)");H=t.matches,t.addEventListener("change",()=>{H=t.matches})}var dt=t=>t.replace(/([A-Z])/g,"-$1").toLowerCase();function ht(t,e={duration:200},n=null,a=null){let f=this.gSVG,l=i=>{let o=S(i)?{...i}:{duration:i};return H&&(o.duration=0),o.fill="none",o},s=i=>{i=w(i)?i:[i];let o=window.getComputedStyle(this._el),c=[],p=new Set;for(let x of i){let h={};for(let g in x){let $=q(g);h[$]=y(x[g],$),!($ in o)||mt(this.tagName(),$)?p.add($):$===J?h.d=`${ft}("${h.d}")`:$===X&&(h.transform=d(h.transform))}c.push(h)}return u(p,c),c},r=[],u=(i,o)=>{if(i.size){let c=new KeyframeEffect(null,o).getKeyframes();for(let p of i){let x=f(z).attributeName(p).dur(L.duration+"ms").fill("freeze");if(o.length===1)x.to(o[0][p]);else{let h=[],g=[];for(let $ in c){let ot=c[$];p in o[$]&&(h.push(ot.computedOffset),g.push(o[$][p]))}h[0]!==0&&(h.unshift(0),g.unshift(this[p]()||K)),h[h.length-1]!==1&&(h.push(1),g.push(this[p]()||K)),x.keyTimes(h.join(";")).values(g.join(";"))}r.push(x),x.attachTo(this),x.beginElementAt(L.delay||0)}}},d=i=>{V(i)&&(i=JSON.parse("{"+i.replace(/\s*\(\s*/g,":[").replace(/\s*\)\s*/g,"],").split(/\s*,\s*|\s.*/).join(",").replace(/(\w+):/g,'"$1":').replace(/,$/,"")+"}"));let o="";for(let c in i)if(c===Q){let p=m(i[c]);p.length>1&&(o+=`${N}(${y(p[1],N)},${y(p[2],N)}) `),o+=`${c}(${y(p[0],c)}) `,p.length>1&&(o+=`${N}(-${y(p[1],N)},-${y(p[2],N)}) `)}else o+=`${c}(${m(i[c]).map(p=>y(p,c)).join(",")}) `;return o},m=i=>w(i)?i:String(i).split(/\s+|,/),y=(i,o)=>lt.includes(o)?i+"deg":pt.includes(o)?i+"px":i,k=i=>V(i)?i.replace(/(deg)|(px)/g,"").trim():i,D=i=>i.replace(/(path\s*\(\s*["'])|(["']\s*\)\s*$)/g,"").trim().replace(/([a-zA-Z])\s*/g,"$1").replace(/\s+/g,","),b=i=>{let o=/translate\((.*)px,(.*)px\) rotate\((.*)deg\) translate\((.*)px,(.*)px\)\s+/,c=o.exec(i);return c&&Number(c[1])===Number(c[4])*-1&&Number(c[2])===Number(c[5])*-1?i=i.replace(o,`rotate(${c[3]}, ${c[1]}, ${c[2]})`):i=k(i),i},L=l(e),M=s(t),A=this._el.animate(M,L);return A.ready.then(()=>C(n)&&n.call(this,A)),A.finished.then(()=>{let i=M[M.length-1];for(let o in i){let c=dt(o);c.startsWith("text-")?this._el.style[o]=i[o]:o!=="offset"&&o in i&&this._el.setAttribute(c,c===J?D(i[o]):c===X?b(i[o]):k(i[o]))}r.forEach(o=>{o[Z](!0);let c=this._el.querySelectorAll(z),p=this._el.querySelectorAll(`${z}[${Z}]`);c.length===p.length&&c.forEach(x=>x.remove())}),C(a)&&a.call(this,A)}),this}function $t(t){t.extendInstance({animateTo:ht})}var tt=$t;var et=Symbol(),nt=Symbol(),E=Symbol(),F=Symbol(),I=Symbol(),P=Symbol(),xt="unknown",R={},yt=(t,e,n)=>{throw new Error(t+` in ${e} `+n)},gt=(t=>e=>t[e]||e)("attributeName attributeType baseFrequency calcMode clipPathUnits diffuseConstant edgeMode gradientTransform gradientUnits kernelMatrix kernelUnitLength lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY requiredExtensions requiredFeatures specularConstant specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength viewBox xChannelSelector yChannelSelector zoomAndPan".split(" ").reduce((t,e)=>(t[e.toLowerCase()]=e,t),{}));function rt(t){if(!t?.el?.parentNode)return;let e=document.createComment(" ref ");t.parentNode().insertBefore(e,t.el),t.remove(),e[P]=t}function Nt(t){let e=t[P];return t.parentNode.insertBefore(e.el,t),t.remove(),e}T({name:"g-content",execute(t,{expression:e,data:n,evalExpression:a}){let f={...n,$$:{fromURL:async u=>{let d=await fetch(u);if(d.status===200)return d.text();console.warn(`Failed to load URL: ${u} (${d.status})`)},currentContent:t.content}},l=a(e,f),s=new CustomEvent("load",{bubbles:!0,detail:t}),r=u=>B(u)?"":u;typeof l=="object"&&l.then?l.then(u=>{t.content(r(u)),t.dispatchEvent(s)}):(t.content(r(l)),t.dispatchEvent(s))}});T({name:"g-if",execute(t,{expression:e,data:n,evalExpression:a}){a(e,n)||rt(t)}});T({name:"g-bind",alias:":",argument:!0,execute(t,{expression:e,argument:n,data:a,evalExpression:f}){n=gt(n);let l={...a,$$:["d","transform"].includes(n)?t["$"+n]:{}};l.$$.currentValue=t[n],l.$$.dynamic=(r,u=200,d=0)=>{t.animateTo((w(r)?r:[r]).map(m=>S(m)&&"offset"in m?{[n]:m.value,offset:m.offset}:{[n]:m}),{duration:u,delay:d})};let s=f(e,l);if(n==="class"){if(w(s)){t.classList.add(...s.filter(r=>!!r));return}if(S(s)){Object.entries(s).forEach(([r,u])=>{u?t.classList.add(r):t.classList.remove(r)});return}s&&t.classList.add(s);return}if(n==="style"){Object.entries(s).forEach(([r,u])=>t.style[r](u));return}B(s)||t[n](s)}});T({name:"g-on",alias:"@",argument:!0,execute(t,{expression:e,argument:n,data:a,evalExpression:f,error:l,outerCode:s}){t[I]=t[I]||{};let r=t[I][n]=t[I][n]||new Map;r.has(e)&&t.removeEventListener(n,r.get(e));let u=function(d){try{let m=f(e,a,t);C(m)&&m.call(t,d)}catch(m){l(m.message,`g-on:${n}="${e}"`,s)}};t.addEventListener(n,u),r.set(e,u),n==="init"&&!t[et]&&(t[et]=!0,t.dispatchEvent(new Event("init")))}});T({name:"g-for",template:!0,execute(t,{expression:e,data:n,error:a}){t[E]=t[E]||[];let f=0;St(e,n,l=>{if(t[E][f])_(t[E][f],l,a,!1);else{let s=t.gSVG("g");t.children().forEach(r=>{s.add(r.cloneNode(!0))}),_(s,l,a),t.before(s.el),s[nt]=!0,t[E].push(s)}f++},l=>{for(;t[E].length>l.length;)t[E].pop().remove()}),rt(t)}});function T({name:t,alias:e,argument:n,template:a,execute:f}){let l=`^(${t}${n?":":""}${e?`|${e})`:")"}${n?"(.*)$":"$"}`,s=new RegExp(l,"i");R[t]={name:t,alias:e,argument:n,template:a,execute:f,check:s}}function Et(t){for(let e in R){let n=R[e],a=n.check.exec(t);if(a){let f=a[2];return{...n,argument:f}}}}function bt(t){return t.replace(/[{}()[\]]/g,"").split(",").map(e=>(e.includes(":")?e.split(":")[1].trim():e).trim())}function At(t){return t[Symbol.iterator]?{iterator:[...t],type:Y}:G(t)?{iterator:Array(t<0?0:0|t).fill(0).map((e,n)=>n),type:O}:S(t)?{iterator:Object.entries(t).map(e=>e.reverse()),type:U}:{iterator:t,type:xt}}function it(t,e,n=null){let a=Object.keys(e).filter(v);return j(a,`return ( ${t} ); `).apply(n,a.map(l=>e[l]))}function St(t,e,n,a){let f="__$$iterator",l="__$$callback",s="__$$final",[r,u]=t.split(" of ");r=r.trim(),u=u.trim();let d=it(u,e)||[],{iterator:m,type:y}=At(d);y===U&&!r.startsWith("[")&&(r=`[${r.replace(/(^\()|(\)$)/g,"")}]`);let k=bt(r),D=r.startsWith("(")?r:`(${r})`,b=Object.keys(e).filter(v),L=` ${f}.forEach(${D} => { ${l}({${b}${b.length?",":""}${k.join(",")}}); }); ${s}(${f}); `;return j([...b,f,l,s],L)(...b.map(A=>e[A]),m,n,a)}function _(t,e,n,a=!0){if(a&&t[nt])return;let f=t.outerHTML();t[F]=t[F]||[];let l=t.attributes();for(let r of[...l]){let u=r.name,d=Et(u);d&&(t[F].push({...d,expression:r.value}),t.removeAttribute(u))}let s=!1;for(let r of t[F]){try{r.execute(t,{...r,data:e,evalExpression:it,error:n,outerCode:f})}catch(u){n(u.message,`${r.name}${r.argument?":"+r.argument:""}="${r.expression}"`,f)}s=r.template||s}if(!s)for(let r of t.childNodes())r.el[P]?_(Nt(r.el),e,n):r.el?.nodeType===1&&_(r,e,n)}function wt(t={},e=yt){_(this,t,e),this.dispatchEvent(new Event("render"))}function Tt(){return this.outerHTML().replaceAll("<!-- ref -->","")}function Lt(t){t.install(tt),t.extendInstance({render:wt,source:Tt}),t.extendSetup({extendTemplate:{defineDirective:T,obtainDirective(e){return R[e]}}})}var Ot=Lt;export{Ot as default};