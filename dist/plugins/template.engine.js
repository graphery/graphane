/* graphane - 0.1.0-alpha.5 */ var ot="function",st="undefined",O="object",ct="string",Y="array",D="number";var g=t=>typeof t===O,C=t=>typeof t===ct,T=t=>typeof t===ot,G=t=>typeof t===D&&!isNaN(t),H=t=>typeof t===st;var N=t=>Array.isArray(t);var P=new Map;var ft=async function(){}.constructor;function U(t,e,n=!1){let o=`${t.join(",")} ${e}`;if(P.has(o))return P.get(o);let f=new(n?ft:Function)(...t,e);return P.set(o,f),f}var v="SVG",V="animate",at="none",ut="freeze",lt="path",Z="d",pt="transform",Q="rotate",B="translate",mt="offset",K="inherit",W="finished",ht=[Q,"skewX","skewY"],dt="deg",w="px",q="ms",$t=["width","height"],J=!1;if(window.matchMedia){let t=window.matchMedia("(prefers-reduced-motion: reduce)");J=t.matches,t.addEventListener("change",()=>{J=t.matches})}var xt=t=>t.replace(/([A-Z])/g,"-$1").toLowerCase();function yt(t,e={duration:200},n=null,o=null){let f=this.gSVG,s=r=>{let c=g(r)?Object.assign({},r):{duration:r};return J&&(c.duration=0),c.fill=at,c},a=r=>{r=N(r)?r:[r];let c=window.getComputedStyle(this._el),u=[],l=new Set;for(let $ of r){let h=Object.assign({},$);for(let m in h)!(m in c)||$t.includes(m)?l.add(m):m===Z?h.d=`${lt}("${h.d}")`:m===pt&&(h.transform=b(h.transform));u.push(h)}return p(l,u),u},i=[],p=(r,c)=>{if(r.size){let u=new KeyframeEffect(null,c).getKeyframes(),l=this.closest(v)?this.closest(v).getCurrentTime()*1e3:0;for(let $ of r){let h=f(V).attributeName($).dur(y.duration+q).begin((0|l+(e.delay||0))+q).fill(ut);if(c.length===1)h.to(c[0][$]);else{let m=[],_=[];for(let R in u){let it=u[R];$ in c[R]&&(m.push(it.computedOffset),_.push(c[R][$]))}m[0]!==0&&(m.unshift(0),_.unshift(this[$]()||K)),m[m.length-1]!==1&&(m.push(1),_.push(this[$]()||K)),h.keyTimes(m.join(";")).values(_.join(";"))}i.push(h),h.attachTo(this)}}},b=r=>{C(r)&&(r=JSON.parse("{"+r.replace(/\s*\(\s*/g,":[").replace(/\s*\)\s*/g,"],").split(/\s*,\s*|\s.*/).join(",").replace(/(\w+):/g,'"$1":').replace(/,$/,"")+"}"));let c="";for(let u in r)if(u===Q){let l=d(r[u]);l.length>1&&(c+=`${B}(${l[1]}${w},${l[2]}${w}) `),c+=`${u}(${l[0]}${L(u)}) `,l.length>1&&(c+=`${B}(-${l[1]}${w},-${l[2]}${w}) `)}else c+=`${u}(${d(r[u]).map(l=>l+L(u)).join(",")}) `;return c},d=r=>N(r)?r:String(r).split(/\s+|,/),L=r=>ht.includes(r)?dt:r===B?w:"",j=r=>C(r)?r.replace(/(deg)|(px)/g,"").trim():r,I=r=>r.replace(/(path\s*\(\s*["'])|(["']\s*\)\s*$)/g,"").trim().replace(/([a-zA-Z])\s*/g,"$1").replace(/\s+/g,","),y=s(e),S=a(t),A=this._el.animate(S,y);return A.ready.then(()=>T(n)&&n.call(this,A)),A.finished.then(()=>{let r=S[S.length-1];for(let c in r){let u=xt(c);/^text-/.test(u)?this._el.style[c]=r[c]:c!==mt&&c in r&&this._el.setAttribute(u,u===Z?I(r[c]):j(r[c]))}i.forEach(c=>{c[W](!0);let u=this._el.querySelectorAll(V),l=this._el.querySelectorAll(`${V}[${W}]`);u.length===l.length&&u.forEach($=>$.remove())}),T(o)&&o.call(this,A)}),this}function X(t){t.extendInstance({animateTo:yt})}var tt=Symbol(),et=Symbol(),x=Symbol(),F=Symbol(),M=Symbol(),gt="unknown",nt="Graphane SVG Template Engine:",z=[];E({name:"g-content",execute(t,{expression:e,data:n,evalExpression:o}){t.content(o(e,n))}});E({name:"g-if",execute(t,{expression:e,data:n,evalExpression:o}){t.style.visibility(o(e,n)?"inherit":"hidden")}});E({name:"g-bind",alias:":",argument:!0,execute(t,{expression:e,argument:n,data:o,evalExpression:f}){let s={...o,$$:n==="d"?t.$d:n==="transform"?t.$transform:{}};s.$$.dynamic=(i,p=200,b=0)=>{t.animateTo((N(i)?i:[i]).map(d=>g(d)&&"offset"in d?{[n]:d.value,offset:d.offset}:{[n]:d}),{duration:p,delay:b})};let a=f(e,s);if(n==="class"){if(N(a)){t.classList.add(...a.filter(i=>!!i));return}if(g(a)){Object.entries(a).forEach(([i,p])=>{p?t.classList.add(i):t.classList.remove(i)});return}a&&t.classList.add(a);return}if(n==="style"){Object.entries(a).forEach(([i,p])=>t.style[i](p));return}H(a)||t[n](a)}});E({name:"g-on",alias:"@",argument:!0,execute(t,{expression:e,argument:n,data:o,evalExpression:f}){t[M]=t[M]||{};let s=t[M][n]=t[M][n]||new Map;s.has(e)&&t.removeEventListener(n,s.get(e));let a=function(i){let p=f(e,o,t);T(p)&&p.call(t,i)};t.addEventListener(n,a),s.set(e,a),n==="init"&&!t[tt]&&(t[tt]=!0,t.dispatchEvent(new Event("init")))}});E({name:"g-for",template:!0,execute(t,{expression:e,data:n}){t[x]=t[x]||[];let o=0;St(e,n,f=>{if(t[x][o])k(t[x][o],f,!1);else{let s=t.gSVG("g");t.children().forEach(a=>{s.add(a.cloneNode(!0))}),k(s,f),t.before(s.el),s[et]=!0,t[x].push(s)}o++},f=>{for(;t[x].length>f.length;)t[x].pop().remove()})}});function E({name:t,alias:e,argument:n,template:o,execute:f}){let s=`^(${t}${n?":":""}${e?`|${e})`:")"}${n?"(.*)$":"$"}`,a=new RegExp(s,"i");z.push({name:t,alias:e,argument:n,template:o,execute:f,check:a})}function Nt(t){for(let e of z){let n=e.check.exec(t);if(n){let o=n[2];return{...e,argument:o}}}}function Et(t){return t.replace(/[{}()[\]]/g,"").split(",").map(e=>e.includes(":")?e.split(":")[1]:e).map(e=>e.trim())}function bt(t){return t[Symbol.iterator]?{iterator:[...t],type:Y}:G(t)?{iterator:Array(t<0?0:t).fill(0).map((e,n)=>n),type:D}:g(t)?{iterator:Object.entries(t).map(e=>e.reverse()),type:O}:{iterator:t,type:gt}}function rt(t,e,n=null){try{return U(Object.keys(e).filter(f=>!G(f)),`return ( ${t} ); `).apply(n,Object.values(e))}catch(o){console.warn(nt,o.message)}}function St(t,e,n,o){let f="__$$iterator",s="__$$callback",a="__$$final";try{let[i,p]=t.split(" of ");i=i.trim(),p=p.trim();let b=rt(p,e)||[],{iterator:d,type:L}=bt(b);L===O&&!i.startsWith("[")&&(i=`[${i.replace(/(^\()|(\)$)/g,"")}]`);let j=Et(i),I=i.startsWith("(")?i:`(${i})`,y=Object.keys(e),S=` ${f}.forEach(${I} => { ${s}({${y}${y.length?",":""}${j.join(",")}}); }); ${a}(${f}); `;return U([...y,f,s,a],S)(...Object.values(e),d,n,o)}catch(i){console.warn(nt,i)}}function k(t,e,n=!0){if(n&&t[et])return;t[F]=t[F]||[];let o=t.attributes();for(let s of[...o]){let a=s.name,i=Nt(a);i&&(t[F].push({...i,expression:s.value}),t.removeAttribute(a))}let f=!1;for(let s of t[F])s.execute(t,{...s,data:e,evalExpression:rt}),f=s.template||f;if(!f)for(let s of t.children())k(s,e)}function At(t={}){k(this,t),this.dispatchEvent(new Event("render"))}function kt(t){t.install(X),t.extendInstance({render:At}),t.extendSetup({extendTemplate:{defineDirective:E,obtainDirective(e){return z.find(n=>n.name===e)}}})}export{kt as svgPlugin}; //# sourceMappingURL=template.engine.js.map