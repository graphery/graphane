/* graphane - 1.0.0-beta.7 */ var ut="function",ft="undefined",R="object",lt="string",j="array",O="number";var N=t=>typeof t===R,V=t=>typeof t===lt,_=t=>typeof t===ut,G=t=>typeof t===O&&!isNaN(t),q=t=>!Number.isNaN(t),v=t=>typeof t===ft;var w=t=>Array.isArray(t);var J=t=>t.replace(/-([a-z0-9])/g,(e,r)=>r.toUpperCase());var B=new Map;var pt=async function(){}.constructor;function W(t,e,r=!1){let u=`${t.join(",")} ${e}`;if(B.has(u))return B.get(u);let l=new(r?pt:Function)(...t,e);return B.set(u,l),l}function Y(t){try{return new Function(`let ${t} = 0`),!0}catch{return!1}}var z="animate",mt="path",X="d",K="transform",tt="rotate",E="translate",Z="inherit",Q="finished",dt=[tt,"skewX","skewY"],ht=[E,"width","height","x","y","cx","cy","r","rx","ry","dx","dy"],$t=(t,e)=>["text","tspan"].includes(t)&&["x","y"].includes(e),H=!1;if(window.matchMedia){let t=window.matchMedia("(prefers-reduced-motion: reduce)");H=t.matches,t.addEventListener("change",()=>{H=t.matches})}var xt=t=>t.replace(/([A-Z])/g,"-$1").toLowerCase();function yt(t,e={duration:200},r=null,u=null){let l=this.gSVG,f=i=>{let s=N(i)?{...i}:{duration:i};return H&&(s.duration=0),s.fill="none",s},c=i=>{i=w(i)?i:[i];let s=window.getComputedStyle(this._el),a=[],p=new Set;for(let x of i){let h={};for(let g in x){let $=J(g);h[$]=y(x[g],$),!($ in s)||$t(this.tagName(),$)?p.add($):$===X?h.d=`${mt}("${h.d}")`:$===K&&(h.transform=d(h.transform))}a.push(h)}return o(p,a),a},n=[],o=(i,s)=>{if(i.size){let a=new KeyframeEffect(null,s).getKeyframes();for(let p of i){let x=l(z).attributeName(p).dur(C.duration+"ms").fill("freeze");if(s.length===1)x.to(s[0][p]);else{let h=[],g=[];for(let $ in a){let at=a[$];p in s[$]&&(h.push(at.computedOffset),g.push(s[$][p]))}h[0]!==0&&(h.unshift(0),g.unshift(this[p]()||Z)),h[h.length-1]!==1&&(h.push(1),g.push(this[p]()||Z)),x.keyTimes(h.join(";")).values(g.join(";"))}n.push(x),x.attachTo(this),x.beginElementAt(C.delay||0)}}},d=i=>{V(i)&&(i=JSON.parse("{"+i.replace(/\s*\(\s*/g,":[").replace(/\s*\)\s*/g,"],").split(/\s*,\s*|\s.*/).join(",").replace(/(\w+):/g,'"$1":').replace(/,$/,"")+"}"));let s="";for(let a in i)if(a===tt){let p=m(i[a]);p.length>1&&(s+=`${E}(${y(p[1],E)},${y(p[2],E)}) `),s+=`${a}(${y(p[0],a)}) `,p.length>1&&(s+=`${E}(-${y(p[1],E)},-${y(p[2],E)}) `)}else s+=`${a}(${m(i[a]).map(p=>y(p,a)).join(",")}) `;return s},m=i=>w(i)?i:String(i).split(/\s+|,/),y=(i,s)=>dt.includes(s)?i+"deg":ht.includes(s)?i+"px":i,M=i=>V(i)?i.replace(/(deg)|(px)/g,"").trim():i,D=i=>i.replace(/(path\s*\(\s*["'])|(["']\s*\)\s*$)/g,"").trim().replace(/([a-zA-Z])\s*/g,"$1").replace(/\s+/g,","),b=i=>{let s=/translate\((.*)px,(.*)px\) rotate\((.*)deg\) translate\((.*)px,(.*)px\)\s+/,a=s.exec(i);return a&&Number(a[1])===Number(a[4])*-1&&Number(a[2])===Number(a[5])*-1?i=i.replace(s,`rotate(${a[3]}, ${a[1]}, ${a[2]})`):i=M(i),i},C=f(e),I=c(t),S=this._el.animate(I,C);return S.ready.then(()=>_(r)&&r.call(this,S)),S.finished.then(()=>{let i=I[I.length-1];for(let s in i){let a=xt(s);a.startsWith("text-")?this._el.style[s]=i[s]:s!=="offset"&&s in i&&this._el.setAttribute(a,a===X?D(i[s]):a===K?b(i[s]):M(i[s]))}n.forEach(s=>{s[Q](!0);let a=this._el.querySelectorAll(z),p=this._el.querySelectorAll(`${z}[${Q}]`);a.length===p.length&&a.forEach(x=>x.remove())}),_(u)&&u.call(this,S)}),this}function gt(t){t.extendInstance({animateTo:yt})}var et=gt;var nt=Symbol(),it=Symbol(),A=Symbol(),T=Symbol(),U=Symbol(),P=Symbol(),rt=Symbol(),Nt="unknown",F={},ot=(t,e)=>new Error(`The expression "${t}" return ${e} value`),Et=(t,e,r)=>{throw new Error(t+` in ${e} `+r)},At=(t=>e=>t[e]||e)("attributeName attributeType baseFrequency calcMode clipPathUnits diffuseConstant edgeMode gradientTransform gradientUnits kernelMatrix kernelUnitLength lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY requiredExtensions requiredFeatures specularConstant specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength viewBox xChannelSelector yChannelSelector zoomAndPan".split(" ").reduce((t,e)=>(t[e.toLowerCase()]=e,t),{}));function st(t){if(!t?.el?.parentNode)return null;let e=document.createComment(" ref ");return t.parentNode().insertBefore(e,t.el),t.remove(),e[P]=t,e}function bt(t){let e=t[P];return t.parentNode.insertBefore(e.el,t),t.remove(),e}L({name:"g-content",exec(t,{expr:e,data:r,evalExpr:u}){let l={...r,$$:{fromURL:async o=>{let d=await fetch(o);if(d.status===200)return d.text();console.warn(`Failed to load URL: ${o} (${d.status})`)},currentContent:t.content}},f=u(e,l),c=new CustomEvent("load",{bubbles:!0,detail:t}),n=o=>v(o)?"":o;N(f)&&f.then?f.then(o=>{t.content(n(o)),t.dispatchEvent(c)}):(t.content(n(f)),t.dispatchEvent(c))}});L({name:"g-if",exec(t,{expr:e,data:r,evalExpr:u}){if(!u(e,r))return st(t)}});L({name:"g-bind",alias:":",arg:!0,exec(t,{expr:e,arg:r,data:u,evalExpr:l}){r=At(r);let f={...u,$$:["d","transform"].includes(r)?t["$"+r]:{}};f.$$.currentValue=t[r],f.$$.dynamic=(n,o=200,d=0)=>(t.animateTo((w(n)?n:[n]).map(m=>N(m)&&"offset"in m?{[r]:m.value,offset:m.offset}:{[r]:m}),{duration:o,delay:d}),rt);let c=l(e,f);if(v(c))throw ot(e,"undefined");if(r==="class"){if(w(c)){t.classList.add(...c.filter(n=>!!n));return}if(N(c)){Object.entries(c).forEach(([n,o])=>{o?t.classList.add(n):t.classList.remove(n)});return}c&&t.classList.add(c);return}if(r==="style"){Object.entries(c).forEach(([n,o])=>t.style[n](o));return}c!==rt&&t[r](c)}});L({name:"g-on",alias:"@",arg:!0,exec(t,{expr:e,arg:r,data:u,evalExpr:l,error:f,code:c}){t[U]=t[U]||{};let n=t[U][r]=t[U][r]||new Map;n.has(e)&&t.removeEventListener(r,n.get(e));let o=function(d){try{let m=l(e,u,t);_(m)&&m.call(t,d)}catch(m){f(m.message,{directive:"g-on",argument:r,expression:e,toString(){return`g-on:${r}="${e}"`}},c)}};t.addEventListener(r,o),n.set(e,o),r==="init"&&!t[nt]&&(t[nt]=!0,t.dispatchEvent(new Event("init")))}});L({name:"g-for",tmpl:!0,exec(t,{expr:e,data:r,error:u}){t[A]=t[A]||[];let l=t.gSVG(st(t)),f=0;return Lt(e,r,c=>{if(t[A][f])k(t[A][f],c,u,!1);else{let n=t.gSVG(t.tagName());n[T]=t[T].filter(o=>o.name!=="g-for"),[...t.attributes()].forEach(o=>{o.name!=="g-for"&&n.setAttribute(o.name,o.value)}),t.children().forEach(o=>{n.add(o.cloneNode(!0))}),l.before(n),k(n,c,u),n[it]=!0,t[A].push(n)}f++},c=>{for(;t[A].length>c.length;)t[A].pop().remove()}),!0}});function L({name:t,alias:e,arg:r,tmpl:u,exec:l}){let f=`^(${t}${r?":":""}${e?`|${e})`:")"}${r?"(.*)$":"$"}`,c=new RegExp(f,"i");F[t]={name:t,alias:e,arg:r,tmpl:u,exec:l,check:c}}function St(t){for(let e in F){let r=F[e],u=r.check.exec(t);if(u){let l=u[2];return{...r,arg:l}}}}function wt(t){return t.replace(/[{}()[\]]/g,"").split(",").map(e=>(e.includes(":")?e.split(":")[1].trim():e).trim())}function Tt(t){return t[Symbol.iterator]?{iterator:[...t],type:j}:G(t)?{iterator:Array(t<0?0:0|t).fill(0).map((e,r)=>r),type:O}:N(t)?{iterator:Object.entries(t).map(e=>e.reverse()),type:R}:{iterator:t,type:Nt}}function ct(t,e,r=null){let u=Object.keys(e).filter(Y),f=W(u,`return ( ${t} ); `).apply(r,u.map(c=>e[c]));if(!q(f))throw ot(t,"NaN (Not a Number)");return f}function Lt(t,e,r,u){let l="__$$i",f="__$$c",c="__$$f",[n,o]=t.split(" of ");n=n.trim(),o=o.trim();let d=ct(o,e)||[],{iterator:m,type:y}=Tt(d);y===R&&!n.startsWith("[")&&(n=`[${n.replace(/(^\()|(\)$)/g,"")}]`);let M=wt(n),D=n.startsWith("(")?n:`(${n})`,b=Object.keys(e).filter(Y),C=` ${l}.forEach(${D} => { ${f}({${b}${b.length?",":""}${M.join(",")}}); }); ${c}(${l}); `;return W([...b,l,f,c],C)(...b.map(S=>e[S]),m,r,u)}function k(t,e,r,u=!0){if(u&&t[it])return;let l=t.outerHTML();t[T]=t[T]||[];let f=t.attributes();for(let n of[...f]){let o=n.name,d=St(o);d&&(t[T].push({...d,expr:n.value}),t.removeAttribute(o))}let c=!1;for(let n of t[T]){c=n.tmpl||c;try{if(n.exec(t,{...n,data:e,evalExpr:ct,error:r,code:l}))return}catch(o){r(o.message,{directive:n.name,argument:n.arg,expression:n.expr,toString(){return`${n.name}${n.arg?":"+n.arg:""}="${n.expr}"`}},l)}}if(!c)for(let n of t.childNodes())n.el[P]?k(bt(n.el),e,r):n.el?.nodeType===1&&k(n,e,r)}function Ct(t={},e=Et){k(this,t,e),this.dispatchEvent(new Event("render"))}function _t(){return this.outerHTML().replaceAll("<!-- ref -->","")}function kt(t){t.install(et),t.extendInstance({render:Ct,source:_t}),t.extendSetup({extendTemplate:{defineDirective:L,getDirective(e){return F[e]}}})}var Bt=kt;export{Bt as default};