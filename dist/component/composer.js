/* graphane - 0.1.0-alpha.12 */ (()=>{var Be="function",Jt="undefined",$="object",v="string",W="array",w="number",U="boolean",He="date",Ge="symbol",D="",rt=",";var ze=";",E=t=>typeof t===$,N=t=>typeof t===v,l=t=>typeof t===Be,Kt=t=>typeof t===w&&!isNaN(t),y=t=>typeof t===Jt,Zt=t=>typeof t===Ge,Qt=t=>typeof t===U,_=t=>Array.isArray(t),$t=t=>t instanceof Date&&!isNaN(t),O=t=>t===null,it=t=>t.replace(/-([a-z0-9])/g,(e,n)=>n.toUpperCase());function qe(t){if(N(t))try{let e=t.replace(/^\s*{/,"").replace(/}\s*$/,"").split(/((?:[^;^,"']|"[^"]*"|'[^']*')+)/).filter(n=>!["",";",","].includes(n.trim())).map(n=>n.split(":")).map(n=>`"${n[0].trim()}":${I(n[1].trim(),void 0,!0)}`).join(",");return JSON.parse(`{${e}}`)}catch(e){console.error(e);return}else if(E(t))return t}function jt(t){if(N(t))return t.trim().startsWith("[")?(t.match(/\[(.*?)[^\]]]/g)||[]).map(e=>jt(e.substring(1,e.length-1))):t.split(/[,;]/).map(e=>I(e.trim()));if(_(t))return t}function I(t,e,n=!1){if(!N(t))return t;if(t=We(t.trim()),e===W)return jt(t);if(e===$)return qe(t);if(y(e)||e===w){if(y(t)||t==="")return;let r=+t;if(!Number.isNaN(r)||e===w)return r}if(y(e)||e===U){if(t==="true")return!0;if(t==="false")return!1;if(e===U)return t==="0"?!1:!!t}if(e===He){try{let r=new Date(t);if(!Number.isNaN(r.getTime()))return r}catch{}return}if(y(e)||e===v)return n?`"${t}"`:t}function We(t){return t[0]==="'"&&t[t.length-1]==="'"||t[0]==='"'&&t[t.length-1]==='"'?t.substring(1,t.length-1):t}function te(t){return/^\s*{(.|\s)*}\s*$/.test(t)}function ee(t){return/^\s*\[(.|\s)*]\s*$/.test(t)}function ne(t){let e=[];return t.split(/(\r\n|\r|\n)/).map(n=>n.trim()).filter(n=>n).reduce((n,r,i)=>{let c={},o=r.split(/((?:[^;^,"']|"[^"]*"|'[^']*')+)/).filter(s=>![D,ze,rt].includes(s.trim()));return i===0?(e=[...o.map(s=>I(s))],n):(o.forEach((s,u)=>{c[e[u]]=I(s)}),n.push(c),n)},[])}function St(t){let e=`return (${t});`,n=new Function(e)();return typeof n=="function"?n():n}var re=new WeakSet,Q=!1,At=(t,e)=>l(e)?function n(r){if(re.has(r))return r;for(let c in r)E(r[c])&&!O(r[c])&&(r[c]=n(r[c]));let i=new Proxy(r,{get(c,o){let s=Reflect.get(r,o);return l(s)&&$t(c)&&N(o)&&o.substring(0,3)==="set"&&l(e)&&(s=function(...u){let h=Reflect.get(c,o).apply(c,u);return!Q&&e(t),h}),$t(c)?s.bind(c):s},set(c,o,s){let u,h=c[o]===s;return E(s)&&!O(s)?u=Reflect.set(c,o,n(s)):u=Reflect.set(c,o,s),!Q&&!h&&e(t),u},deleteProperty(c,o){let s=Reflect.deleteProperty(c,o);return!Q&&e(t),s}});return re.add(i),i}(t):t;At.stop=()=>Q=!0;At.start=()=>Q=!1;var st=At;var j=!1,ot=!0;function Ye(t){return t===null?null:t.constructor?new t.constructor:{}}function F(t){if(!E(t))return t;let e=t===null?null:Object.assign(Ye(t),t);for(let n in e)E(e[n])&&(e[n]=F(e[n]));return e}function ie(t,e){let n=[],r=[];function i(o,s){if(o===null||s===null)return j;if(l(o.valueOf)&&l(s.valueOf)&&(o!==o.valueOf()||s!==s.valueOf()))return o.valueOf()===s.valueOf()&&o.constructor===s.constructor;if(n.indexOf(o)>-1&&r.indexOf(s)>-1)return ot;let u=Object.keys(o),h=Object.keys(s);if(u.length!==h.length)return j;if(u.length>0){n.push(o),r.push(s);let d=u.length;for(;d--;){let x=u[d];if(!c(o[x],s[x]))return j}}return ot}function c(o,s){if(o===s)return ot;let u=typeof o;return u!==typeof s?j:u===w&&isNaN(o)&&isNaN(s)?ot:u===$?i(o,s):j}return c(t,e)}function se(t,e){let n=t,r=N(e)?e.split("."):e;for(let i=0;i<r.length;i++){if(y(n[r[i]]))return;n=n[r[i]]}return n}var ut=globalThis.GRAPHANE_PREFIX||"g-",Xe=Symbol(),m=Symbol(),k=Symbol(),A=Symbol(),Tt=Object.defineProperty;function Je(t,e,n,r=!1){if(!(t.ready===!1||!e))if(r)n?t.setAttribute(e,D):t.removeAttribute(e);else{let i=O(n)||y(n)?D:n.toString();t.hasAttribute(e)&&t.getAttribute(e)!==i&&t.setAttribute(e,i)}}function Ke(t){this[m]={};let e=t;do{let n=ct.get(e);for(let r in n)if(n.hasOwnProperty(r)&&this.hasOwnProperty(r)){let i=this[r];delete this[r],this[r]=y(i)?F(n[r]):i}else r in this[m]||(this[m][r]=F(n[r]));e=Object.getPrototypeOf(e)}while(e!==HTMLElement)}function Ze(){new MutationObserver(t=>{for(let e of t)if(!e.attributeName){this[A]("update");break}(y(this.ready)||this.ready)&&l(this[k])&&this[k](t)}).observe(this,{attributes:!0,childList:!0,subtree:!0,characterData:!0})}var ct=new WeakMap,at=class extends HTMLElement{constructor(){super(),Ke.call(this,new.target),new.target[Xe]?.forEach(e=>l(e)&&e.call(this,this)),l(this[k])&&Ze.call(this)}[A](e,n={},r=!1){return this.dispatchEvent(new CustomEvent(e,{bubbles:!0,cancelable:!0,detail:n,composed:r}))}};function Qe(t,e){e.propertyName||(e.propertyName=it(e.name)),oe(t,{name:e.propertyName,value:e.value,get:e.get,set:e.set,attribute:e.name,type:e.type,preUpdate:e.preUpdate,posUpdate:e.posUpdate,posUpdateEvent:e.posUpdateEvent,schema:e.schema});let n=Object.getPrototypeOf(t),r="observedAttributes",i=Object.getOwnPropertyDescriptor(t,r),c=Object.getOwnPropertyDescriptor(n,r),o=i?i.get:void 0;Tt(t,r,tn(t,e,n,o,i,c));let s="attributeChangedCallback",u=Object.getOwnPropertyDescriptor(t.prototype,s),h=Object.getOwnPropertyDescriptor(n.prototype,s),d=u?u.value:void 0;Tt(t.prototype,s,je(e,d,h))}function je(t,e,n){return{value:function(r,i,c){if(t.name===r){let o=t.propertyName;this[o]!==c&&(t.type===U?this[o]=this.hasAttribute(t.name):this[o]=I(c,t.type))}else e&&e.apply(this,arguments);n?.value&&n.value.apply(this,arguments)},enumerable:!1,writable:!0,configurable:!0}}function tn(t,e,n,r,i,c){let o={enumerable:!1,configurable:!0};return i?c?o.get=function(){return[e.name,...r.call(t),...c.get.call(n)]}:o.get=function(){return[e.name,...r.call(t)]}:o.get=c?function(){return[e.name,...c.get.call(n)]}:function(){return[e.name]},o}function oe(t,e){Tt(t.prototype,e.name,{set:ce(e),get:nn(e),configurable:!0,enumerable:!1}),ct.has(t)||ct.set(t,{}),ct.get(t)[e.name]=e.value}function en(t,e){O(t.posUpdateEvent)||(t.posUpdateEvent?this[A](t.posUpdateEvent,{[t.name]:e}):this[A]("update",{[t.name]:e})),l(t.posUpdate)?t.posUpdate.call(this,e):l(this[t.posUpdate])&&this[t.posUpdate]()}function ce(t){return function(e){let n=this[m];l(t.preUpdate)&&!t.preUpdate.call(this,e)||(t.schema&&(st.stop(),e=t.schema.normalize(e),st.start()),!(!E(e)&&ie(n[t.name],e))&&(l(t.set)?t.set.call(this,e):n[t.name]=N(e)&&t.type?I(e,t.type):e,t.attribute&&![W,$].includes(t.type)&&Je(this,t.name,e,t.type===U),en.call(this,t,e)))}}function nn(t){return function(){if(l(t.get))return t.get.call(this);{let e=this[m];switch(t.type){case w:return y(e[t.name])?void 0:Number(e[t.name]);case U:return!!e[t.name];case $:case W:return st(e[t.name]||(t.type===$?{}:[]),n=>ce(t).call(this,n));default:return e[t.name]}}}}function rn(t,e){customElements.get(ut+e.toLowerCase())||customElements.define(ut+e.toLowerCase(),t)}function ue(t,e={}){return e.property=(...n)=>(n.forEach(r=>oe(t,{...r})),e),e.attribute=(...n)=>(n.forEach(r=>Qe(t,{...r})),e),e.tag=n=>(rn(t,n),e),e.extension=n=>(n.call(e,e,t),e),e}function ae(t,e){let n=new WeakMap;return function(...r){clearTimeout(n.get(this)),n.set(this,setTimeout(()=>{t.apply(this,r)},e))}}function bt(t,e){let n=new WeakMap,r=[];return function(...i){return clearTimeout(n.get(this)),new Promise((c,o)=>{r.push({resolve:c,reject:o}),n.set(this,setTimeout(()=>{try{let s=t.apply(this,i);r.forEach(u=>u.resolve(s))}catch(s){r.forEach(u=>u.reject(s))}finally{r.length=0}},e))})}}function wt(t,e){return function(...n){if(t.apply(this,n))return e.apply(this,n)}}function Ot(t,e){return function(...n){let r=t.apply(this,n);return r instanceof Promise?r.then(i=>e.call(this,i)||i):e.call(this,r)||r}}var fe=1,Y=Symbol(),T=Symbol(),le=Symbol(),Rt=Symbol();var V=class extends at{constructor(e){super(),this.attachShadow({mode:"open"}),this[m].ready=e||!1,this[m].rendered=!1,y(e)&&(this.ready=!0)}get ready(){return this[m].ready}set ready(e){let n=this[m],r=n.ready;n.ready=!!e,r===!1&&n.ready===!0&&(this[A]("ready",{ready:!0}),l(this[T])&&this[T]())}get rendered(){return this[m].rendered}set rendered(e){let n=this[m],r=n.rendered;n.rendered=!!e,r===!1&&n.rendered===!0&&this[A]("render",{rendered:!0})}connectedCallback(){let e=this.getBoundingClientRect(),n=getComputedStyle(this).flexDirection,r=()=>{let{width:i,height:c}=this.getBoundingClientRect(),o=getComputedStyle(this).flexDirection;(i!==e.width||c!==e.height||o!==n)&&(l(this[le])&&this[le](i,c,i-e.width,c-e.height),e={width:i,height:c},n=o,this[A]("resize",e)),this[m]._resizeObserver=window.requestAnimationFrame(r)};r()}disconnectedCallback(){window.cancelAnimationFrame(this[m]._resizeObserver)}};function sn(t,e){let n={name:e.name.startsWith("--")?e.name:`--${ut}${e.name}`,initialValue:e.initialValue??e.value??"",syntax:e.syntax??"*",inherits:e.inherits??!0};t.prototype[Rt]||(t.prototype[Rt]={}),t.prototype[Rt][n.name]=n}function on(t){if(l(t.prototype[T])){let e=t.prototype[T];t.prototype[T]=wt(function(){return this.rendered=!1,this.ready},bt(Ot(async function(){return e.apply(this)},function(n){this.rendered=n!==!1,this.rendered&&l(this[Y])&&this[Y]()}),fe))}if(l(t.prototype[Y])){let e=t.prototype[Y];t.prototype[Y]=wt(function(n){return n&&(this[m].rendered=!0),this.ready&&this[m].rendered},bt(Ot(async function(...n){return e.apply(this,n)},function(){this[A]("refresh")}),fe))}}function he(t){on(t);let e=ue(t,{style:(...n)=>(n.forEach(r=>sn(t,{...r})),e)});return e}V.RENDER=T;V.REFRESH=Y;V.CHANGE=k;var cn="intersection.enter",un="intersection.exit",ft=Symbol(),an={root:null,rootMargin:"0px",threshold:Array(21).fill(0).map((t,e)=>e*.05)};function fn(t){let e=!1;this[ft]&&this[ft].disconnect(),this[ft]=new IntersectionObserver(n=>{n.forEach(r=>{r.isIntersecting&&r.intersectionRatio>=t?e||(e=!0,this.dispatchEvent(new CustomEvent(cn,{bubbles:!0,cancelable:!0,composed:!0}))):(e=!1,this.dispatchEvent(new CustomEvent(un,{bubbles:!0,cancelable:!0,composed:!0})))})},an),this[ft].observe(this._el||this)}var Ct=fn;var de=Symbol();function ln(t){t.attribute({name:"intersection-once-class",type:v,value:""}).attribute({name:"intersection-class",type:v,value:""}).attribute({name:"intersection-ratio",type:w,value:0,posUpdate:dn})}var pe=(t,e)=>e&&e.split(/\s+/).forEach(n=>t.add(n)),hn=(t,e)=>e&&e.split(/\s+/).forEach(n=>t.remove(n)),me=(t,e)=>{e.preventDefault();let n=()=>{t.removeEventListener("render",n),t[A](e.type,e.detail,e.composed)};t.addEventListener("render",n)};function dn(){let t=this[m];if(this[de])return Ct.call(this,t.intersectionRatio);this[de]=!0;let e=this.classList;this.addEventListener("intersection.enter",n=>{pe(e,t.intersectionOnceClass),pe(e,t.intersectionClass),this.rendered||me(this,n)}),this.addEventListener("intersection.exit",n=>{hn(e,t.intersectionClass),this.rendered||me(this,n)}),Ct.call(this,t.intersectionRatio)}var ye=ln;var Ut="gSVGObject",pn="http://www.w3.org/2000/svg",mn="svg",vt="d",ge="transform",xe="appendChild",Mt="insertBefore",Ee="insertAdjacentElement",Ne="attach",$e="innerHTML",_t=new WeakMap,Lt=new Set,yn=t=>Zt(t)||t.startsWith("_")||["el","gSVG","then"].includes(t),lt=(t,e)=>t instanceof e,gn=()=>Ut+Math.random().toString(32).substring(2),It=t=>E(t)&&!O(t)&&t[Symbol.toStringTag]===Ut,En=t=>yt(document.createElementNS(pn,t)),ht=t=>N(t)?En(t):E(t)&&t!==null?It(t)?t:yt(t):t,xn=t=>({content:$e,source:"outerHTML",parent:"parentElement",next:"nextElementSibling",previous:"previousElementSibling",add:xe,addBefore:Mt})[t]||t,Nn=t=>["append","before","after",xe,Mt,Ee].includes(t)?function(...e){let n=[],r=[],i=[];return t===Ee?(n.push(e[0]),r.push(ht(e[1]))):t===Mt?(r.push(ht(e[0])),i.push(e[1]||this.firstChild||null)):r.push(...e.map(ht)),r.every(c=>c?._el)?(this[t](...n,...r.map(c=>c&&c._el),...i),r.forEach(c=>c._el.dispatchEvent(new Event(Ne))),r.length>1?r:r[0]):r[0]}:null,mt=class{constructor(e){this._el=e,this.gSVG=B}get[Symbol.toStringTag](){return Ut}get el(){return this._el}attachTo(e){return(E(e)?It(e)?e._el:e:document.querySelector(e)).appendChild(this._el),this._el.dispatchEvent(new Event(Ne)),this}id(e){return e?(this._el.setAttribute("id",e),this):this._el.id||(this._el.id=gn())}ref(){return`#${this.id()}`}url(){return`url(${this.ref()})`}parents(){let e=[],n=this;for(;n=n.parentElement();)e.push(n);return e}top(){return this.parents().pop()||this}},yt=t=>{if(!E(t)||O(t))return null;if(_t.has(t))return _t.get(t);let e=new Proxy(new mt(t),{get(n,r){if(yn(r))return n[r];if(!y(n[r]))return(...o)=>(L(e,r,o),n[r].call(e,...o));if([vt,ge,"$"+vt,"$"+ge].includes(r)){let o="";r[0]==="$"&&(r=r.substring(1));let u=r===vt?$n:Sn,h=new Proxy(d=>(L(e,r,[d]),y(d)?t.getAttribute(r):(d?t.setAttribute(r,d):t.removeAttribute(r),e)),{get(d,x){return x in d?Reflect.get(d,x):(...R)=>{if(x===Symbol.toPrimitive){let K=o;return o="",K}return o+=u(e,x,R),t?.setAttribute(r,o),h}}});return h}let i=xn(r),c=Nn(i)||t[i];return l(c)?(...o)=>{L(e,r,o);let s=c.call(t,...o);return y(s)?e:Ae(s)}:Se(t,i,e)}});return _t.set(t,e),e},Se=(t,e,n,r)=>{let i=e.replace(/_/g,"-"),c=(...o)=>{if(L(n,r?`${r}.${e}`:e,o),o.length===0){let u=t?.hasAttribute&&t.hasAttribute(i)?t.getAttribute(i):t[i];return Ae(u)}let s=o[0];if(lt(t,CSSStyleDeclaration))return t[i]=s,n;if(i in t&&!Lt.has(i)){let u=t[i];if(String(u)===String(s))return n;try{t[i]=s}catch{Lt.add(i)}if(E(t[i])&&t[i]===s||t[i]!==u||i===$e)return n;Lt.add(i)}return s!==0&&!s?t?.removeAttribute&&t.removeAttribute(i):t?.setAttribute&&t.setAttribute(i,Qt(s)?"":String(o)),n};return new Proxy(c,{get(o,s){let u=t[i][s];return l(u)?(...h)=>(L(n,`${e}.${s}`,h),u.call(t[i],...h)||n):Se(t[i],s,n,i)},set(o,s,u){return t[i][s]=u,!0}})},Ae=t=>lt(t,HTMLCollection)||lt(t,NodeList)?[...t].map(e=>yt(e)):lt(t,SVGElement)?yt(t):N(t)?t===""||Number.isNaN(Number(t))?t:Number(t):t,Te=[],L=(t,e,n,r=[])=>{for(let i of Te)i(B,t,e,n,r)},dt={},$n=(t,e,n)=>(L(t,`d.${e}`,n,Object.keys(dt).map(r=>`d.${r}`)),dt[e]?dt[e].apply(t,n):`${e}${n.join(rt)}`),Sn=(t,e,n)=>(L(t,`transform.${e}`,n),`${e}(${n.join(rt)})`);function B(t){return L(null,D,[t]),ht(y(t)?mn:t)}B.isWrapped=It;var pt=t=>e=>l(e)?e(t):Object.assign(t,e),Pt={install:be,extendConstructor:pt(B),extendInstance:pt(mt.prototype),extendPath:pt(dt),beforeEveryCall(t){l(t)&&Te.push(t)}};Pt.extendSetup=pt(Pt);function be(t){return t(Pt),B}B.install=be;var tt=B;var Dt=new Map,An=/function\s+([\p{L}\p{Nl}$_][\p{L}\p{Nl}$_\p{Mn}\p{Mc}\p{Nd}\p{Pc}]*)\s*\(/gmu,Tn=async function(){}.constructor;function gt(t,e,n=!1){let r=`${t.join(",")} ${e}`;if(Dt.has(r))return Dt.get(r);let i=new(n?Tn:Function)(...t,e);return Dt.set(r,i),i}function we(t,e){let n=[...e.matchAll(An)].map(i=>i[1]);return gt(Object.keys(t),`${e}; return {${n.map(i=>`${i}: typeof ${i} === 'function' ? ${i} : undefined`)}}; `)(...Object.values(t))}function Ft(t){try{return new Function(`let ${t} = 0`),!0}catch{return!1}}var kt="animate",bn="path",Oe="d",Re="transform",_e="rotate",H="translate",Ce="inherit",ve="finished",wn=[_e,"skewX","skewY"],On=[H,"width","height","x","y","cx","cy","r","rx","ry","dx","dy"],Rn=(t,e)=>["text","tspan"].includes(t)&&["x","y"].includes(e),Vt=!1;if(window.matchMedia){let t=window.matchMedia("(prefers-reduced-motion: reduce)");Vt=t.matches,t.addEventListener("change",()=>{Vt=t.matches})}var Cn=t=>t.replace(/([A-Z])/g,"-$1").toLowerCase();function vn(t,e={duration:200},n=null,r=null){let i=this.gSVG,c=a=>{let f=E(a)?{...a}:{duration:a};return Vt&&(f.duration=0),f.fill="none",f},o=a=>{a=_(a)?a:[a];let f=window.getComputedStyle(this._el),p=[],g=new Set;for(let C of a){let S={};for(let P in C){let b=it(P);S[b]=x(C[P],b),!(b in f)||Rn(this.tagName(),b)?g.add(b):b===Oe?S.d=`${bn}("${S.d}")`:b===Re&&(S.transform=h(S.transform))}p.push(S)}return u(g,p),p},s=[],u=(a,f)=>{if(a.size){let p=new KeyframeEffect(null,f).getKeyframes();for(let g of a){let C=i(kt).attributeName(g).dur(Z.duration+"ms").fill("freeze");if(f.length===1)C.to(f[0][g]);else{let S=[],P=[];for(let b in p){let Ve=p[b];g in f[b]&&(S.push(Ve.computedOffset),P.push(f[b][g]))}S[0]!==0&&(S.unshift(0),P.unshift(this[g]()||Ce)),S[S.length-1]!==1&&(S.push(1),P.push(this[g]()||Ce)),C.keyTimes(S.join(";")).values(P.join(";"))}s.push(C),C.attachTo(this),C.beginElementAt(Z.delay||0)}}},h=a=>{N(a)&&(a=JSON.parse("{"+a.replace(/\s*\(\s*/g,":[").replace(/\s*\)\s*/g,"],").split(/\s*,\s*|\s.*/).join(",").replace(/(\w+):/g,'"$1":').replace(/,$/,"")+"}"));let f="";for(let p in a)if(p===_e){let g=d(a[p]);g.length>1&&(f+=`${H}(${x(g[1],H)},${x(g[2],H)}) `),f+=`${p}(${x(g[0],p)}) `,g.length>1&&(f+=`${H}(-${x(g[1],H)},-${x(g[2],H)}) `)}else f+=`${p}(${d(a[p]).map(g=>x(g,p)).join(",")}) `;return f},d=a=>_(a)?a:String(a).split(/\s+|,/),x=(a,f)=>wn.includes(f)?a+"deg":On.includes(f)?a+"px":a,R=a=>N(a)?a.replace(/(deg)|(px)/g,"").trim():a,K=a=>a.replace(/(path\s*\(\s*["'])|(["']\s*\)\s*$)/g,"").trim().replace(/([a-zA-Z])\s*/g,"$1").replace(/\s+/g,","),z=a=>{let f=/translate\((.*)px,(.*)px\) rotate\((.*)deg\) translate\((.*)px,(.*)px\)\s+/,p=f.exec(a);return p&&Number(p[1])===Number(p[4])*-1&&Number(p[2])===Number(p[5])*-1?a=a.replace(f,`rotate(${p[3]}, ${p[1]}, ${p[2]})`):a=R(a),a},Z=c(e),nt=o(t),q=this._el.animate(nt,Z);return q.ready.then(()=>l(n)&&n.call(this,q)),q.finished.then(()=>{let a=nt[nt.length-1];for(let f in a){let p=Cn(f);p.startsWith("text-")?this._el.style[f]=a[f]:f!=="offset"&&f in a&&this._el.setAttribute(p,p===Oe?K(a[f]):p===Re?z(a[f]):R(a[f]))}s.forEach(f=>{f[ve](!0);let p=this._el.querySelectorAll(kt),g=this._el.querySelectorAll(`${kt}[${ve}]`);p.length===g.length&&p.forEach(C=>C.remove())}),l(r)&&r.call(this,q)}),this}function _n(t){t.extendInstance({animateTo:vn})}var Le=_n;var Me=Symbol(),Pe=Symbol(),G=Symbol(),Et=Symbol(),xt=Symbol(),Bt=Symbol(),Ln="unknown",Ht=[],Mn=(t,e,n)=>{throw new Error(t+` in ${e} `+n)},Pn=(t=>e=>t[e]||e)("attributeName attributeType baseFrequency calcMode clipPathUnits diffuseConstant edgeMode gradientTransform gradientUnits kernelMatrix kernelUnitLength lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY requiredExtensions requiredFeatures specularConstant specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength viewBox xChannelSelector yChannelSelector zoomAndPan".split(" ").reduce((t,e)=>(t[e.toLowerCase()]=e,t),{}));function Ue(t){if(!t?.el?.parentNode)return;let e=document.createComment(" ref ");t.parentNode().insertBefore(e,t.el),t.remove(),e[Bt]=t}function Un(t){let e=t[Bt];return t.parentNode.insertBefore(e.el,t),t.remove(),e}X({name:"g-content",execute(t,{expression:e,data:n,evalExpression:r}){t.content(r(e,n))}});X({name:"g-if",execute(t,{expression:e,data:n,evalExpression:r}){r(e,n)||Ue(t)}});X({name:"g-bind",alias:":",argument:!0,execute(t,{expression:e,argument:n,data:r,evalExpression:i}){n=Pn(n);let c={...r,$$:["d","transform"].includes(n)?t["$"+n]:()=>t[n]()};c.$$.dynamic=(s,u=200,h=0)=>{t.animateTo((_(s)?s:[s]).map(d=>E(d)&&"offset"in d?{[n]:d.value,offset:d.offset}:{[n]:d}),{duration:u,delay:h})};let o=i(e,c);if(n==="class"){if(_(o)){t.classList.add(...o.filter(s=>!!s));return}if(E(o)){Object.entries(o).forEach(([s,u])=>{u?t.classList.add(s):t.classList.remove(s)});return}o&&t.classList.add(o);return}if(n==="style"){Object.entries(o).forEach(([s,u])=>t.style[s](u));return}y(o)||t[n](o)}});X({name:"g-on",alias:"@",argument:!0,execute(t,{expression:e,argument:n,data:r,evalExpression:i,error:c,outerCode:o}){t[xt]=t[xt]||{};let s=t[xt][n]=t[xt][n]||new Map;s.has(e)&&t.removeEventListener(n,s.get(e));let u=function(h){try{let d=i(e,r,t);l(d)&&d.call(t,h)}catch(d){c(d.message,`g-on:${n}="${e}"`,o)}};t.addEventListener(n,u),s.set(e,u),n==="init"&&!t[Me]&&(t[Me]=!0,t.dispatchEvent(new Event("init")))}});X({name:"g-for",template:!0,execute(t,{expression:e,data:n,error:r}){t.setAttribute("data-type","graphane"),t[G]=t[G]||[];let i=0;kn(e,n,c=>{if(t[G][i])et(t[G][i],c,r,!1);else{let o=t.gSVG("g");t.children().forEach(s=>{o.add(s.cloneNode(!0))}),et(o,c,r),t.before(o.el),o[Pe]=!0,t[G].push(o)}i++},c=>{for(;t[G].length>c.length;)t[G].pop().remove()}),Ue(t)}});function X({name:t,alias:e,argument:n,template:r,execute:i}){let c=`^(${t}${n?":":""}${e?`|${e})`:")"}${n?"(.*)$":"$"}`,o=new RegExp(c,"i");Ht.push({name:t,alias:e,argument:n,template:r,execute:i,check:o})}function In(t){for(let e of Ht){let n=e.check.exec(t);if(n){let r=n[2];return{...e,argument:r}}}}function Dn(t){return t.replace(/[{}()[\]]/g,"").split(",").map(e=>e.includes(":")?e.split(":")[1]:e).map(e=>e.trim())}function Fn(t){return t[Symbol.iterator]?{iterator:[...t],type:W}:Kt(t)?{iterator:Array(t<0?0:0|t).fill(0).map((e,n)=>n),type:w}:E(t)?{iterator:Object.entries(t).map(e=>e.reverse()),type:$}:{iterator:t,type:Ln}}function Ie(t,e,n=null){let r=Object.keys(e).filter(Ft);return gt(r,`return ( ${t} ); `).apply(n,r.map(c=>e[c]))}function kn(t,e,n,r){let i="__$$iterator",c="__$$callback",o="__$$final",[s,u]=t.split(" of ");s=s.trim(),u=u.trim();let h=Ie(u,e)||[],{iterator:d,type:x}=Fn(h);x===$&&!s.startsWith("[")&&(s=`[${s.replace(/(^\()|(\)$)/g,"")}]`);let R=Dn(s),K=s.startsWith("(")?s:`(${s})`,z=Object.keys(e).filter(Ft),Z=` ${i}.forEach(${K} => { ${c}({${z}${z.length?",":""}${R.join(",")}}); }); ${o}(${i}); `;return gt([...z,i,c,o],Z)(...z.map(q=>e[q]),d,n,r)}function et(t,e,n,r=!0){if(r&&t[Pe])return;let i=t.outerHTML();t[Et]=t[Et]||[];let c=[...t.el.attributes];console.log(c);for(let s of[...c]){let u=s.name,h=In(u);h&&(t[Et].push({...h,expression:s.value}),t.removeAttribute(u))}let o=!1;for(let s of t[Et]){try{s.execute(t,{...s,data:e,evalExpression:Ie,error:n,outerCode:i})}catch(u){n(u.message,`${s.name}${s.argument?":"+s.argument:""}="${s.expression}"`,i)}o=s.template||o}if(!o)for(let s of t.childNodes())s.el[Bt]?et(Un(s.el),e,n):s.el?.nodeType===1&&et(s,e,n)}function Vn(t={},e=Mn){et(this,t,e),this.dispatchEvent(new Event("render"))}function Bn(){return this.outerHTML().replaceAll("<!-- ref -->","")}function Hn(t){t.install(Le),t.extendInstance({render:Vn,source:Bn}),t.extendSetup({extendTemplate:{defineDirective:X,obtainDirective(e){return Ht.find(n=>n.name===e)}}})}var De=Hn;var zt=Symbol(),Gt=Symbol();function Gn(t,e){return e===zt?t:se(t,e)}function Fe(t={}){let e={};function n(r,i,c,o){r in t||(e[r]||(e[r]={}),Object.defineProperty(t,r,{enumerable:!1,configurable:!0,writable:!0,value(s=void 0,u=zt){if(N(s)||y(s)){if(u=s||zt,u in e[r])return e[r][u]}else t=s;let h=t.reduce((d,x)=>{let R=Gn(x,u);return typeof R>"u"?d:d===Gt?R:c(d,R)},i);return h=typeof o=="function"?o(h):h,t!==s&&(e[r][u]=h),h}}))}return n("$min",Gt,(r,i)=>i>r?r:i),n("$max",Gt,(r,i)=>i<r?r:i),n("$count",0,r=>r+1),n("$sum",0,(r,i)=>i+r),n("$avg",{n:0,i:0},(r,i)=>(r.n++,r.i+=Number(i),r),r=>r.i/r.n),n("$distinct",new Set,(r,i)=>(r.add(i),r),r=>[...r]),t}var zn=t=>{t.extendSetup({extendComposer(e){l(e)?e(M.prototype):Object.assign(M.prototype,e)}})};tt.install(De).install(zn);var qn="composer",qt="update",J="svg",Wt="methods",Yt="config",Xt="data",Nt="-src",ke=t=>`script[type=${t}],g-script[type=${t}]`,Wn=t=>{let e=getComputedStyle(t),n=["0px","auto"];return n.includes(e.width)&&n.includes(e.height)},M=class extends V{static install(e){tt.install(e)}#t=null;#n=!1;#i=[];isRendering=!1;#e(e,n="",r=""){let i=`${e}${n?` in ${n}`:""} ${r}`;this.#i.push(i),console.warn(`Graphane Composer - Error: ${i}`),this[A]("error",i)}async#s(e){let n=await fetch(e);if(n.status!==200)throw new Error(`${n.statusText} (${n.status}): ${n.url}`);return n.text()}async#f(){let e=[...this.querySelectorAll(ke("plugin"))];for(let n of e){let r=n.getAttribute("src");if(r){let i=new URL(r,document.location.href);try{let c=await import(i.href);c?.default&&tt.install(c.default)}catch(c){this.#e(c.message,"plugin",i)}}}}async#o(){let e=this[m];if(this.#t=null,e.content.innerHTML="",e.svgSrc)try{e.content.innerHTML=await this.#s(e.svgSrc)}catch(r){this.#e(r.message,J,e.svgSrc)}else{let r=this.querySelector("template")?.content||this.querySelector(J);r&&e.content.append(r.cloneNode(!0))}let n=e.content.querySelector(J);return n&&(this.#t=tt(n),Wn(n)&&(this.#t.width("100%"),this.#t.height("100%"))),!0}async#r(e,n){let r=this[m],i=e+"Src",c=this.querySelector(ke(e));c&&(r[i]=c.getAttribute("src"));let o="";try{o=r[i]?await this.#s(r[i]):c?.textContent,o&&(r[e]=n(o))}catch(s){this.#e(s.message,e,o)}}#c(){return this.#r(Wt,e=>we({$:this},e))}#u(){return this.#r(Yt,St)}#a(){return this.#r(Xt,e=>te(e)||ee(e)?St(e):ne(e))}constructor(){super();let e=this[m];this.shadowRoot.innerHTML=` <style> :host { display : inline-block; width : max-content; height : max-content; } </style><span id="content"></span> `,e.content=this.shadowRoot.querySelector("#content")}[T](){return!this.load()}async[k](e){let n=[];for(let r of e){let i=r.target;if(i===this&&!r.attributeName)return this.load();if(i.tagName.toLowerCase()===J)n.push(this.#o());else if(i.tagName==="SCRIPT"){let c={data:this.#a,methods:this.#c,config:this.#u}[i.type.toLowerCase()];c&&n.push(c())}}if(n.length)return await Promise.all(n),this.update()}async load(){return this.#n=!1,await this.#f(),await Promise.all([this.#o(),this.#u(),this.#c(),this.#a()]),this.#n=!0,this[A]("load"),this.update(!0)}async update(e=!1){if(!(this.isRendering&&!e)&&this.#t){this.rendered=!1,this.isRendering=!0;let n=this[m],r=Fe(n.methods?.data?n.methods.data(F(n.data)):F(n.data)),i={...n.methods,..._(r)?{}:r,data:r,$:this};await this.#t.render(i,this.#e.bind(this)),this.isRendering=!1,this.rendered=!0}}get[J](){return this.#t}get loaded(){return this.#n}get errors(){return[...this.#i]}};M.prototype.update=ae(M.prototype.update,1);he(M).extension(ye).attribute({name:J+Nt,type:v,value:"",posUpdate:T}).attribute({name:Xt,type:$,value:[],posUpdate:qt}).attribute({name:Xt+Nt,type:v,posUpdate:T}).property({name:Wt,type:$,value:{},posUpdate:qt}).attribute({name:Wt+Nt,type:v,posUpdate:T}).attribute({name:Yt,type:$,value:{},posUpdate:qt}).attribute({name:Yt+Nt,type:v,posUpdate:T}).tag(qn);})();