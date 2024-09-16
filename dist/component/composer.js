/* graphane - 1.0.0-beta.3 */ (()=>{var Be="function",Kt="undefined",$="object",v="string",W="array",b="number",I="boolean",He="date",Ge="symbol",D="",rt=",";var ze=";",y=t=>typeof t===$,N=t=>typeof t===v,h=t=>typeof t===Be,Zt=t=>typeof t===b&&!isNaN(t),m=t=>typeof t===Kt,Qt=t=>typeof t===Ge,jt=t=>typeof t===I,_=t=>Array.isArray(t),St=t=>t instanceof Date&&!isNaN(t),R=t=>t===null,it=t=>t.replace(/-([a-z0-9])/g,(e,n)=>n.toUpperCase());function qe(t){if(N(t))try{let e=t.replace(/^\s*{/,"").replace(/}\s*$/,"").split(/((?:[^;^,"']|"[^"]*"|'[^']*')+)/).filter(n=>!["",";",","].includes(n.trim())).map(n=>n.split(":")).map(n=>`"${n[0].trim()}":${L(n[1].trim(),void 0,!0)}`).join(",");return JSON.parse(`{${e}}`)}catch{try{return L(t)}catch(n){console.error(n);return}}else if(y(t))return t}function te(t){if(N(t))return t.trim().startsWith("[")?(t.match(/\[(.*?)[^\]]]/g)||[]).map(e=>te(e.substring(1,e.length-1))):t.split(/[,;]/).map(e=>L(e.trim()));if(_(t))return t}function L(t,e,n=!1){if(!N(t))return t;if(t=We(t.trim()),e===W)return te(t);if(e===$)return qe(t);if(m(e)||e===b){if(m(t)||t==="")return;let r=+t;if(!Number.isNaN(r)||e===b)return r}if(m(e)||e===I){if(t==="true")return!0;if(t==="false")return!1;if(e===I)return t==="0"?!1:!!t}if(e===He){try{let r=new Date(t);if(!Number.isNaN(r.getTime()))return r}catch{}return}if(m(e)||e===v)return n?`"${t}"`:t}function We(t){return t[0]==="'"&&t[t.length-1]==="'"||t[0]==='"'&&t[t.length-1]==='"'?t.substring(1,t.length-1):t}function ee(t){return/^\s*{/.test(t)&&/}\s*$/.test(t)}function ne(t){return/^\s*\[/.test(t)&&/]\s*$/.test(t)}function re(t){let e=[],n=t.split(/(\r\n|\r|\n)/).map(r=>r.trim()).filter(r=>r);return n.length===0?[]:n.length===1?L(n[0]):n.reduce((r,i,c)=>{let o={},s=i.split(/((?:[^;^,"']|"[^"]*"|'[^']*')+)/).filter(u=>![D,ze,rt].includes(u.trim()));return c===0?(e=[...s.map(u=>L(u))],r):(s.forEach((u,f)=>{o[e[f]]=L(u)}),r.push(o),r)},[])}function At(t){let e=`return (${t});`,n=new Function(e)();return typeof n=="function"?n():n}var ie=new WeakSet,Q=!1,Tt=(t,e)=>h(e)?function n(r){if(ie.has(r))return r;for(let c in r)y(r[c])&&!R(r[c])&&(r[c]=n(r[c]));let i=new Proxy(r,{get(c,o){let s=Reflect.get(r,o);return h(s)&&St(c)&&N(o)&&o.substring(0,3)==="set"&&h(e)&&(s=function(...u){let f=Reflect.get(c,o).apply(c,u);return!Q&&e(t),f}),St(c)?s.bind(c):s},set(c,o,s){let u,f=c[o]===s;return y(s)&&!R(s)?u=Reflect.set(c,o,n(s)):u=Reflect.set(c,o,s),!Q&&!f&&e(t),u},deleteProperty(c,o){let s=Reflect.deleteProperty(c,o);return!Q&&e(t),s}});return ie.add(i),i}(t):t;Tt.stop=()=>Q=!0;Tt.start=()=>Q=!1;var st=Tt;var j=!1,ot=!0;function Ye(t){return t===null?null:t.constructor?new t.constructor:{}}function F(t){if(!y(t))return t;let e=t===null?null:Object.assign(Ye(t),t);for(let n in e)y(e[n])&&(e[n]=F(e[n]));return e}function se(t,e){let n=[],r=[];function i(o,s){if(o===null||s===null)return j;if(h(o.valueOf)&&h(s.valueOf)&&(o!==o.valueOf()||s!==s.valueOf()))return o.valueOf()===s.valueOf()&&o.constructor===s.constructor;if(n.indexOf(o)>-1&&r.indexOf(s)>-1)return ot;let u=Object.keys(o),f=Object.keys(s);if(u.length!==f.length)return j;if(u.length>0){n.push(o),r.push(s);let d=u.length;for(;d--;){let x=u[d];if(!c(o[x],s[x]))return j}}return ot}function c(o,s){if(o===s)return ot;let u=typeof o;return u!==typeof s?j:u===b&&isNaN(o)&&isNaN(s)?ot:u===$?i(o,s):j}return c(t,e)}function oe(t,e){let n=t,r=N(e)?e.split("."):e;for(let i=0;i<r.length;i++){if(m(n[r[i]]))return;n=n[r[i]]}return n}var ut=globalThis.GRAPHANE_PREFIX||"g-",Xe=Symbol(),g=Symbol(),k=Symbol(),A=Symbol(),wt=Object.defineProperty;function Je(t,e,n,r=!1){if(!(t.ready===!1||!e))if(r)n?t.setAttribute(e,D):t.removeAttribute(e);else{let i=R(n)||m(n)?D:n.toString();t.hasAttribute(e)&&t.getAttribute(e)!==i&&t.setAttribute(e,i)}}function Ke(t){this[g]={};let e=t;do{let n=ct.get(e);for(let r in n)if(n.hasOwnProperty(r)&&this.hasOwnProperty(r)){let i=this[r];delete this[r],this[r]=m(i)?F(n[r]):i}else r in this[g]||(this[g][r]=F(n[r]));e=Object.getPrototypeOf(e)}while(e!==HTMLElement)}function Ze(){new MutationObserver(t=>{for(let e of t)if(!e.attributeName){this[A]("update");break}(m(this.ready)||this.ready)&&h(this[k])&&this[k](t)}).observe(this,{attributes:!0,childList:!0,subtree:!0,characterData:!0})}var ct=new WeakMap,at=class extends HTMLElement{constructor(){super(),Ke.call(this,new.target),new.target[Xe]?.forEach(e=>h(e)&&e.call(this,this)),h(this[k])&&Ze.call(this)}[A](e,n={},r=!1){return this.dispatchEvent(new CustomEvent(e,{bubbles:!0,cancelable:!0,detail:n,composed:r}))}};function Qe(t,e){e.propertyName||(e.propertyName=it(e.name)),ce(t,{name:e.propertyName,value:e.value,get:e.get,set:e.set,attribute:e.name,type:e.type,preUpdate:e.preUpdate,posUpdate:e.posUpdate,posUpdateEvent:e.posUpdateEvent,schema:e.schema});let n=Object.getPrototypeOf(t),r="observedAttributes",i=Object.getOwnPropertyDescriptor(t,r),c=Object.getOwnPropertyDescriptor(n,r),o=i?i.get:void 0;wt(t,r,tn(t,e,n,o,i,c));let s="attributeChangedCallback",u=Object.getOwnPropertyDescriptor(t.prototype,s),f=Object.getOwnPropertyDescriptor(n.prototype,s),d=u?u.value:void 0;wt(t.prototype,s,je(e,d,f))}function je(t,e,n){return{value:function(r,i,c){if(t.name===r){let o=t.propertyName;this[o]!==c&&(t.type===I?this[o]=this.hasAttribute(t.name):this[o]=L(c,t.type))}else e&&e.apply(this,arguments);n?.value&&n.value.apply(this,arguments)},enumerable:!1,writable:!0,configurable:!0}}function tn(t,e,n,r,i,c){let o={enumerable:!1,configurable:!0};return i?c?o.get=function(){return[e.name,...r.call(t),...c.get.call(n)]}:o.get=function(){return[e.name,...r.call(t)]}:o.get=c?function(){return[e.name,...c.get.call(n)]}:function(){return[e.name]},o}function ce(t,e){wt(t.prototype,e.name,{set:ue(e),get:nn(e),configurable:!0,enumerable:!1}),ct.has(t)||ct.set(t,{}),ct.get(t)[e.name]=e.value}function en(t,e){R(t.posUpdateEvent)||(t.posUpdateEvent?this[A](t.posUpdateEvent,{[t.name]:e}):this[A]("update",{[t.name]:e})),h(t.posUpdate)?t.posUpdate.call(this,e):h(this[t.posUpdate])&&this[t.posUpdate]()}function ue(t){return function(e){let n=this[g];h(t.preUpdate)&&!t.preUpdate.call(this,e)||(t.schema&&(st.stop(),e=t.schema.normalize(e),st.start()),!(!y(e)&&se(n[t.name],e))&&(h(t.set)?t.set.call(this,e):n[t.name]=N(e)&&t.type?L(e,t.type):e,t.attribute&&![W,$].includes(t.type)&&Je(this,t.name,e,t.type===I),en.call(this,t,e)))}}function nn(t){return function(){if(h(t.get))return t.get.call(this);{let e=this[g];switch(t.type){case b:return m(e[t.name])?void 0:Number(e[t.name]);case I:return!!e[t.name];case $:case W:return st(e[t.name]||(t.type===$?{}:[]),n=>ue(t).call(this,n));default:return e[t.name]}}}}function rn(t,e){customElements.get(ut+e.toLowerCase())||customElements.define(ut+e.toLowerCase(),t)}function ae(t,e={}){return e.property=(...n)=>(n.forEach(r=>ce(t,{...r})),e),e.attribute=(...n)=>(n.forEach(r=>Qe(t,{...r})),e),e.tag=n=>(rn(t,n),e),e.extension=n=>(n.call(e,e,t),e),e}function fe(t,e){let n=new WeakMap;return function(...r){clearTimeout(n.get(this)),n.set(this,setTimeout(()=>{t.apply(this,r)},e))}}function bt(t,e){let n=new WeakMap,r=[];return function(...i){return clearTimeout(n.get(this)),new Promise((c,o)=>{r.push({resolve:c,reject:o}),n.set(this,setTimeout(()=>{try{let s=t.apply(this,i);r.forEach(u=>u.resolve(s))}catch(s){r.forEach(u=>u.reject(s))}finally{r.length=0}},e))})}}function Rt(t,e){return function(...n){if(t.apply(this,n))return e.apply(this,n)}}function Ot(t,e){return function(...n){let r=t.apply(this,n);return r instanceof Promise?r.then(i=>e.call(this,i)||i):e.call(this,r)||r}}var le=1,Y=Symbol(),T=Symbol(),he=Symbol(),Ct=Symbol();var V=class extends at{constructor(e){super(),this.attachShadow({mode:"open"}),this[g].ready=e||!1,this[g].rendered=!1,m(e)&&(this.ready=!0)}get ready(){return this[g].ready}set ready(e){let n=this[g],r=n.ready;n.ready=!!e,r===!1&&n.ready===!0&&(this[A]("ready",{ready:!0}),h(this[T])&&this[T]())}get rendered(){return this[g].rendered}set rendered(e){let n=this[g],r=n.rendered;n.rendered=!!e,r===!1&&n.rendered===!0&&this[A]("render",{rendered:!0})}connectedCallback(){let e=this.getBoundingClientRect(),n=getComputedStyle(this).flexDirection,r=()=>{let{width:i,height:c}=this.getBoundingClientRect(),o=getComputedStyle(this).flexDirection;(i!==e.width||c!==e.height||o!==n)&&(h(this[he])&&this[he](i,c,i-e.width,c-e.height),e={width:i,height:c},n=o,this[A]("resize",e)),this[g]._resizeObserver=window.requestAnimationFrame(r)};r()}disconnectedCallback(){window.cancelAnimationFrame(this[g]._resizeObserver)}};function sn(t,e){let n={name:e.name.startsWith("--")?e.name:`--${ut}${e.name}`,initialValue:e.initialValue??e.value??"",syntax:e.syntax??"*",inherits:e.inherits??!0};t.prototype[Ct]||(t.prototype[Ct]={}),t.prototype[Ct][n.name]=n}function on(t){if(h(t.prototype[T])){let e=t.prototype[T];t.prototype[T]=Rt(function(){return this.rendered=!1,this.ready},bt(Ot(async function(){return e.apply(this)},function(n){this.rendered=n!==!1,this.rendered&&h(this[Y])&&this[Y]()}),le))}if(h(t.prototype[Y])){let e=t.prototype[Y];t.prototype[Y]=Rt(function(n){return n&&(this[g].rendered=!0),this.ready&&this[g].rendered},bt(Ot(async function(...n){return e.apply(this,n)},function(){this[A]("refresh")}),le))}}function de(t){on(t);let e=ae(t,{style:(...n)=>(n.forEach(r=>sn(t,{...r})),e)});return e}V.RENDER=T;V.REFRESH=Y;V.CHANGE=k;var cn="intersection.enter",un="intersection.exit",ft=Symbol(),an={root:null,rootMargin:"0px",threshold:Array(21).fill(0).map((t,e)=>e*.05)};function fn(t){let e=!1;this[ft]&&this[ft].disconnect(),this[ft]=new IntersectionObserver(n=>{n.forEach(r=>{r.isIntersecting&&r.intersectionRatio>=t?e||(e=!0,this.dispatchEvent(new CustomEvent(cn,{bubbles:!0,cancelable:!0,composed:!0}))):(e=!1,this.dispatchEvent(new CustomEvent(un,{bubbles:!0,cancelable:!0,composed:!0})))})},an),this[ft].observe(this._el||this)}var vt=fn;var pe=Symbol();function ln(t){t.attribute({name:"intersection-once-class",type:v,value:""}).attribute({name:"intersection-class",type:v,value:""}).attribute({name:"intersection-ratio",type:b,value:0,posUpdate:dn})}var me=(t,e)=>e&&e.split(/\s+/).forEach(n=>t.add(n)),hn=(t,e)=>e&&e.split(/\s+/).forEach(n=>t.remove(n)),ye=(t,e)=>{e.preventDefault();let n=()=>{t.removeEventListener("render",n),t[A](e.type,e.detail,e.composed)};t.addEventListener("render",n)};function dn(){let t=this[g];if(this[pe])return vt.call(this,t.intersectionRatio);this[pe]=!0;let e=this.classList;this.addEventListener("intersection.enter",n=>{me(e,t.intersectionOnceClass),me(e,t.intersectionClass),this.rendered||ye(this,n)}),this.addEventListener("intersection.exit",n=>{hn(e,t.intersectionClass),this.rendered||ye(this,n)}),vt.call(this,t.intersectionRatio)}var ge=ln;var It="gSVGObject",pn="http://www.w3.org/2000/svg",mn="svg",Lt="d",Ee="transform",Ne="appendChild",Ut="insertBefore",xe="insertAdjacentElement",$e="attach",Se="innerHTML",_t=new WeakMap,Mt=new Set,yn=t=>Qt(t)||t.startsWith("_")||["el","gSVG","then"].includes(t),lt=(t,e)=>t instanceof e,gn=()=>It+Math.random().toString(32).substring(2),Dt=t=>y(t)&&!R(t)&&t[Symbol.toStringTag]===It,En=t=>yt(document.createElementNS(pn,t)),ht=t=>N(t)?En(t):y(t)&&t!==null?Dt(t)?t:yt(t):t,xn=t=>({content:Se,source:"outerHTML",parent:"parentElement",next:"nextElementSibling",previous:"previousElementSibling",add:Ne,addBefore:Ut})[t]||t,Nn=t=>["append","before","after",Ne,Ut,xe].includes(t)?function(...e){let n=[],r=[],i=[];return t===xe?(n.push(e[0]),r.push(ht(e[1]))):t===Ut?(r.push(ht(e[0])),i.push(e[1]||this.firstChild||null)):r.push(...e.map(ht)),r.every(c=>c?._el)?(this[t](...n,...r.map(c=>c&&c._el),...i),r.forEach(c=>c._el.dispatchEvent(new Event($e))),r.length>1?r:r[0]):r[0]}:null,mt=class{constructor(e){this._el=e,this.gSVG=B}get[Symbol.toStringTag](){return It}get el(){return this._el}attachTo(e){return(y(e)?Dt(e)?e._el:e:document.querySelector(e)).appendChild(this._el),this._el.dispatchEvent(new Event($e)),this}id(e){return e?(this._el.setAttribute("id",e),this):this._el.id||(this._el.id=gn())}ref(){return`#${this.id()}`}url(){return`url(${this.ref()})`}parents(){let e=[],n=this;for(;n=n.parentElement();)e.push(n);return e}top(){return this.parents().pop()||this}},yt=t=>{if(!y(t)||R(t))return null;if(_t.has(t))return _t.get(t);let e=new Proxy(new mt(t),{get(n,r){if(yn(r))return n[r];if(!m(n[r]))return(...o)=>(M(e,r,o),n[r].call(e,...o));if([Lt,Ee,"$"+Lt,"$"+Ee].includes(r)){let o="";r[0]==="$"&&(r=r.substring(1));let u=r===Lt?$n:Sn,f=new Proxy(d=>(M(e,r,[d]),m(d)?t.getAttribute(r):(d?t.setAttribute(r,d):t.removeAttribute(r),e)),{get(d,x){return x in d?Reflect.get(d,x):(...O)=>{if(x===Symbol.toPrimitive){let K=o;return o="",K}return o+=u(e,x,O),t?.setAttribute(r,o),f}}});return f}let i=xn(r),c=Nn(i)||t[i];return h(c)?(...o)=>{M(e,r,o);let s=c.call(t,...o);return m(s)?e:Te(s)}:Ae(t,i,e)}});return _t.set(t,e),e},Ae=(t,e,n,r)=>{let i=e.replace(/_/g,"-"),c=(...o)=>{if(M(n,r?`${r}.${e}`:e,o),o.length===0){let u=t?.hasAttribute&&t.hasAttribute(i)?t.getAttribute(i):t[i];return Te(u)}let s=o[0];if(lt(t,CSSStyleDeclaration))return t[i]=s,n;if(i in t&&!Mt.has(i)){let u=t[i];if(String(u)===String(s))return n;try{t[i]=s}catch{Mt.add(i)}if(y(t[i])&&t[i]===s||t[i]!==u||i===Se)return n;Mt.add(i)}return s!==0&&!s?t?.removeAttribute&&t.removeAttribute(i):t?.setAttribute&&t.setAttribute(i,jt(s)?"":String(o)),n};return new Proxy(c,{get(o,s){let u=t[i][s];return h(u)?(...f)=>(M(n,`${e}.${s}`,f),u.call(t[i],...f)||n):Ae(t[i],s,n,i)},set(o,s,u){return t[i][s]=u,!0}})},Te=t=>lt(t,HTMLCollection)||lt(t,NodeList)?[...t].map(e=>yt(e)):lt(t,SVGElement)?yt(t):N(t)?t===""||Number.isNaN(Number(t))?t:Number(t):t,we=[],M=(t,e,n,r=[])=>{for(let i of we)i(B,t,e,n,r)},dt={},$n=(t,e,n)=>(M(t,`d.${e}`,n,Object.keys(dt).map(r=>`d.${r}`)),dt[e]?dt[e].apply(t,n):`${e}${n.join(rt)}`),Sn=(t,e,n)=>(M(t,`transform.${e}`,n),`${e}(${n.join(rt)})`);function B(t){return M(null,D,[t]),ht(m(t)?mn:t)}B.isWrapped=Dt;var pt=t=>e=>h(e)?e(t):Object.assign(t,e),Pt={install:be,extendConstructor:pt(B),extendInstance:pt(mt.prototype),extendPath:pt(dt),beforeEveryCall(t){h(t)&&we.push(t)}};Pt.extendSetup=pt(Pt);function be(t){return t(Pt),B}B.install=be;var tt=B;var Ft=new Map,An=/function\s+([\p{L}\p{Nl}$_][\p{L}\p{Nl}$_\p{Mn}\p{Mc}\p{Nd}\p{Pc}]*)\s*\(/gmu,Tn=async function(){}.constructor;function gt(t,e,n=!1){let r=`${t.join(",")} ${e}`;if(Ft.has(r))return Ft.get(r);let i=new(n?Tn:Function)(...t,e);return Ft.set(r,i),i}function Re(t,e){let n=[...e.matchAll(An)].map(i=>i[1]);return gt(Object.keys(t),`${e}; return {${n.map(i=>`${i}: typeof ${i} === 'function' ? ${i} : undefined`)}}; `)(...Object.values(t))}function kt(t){try{return new Function(`let ${t} = 0`),!0}catch{return!1}}var Vt="animate",wn="path",Oe="d",Ce="transform",_e="rotate",H="translate",ve="inherit",Le="finished",bn=[_e,"skewX","skewY"],Rn=[H,"width","height","x","y","cx","cy","r","rx","ry","dx","dy"],On=(t,e)=>["text","tspan"].includes(t)&&["x","y"].includes(e),Bt=!1;if(window.matchMedia){let t=window.matchMedia("(prefers-reduced-motion: reduce)");Bt=t.matches,t.addEventListener("change",()=>{Bt=t.matches})}var Cn=t=>t.replace(/([A-Z])/g,"-$1").toLowerCase();function vn(t,e={duration:200},n=null,r=null){let i=this.gSVG,c=a=>{let l=y(a)?{...a}:{duration:a};return Bt&&(l.duration=0),l.fill="none",l},o=a=>{a=_(a)?a:[a];let l=window.getComputedStyle(this._el),p=[],E=new Set;for(let C of a){let S={};for(let P in C){let w=it(P);S[w]=x(C[P],w),!(w in l)||On(this.tagName(),w)?E.add(w):w===Oe?S.d=`${wn}("${S.d}")`:w===Ce&&(S.transform=f(S.transform))}p.push(S)}return u(E,p),p},s=[],u=(a,l)=>{if(a.size){let p=new KeyframeEffect(null,l).getKeyframes();for(let E of a){let C=i(Vt).attributeName(E).dur(Z.duration+"ms").fill("freeze");if(l.length===1)C.to(l[0][E]);else{let S=[],P=[];for(let w in p){let Ve=p[w];E in l[w]&&(S.push(Ve.computedOffset),P.push(l[w][E]))}S[0]!==0&&(S.unshift(0),P.unshift(this[E]()||ve)),S[S.length-1]!==1&&(S.push(1),P.push(this[E]()||ve)),C.keyTimes(S.join(";")).values(P.join(";"))}s.push(C),C.attachTo(this),C.beginElementAt(Z.delay||0)}}},f=a=>{N(a)&&(a=JSON.parse("{"+a.replace(/\s*\(\s*/g,":[").replace(/\s*\)\s*/g,"],").split(/\s*,\s*|\s.*/).join(",").replace(/(\w+):/g,'"$1":').replace(/,$/,"")+"}"));let l="";for(let p in a)if(p===_e){let E=d(a[p]);E.length>1&&(l+=`${H}(${x(E[1],H)},${x(E[2],H)}) `),l+=`${p}(${x(E[0],p)}) `,E.length>1&&(l+=`${H}(-${x(E[1],H)},-${x(E[2],H)}) `)}else l+=`${p}(${d(a[p]).map(E=>x(E,p)).join(",")}) `;return l},d=a=>_(a)?a:String(a).split(/\s+|,/),x=(a,l)=>bn.includes(l)?a+"deg":Rn.includes(l)?a+"px":a,O=a=>N(a)?a.replace(/(deg)|(px)/g,"").trim():a,K=a=>a.replace(/(path\s*\(\s*["'])|(["']\s*\)\s*$)/g,"").trim().replace(/([a-zA-Z])\s*/g,"$1").replace(/\s+/g,","),z=a=>{let l=/translate\((.*)px,(.*)px\) rotate\((.*)deg\) translate\((.*)px,(.*)px\)\s+/,p=l.exec(a);return p&&Number(p[1])===Number(p[4])*-1&&Number(p[2])===Number(p[5])*-1?a=a.replace(l,`rotate(${p[3]}, ${p[1]}, ${p[2]})`):a=O(a),a},Z=c(e),nt=o(t),q=this._el.animate(nt,Z);return q.ready.then(()=>h(n)&&n.call(this,q)),q.finished.then(()=>{let a=nt[nt.length-1];for(let l in a){let p=Cn(l);p.startsWith("text-")?this._el.style[l]=a[l]:l!=="offset"&&l in a&&this._el.setAttribute(p,p===Oe?K(a[l]):p===Ce?z(a[l]):O(a[l]))}s.forEach(l=>{l[Le](!0);let p=this._el.querySelectorAll(Vt),E=this._el.querySelectorAll(`${Vt}[${Le}]`);p.length===E.length&&p.forEach(C=>C.remove())}),h(r)&&r.call(this,q)}),this}function Ln(t){t.extendInstance({animateTo:vn})}var Me=Ln;var Ue=Symbol(),Pe=Symbol(),G=Symbol(),Et=Symbol(),xt=Symbol(),Ht=Symbol(),_n="unknown",Nt={},Mn=(t,e,n)=>{throw new Error(t+` in ${e} `+n)},Un=(t=>e=>t[e]||e)("attributeName attributeType baseFrequency calcMode clipPathUnits diffuseConstant edgeMode gradientTransform gradientUnits kernelMatrix kernelUnitLength lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY requiredExtensions requiredFeatures specularConstant specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength viewBox xChannelSelector yChannelSelector zoomAndPan".split(" ").reduce((t,e)=>(t[e.toLowerCase()]=e,t),{}));function Ie(t){if(!t?.el?.parentNode)return;let e=document.createComment(" ref ");t.parentNode().insertBefore(e,t.el),t.remove(),e[Ht]=t}function Pn(t){let e=t[Ht];return t.parentNode.insertBefore(e.el,t),t.remove(),e}X({name:"g-content",execute(t,{expression:e,data:n,evalExpression:r}){let i={...n,$$:{fromURL:async u=>{let f=await fetch(u);if(f.status===200)return f.text();console.warn(`Failed to load URL: ${u} (${f.status})`)},currentContent:t.content}},c=r(e,i),o=new CustomEvent("load",{bubbles:!0,detail:t}),s=u=>m(u)?"":u;typeof c=="object"&&c.then?c.then(u=>{t.content(s(u)),t.dispatchEvent(o)}):(t.content(s(c)),t.dispatchEvent(o))}});X({name:"g-if",execute(t,{expression:e,data:n,evalExpression:r}){r(e,n)||Ie(t)}});X({name:"g-bind",alias:":",argument:!0,execute(t,{expression:e,argument:n,data:r,evalExpression:i}){n=Un(n);let c={...r,$$:["d","transform"].includes(n)?t["$"+n]:{}};c.$$.currentValue=t[n],c.$$.dynamic=(s,u=200,f=0)=>{t.animateTo((_(s)?s:[s]).map(d=>y(d)&&"offset"in d?{[n]:d.value,offset:d.offset}:{[n]:d}),{duration:u,delay:f})};let o=i(e,c);if(n==="class"){if(_(o)){t.classList.add(...o.filter(s=>!!s));return}if(y(o)){Object.entries(o).forEach(([s,u])=>{u?t.classList.add(s):t.classList.remove(s)});return}o&&t.classList.add(o);return}if(n==="style"){Object.entries(o).forEach(([s,u])=>t.style[s](u));return}m(o)||t[n](o)}});X({name:"g-on",alias:"@",argument:!0,execute(t,{expression:e,argument:n,data:r,evalExpression:i,error:c,outerCode:o}){t[xt]=t[xt]||{};let s=t[xt][n]=t[xt][n]||new Map;s.has(e)&&t.removeEventListener(n,s.get(e));let u=function(f){try{let d=i(e,r,t);h(d)&&d.call(t,f)}catch(d){c(d.message,`g-on:${n}="${e}"`,o)}};t.addEventListener(n,u),s.set(e,u),n==="init"&&!t[Ue]&&(t[Ue]=!0,t.dispatchEvent(new Event("init")))}});X({name:"g-for",template:!0,execute(t,{expression:e,data:n,error:r}){t[G]=t[G]||[];let i=0;kn(e,n,c=>{if(t[G][i])et(t[G][i],c,r,!1);else{let o=t.gSVG("g");t.children().forEach(s=>{o.add(s.cloneNode(!0))}),et(o,c,r),t.before(o.el),o[Pe]=!0,t[G].push(o)}i++},c=>{for(;t[G].length>c.length;)t[G].pop().remove()}),Ie(t)}});function X({name:t,alias:e,argument:n,template:r,execute:i}){let c=`^(${t}${n?":":""}${e?`|${e})`:")"}${n?"(.*)$":"$"}`,o=new RegExp(c,"i");Nt[t]={name:t,alias:e,argument:n,template:r,execute:i,check:o}}function In(t){for(let e in Nt){let n=Nt[e],r=n.check.exec(t);if(r){let i=r[2];return{...n,argument:i}}}}function Dn(t){return t.replace(/[{}()[\]]/g,"").split(",").map(e=>(e.includes(":")?e.split(":")[1].trim():e).trim())}function Fn(t){return t[Symbol.iterator]?{iterator:[...t],type:W}:Zt(t)?{iterator:Array(t<0?0:0|t).fill(0).map((e,n)=>n),type:b}:y(t)?{iterator:Object.entries(t).map(e=>e.reverse()),type:$}:{iterator:t,type:_n}}function De(t,e,n=null){let r=Object.keys(e).filter(kt);return gt(r,`return ( ${t} ); `).apply(n,r.map(c=>e[c]))}function kn(t,e,n,r){let i="__$$iterator",c="__$$callback",o="__$$final",[s,u]=t.split(" of ");s=s.trim(),u=u.trim();let f=De(u,e)||[],{iterator:d,type:x}=Fn(f);x===$&&!s.startsWith("[")&&(s=`[${s.replace(/(^\()|(\)$)/g,"")}]`);let O=Dn(s),K=s.startsWith("(")?s:`(${s})`,z=Object.keys(e).filter(kt),Z=` ${i}.forEach(${K} => { ${c}({${z}${z.length?",":""}${O.join(",")}}); }); ${o}(${i}); `;return gt([...z,i,c,o],Z)(...z.map(q=>e[q]),d,n,r)}function et(t,e,n,r=!0){if(r&&t[Pe])return;let i=t.outerHTML();t[Et]=t[Et]||[];let c=t.attributes();for(let s of[...c]){let u=s.name,f=In(u);f&&(t[Et].push({...f,expression:s.value}),t.removeAttribute(u))}let o=!1;for(let s of t[Et]){try{s.execute(t,{...s,data:e,evalExpression:De,error:n,outerCode:i})}catch(u){n(u.message,`${s.name}${s.argument?":"+s.argument:""}="${s.expression}"`,i)}o=s.template||o}if(!o)for(let s of t.childNodes())s.el[Ht]?et(Pn(s.el),e,n):s.el?.nodeType===1&&et(s,e,n)}function Vn(t={},e=Mn){et(this,t,e),this.dispatchEvent(new Event("render"))}function Bn(){return this.outerHTML().replaceAll("<!-- ref -->","")}function Hn(t){t.install(Me),t.extendInstance({render:Vn,source:Bn}),t.extendSetup({extendTemplate:{defineDirective:X,obtainDirective(e){return Nt[e]}}})}var Fe=Hn;var zt=Symbol(),Gt=Symbol();function Gn(t,e){return e===zt?t:oe(t,e)}function qt(t={}){if(!y(t))return t;let e={};function n(r,i,c,o){r in t||(e[r]||(e[r]={}),Object.defineProperty(t,r,{enumerable:!1,configurable:!0,writable:!0,value(s=void 0,u=zt){if(N(s)||m(s)){if(u=s||zt,u in e[r])return e[r][u]}else t=s;let f=t.reduce((d,x)=>{let O=Gn(x,u);return typeof O>"u"?d:d===Gt?O:c(d,O)},i);return f=typeof o=="function"?o(f):f,t!==s&&(e[r][u]=f),f}}))}return n("$min",Gt,(r,i)=>i>r?r:i),n("$max",Gt,(r,i)=>i<r?r:i),n("$count",0,r=>r+1),n("$sum",0,(r,i)=>i+r),n("$avg",{n:0,i:0},(r,i)=>(r.n++,r.i+=Number(i),r),r=>r.i/r.n),n("$distinct",new Set,(r,i)=>(r.add(i),r),r=>[...r]),t}var zn=t=>{t.extendSetup({extendComposer(e){h(e)?e(U.prototype):Object.assign(U.prototype,e)}})};tt.install(Fe).install(zn);var qn="composer",Wt="update",J="svg",Yt="methods",Xt="config",Jt="data",$t="-src",ke=t=>`script[type=${t}],g-script[type=${t}]`,Wn=t=>{let e=getComputedStyle(t),n=["0px","auto"];return n.includes(e.width)&&n.includes(e.height)},U=class extends V{static install(e){tt.install(e)}#t=null;#n=!1;#i=[];isRendering=!1;#e(e,n="",r=""){let i=`${e}${n?` in ${n}`:""} ${r}`;this.#i.push(i),console.warn(`Graphane Composer - Error: ${i}`),this[A]("error",i)}async#s(e){let n=await fetch(e);if(n.status!==200)throw new Error(`${n.statusText} (${n.status}): ${n.url}`);return n.text()}async#f(){let e=[...this.querySelectorAll(ke("plugin"))];for(let n of e){let r=n.getAttribute("src");if(r){let i=new URL(r,document.location.href);try{let c=await import(i.href);c?.default&&tt.install(c.default)}catch(c){this.#e(c.message,"plugin",i)}}}}async#o(){let e=this[g];if(this.#t=null,e.content.innerHTML="",e.svgSrc)try{e.content.innerHTML=await this.#s(e.svgSrc)}catch(r){this.#e(r.message,J,e.svgSrc)}else{let r=this.querySelector("template")?.content||this.querySelector(J);r&&e.content.append(r.cloneNode(!0))}let n=e.content.querySelector(J);return n&&(this.#t=tt(n),Wn(n)&&(this.#t.width("100%"),this.#t.height("100%"))),!0}async#r(e,n){let r=this[g],i=e+"Src",c=this.querySelector(ke(e));c&&(r[i]=c.getAttribute("src"));let o="";try{o=r[i]?await this.#s(r[i]):c?.textContent,o&&(r[e]=n(o))}catch(s){this.#e(s.message,e,o)}}#c(){return this.#r(Yt,e=>Re({$:this},e))}#u(){return this.#r(Xt,At)}#a(){return this.#r(Jt,e=>ee(e)||ne(e)?At(e):re(e))}constructor(){super();let e=this[g];this.shadowRoot.innerHTML=` <style> :host { display : inline-block; width : max-content; height : max-content; } </style><span id="content"></span> `,e.content=this.shadowRoot.querySelector("#content")}[T](){return!this.load()}async[k](e){let n=[];for(let r of e){let i=r.target;if(i===this&&!r.attributeName)return this.load();if(i.tagName.toLowerCase()===J)n.push(this.#o());else if(i.tagName==="SCRIPT"){let c={data:this.#a,methods:this.#c,config:this.#u}[i.type.toLowerCase()];c&&n.push(c())}}if(n.length)return await Promise.all(n),this.update()}async load(){return this.#n=!1,await this.#f(),await Promise.all([this.#o(),this.#u(),this.#c(),this.#a()]),this.#n=!0,this[A]("load"),this.update(!0)}async update(e=!1){if(!(this.isRendering&&!e)&&this.#t){this.rendered=!1,this.isRendering=!0;let n=this[g],r=n.methods?.data?n.methods.data(qt(F(n.data))):qt(F(n.data)),i={...n.methods,..._(r)?{}:r,data:r,$:this};await this.#t.render(i,this.#e.bind(this)),this.isRendering=!1,this.rendered=!0}}get[J](){return this.#t}get loaded(){return this.#n}get errors(){return[...this.#i]}};U.prototype.update=fe(U.prototype.update,1);de(U).extension(ge).attribute({name:J+$t,type:v,value:"",posUpdate:T}).attribute({name:Jt,type:$,value:[],posUpdate:Wt}).attribute({name:Jt+$t,type:v,posUpdate:T}).property({name:Yt,type:$,value:{},posUpdate:Wt}).attribute({name:Yt+$t,type:v,posUpdate:T}).attribute({name:Xt,type:$,value:{},posUpdate:Wt}).attribute({name:Xt+$t,type:v,posUpdate:T}).tag(qn);})();