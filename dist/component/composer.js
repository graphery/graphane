/* graphane - 1.0.0-beta.7 */ (()=>{var Ke="function",ee="undefined",N="object",C="string",W="array",R="number",U="boolean",Qe="date",je="symbol",D="",st=",";var tn=";",m=t=>typeof t===N,$=t=>typeof t===C,f=t=>typeof t===Ke,ne=t=>typeof t===R&&!isNaN(t),it=t=>!Number.isNaN(t),y=t=>typeof t===ee,re=t=>typeof t===je,ie=t=>typeof t===U,L=t=>Array.isArray(t),Tt=t=>t instanceof Date&&!isNaN(t),T=t=>t===null,ot=t=>t.replace(/-([a-z0-9])/g,(e,n)=>n.toUpperCase());function en(t){if($(t))try{let e=t.replace(/^\s*{/,"").replace(/}\s*$/,"").split(/((?:[^;^,"']|"[^"]*"|'[^']*')+)/).filter(n=>!["",";",","].includes(n.trim())).map(n=>n.split(":")).map(n=>`"${n[0].trim()}":${M(n[1].trim(),void 0,!0)}`).join(",");return JSON.parse(`{${e}}`)}catch{try{return M(t)}catch(n){console.error(n);return}}else if(m(t))return t}function se(t){if($(t))return t.trim().startsWith("[")?(t.match(/\[(.*?)[^\]]]/g)||[]).map(e=>se(e.substring(1,e.length-1))):t.split(/[,;]/).map(e=>M(e.trim()));if(L(t))return t}function M(t,e,n=!1){if(!$(t))return t;if(t=nn(t.trim()),e===W)return se(t);if(e===N)return en(t);if(y(e)||e===R){if(y(t)||t==="")return;let r=+t;if(it(r)||e===R)return r}if(y(e)||e===U){if(t==="true")return!0;if(t==="false")return!1;if(e===U)return t==="0"?!1:!!t}if(e===Qe){try{let r=new Date(t);if(it(r.getTime()))return r}catch{}return}if(y(e)||e===C)return n?`"${t}"`:t}function nn(t){return t[0]==="'"&&t[t.length-1]==="'"||t[0]==='"'&&t[t.length-1]==='"'?t.substring(1,t.length-1):t}function oe(t){return/^\s*{/.test(t)&&/}\s*$/.test(t)}function ce(t){return/^\s*\[/.test(t)&&/]\s*$/.test(t)}function ue(t){let e=[],n=t.split(/(\r\n|\r|\n)/).map(r=>r.trim()).filter(r=>r);return n.length===0?[]:n.length===1?M(n[0]):n.reduce((r,i,c)=>{let o={},s=i.split(/((?:[^;^,"']|"[^"]*"|'[^']*')+)/).filter(u=>![D,tn,st].includes(u.trim()));return c===0?(e=[...s.map(u=>M(u))],r):(s.forEach((u,l)=>{o[e[l]]=M(u)}),r.push(o),r)},[])}function wt(t){let e=`return (${t});`,n=new Function(e)();return typeof n=="function"?n():n}var ae=new WeakSet,j=!1,bt=(t,e)=>!m(t)||T(t)||!f(e)?t:function n(r){if(ae.has(r))return r;for(let c in r)m(r[c])&&!T(r[c])&&(r[c]=n(r[c]));let i=new Proxy(r,{get(c,o){let s=Reflect.get(r,o);return f(s)&&Tt(c)&&$(o)&&o.substring(0,3)==="set"&&f(e)&&(s=function(...u){let l=Reflect.get(c,o).apply(c,u);return!j&&e(t),l}),Tt(c)?s.bind(c):s},set(c,o,s){let u,l=c[o]===s;return m(s)&&!T(s)?u=Reflect.set(c,o,n(s)):u=Reflect.set(c,o,s),!j&&!l&&e(t),u},deleteProperty(c,o){let s=Reflect.deleteProperty(c,o);return!j&&e(t),s}});return ae.add(i),i}(t);bt.stop=()=>j=!0;bt.start=()=>j=!1;var ct=bt;var tt=!1,ut=!0;function rn(t){return t===null?null:t.constructor?new t.constructor:{}}function F(t){if(!m(t))return t;let e=t===null?null:Object.assign(rn(t),t);for(let n in e)m(e[n])&&(e[n]=F(e[n]));return e}function le(t,e){let n=[],r=[];function i(o,s){if(o===null||s===null)return tt;if(f(o.valueOf)&&f(s.valueOf)&&(o!==o.valueOf()||s!==s.valueOf()))return o.valueOf()===s.valueOf()&&o.constructor===s.constructor;if(n.indexOf(o)>-1&&r.indexOf(s)>-1)return ut;let u=Object.keys(o),l=Object.keys(s);if(u.length!==l.length)return tt;if(u.length>0){n.push(o),r.push(s);let h=u.length;for(;h--;){let E=u[h];if(!c(o[E],s[E]))return tt}}return ut}function c(o,s){if(o===s)return ut;let u=typeof o;return u!==typeof s?tt:u===R&&isNaN(o)&&isNaN(s)?ut:u===N?i(o,s):tt}return c(t,e)}function fe(t,e){let n=t,r=$(e)?e.split("."):e;for(let i=0;i<r.length;i++){if(y(n[r[i]]))return;n=n[r[i]]}return n}var Ot=globalThis.GRAPHANE_PREFIX||"g-",sn=Symbol(),g=Symbol(),V=Symbol(),A=Symbol(),Rt=Object.defineProperty;function on(t,e,n,r=!1){if(!(t.ready===!1||!e))if(r)n?t.setAttribute(e,D):t.removeAttribute(e);else{let i=T(n)||y(n)?D:n.toString();t.hasAttribute(e)&&t.getAttribute(e)!==i&&t.setAttribute(e,i)}}function cn(t){this[g]={};let e=t;do{let n=at.get(e);for(let r in n)if(n.hasOwnProperty(r)&&this.hasOwnProperty(r)){let i=this[r];delete this[r],this[r]=y(i)?F(n[r]):i}else r in this[g]||(this[g][r]=F(n[r]));e=Object.getPrototypeOf(e)}while(e!==HTMLElement)}function un(){new MutationObserver(t=>{t.some(e=>!e.attributeName)&&this[A]("update"),(y(this.ready)||this.ready)&&f(this[V])&&this[V](t)}).observe(this,{attributes:!0,childList:!0,subtree:!0,characterData:!0})}var at=new WeakMap,lt=class extends HTMLElement{constructor(){super(),cn.call(this,new.target),new.target[sn]?.forEach(e=>f(e)&&e.call(this,this)),f(this[V])&&un.call(this)}[A](e,n={},r=!1){return this.dispatchEvent(new CustomEvent(e,{bubbles:!0,cancelable:!0,detail:n,composed:r}))}};function an(t,e){e.propertyName||(e.propertyName=ot(e.name)),he(t,{...e,name:e.propertyName,attribute:e.name});let n=Object.getPrototypeOf(t),r="observedAttributes",i=Object.getOwnPropertyDescriptor(t,r),c=Object.getOwnPropertyDescriptor(n,r),o=i?i.get:void 0;Rt(t,r,fn(t,e,n,o,i,c));let s="attributeChangedCallback",u=Object.getOwnPropertyDescriptor(t.prototype,s),l=Object.getOwnPropertyDescriptor(n.prototype,s),h=u?u.value:void 0;Rt(t.prototype,s,ln(e,h,l))}function ln(t,e,n){return{value:function(r,i,c){if(t.name===r){let o=t.propertyName;this[o]!==c&&(t.type===U?this[o]=this.hasAttribute(t.name):this[o]=M(c,t.type))}else e&&e.apply(this,arguments);n?.value&&n.value.apply(this,arguments)},enumerable:!1,writable:!0,configurable:!0}}function fn(t,e,n,r,i,c){let o={enumerable:!1,configurable:!0};return i?c?o.get=function(){return[e.name,...r.call(t),...c.get.call(n)]}:o.get=function(){return[e.name,...r.call(t)]}:o.get=c?function(){return[e.name,...c.get.call(n)]}:function(){return[e.name]},o}function he(t,e){Rt(t.prototype,e.name,{set:de(e),get:dn(e),configurable:!0,enumerable:!1}),at.has(t)||at.set(t,{}),at.get(t)[e.name]=e.value}function hn(t,e){T(t.posUpdateEvent)||(t.posUpdateEvent?this[A](t.posUpdateEvent,{[t.name]:e}):this[A]("update",{[t.name]:e})),f(t.posUpdate)?t.posUpdate.call(this,e):f(this[t.posUpdate])&&this[t.posUpdate]()}function de(t){return function(e){let n=this[g];f(t.preUpdate)&&!t.preUpdate.call(this,e)||(t.schema&&(ct.stop(),e=t.schema.normalize(e),ct.start()),!(!m(e)&&le(n[t.name],e))&&(f(t.set)?t.set.call(this,e):n[t.name]=$(e)&&t.type?M(e,t.type):e,t.attribute&&![W,N].includes(t.type)&&on(this,t.attribute,e,t.type===U),hn.call(this,t,e)))}}function dn(t){return function(){if(f(t.get))return t.get.call(this);{let e=this[g];switch(t.type){case R:return y(e[t.name])?void 0:Number(e[t.name]);case U:return!!e[t.name];case N:case W:return ct(e[t.name]||(t.type===N?{}:[]),n=>de(t).call(this,n));default:return e[t.name]}}}}function pn(t,e){e=Ot+e.toLowerCase(),customElements.get(e)||customElements.define(e,t)}function pe(t,e={}){return e.prop=(...n)=>(n.forEach(r=>he(t,{...r})),e),e.attr=(...n)=>(n.forEach(r=>an(t,{...r})),e),e.tag=n=>(pn(t,n),e),e.extension=e.ext=n=>(n.call(e,e,t),e),e}function vt(t,e){let n=new WeakMap;return function(...r){clearTimeout(n.get(this)),n.set(this,setTimeout(()=>{t.apply(this,r)},e))}}function Ct(t,e){let n=new WeakMap,r=[];return function(...i){return clearTimeout(n.get(this)),new Promise((c,o)=>{r.push({resolve:c,reject:o}),n.set(this,setTimeout(()=>{try{let s=t.apply(this,i);r.forEach(u=>u.resolve(s))}catch(s){r.forEach(u=>u.reject(s))}finally{r.length=0}},e))})}}function Mt(t,e){return function(...n){if(t.apply(this,n))return e.apply(this,n)}}function Lt(t,e){return function(...n){let r=t.apply(this,n);return r instanceof Promise?r.then(i=>e.call(this,i)||i):e.call(this,r)||r}}var me=1,Y=Symbol(),w=Symbol(),ye=Symbol(),_t=Symbol();var k=class extends lt{constructor(e){super(),this.attachShadow({mode:"open"}),this[g].ready=e||!1,this[g].rendered=!1,y(e)&&(this.ready=!0)}get ready(){return this[g].ready}set ready(e){let n=this[g],r=n.ready;n.ready=!!e,r===!1&&n.ready===!0&&(this[A]("ready",{ready:!0}),f(this[w])&&this[w]())}get rendered(){return this[g].rendered}set rendered(e){let n=this[g],r=n.rendered;n.rendered=!!e,r===!1&&n.rendered===!0&&this[A]("render",{rendered:!0})}connectedCallback(){let e=this.getBoundingClientRect(),n=getComputedStyle(this).flexDirection,r=()=>{let{width:i,height:c}=this.getBoundingClientRect(),o=getComputedStyle(this).flexDirection;(i!==e.width||c!==e.height||o!==n)&&(f(this[ye])&&this[ye](i,c,i-e.width,c-e.height),e={width:i,height:c},n=o,this[A]("resize",e)),this[g]._resizeObserver=window.requestAnimationFrame(r)};r()}disconnectedCallback(){window.cancelAnimationFrame(this[g]._resizeObserver)}};function mn(t,e){let n={name:e.name.startsWith("--")?e.name:`--${Ot}${e.name}`,initialValue:e.initialValue??e.value??"",syntax:e.syntax??"*",inherits:e.inherits??!0};t.prototype[_t]||(t.prototype[_t]={}),t.prototype[_t][n.name]=n}function yn(t){if(f(t.prototype[w])){let e=t.prototype[w];t.prototype[w]=Mt(function(){return this.rendered=!1,this.ready},Ct(Lt(async function(){return e.apply(this)},function(n){this.rendered=n!==!1,this.rendered&&f(this[Y])&&this[Y]()}),me))}if(f(t.prototype[Y])){let e=t.prototype[Y];t.prototype[Y]=Mt(function(n){return n&&(this[g].rendered=!0),this.ready&&this[g].rendered},Ct(Lt(async function(...n){return e.apply(this,n)},function(){this[A]("refresh")}),me))}}function ge(t){yn(t);let e=pe(t,{style:(...n)=>(n.forEach(r=>mn(t,{...r})),e)});return e}k.RENDER=w;k.REFRESH=Y;k.CHANGE=V;var gn="intersection.enter",En="intersection.exit",ft=Symbol();function xn(t){let e=r=>this.dispatchEvent(new CustomEvent(r,{bubbles:!0,cancelable:!0,composed:!0})),n=!1;this[ft]&&this[ft].disconnect(),this[ft]=new IntersectionObserver(r=>{r.forEach(i=>{i.isIntersecting&&i.intersectionRatio>=t?n||(n=!0,e(gn)):(n=!1,e(En))})},{root:null,rootMargin:"0px",threshold:Array(21).fill(0).map((r,i)=>i*.05)}),this[ft].observe(this._el||this)}var Pt=xn;var Ee=Symbol();function $n(t){t.attr({name:"intersection-once-class",type:C,value:""}).attr({name:"intersection-class",type:C,value:""}).attr({name:"intersection-ratio",type:R,value:0,posUpdate:Sn})}var xe=(t,e)=>e&&e.split(/\s+/).forEach(n=>t.add(n)),Nn=(t,e)=>e&&e.split(/\s+/).forEach(n=>t.remove(n)),$e=(t,e)=>{e.preventDefault();let n=()=>{t.removeEventListener("render",n),t[A](e.type,e.detail,e.composed)};t.addEventListener("render",n)};function Sn(){let t=this[g];if(this[Ee])return Pt.call(this,t.intersectionRatio);this[Ee]=!0;let e=this.classList;this.addEventListener("intersection.enter",n=>{xe(e,t.intersectionOnceClass),xe(e,t.intersectionClass),this.rendered||$e(this,n)}),this.addEventListener("intersection.exit",n=>{Nn(e,t.intersectionClass),this.rendered||$e(this,n)}),Pt.call(this,t.intersectionRatio)}var Ne=$n;var kt="gSVGObject",An="http://www.w3.org/2000/svg",Tn="svg",It="d",Se="transform",Te="appendChild",Ft="insertBefore",Ae="insertAdjacentElement",we="attach",be="innerHTML",Ut=new WeakMap,Dt=new Set,wn=t=>re(t)||t.startsWith("_")||["el","gSVG","then"].includes(t),ht=(t,e)=>t instanceof e,bn=()=>kt+Math.random().toString(32).substring(2),Bt=t=>m(t)&&!T(t)&&t[Symbol.toStringTag]===kt,Rn=t=>gt(document.createElementNS(An,t)),dt=t=>$(t)?Rn(t):m(t)&&t!==null?Bt(t)?t:gt(t):t,On=t=>({content:be,source:"outerHTML",parent:"parentElement",next:"nextElementSibling",previous:"previousElementSibling",add:Te,addBefore:Ft})[t]||t,vn=t=>["append","before","after",Te,Ft,Ae].includes(t)?function(...e){let n=[],r=[],i=[];return t===Ae?(n.push(e[0]),r.push(dt(e[1]))):t===Ft?(r.push(dt(e[0])),i.push(e[1]||this.firstChild||null)):r.push(...e.map(dt)),r.every(c=>c?._el)?(this[t](...n,...r.map(c=>c._el),...i),r.forEach(c=>c._el.dispatchEvent(new Event(we))),r.length>1?r:r[0]):null}:null,yt=class{constructor(e){this._el=e,this.gSVG=B}get[Symbol.toStringTag](){return kt}get el(){return this._el}attachTo(e){return(m(e)?Bt(e)?e._el:e:document.querySelector(e)).appendChild(this._el),this._el.dispatchEvent(new Event(we)),this}id(e){return e?(this._el.setAttribute("id",e),this):this._el.id||(this._el.id=bn())}ref(){return`#${this.id()}`}url(){return`url(${this.ref()})`}parents(){let e=[],n=this;for(;n=n.parentElement();)e.push(n);return e}top(){return this.parents().pop()||this}},gt=t=>{if(!m(t)||T(t))return null;if(Ut.has(t))return Ut.get(t);let e=new Proxy(new yt(t),{get(n,r){if(wn(r))return n[r];if(!y(n[r]))return(...o)=>(_(e,r,o),n[r].call(e,...o));if([It,Se,"$"+It,"$"+Se].includes(r)){let o="";r[0]==="$"&&(r=r.substring(1));let u=r===It?Cn:Mn,l=new Proxy(h=>(_(e,r,[h]),y(h)?t.getAttribute(r):(h?t.setAttribute(r,h):t.removeAttribute(r),e)),{get(h,E){return E in h?Reflect.get(h,E):(...O)=>{if(E===Symbol.toPrimitive){let K=o;return o="",K}return o+=u(e,E,O),t?.setAttribute(r,o),l}}});return l}let i=On(r),c=vn(i)||t[i];return f(c)?(...o)=>{_(e,r,o);let s=c.call(t,...o);return y(s)?e:Oe(s)}:Re(t,i,e)}});return Ut.set(t,e),e},Re=(t,e,n,r)=>{let i=e.replace(/_/g,"-"),c=(...o)=>{if(_(n,r?`${r}.${e}`:e,o),o.length===0){let u=t?.hasAttribute&&t.hasAttribute(i)?t.getAttribute(i):t[i];return Oe(u)}let s=o[0];if(ht(t,CSSStyleDeclaration))return t[i]=s,n;if(i in t&&!Dt.has(i)){let u=t[i];if(String(u)===String(s))return n;try{t[i]=s}catch{Dt.add(i)}if(m(t[i])&&t[i]===s||t[i]!==u||i===be)return n;Dt.add(i)}return s!==0&&!s?t?.removeAttribute&&t.removeAttribute(i):t?.setAttribute&&t.setAttribute(i,ie(s)?"":String(o)),n};return new Proxy(c,{get(o,s){let u=t[i][s];return f(u)?(...l)=>(_(n,`${e}.${s}`,l),u.call(t[i],...l)||n):Re(t[i],s,n,i)},set(o,s,u){return t[i][s]=u,!0}})},Oe=t=>ht(t,HTMLCollection)||ht(t,NodeList)?[...t].map(e=>gt(e)):ht(t,SVGElement)?gt(t):$(t)?t===""||isNaN(t)?t:Number(t):t,ve=[],_=(t,e,n,r=[])=>{for(let i of ve)i(B,t,e,n,r)},pt={},Cn=(t,e,n)=>(_(t,`d.${e}`,n,Object.keys(pt).map(r=>`d.${r}`)),pt[e]?pt[e].apply(t,n):`${e}${n.join(st)}`),Mn=(t,e,n)=>(_(t,`transform.${e}`,n),`${e}(${n.join(st)})`);function B(t){return _(null,D,[t]),dt(y(t)?Tn:t)}B.isWrapped=Bt;var mt=t=>e=>f(e)?e(t):Object.assign(t,e),Vt={install:Ce,extendConstructor:mt(B),extendInstance:mt(yt.prototype),extendPath:mt(pt),beforeEveryCall(t){f(t)&&ve.push(t)}};Vt.extendSetup=mt(Vt);function Ce(t){return t(Vt),B}B.install=Ce;var et=B;var Ht=new Map,Ln=/function\s+([\p{L}\p{Nl}$_][\p{L}\p{Nl}$_\p{Mn}\p{Mc}\p{Nd}\p{Pc}]*)\s*\(/gmu,_n=async function(){}.constructor;function Et(t,e,n=!1){let r=`${t.join(",")} ${e}`;if(Ht.has(r))return Ht.get(r);let i=new(n?_n:Function)(...t,e);return Ht.set(r,i),i}function Me(t,e){let n=[...e.matchAll(Ln)].map(i=>i[1]);return Et(Object.keys(t),`${e}; return {${n.map(i=>`${i}: typeof ${i} === 'function' ? ${i} : undefined`)}}; `)(...Object.values(t))}function Gt(t){try{return new Function(`let ${t} = 0`),!0}catch{return!1}}var zt="animate",Pn="path",Le="d",_e="transform",Ue="rotate",H="translate",Pe="inherit",Ie="finished",In=[Ue,"skewX","skewY"],Un=[H,"width","height","x","y","cx","cy","r","rx","ry","dx","dy"],Dn=(t,e)=>["text","tspan"].includes(t)&&["x","y"].includes(e),qt=!1;if(window.matchMedia){let t=window.matchMedia("(prefers-reduced-motion: reduce)");qt=t.matches,t.addEventListener("change",()=>{qt=t.matches})}var Fn=t=>t.replace(/([A-Z])/g,"-$1").toLowerCase();function Vn(t,e={duration:200},n=null,r=null){let i=this.gSVG,c=a=>{let d=m(a)?{...a}:{duration:a};return qt&&(d.duration=0),d.fill="none",d},o=a=>{a=L(a)?a:[a];let d=window.getComputedStyle(this._el),p=[],x=new Set;for(let v of a){let S={};for(let I in v){let b=ot(I);S[b]=E(v[I],b),!(b in d)||Dn(this.tagName(),b)?x.add(b):b===Le?S.d=`${Pn}("${S.d}")`:b===_e&&(S.transform=l(S.transform))}p.push(S)}return u(x,p),p},s=[],u=(a,d)=>{if(a.size){let p=new KeyframeEffect(null,d).getKeyframes();for(let x of a){let v=i(zt).attributeName(x).dur(Q.duration+"ms").fill("freeze");if(d.length===1)v.to(d[0][x]);else{let S=[],I=[];for(let b in p){let Ze=p[b];x in d[b]&&(S.push(Ze.computedOffset),I.push(d[b][x]))}S[0]!==0&&(S.unshift(0),I.unshift(this[x]()||Pe)),S[S.length-1]!==1&&(S.push(1),I.push(this[x]()||Pe)),v.keyTimes(S.join(";")).values(I.join(";"))}s.push(v),v.attachTo(this),v.beginElementAt(Q.delay||0)}}},l=a=>{$(a)&&(a=JSON.parse("{"+a.replace(/\s*\(\s*/g,":[").replace(/\s*\)\s*/g,"],").split(/\s*,\s*|\s.*/).join(",").replace(/(\w+):/g,'"$1":').replace(/,$/,"")+"}"));let d="";for(let p in a)if(p===Ue){let x=h(a[p]);x.length>1&&(d+=`${H}(${E(x[1],H)},${E(x[2],H)}) `),d+=`${p}(${E(x[0],p)}) `,x.length>1&&(d+=`${H}(-${E(x[1],H)},-${E(x[2],H)}) `)}else d+=`${p}(${h(a[p]).map(x=>E(x,p)).join(",")}) `;return d},h=a=>L(a)?a:String(a).split(/\s+|,/),E=(a,d)=>In.includes(d)?a+"deg":Un.includes(d)?a+"px":a,O=a=>$(a)?a.replace(/(deg)|(px)/g,"").trim():a,K=a=>a.replace(/(path\s*\(\s*["'])|(["']\s*\)\s*$)/g,"").trim().replace(/([a-zA-Z])\s*/g,"$1").replace(/\s+/g,","),z=a=>{let d=/translate\((.*)px,(.*)px\) rotate\((.*)deg\) translate\((.*)px,(.*)px\)\s+/,p=d.exec(a);return p&&Number(p[1])===Number(p[4])*-1&&Number(p[2])===Number(p[5])*-1?a=a.replace(d,`rotate(${p[3]}, ${p[1]}, ${p[2]})`):a=O(a),a},Q=c(e),rt=o(t),q=this._el.animate(rt,Q);return q.ready.then(()=>f(n)&&n.call(this,q)),q.finished.then(()=>{let a=rt[rt.length-1];for(let d in a){let p=Fn(d);p.startsWith("text-")?this._el.style[d]=a[d]:d!=="offset"&&d in a&&this._el.setAttribute(p,p===Le?K(a[d]):p===_e?z(a[d]):O(a[d]))}s.forEach(d=>{d[Ie](!0);let p=this._el.querySelectorAll(zt),x=this._el.querySelectorAll(`${zt}[${Ie}]`);p.length===x.length&&p.forEach(v=>v.remove())}),f(r)&&r.call(this,q)}),this}function kn(t){t.extendInstance({animateTo:Vn})}var De=kn;var Fe=Symbol(),ke=Symbol(),G=Symbol(),X=Symbol(),xt=Symbol(),Wt=Symbol(),Ve=Symbol(),Bn="unknown",$t={},Be=(t,e)=>new Error(`The expression "${t}" return ${e} value`),Hn=(t,e,n)=>{throw new Error(t+` in ${e} `+n)},Gn=(t=>e=>t[e]||e)("attributeName attributeType baseFrequency calcMode clipPathUnits diffuseConstant edgeMode gradientTransform gradientUnits kernelMatrix kernelUnitLength lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY requiredExtensions requiredFeatures specularConstant specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength viewBox xChannelSelector yChannelSelector zoomAndPan".split(" ").reduce((t,e)=>(t[e.toLowerCase()]=e,t),{}));function He(t){if(!t?.el?.parentNode)return null;let e=document.createComment(" ref ");return t.parentNode().insertBefore(e,t.el),t.remove(),e[Wt]=t,e}function zn(t){let e=t[Wt];return t.parentNode.insertBefore(e.el,t),t.remove(),e}J({name:"g-content",exec(t,{expr:e,data:n,evalExpr:r}){let i={...n,$$:{fromURL:async u=>{let l=await fetch(u);if(l.status===200)return l.text();console.warn(`Failed to load URL: ${u} (${l.status})`)},currentContent:t.content}},c=r(e,i),o=new CustomEvent("load",{bubbles:!0,detail:t}),s=u=>y(u)?"":u;m(c)&&c.then?c.then(u=>{t.content(s(u)),t.dispatchEvent(o)}):(t.content(s(c)),t.dispatchEvent(o))}});J({name:"g-if",exec(t,{expr:e,data:n,evalExpr:r}){if(!r(e,n))return He(t)}});J({name:"g-bind",alias:":",arg:!0,exec(t,{expr:e,arg:n,data:r,evalExpr:i}){n=Gn(n);let c={...r,$$:["d","transform"].includes(n)?t["$"+n]:{}};c.$$.currentValue=t[n],c.$$.dynamic=(s,u=200,l=0)=>(t.animateTo((L(s)?s:[s]).map(h=>m(h)&&"offset"in h?{[n]:h.value,offset:h.offset}:{[n]:h}),{duration:u,delay:l}),Ve);let o=i(e,c);if(y(o))throw Be(e,"undefined");if(n==="class"){if(L(o)){t.classList.add(...o.filter(s=>!!s));return}if(m(o)){Object.entries(o).forEach(([s,u])=>{u?t.classList.add(s):t.classList.remove(s)});return}o&&t.classList.add(o);return}if(n==="style"){Object.entries(o).forEach(([s,u])=>t.style[s](u));return}o!==Ve&&t[n](o)}});J({name:"g-on",alias:"@",arg:!0,exec(t,{expr:e,arg:n,data:r,evalExpr:i,error:c,code:o}){t[xt]=t[xt]||{};let s=t[xt][n]=t[xt][n]||new Map;s.has(e)&&t.removeEventListener(n,s.get(e));let u=function(l){try{let h=i(e,r,t);f(h)&&h.call(t,l)}catch(h){c(h.message,{directive:"g-on",argument:n,expression:e,toString(){return`g-on:${n}="${e}"`}},o)}};t.addEventListener(n,u),s.set(e,u),n==="init"&&!t[Fe]&&(t[Fe]=!0,t.dispatchEvent(new Event("init")))}});J({name:"g-for",tmpl:!0,exec(t,{expr:e,data:n,error:r}){t[G]=t[G]||[];let i=t.gSVG(He(t)),c=0;return Xn(e,n,o=>{if(t[G][c])nt(t[G][c],o,r,!1);else{let s=t.gSVG(t.tagName());s[X]=t[X].filter(u=>u.name!=="g-for"),[...t.attributes()].forEach(u=>{u.name!=="g-for"&&s.setAttribute(u.name,u.value)}),t.children().forEach(u=>{s.add(u.cloneNode(!0))}),i.before(s),nt(s,o,r),s[ke]=!0,t[G].push(s)}c++},o=>{for(;t[G].length>o.length;)t[G].pop().remove()}),!0}});function J({name:t,alias:e,arg:n,tmpl:r,exec:i}){let c=`^(${t}${n?":":""}${e?`|${e})`:")"}${n?"(.*)$":"$"}`,o=new RegExp(c,"i");$t[t]={name:t,alias:e,arg:n,tmpl:r,exec:i,check:o}}function qn(t){for(let e in $t){let n=$t[e],r=n.check.exec(t);if(r){let i=r[2];return{...n,arg:i}}}}function Wn(t){return t.replace(/[{}()[\]]/g,"").split(",").map(e=>(e.includes(":")?e.split(":")[1].trim():e).trim())}function Yn(t){return t[Symbol.iterator]?{iterator:[...t],type:W}:ne(t)?{iterator:Array(t<0?0:0|t).fill(0).map((e,n)=>n),type:R}:m(t)?{iterator:Object.entries(t).map(e=>e.reverse()),type:N}:{iterator:t,type:Bn}}function Ge(t,e,n=null){let r=Object.keys(e).filter(Gt),c=Et(r,`return ( ${t} ); `).apply(n,r.map(o=>e[o]));if(!it(c))throw Be(t,"NaN (Not a Number)");return c}function Xn(t,e,n,r){let i="__$$i",c="__$$c",o="__$$f",[s,u]=t.split(" of ");s=s.trim(),u=u.trim();let l=Ge(u,e)||[],{iterator:h,type:E}=Yn(l);E===N&&!s.startsWith("[")&&(s=`[${s.replace(/(^\()|(\)$)/g,"")}]`);let O=Wn(s),K=s.startsWith("(")?s:`(${s})`,z=Object.keys(e).filter(Gt),Q=` ${i}.forEach(${K} => { ${c}({${z}${z.length?",":""}${O.join(",")}}); }); ${o}(${i}); `;return Et([...z,i,c,o],Q)(...z.map(q=>e[q]),h,n,r)}function nt(t,e,n,r=!0){if(r&&t[ke])return;let i=t.outerHTML();t[X]=t[X]||[];let c=t.attributes();for(let s of[...c]){let u=s.name,l=qn(u);l&&(t[X].push({...l,expr:s.value}),t.removeAttribute(u))}let o=!1;for(let s of t[X]){o=s.tmpl||o;try{if(s.exec(t,{...s,data:e,evalExpr:Ge,error:n,code:i}))return}catch(u){n(u.message,{directive:s.name,argument:s.arg,expression:s.expr,toString(){return`${s.name}${s.arg?":"+s.arg:""}="${s.expr}"`}},i)}}if(!o)for(let s of t.childNodes())s.el[Wt]?nt(zn(s.el),e,n):s.el?.nodeType===1&&nt(s,e,n)}function Jn(t={},e=Hn){nt(this,t,e),this.dispatchEvent(new Event("render"))}function Zn(){return this.outerHTML().replaceAll("<!-- ref -->","")}function Kn(t){t.install(De),t.extendInstance({render:Jn,source:Zn}),t.extendSetup({extendTemplate:{defineDirective:J,getDirective(e){return $t[e]}}})}var ze=Kn;var qe=t=>Math.round(t*1e4)/1e4;function Yt(t){return(t-90)*Math.PI/180}function Nt(t,e,n,r){let i=Yt(r);return{x:qe(t+n*Math.cos(i)),y:qe(e+n*Math.sin(i))}}function St(t,e,n,r,i=0){i=Math.abs(i)>=360?i%360:i,r=Math.abs(r)>360?r%360:r,r=Math.abs(r)===360?r>0?359.9:-359.9:r;let c=i+r,o=r>0?1:0,s=Math.abs(c-i)<=180?0:1,u=i<0?(360+i)%360:i,l=c<0?(360+c)%360:c,h=Nt(t,e,n,u),E=Nt(t,e,n,l);return`M${h.x},${h.y}A${n},${n},0,${s},${o},${E.x},${E.y}`}function Qn(t,e,n,r,i,c=0){let o=St(t,e,n+r/2,i,c),s=St(t,e,n-r/2,-i,c+i);return o+"L"+s.substring(1)+"Z"}function jn(t,e,n,r,i=0){return`${St(t,e,n,r,i)}L${t},${e}Z`}function tr(t){t.extendConstructor({polar2cartesian:Nt,degrees2radians:Yt}),t.extendComposer&&t.extendComposer({polar2cartesian:Nt,degrees2radians:Yt}),t.extendPath({arc:St,barArc:Qn,circleSlice:jn})}var We=tr;var Jt=Symbol(),Xt=Symbol(),Ye=(t,e,n)=>Object.defineProperty(t,e,{enumerable:!1,configurable:!0,writable:!0,value:n}),er=(t,e)=>e===Jt?t:fe(t,e);function Zt(t={}){if(!m(t))return t;let e={};function n(r,i,c,o){r in t||(e[r]||(e[r]={}),Ye(t,r,(s=void 0,u=Jt)=>{if($(s)||y(s)){if(u=s||Jt,u in e[r])return e[r][u];s=t}let l=s.reduce((h,E)=>{let O=er(E,u);return y(O)?h:h===Xt?O:c(h,O)},f(i)?i():i);return l=f(o)?o(l):l,t!==s&&(e[r][u]=l),l===i?0:l}),Ye(t,r+"Before",(s,u)=>t[r](t.slice(0,s),u)))}return n("$min",Xt,(r,i)=>i>r?r:i),n("$max",Xt,(r,i)=>i<r?r:i),n("$count",0,r=>r+1),n("$sum",0,(r,i)=>i+r),n("$avg",()=>({n:0,i:0}),(r,i)=>(r.n++,r.i+=Number(i),r),r=>isNaN(r.i/r.n)?0:r.i/r.n),n("$distinct",new Set,(r,i)=>(r.add(i),r),r=>[...r]),t}var nr="composer",Kt="update",Z="svg",Qt="methods",jt="config",te="data",At="-src",Xe=t=>`script[type=${t}],g-script[type=${t}]`,Je=["0px","auto"],rr=t=>{let e=getComputedStyle(t.el);return Je.includes(e.width)&&Je.includes(e.height)},P=class extends k{static install(e){et.install(e)}#t=null;#r=!1;#i=!1;#s=[];#e=[];#h=vt(function(e,n){this[A](e,n)},1);#n(e,n,r,i){let c={message:e,scope:n,code:r,toString:()=>`${e}${n?` in ${n}`:""} ${r}`};i.push(c),console.warn(`Graphane Composer - Error: ${c}`),this.#h.call(this,"error",this.errors)}#d(e){return e.length=0,(n,r="",i="")=>this.#n(n,r,i,this.#s)}async#c(e){let n=await fetch(e);if(n.status!==200)throw new Error(`${n.statusText} (${n.status}): ${n.url}`);return n.text()}async#p(){let e=[...this.querySelectorAll(Xe("plugin"))];for(let n of e){let r=n.getAttribute("src");if(r){let i=new URL(r,document.location.href);try{let c=await import(i.href);c?.default&&et.install(c.default)}catch(c){this.#n(c.message,"plugin",r,this.#e)}}}}async#u(){let e=this[g];if(this.#t=null,e.content.innerHTML="",e.svgSrc)try{e.content.innerHTML=await this.#c(e.svgSrc)}catch(r){this.#n(r.message,Z,e.svgSrc,this.#e)}else{let r=this.querySelector("template")?.content||this.querySelector(Z);r&&e.content.append(r.cloneNode(!0))}let n=e.content.querySelector(Z);return this.#t=n?et(n):null,!0}async#o(e,n){let r=this[g],i=e+"Src",c=this.querySelector(Xe(e));c&&(r[i]=c.getAttribute("src"));let o=r[i]?await this.#c(r[i]).catch(s=>this.#n(s.message,e,r[i],this.#e)):c?.textContent;if(o)try{r[e]=n(o)}catch(s){this.#n(s.message,e,o,this.#e)}}#a(){return this.#o(Qt,e=>Me({$:this},e))}#l(){return this.#o(jt,wt)}#f(){return this.#o(te,e=>oe(e)||ce(e)?wt(e):ue(e))}constructor(){super();let e=this[g];this.shadowRoot.innerHTML=` <style> :host { display : inline-block; width : max-content; height : max-content; } </style><span></span>`,e.content=this.shadowRoot.querySelector("span")}[w](){return!this.load()}async[V](e){let n=[];for(let r of e){let i=r.target;if(i===this&&!r.attributeName)return this.load();if(i.tagName.toLowerCase()===Z)n.push(this.#u());else if(i.tagName==="SCRIPT"){let c={data:this.#f,methods:this.#a,config:this.#l}[i.type.toLowerCase()];c&&n.push(c())}}if(n.length)return await Promise.all(n),this.update()}async load(){return this.#r=!1,this.#e=[],await this.#p(),await Promise.all([this.#u(),this.#l(),this.#a(),this.#f()]),this.#r=!0,this[A]("load"),this.update(!0)}async update(e=!1){if(!(this.#i&&!e)&&this.#t){this.rendered=!1,this.#i=!0;let n=this[g],r=n.methods?.data?n.methods.data(Zt(F(n.data))):Zt(F(n.data)),i={...n.methods,...L(r)?{}:r,data:r,$:this};await this.#t.render(i,this.#d(this.#s)),rr(this.#t)&&this.#t.width("100%").height("100%"),this.#i=!1,this.rendered=!0}}get[Z](){return this.#t}get loaded(){return this.#r}get errors(){return[...this.#e,...this.#s]}get version(){return"1.0.0-beta.7"}};P.prototype.update=vt(P.prototype.update,1);ge(P).ext(Ne).attr({name:Z+At,type:C,value:"",posUpdate:w}).attr({name:te,type:N,value:[],posUpdate:Kt}).attr({name:te+At,type:C,posUpdate:w}).prop({name:Qt,type:N,value:{},posUpdate:Kt}).attr({name:Qt+At,type:C,posUpdate:w}).attr({name:jt,type:N,value:{},posUpdate:Kt}).attr({name:jt+At,type:C,posUpdate:w}).attr({name:"value",set(t){this.data={value:t}},get(){return this.data?.value}}).tag(nr);var ir=t=>{t.extendSetup({extendComposer(e){f(e)?e(P.prototype):Object.assign(P.prototype,e)}})};et.install(ir).install(ze).install(We);})();