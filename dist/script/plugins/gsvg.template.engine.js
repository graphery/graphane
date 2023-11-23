/* graphane - 0.1.0-alpha.5 */ var st="function",ct="undefined",O="object",ft="string",Y="array",j="number";var g=t=>typeof t===O,C=t=>typeof t===ft,T=t=>typeof t===st,H=t=>typeof t===j&&!isNaN(t),Z=t=>typeof t===ct;var N=t=>Array.isArray(t);var G=new Map;var at=async function(){}.constructor;function V(t,e,n=!1){let i=`${t.join(",")} ${e}`;if(G.has(i))return G.get(i);let f=new(n?at:Function)(...t,e);return G.set(i,f),f}function P(t){try{return new Function(`let ${t} = 0`),!0}catch{return!1}}var K="SVG",U="animate",ut="none",lt="freeze",pt="path",W="d",mt="transform",X="rotate",B="translate",ht="offset",q="inherit",v="finished",dt=[X,"skewX","skewY"],$t="deg",w="px",Q="ms",yt=["width","height"],J=!1;if(window.matchMedia){let t=window.matchMedia("(prefers-reduced-motion: reduce)");J=t.matches,t.addEventListener("change",()=>{J=t.matches})}var xt=t=>t.replace(/([A-Z])/g,"-$1").toLowerCase();function gt(t,e={duration:200},n=null,i=null){let f=this.gSVG,o=r=>{let c=g(r)?Object.assign({},r):{duration:r};return J&&(c.duration=0),c.fill=ut,c},a=r=>{r=N(r)?r:[r];let c=window.getComputedStyle(this._el),u=[],l=new Set;for(let $ of r){let h=Object.assign({},$);for(let m in h)!(m in c)||yt.includes(m)?l.add(m):m===W?h.d=`${pt}("${h.d}")`:m===mt&&(h.transform=S(h.transform));u.push(h)}return p(l,u),u},s=[],p=(r,c)=>{if(r.size){let u=new KeyframeEffect(null,c).getKeyframes(),l=this.closest(K)?this.closest(K).getCurrentTime()*1e3:0;for(let $ of r){let h=f(U).attributeName($).dur(y.duration+Q).begin((0|l+(e.delay||0))+Q).fill(lt);if(c.length===1)h.to(c[0][$]);else{let m=[],_=[];for(let D in u){let ot=u[D];$ in c[D]&&(m.push(ot.computedOffset),_.push(c[D][$]))}m[0]!==0&&(m.unshift(0),_.unshift(this[$]()||q)),m[m.length-1]!==1&&(m.push(1),_.push(this[$]()||q)),h.keyTimes(m.join(";")).values(_.join(";"))}s.push(h),h.attachTo(this)}}},S=r=>{C(r)&&(r=JSON.parse("{"+r.replace(/\s*\(\s*/g,":[").replace(/\s*\)\s*/g,"],").split(/\s*,\s*|\s.*/).join(",").replace(/(\w+):/g,'"$1":').replace(/,$/,"")+"}"));let c="";for(let u in r)if(u===X){let l=d(r[u]);l.length>1&&(c+=`${B}(${l[1]}${w},${l[2]}${w}) `),c+=`${u}(${l[0]}${L(u)}) `,l.length>1&&(c+=`${B}(-${l[1]}${w},-${l[2]}${w}) `)}else c+=`${u}(${d(r[u]).map(l=>l+L(u)).join(",")}) `;return c},d=r=>N(r)?r:String(r).split(/\s+|,/),L=r=>dt.includes(r)?$t:r===B?w:"",M=r=>C(r)?r.replace(/(deg)|(px)/g,"").trim():r,R=r=>r.replace(/(path\s*\(\s*["'])|(["']\s*\)\s*$)/g,"").trim().replace(/([a-zA-Z])\s*/g,"$1").replace(/\s+/g,","),y=o(e),b=a(t),A=this._el.animate(b,y);return A.ready.then(()=>T(n)&&n.call(this,A)),A.finished.then(()=>{let r=b[b.length-1];for(let c in r){let u=xt(c);/^text-/.test(u)?this._el.style[c]=r[c]:c!==ht&&c in r&&this._el.setAttribute(u,u===W?R(r[c]):M(r[c]))}s.forEach(c=>{c[v](!0);let u=this._el.querySelectorAll(U),l=this._el.querySelectorAll(`${U}[${v}]`);u.length===l.length&&u.forEach($=>$.remove())}),T(i)&&i.call(this,A)}),this}function tt(t){t.extendInstance({animateTo:gt})}var et=Symbol(),nt=Symbol(),x=Symbol(),F=Symbol(),k=Symbol(),Nt="unknown",rt="Graphane SVG Template Engine:",z=[];E({name:"g-content",execute(t,{expression:e,data:n,evalExpression:i}){t.content(i(e,n))}});E({name:"g-if",execute(t,{expression:e,data:n,evalExpression:i}){t.style.visibility(i(e,n)?"inherit":"hidden")}});E({name:"g-bind",alias:":",argument:!0,execute(t,{expression:e,argument:n,data:i,evalExpression:f}){let o={...i,$$:n==="d"?t.$d:n==="transform"?t.$transform:{}};o.$$.dynamic=(s,p=200,S=0)=>{t.animateTo((N(s)?s:[s]).map(d=>g(d)&&"offset"in d?{[n]:d.value,offset:d.offset}:{[n]:d}),{duration:p,delay:S})};let a=f(e,o);if(n==="class"){if(N(a)){t.classList.add(...a.filter(s=>!!s));return}if(g(a)){Object.entries(a).forEach(([s,p])=>{p?t.classList.add(s):t.classList.remove(s)});return}a&&t.classList.add(a);return}if(n==="style"){Object.entries(a).forEach(([s,p])=>t.style[s](p));return}Z(a)||t[n](a)}});E({name:"g-on",alias:"@",argument:!0,execute(t,{expression:e,argument:n,data:i,evalExpression:f}){t[k]=t[k]||{};let o=t[k][n]=t[k][n]||new Map;o.has(e)&&t.removeEventListener(n,o.get(e));let a=function(s){let p=f(e,i,t);T(p)&&p.call(t,s)};t.addEventListener(n,a),o.set(e,a),n==="init"&&!t[et]&&(t[et]=!0,t.dispatchEvent(new Event("init")))}});E({name:"g-for",template:!0,execute(t,{expression:e,data:n}){t[x]=t[x]||[];let i=0;At(e,n,f=>{if(t[x][i])I(t[x][i],f,!1);else{let o=t.gSVG("g");t.children().forEach(a=>{o.add(a.cloneNode(!0))}),I(o,f),t.before(o.el),o[nt]=!0,t[x].push(o)}i++},f=>{for(;t[x].length>f.length;)t[x].pop().remove()})}});function E({name:t,alias:e,argument:n,template:i,execute:f}){let o=`^(${t}${n?":":""}${e?`|${e})`:")"}${n?"(.*)$":"$"}`,a=new RegExp(o,"i");z.push({name:t,alias:e,argument:n,template:i,execute:f,check:a})}function Et(t){for(let e of z){let n=e.check.exec(t);if(n){let i=n[2];return{...e,argument:i}}}}function St(t){return t.replace(/[{}()[\]]/g,"").split(",").map(e=>e.includes(":")?e.split(":")[1]:e).map(e=>e.trim())}function bt(t){return t[Symbol.iterator]?{iterator:[...t],type:Y}:H(t)?{iterator:Array(t<0?0:0|t).fill(0).map((e,n)=>n),type:j}:g(t)?{iterator:Object.entries(t).map(e=>e.reverse()),type:O}:{iterator:t,type:Nt}}function it(t,e,n=null){try{let i=Object.keys(e).filter(P);return V(i,`return ( ${t} ); `).apply(n,i.map(o=>e[o]))}catch(i){console.warn(rt,i.message,` `,t)}}function At(t,e,n,i){let f="__$$iterator",o="__$$callback",a="__$$final";try{let[s,p]=t.split(" of ");s=s.trim(),p=p.trim();let S=it(p,e)||[],{iterator:d,type:L}=bt(S);L===O&&!s.startsWith("[")&&(s=`[${s.replace(/(^\()|(\)$)/g,"")}]`);let M=St(s),R=s.startsWith("(")?s:`(${s})`,y=Object.keys(e).filter(P),b=` ${f}.forEach(${R} => { ${o}({${y}${y.length?",":""}${M.join(",")}}); }); ${a}(${f}); `;return V([...y,f,o,a],b)(...y.map(r=>e[r]),d,n,i)}catch(s){console.warn(rt,s)}}function I(t,e,n=!0){if(n&&t[nt])return;t[F]=t[F]||[];let i=t.attributes();for(let o of[...i]){let a=o.name,s=Et(a);s&&(t[F].push({...s,expression:o.value}),t.removeAttribute(a))}let f=!1;for(let o of t[F])o.execute(t,{...o,data:e,evalExpression:it}),f=o.template||f;if(!f)for(let o of t.children())I(o,e)}function Tt(t={}){I(this,t),this.dispatchEvent(new Event("render"))}function Dt(t){t.install(tt),t.extendInstance({render:Tt}),t.extendSetup({extendTemplate:{defineDirective:E,obtainDirective(e){return z.find(n=>n.name===e)}}})}export{Dt as svgPlugin}; //# sourceMappingURL=gsvg.template.engine.js.map