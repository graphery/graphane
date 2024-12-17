/* graphane - 1.0.0-beta.next */ (()=>{var lt="function",pt="undefined",I="object",mt="string",X="array",v="number";var b=t=>typeof t===I,O=t=>typeof t===mt,_=t=>typeof t===lt,j=t=>typeof t===v&&!isNaN(t),K=t=>!Number.isNaN(t),B=t=>typeof t===pt;var w=t=>Array.isArray(t);var Z=t=>t.replace(/-([a-z0-9])/g,(e,n)=>n.toUpperCase());var G=new Map;var ht=async function(){}.constructor;function P(t,e,n=!1){let a=`${t.join(",")} ${e}`;if(G.has(a))return G.get(a);let f=new(n?ht:Function)(...t,e);return G.set(a,f),f}function W(t){try{return new Function(`let ${t} = 0`),!0}catch{return!1}}var Y="animate",dt="path",Q="d",tt="transform",rt="rotate",A="translate",et="inherit",nt="finished",$t=[rt,"skewX","skewY"],xt=[A,"width","height","x","y","cx","cy","r","rx","ry","dx","dy"],gt=(t,e)=>["text","tspan"].includes(t)&&["x","y"].includes(e),z=!1;if(window.matchMedia){let t=window.matchMedia("(prefers-reduced-motion: reduce)");z=t.matches,t.addEventListener("change",()=>{z=t.matches})}var yt=t=>t.replace(/([A-Z])/g,"-$1").toLowerCase();function Nt(t,e={duration:200},n=null,a=null){let f=this.gSVG,l=i=>{let s=b(i)?{...i}:{duration:i};return z&&(s.duration=0),s.fill="none",s},c=i=>{i=w(i)?i:[i];let s=window.getComputedStyle(this._el),u=[],p=new Set;for(let x of i){let d={};for(let E in x){let $=Z(E);d[$]=y(x[E],$),!($ in s)||gt(this.tagName(),$)?p.add($):$===Q?d.d=`${dt}("${d.d}")`:$===tt&&(d.transform=h(d.transform))}u.push(d)}return o(p,u),u},r=[],o=(i,s)=>{if(i.size){let u=new KeyframeEffect(null,s).getKeyframes();for(let p of i){let x=f(Y).attributeName(p).dur(C.duration+"ms").fill("freeze");if(s.length===1)x.to(s[0][p]);else{let d=[],E=[];for(let $ in u){let ft=u[$];p in s[$]&&(d.push(ft.computedOffset),E.push(s[$][p]))}d[0]!==0&&(d.unshift(0),E.unshift(this[p]()||et)),d[d.length-1]!==1&&(d.push(1),E.push(this[p]()||et)),x.keyTimes(d.join(";")).values(E.join(";"))}r.push(x),x.attachTo(this),x.beginElementAt(C.delay||0)}}},h=i=>{O(i)&&(i=JSON.parse("{"+i.replace(/\s*\(\s*/g,":[").replace(/\s*\)\s*/g,"],").split(/\s*,\s*|\s.*/).join(",").replace(/(\w+):/g,'"$1":').replace(/,$/,"")+"}"));let s="";for(let u in i)if(u===rt){let p=m(i[u]);p.length>1&&(s+=`${A}(${y(p[1],A)},${y(p[2],A)}) `),s+=`${u}(${y(p[0],u)}) `,p.length>1&&(s+=`${A}(-${y(p[1],A)},-${y(p[2],A)}) `)}else s+=`${u}(${m(i[u]).map(p=>y(p,u)).join(",")}) `;return s},m=i=>w(i)?i:String(i).split(/\s+|,/),y=(i,s)=>$t.includes(s)?i+"deg":xt.includes(s)?i+"px":i,k=i=>O(i)?i.replace(/(deg)|(px)/g,"").trim():i,M=i=>i.replace(/(path\s*\(\s*["'])|(["']\s*\)\s*$)/g,"").trim().replace(/([a-zA-Z])\s*/g,"$1").replace(/\s+/g,","),V=i=>{let s=/translate\((.*)px,(.*)px\) rotate\((.*)deg\) translate\((.*)px,(.*)px\)\s+/,u=s.exec(i);return u&&Number(u[1])===Number(u[4])*-1&&Number(u[2])===Number(u[5])*-1?i=i.replace(s,`rotate(${u[3]}, ${u[1]}, ${u[2]})`):i=k(i),i},C=l(e),N=c(t),S=this._el.animate(N,C);return S.ready.then(()=>_(n)&&n.call(this,S)),S.finished.then(()=>{let i=N[N.length-1];for(let s in i){let u=yt(s);u.startsWith("text-")?this._el.style[s]=i[s]:s!=="offset"&&s in i&&this._el.setAttribute(u,u===Q?M(i[s]):u===tt?V(i[s]):k(i[s]))}r.forEach(s=>{s[nt](!0);let u=this._el.querySelectorAll(Y),p=this._el.querySelectorAll(`${Y}[${nt}]`);u.length===p.length&&u.forEach(x=>x.remove())}),_(a)&&a.call(this,S)}),this}function Et(t){t.extendInstance({animateTo:Nt})}var it=Et;var ot=Symbol(),ct=Symbol(),g=Symbol(),T=Symbol(),U=Symbol(),q=Symbol(),st=Symbol(),H="error",bt="unknown",F={},D=(t,e)=>new Error(`The expression "${t}" return ${e} value`),At=(t,e,n)=>{throw new Error(t+` in ${e} `+n)},St=(t=>e=>t[e]||e)("attributeName attributeType baseFrequency calcMode clipPathUnits diffuseConstant edgeMode gradientTransform gradientUnits kernelMatrix kernelUnitLength lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY requiredExtensions requiredFeatures specularConstant specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength viewBox xChannelSelector yChannelSelector zoomAndPan".split(" ").reduce((t,e)=>(t[e.toLowerCase()]=e,t),{}));function at(t){if(!t?.el?.parentNode)return null;let e=document.createComment(" ref ");return t.parentNode().insertBefore(e,t.el),t.remove(),e[q]=t,e}function wt(t){let e=t[q];return t.parentNode.insertBefore(e.el,t),t.remove(),e}L({name:"g-content",exec(t,{expr:e,data:n,evalExpr:a}){let f={...n,$$:{fromURL:async o=>{let h=await fetch(o);if(h.status===200)return h.text();console.warn(`Failed to load URL: ${o} (${h.status})`)},currentContent:t.content}},l=a(e,f),c=new CustomEvent("load",{bubbles:!0,detail:t}),r=o=>B(o)?"":o;b(l)&&l.then?l.then(o=>{t.content(r(o)),t.dispatchEvent(c)}):(t.content(r(l)),t.dispatchEvent(c))}});L({name:"g-if",exec(t,{expr:e,data:n,evalExpr:a}){if(!a(e,n))return t[g]&&(t[g].forEach(f=>f.remove()),delete t[g]),at(t)}});L({name:"g-bind",alias:":",arg:!0,exec(t,{expr:e,arg:n,data:a,evalExpr:f}){n=St(n);let l={...a,$$:["d","transform"].includes(n)?t["$"+n]:{}};l.$$.currentValue=t[n],l.$$.dynamic=(r,o=200,h=0)=>(t.animateTo((w(r)?r:[r]).map(m=>b(m)&&"offset"in m?{[n]:m.value,offset:m.offset}:{[n]:m}),{duration:o,delay:h}),st);let c=f(e,l);if(B(c))throw D(e,"undefined");if(n==="class"){if(w(c)){t.classList.add(...c.filter(r=>!!r));return}if(b(c)){Object.entries(c).forEach(([r,o])=>{o?t.classList.add(r):t.classList.remove(r)});return}c&&t.classList.add(c);return}if(n==="style"){Object.entries(c).forEach(([r,o])=>t.style[r](o));return}c!==st&&t[n](c)}});L({name:"g-on",alias:"@",arg:!0,exec(t,{expr:e,arg:n,data:a,evalExpr:f,error:l,code:c}){t[U]=t[U]||{};let r=t[U][n]=t[U][n]||new Map;r.has(e)&&t.removeEventListener(n,r.get(e));let o=function(h){try{let m=f(e,a,t);_(m)&&m.call(t,h)}catch(m){l(m.message,{directive:"g-on",argument:n,expression:e,toString(){return`g-on:${n}="${e}"`}},c)}};t.addEventListener(n,o),r.set(e,o),n==="init"&&!t[ot]&&(t[ot]=!0,t.dispatchEvent(new Event("init")))}});L({name:"g-for",tmpl:!0,exec(t,{expr:e,data:n,error:a}){t[g]=t[g]||[];let f=t.gSVG(at(t)),l=0;return _t(e,n,c=>{if(t[g][l])R(t[g][l],c,a,!1);else{let r=t.gSVG(t.tagName());r[T]=t[T].filter(o=>o.name!=="g-for"),[...t.attributes()].forEach(o=>{o.name!=="g-for"&&r.setAttribute(o.name,o.value)}),t.children().forEach(o=>{r.add(o.cloneNode(!0))}),f.before(r),R(r,c,a),r[ct]=!0,t[g].push(r)}l++},c=>{for(;t[g].length>c.length;)t[g].pop().remove()}),!0}});function L({name:t,alias:e,arg:n,tmpl:a,exec:f}){let l=`^(${t}${n?":":""}${e?`|${e})`:")"}${n?"(.*)$":"$"}`,c=new RegExp(l,"i");F[t]={name:t,alias:e,arg:n,tmpl:a,exec:f,check:c}}function Tt(t){for(let e in F){let n=F[e],a=n.check.exec(t);if(a){let f=a[2];return{...n,arg:f}}}}function Lt(t){return t.replace(/[{}()[\]]/g,"").split(",").map(e=>(e.includes(":")?e.split(":")[1].trim():e).trim())}function Ct(t,e){return t[Symbol.iterator]?e==="of"?{iterator:[...t],type:X}:{type:H}:j(t)?{iterator:Array(t<0?0:0|t).fill(0).map((n,a)=>a+(e==="of"?0:1)),type:v}:b(t)?e==="in"?{iterator:Object.entries(t).map(n=>n.reverse()),type:I}:{type:H}:{iterator:t,type:bt}}function ut(t,e,n=null){let a=Object.keys(e).filter(W),l=P(a,`return ( ${t} ); `).apply(n,a.map(c=>e[c]));if(!K(l))throw D(t,"NaN (Not a Number)");return l}function _t(t,e,n,a){let f="__$$i",l="__$$c",c="__$$f",r=t.match(/^\s*([\s\S]+?)\s*(of|in)\s*([\s\S]+?)\s*$/);if(!r)throw D(t,'an invalid "g-for" expression');let[,o,h,m]=r;o=o.trim(),m=m.trim();let y=ut(m,e)||[],{iterator:k,type:M}=Ct(y,h);if(M===H)throw D(t,'an invalid "g-for" expression');M===I&&!o.startsWith("[")&&(o=`[${o.replace(/(^\()|(\)$)/g,"")}]`);let V=Lt(o),C=o.startsWith("(")?o:`(${o})`,N=Object.keys(e).filter(W),S=` ${f}.forEach(${C} => { ${l}({${N}${N.length?",":""}${V.join(",")}}); }); ${c}(${f}); `;return P([...N,f,l,c],S)(...N.map(s=>e[s]),k,n,a)}function R(t,e,n,a=!0){if(a&&t[ct])return;let f=t.outerHTML();t[T]=t[T]||[];let l=t.attributes();for(let r of[...l]){let o=r.name,h=Tt(o);h&&(t[T].push({...h,expr:r.value}),t.removeAttribute(o))}let c=!1;for(let r of t[T]){c=r.tmpl||c;try{if(r.exec(t,{...r,data:e,evalExpr:ut,error:n,code:f}))return}catch(o){n(o.message,{directive:r.name,argument:r.arg,expression:r.expr,toString(){return`${r.name}${r.arg?":"+r.arg:""}="${r.expr}"`}},f)}}if(!c)for(let r of t.childNodes())r.el[q]?R(wt(r.el),e,n):r.el?.nodeType===1&&R(r,e,n)}function Rt(t={},e=At){R(this,t,e),this.dispatchEvent(new Event("render"))}function kt(){return this.outerHTML().replaceAll("<!-- ref -->","")}function Mt(t){t.install(it),t.extendInstance({render:Rt,source:kt}),t.extendSetup({extendTemplate:{defineDirective:L,getDirective(e){return F[e]}}})}var J=Mt;globalThis.gSVG&&globalThis.gSVG.install(J);customElements.whenDefined("g-composer").then(t=>{t.install(J)});})();