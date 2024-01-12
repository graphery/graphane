/* graphane - 0.1.0-alpha.7 */ (()=>{var De="function",zt="undefined",S="object",v="string",W="array",b="number",I="boolean",Fe="date",Ve="symbol",D="",et=",";var ke=";",E=t=>typeof t===S,N=t=>typeof t===v,l=t=>typeof t===De,qt=t=>typeof t===b&&!isNaN(t),y=t=>typeof t===zt,Wt=t=>typeof t===Ve,Yt=t=>typeof t===I,L=t=>Array.isArray(t),xt=t=>t instanceof Date&&!isNaN(t),O=t=>t===null,nt=t=>t.replace(/-([a-z0-9])/g,(e,n)=>n.toUpperCase());function Be(t){if(N(t))try{let e=t.replace(/^\s*{/,"").replace(/}\s*$/,"").split(/((?:[^;^,"']|"[^"]*"|'[^']*')+)/).filter(n=>!["",";",","].includes(n.trim())).map(n=>n.split(":")).map(n=>`"${n[0].trim()}":${U(n[1].trim(),void 0,!0)}`).join(",");return JSON.parse(`{${e}}`)}catch(e){console.error(e);return}else if(E(t))return t}function Jt(t){if(N(t))return t.trim().startsWith("[")?(t.match(/\[(.*?)[^\]]]/g)||[]).map(e=>Jt(e.substring(1,e.length-1))):t.split(/[,;]/).map(e=>U(e.trim()));if(L(t))return t}function U(t,e,n=!1){if(!N(t))return t;if(t=Ge(t.trim()),e===W)return Jt(t);if(e===S)return Be(t);if(y(e)||e===b){if(y(t)||t==="")return;let i=+t;if(!Number.isNaN(i)||e===b)return i}if(y(e)||e===I){if(t==="true")return!0;if(t==="false")return!1;if(e===I)return t==="0"?!1:!!t}if(e===Fe){try{let i=new Date(t);if(!Number.isNaN(i.getTime()))return i}catch{}return}if(y(e)||e===v)return n?`"${t}"`:t}function Ge(t){return t[0]==="'"&&t[t.length-1]==="'"||t[0]==='"'&&t[t.length-1]==='"'?t.substring(1,t.length-1):t}function Xt(t){return/^\s*{(.|\s)*}\s*$/.test(t)}function Kt(t){return/^\s*\[(.|\s)*]\s*$/.test(t)}function Zt(t){let e=[];return t.split(/(\r\n|\r|\n)/).map(n=>n.trim()).filter(n=>n).reduce((n,i,r)=>{let o={},c=i.split(/((?:[^;^,"']|"[^"]*"|'[^']*')+)/).filter(s=>![D,ke,et].includes(s.trim()));return r===0?(e=[...c.map(s=>U(s))],n):(c.forEach((s,u)=>{o[e[u]]=U(s)}),n.push(o),n)},[])}function Nt(t){let e=`return (${t});`,n=new Function(e)();return typeof n=="function"?n():n}var Qt=new WeakSet,Z=!1,St=(t,e)=>l(e)?function n(i){if(Qt.has(i))return i;for(let o in i)E(i[o])&&!O(i[o])&&(i[o]=n(i[o]));let r=new Proxy(i,{get(o,c){let s=Reflect.get(i,c);return l(s)&&xt(o)&&N(c)&&c.substring(0,3)==="set"&&l(e)&&(s=function(...u){let d=Reflect.get(o,c).apply(o,u);return!Z&&e(t),d}),xt(o)?s.bind(o):s},set(o,c,s){let u,d=o[c]===s;return E(s)&&!O(s)?u=Reflect.set(o,c,n(s)):u=Reflect.set(o,c,s),!Z&&!d&&e(t),u},deleteProperty(o,c){let s=Reflect.deleteProperty(o,c);return!Z&&e(t),s}});return Qt.add(r),r}(t):t;St.stop=()=>Z=!0;St.start=()=>Z=!1;var it=St;var Q=!1,rt=!0;function He(t){return t===null?null:t.constructor?new t.constructor:{}}function F(t){if(!E(t))return t;let e=t===null?null:Object.assign(He(t),t);for(let n in e)E(e[n])&&(e[n]=F(e[n]));return e}function jt(t,e){let n=[],i=[];function r(c,s){if(c===null||s===null)return Q;if(l(c.valueOf)&&l(s.valueOf)&&(c!==c.valueOf()||s!==s.valueOf()))return c.valueOf()===s.valueOf()&&c.constructor===s.constructor;if(n.indexOf(c)>-1&&i.indexOf(s)>-1)return rt;let u=Object.keys(c),d=Object.keys(s);if(u.length!==d.length)return Q;if(u.length>0){n.push(c),i.push(s);let p=u.length;for(;p--;){let x=u[p];if(!o(c[x],s[x]))return Q}}return rt}function o(c,s){if(c===s)return rt;let u=typeof c;return u!==typeof s?Q:u===b&&isNaN(c)&&isNaN(s)?rt:u===S?r(c,s):Q}return o(t,e)}function te(t,e){let n=t,i=N(e)?e.split("."):e;for(let r=0;r<i.length;r++){if(y(n[i[r]]))return;n=n[i[r]]}return n}var ot=globalThis.GRAPHANE_PREFIX||"g-",ze=Symbol(),m=Symbol(),V=Symbol(),$=Symbol(),$t=Object.defineProperty;function qe(t,e,n,i=!1){if(!(t.ready===!1||!e))if(i)n?t.setAttribute(e,D):t.removeAttribute(e);else{let r=O(n)||y(n)?D:n.toString();t.hasAttribute(e)&&t.getAttribute(e)!==r&&t.setAttribute(e,r)}}function We(t){this[m]={};let e=t;do{let n=st.get(e);for(let i in n)if(n.hasOwnProperty(i)&&this.hasOwnProperty(i)){let r=this[i];delete this[i],this[i]=y(r)?F(n[i]):r}else i in this[m]||(this[m][i]=F(n[i]));e=Object.getPrototypeOf(e)}while(e!==HTMLElement)}function Ye(){new MutationObserver(t=>{for(let e of t)if(!e.attributeName){this[$]("update");break}(y(this.ready)||this.ready)&&l(this[V])&&this[V](t)}).observe(this,{attributes:!0,childList:!0,subtree:!0,characterData:!0})}var st=new WeakMap,ct=class extends HTMLElement{constructor(){super(),We.call(this,new.target),new.target[ze]?.forEach(e=>l(e)&&e.call(this,this)),l(this[V])&&Ye.call(this)}[$](e,n={},i=!1){return this.dispatchEvent(new CustomEvent(e,{bubbles:!0,cancelable:!0,detail:n,composed:i}))}};function Je(t,e){e.propertyName||(e.propertyName=nt(e.name)),ee(t,{name:e.propertyName,value:e.value,get:e.get,set:e.set,attribute:e.name,type:e.type,preUpdate:e.preUpdate,posUpdate:e.posUpdate,posUpdateEvent:e.posUpdateEvent,schema:e.schema});let n=Object.getPrototypeOf(t),i="observedAttributes",r=Object.getOwnPropertyDescriptor(t,i),o=Object.getOwnPropertyDescriptor(n,i),c=r?r.get:void 0;$t(t,i,Ke(t,e,n,c,r,o));let s="attributeChangedCallback",u=Object.getOwnPropertyDescriptor(t.prototype,s),d=Object.getOwnPropertyDescriptor(n.prototype,s),p=u?u.value:void 0;$t(t.prototype,s,Xe(e,p,d))}function Xe(t,e,n){return{value:function(i,r,o){if(t.name===i){let c=t.propertyName;this[c]!==o&&(t.type===I?this[c]=this.hasAttribute(t.name):this[c]=U(o,t.type))}else e&&e.apply(this,arguments);n?.value&&n.value.apply(this,arguments)},enumerable:!1,writable:!0,configurable:!0}}function Ke(t,e,n,i,r,o){let c={enumerable:!1,configurable:!0};return r?o?c.get=function(){return[e.name,...i.call(t),...o.get.call(n)]}:c.get=function(){return[e.name,...i.call(t)]}:c.get=o?function(){return[e.name,...o.get.call(n)]}:function(){return[e.name]},c}function ee(t,e){$t(t.prototype,e.name,{set:ne(e),get:Qe(e),configurable:!0,enumerable:!1}),st.has(t)||st.set(t,{}),st.get(t)[e.name]=e.value}function Ze(t,e){O(t.posUpdateEvent)||(t.posUpdateEvent?this[$](t.posUpdateEvent,{[t.name]:e}):this[$]("update",{[t.name]:e})),l(t.posUpdate)?t.posUpdate.call(this,e):l(this[t.posUpdate])&&this[t.posUpdate]()}function ne(t){return function(e){let n=this[m];l(t.preUpdate)&&!t.preUpdate.call(this,e)||(t.schema&&(it.stop(),e=t.schema.normalize(e),it.start()),!(!E(e)&&jt(n[t.name],e))&&(l(t.set)?t.set.call(this,e):n[t.name]=N(e)&&t.type?U(e,t.type):e,t.attribute&&![W,S].includes(t.type)&&qe(this,t.name,e,t.type===I),Ze.call(this,t,e)))}}function Qe(t){return function(){if(l(t.get))return t.get.call(this);{let e=this[m];switch(t.type){case b:return y(e[t.name])?void 0:Number(e[t.name]);case I:return!!e[t.name];case S:case W:return it(e[t.name]||(t.type===S?{}:[]),n=>ne(t).call(this,n));default:return e[t.name]}}}}function je(t,e){customElements.get(ot+e.toLowerCase())||customElements.define(ot+e.toLowerCase(),t)}function ie(t,e={}){return e.property=(...n)=>(n.forEach(i=>ee(t,{...i})),e),e.attribute=(...n)=>(n.forEach(i=>Je(t,{...i})),e),e.tag=n=>(je(t,n),e),e.extension=n=>(n.call(e,e,t),e),e}function re(t,e){let n=new WeakMap;return function(...i){clearTimeout(n.get(this)),n.set(this,setTimeout(()=>{t.apply(this,i)},e))}}function At(t,e){let n=new WeakMap,i=[];return function(...r){return clearTimeout(n.get(this)),new Promise((o,c)=>{i.push({resolve:o,reject:c}),n.set(this,setTimeout(()=>{try{let s=t.apply(this,r);i.forEach(u=>u.resolve(s))}catch(s){i.forEach(u=>u.reject(s))}finally{i.length=0}},e))})}}function Tt(t,e){return function(...n){if(t.apply(this,n))return e.apply(this,n)}}function wt(t,e){return function(...n){let i=t.apply(this,n);return i instanceof Promise?i.then(r=>e.call(this,r)||r):e.call(this,i)||i}}var se=1,Y=Symbol(),T=Symbol(),oe=Symbol(),bt=Symbol();var k=class extends ct{constructor(e){super(),this.attachShadow({mode:"open"}),this[m].ready=e||!1,this[m].rendered=!1,y(e)&&(this.ready=!0)}get ready(){return this[m].ready}set ready(e){let n=this[m],i=n.ready;n.ready=!!e,i===!1&&n.ready===!0&&(this[$]("ready",{ready:!0}),l(this[T])&&this[T]())}get rendered(){return this[m].rendered}set rendered(e){let n=this[m],i=n.rendered;n.rendered=!!e,i===!1&&n.rendered===!0&&this[$]("render",{rendered:!0})}connectedCallback(){let e=this.getBoundingClientRect(),n=getComputedStyle(this).flexDirection,i=()=>{let{width:r,height:o}=this.getBoundingClientRect(),c=getComputedStyle(this).flexDirection;(r!==e.width||o!==e.height||c!==n)&&(l(this[oe])&&this[oe](r,o,r-e.width,o-e.height),e={width:r,height:o},n=c,this[$]("resize",e)),this[m]._resizeObserver=window.requestAnimationFrame(i)};i()}disconnectedCallback(){window.cancelAnimationFrame(this[m]._resizeObserver)}};function tn(t,e){let n={name:e.name.startsWith("--")?e.name:`--${ot}${e.name}`,initialValue:e.initialValue??e.value??"",syntax:e.syntax??"*",inherits:e.inherits??!0};t.prototype[bt]||(t.prototype[bt]={}),t.prototype[bt][n.name]=n}function en(t){if(l(t.prototype[T])){let e=t.prototype[T];t.prototype[T]=Tt(function(){return this.rendered=!1,this.ready},At(wt(async function(){return e.apply(this)},function(n){this.rendered=n!==!1,this.rendered&&l(this[Y])&&this[Y]()}),se))}if(l(t.prototype[Y])){let e=t.prototype[Y];t.prototype[Y]=Tt(function(n){return n&&(this[m].rendered=!0),this.ready&&this[m].rendered},At(wt(async function(...n){return e.apply(this,n)},function(){this[$]("refresh")}),se))}}function ce(t){en(t);let e=ie(t,{style:(...n)=>(n.forEach(i=>tn(t,{...i})),e)});return e}k.RENDER=T;k.REFRESH=Y;k.CHANGE=V;var nn="intersection.enter",rn="intersection.exit",ut=Symbol(),sn={root:null,rootMargin:"0px",threshold:Array(21).fill(0).map((t,e)=>e*.05)};function on(t){let e=!1;this[ut]&&this[ut].disconnect(),this[ut]=new IntersectionObserver(n=>{n.forEach(i=>{i.isIntersecting&&i.intersectionRatio>=t?e||(e=!0,this.dispatchEvent(new CustomEvent(nn,{bubbles:!0,cancelable:!0,composed:!0}))):(e=!1,this.dispatchEvent(new CustomEvent(rn,{bubbles:!0,cancelable:!0,composed:!0})))})},sn),this[ut].observe(this._el||this)}var Ot=on;var ue=Symbol();function cn(t){t.attribute({name:"intersection-once-class",type:v,value:""}).attribute({name:"intersection-class",type:v,value:""}).attribute({name:"intersection-ratio",type:b,value:0,posUpdate:an})}var ae=(t,e)=>e&&e.split(/\s+/).forEach(n=>t.add(n)),un=(t,e)=>e&&e.split(/\s+/).forEach(n=>t.remove(n)),fe=(t,e)=>{e.preventDefault();let n=()=>{t.removeEventListener("render",n),t[$](e.type,e.detail,e.composed)};t.addEventListener("render",n)};function an(){let t=this[m];if(this[ue])return Ot.call(this,t.intersectionRatio);this[ue]=!0;let e=this.classList;this.addEventListener("intersection.enter",n=>{ae(e,t.intersectionOnceClass),ae(e,t.intersectionClass),this.rendered||fe(this,n)}),this.addEventListener("intersection.exit",n=>{un(e,t.intersectionClass),this.rendered||fe(this,n)}),Ot.call(this,t.intersectionRatio)}var le=cn;var Mt="gSVGObject",fn="http://www.w3.org/2000/svg",ln="svg",Rt="d",he="transform",pe="appendChild",Lt="insertBefore",de="insertAdjacentElement",me="attach",ye="innerHTML",_t=new WeakMap,vt=new Set,hn=t=>Wt(t)||t.startsWith("_")||["el","gSVG","then"].includes(t),at=(t,e)=>t instanceof e,dn=()=>Mt+Math.random().toString(32).substring(2),Ct=t=>E(t)&&!O(t)&&t[Symbol.toStringTag]===Mt,pn=t=>pt(document.createElementNS(fn,t)),ft=t=>N(t)?pn(t):E(t)&&t!==null?Ct(t)?t:pt(t):t,mn=t=>({content:ye,source:"outerHTML",parent:"parentElement",next:"nextElementSibling",previous:"previousElementSibling",add:pe,addBefore:Lt})[t]||t,yn=t=>["append","before","after",pe,Lt,de].includes(t)?function(...e){let n=[],i=[],r=[];return t===de?(n.push(e[0]),i.push(ft(e[1]))):t===Lt?(i.push(ft(e[0])),r.push(e[1]||this.firstChild||null)):i.push(...e.map(ft)),i.every(o=>o?._el)?(this[t](...n,...i.map(o=>o&&o._el),...r),i.forEach(o=>o._el.dispatchEvent(new Event(me))),i.length>1?i:i[0]):i[0]}:null,dt=class{constructor(e){this._el=e,this.gSVG=B}get[Symbol.toStringTag](){return Mt}get el(){return this._el}attachTo(e){return(E(e)?Ct(e)?e._el:e:document.querySelector(e)).appendChild(this._el),this._el.dispatchEvent(new Event(me)),this}id(e){return e?(this._el.setAttribute("id",e),this):this._el.id||(this._el.id=dn())}ref(){return`#${this.id()}`}url(){return`url(${this.ref()})`}parents(){let e=[],n=this;for(;n=n.parentElement();)e.push(n);return e}top(){return this.parents().pop()||this}},pt=t=>{if(!E(t)||O(t))return null;if(_t.has(t))return _t.get(t);let e=new Proxy(new dt(t),{get(n,i){if(hn(i))return n[i];if(!y(n[i]))return(...c)=>(P(e,i,c),n[i].call(e,...c));if([Rt,he,"$"+Rt,"$"+he].includes(i)){let c="";i[0]==="$"&&(i=i.substring(1));let u=i===Rt?gn:En,d=new Proxy(p=>(P(e,i,[p]),y(p)?t.getAttribute(i):(p?t.setAttribute(i,p):t.removeAttribute(i),e)),{get(p,x){return x in p?Reflect.get(p,x):(...R)=>{if(x===Symbol.toPrimitive){let X=c;return c="",X}return c+=u(e,x,R),t?.setAttribute(i,c),d}}});return d}let r=mn(i),o=yn(r)||t[r];return l(o)?(...c)=>{P(e,i,c);let s=o.call(t,...c);return y(s)?e:Ee(s)}:ge(t,r,e)}});return _t.set(t,e),e},ge=(t,e,n,i)=>{let r=e.replace(/_/g,"-"),o=(...c)=>{if(P(n,i?`${i}.${e}`:e,c),c.length===0){let u=t?.hasAttribute&&t.hasAttribute(r)?t.getAttribute(r):t[r];return Ee(u)}let s=c[0];if(at(t,CSSStyleDeclaration))return t[r]=s,n;if(r in t&&!vt.has(r)){let u=t[r];if(String(u)===String(s))return n;try{t[r]=s}catch{vt.add(r)}if(E(t[r])&&t[r]===s||t[r]!==u||r===ye)return n;vt.add(r)}return s!==0&&!s?t?.removeAttribute&&t.removeAttribute(r):t?.setAttribute&&t.setAttribute(r,Yt(s)?"":String(c)),n};return new Proxy(o,{get(c,s){let u=t[r][s];return l(u)?(...d)=>(P(n,`${e}.${s}`,d),u.call(t[r],...d)||n):ge(t[r],s,n,r)},set(c,s,u){return t[r][s]=u,!0}})},Ee=t=>at(t,HTMLCollection)||at(t,NodeList)?[...t].map(e=>pt(e)):at(t,SVGElement)?pt(t):N(t)?t===""||Number.isNaN(Number(t))?t:Number(t):t,xe=[],P=(t,e,n,i=[])=>{for(let r of xe)r(B,t,e,n,i)},lt={},gn=(t,e,n)=>(P(t,`d.${e}`,n,Object.keys(lt).map(i=>`d.${i}`)),lt[e]?lt[e].apply(t,n):`${e}${n.join(et)}`),En=(t,e,n)=>(P(t,`transform.${e}`,n),`${e}(${n.join(et)})`);function B(t){return P(null,D,[t]),ft(y(t)?ln:t)}B.isWrapped=Ct;var ht=t=>e=>l(e)?e(t):Object.assign(t,e),Pt={install:Ne,extendConstructor:ht(B),extendInstance:ht(dt.prototype),extendPath:ht(lt),beforeEveryCall(t){l(t)&&xe.push(t)}};Pt.extendSetup=ht(Pt);function Ne(t){return t(Pt),B}B.install=Ne;var j=B;var It=new Map,xn=/function\s+([\p{L}\p{Nl}$_][\p{L}\p{Nl}$_\p{Mn}\p{Mc}\p{Nd}\p{Pc}]*)\s*\(/gmu,Nn=async function(){}.constructor;function mt(t,e,n=!1){let i=`${t.join(",")} ${e}`;if(It.has(i))return It.get(i);let r=new(n?Nn:Function)(...t,e);return It.set(i,r),r}function Se(t,e){let n=[...e.matchAll(xn)].map(i=>i[1]);try{return mt(Object.keys(t),`${e}; return {${n.map(r=>`${r}: typeof ${r} === 'function' ? ${r} : undefined`)}}; `)(...Object.values(t))}catch(i){console.warn(i.message,` `,e)}}function Ut(t){try{return new Function(`let ${t} = 0`),!0}catch{return!1}}var Dt="animate",Sn="path",$e="d",Ae="transform",be="rotate",G="translate",Te="inherit",we="finished",$n=[be,"skewX","skewY"],An=[G,"width","height","x","y","cx","cy","r","rx","ry","dx","dy"],Tn=(t,e)=>["text","tspan"].includes(t)&&["x","y"].includes(e),Ft=!1;if(window.matchMedia){let t=window.matchMedia("(prefers-reduced-motion: reduce)");Ft=t.matches,t.addEventListener("change",()=>{Ft=t.matches})}var wn=t=>t.replace(/([A-Z])/g,"-$1").toLowerCase();function bn(t,e={duration:200},n=null,i=null){let r=this.gSVG,o=a=>{let f=E(a)?{...a}:{duration:a};return Ft&&(f.duration=0),f.fill="none",f},c=a=>{a=L(a)?a:[a];let f=window.getComputedStyle(this._el),h=[],g=new Set;for(let _ of a){let A={};for(let C in _){let w=nt(C);A[w]=x(_[C],w),!(w in f)||Tn(this.tagName(),w)?g.add(w):w===$e?A.d=`${Sn}("${A.d}")`:w===Ae&&(A.transform=d(A.transform))}h.push(A)}return u(g,h),h},s=[],u=(a,f)=>{if(a.size){let h=new KeyframeEffect(null,f).getKeyframes();for(let g of a){let _=r(Dt).attributeName(g).dur(K.duration+"ms").fill("freeze");if(f.length===1)_.to(f[0][g]);else{let A=[],C=[];for(let w in h){let Ue=h[w];g in f[w]&&(A.push(Ue.computedOffset),C.push(f[w][g]))}A[0]!==0&&(A.unshift(0),C.unshift(this[g]()||Te)),A[A.length-1]!==1&&(A.push(1),C.push(this[g]()||Te)),_.keyTimes(A.join(";")).values(C.join(";"))}s.push(_),_.attachTo(this),_.beginElementAt(K.delay||0)}}},d=a=>{N(a)&&(a=JSON.parse("{"+a.replace(/\s*\(\s*/g,":[").replace(/\s*\)\s*/g,"],").split(/\s*,\s*|\s.*/).join(",").replace(/(\w+):/g,'"$1":').replace(/,$/,"")+"}"));let f="";for(let h in a)if(h===be){let g=p(a[h]);g.length>1&&(f+=`${G}(${x(g[1],G)},${x(g[2],G)}) `),f+=`${h}(${x(g[0],h)}) `,g.length>1&&(f+=`${G}(-${x(g[1],G)},-${x(g[2],G)}) `)}else f+=`${h}(${p(a[h]).map(g=>x(g,h)).join(",")}) `;return f},p=a=>L(a)?a:String(a).split(/\s+|,/),x=(a,f)=>$n.includes(f)?a+"deg":An.includes(f)?a+"px":a,R=a=>N(a)?a.replace(/(deg)|(px)/g,"").trim():a,X=a=>a.replace(/(path\s*\(\s*["'])|(["']\s*\)\s*$)/g,"").trim().replace(/([a-zA-Z])\s*/g,"$1").replace(/\s+/g,","),z=a=>{let f=/translate\((.*)px,(.*)px\) rotate\((.*)deg\) translate\((.*)px,(.*)px\)\s+/,h=f.exec(a);return h&&Number(h[1])===Number(h[4])*-1&&Number(h[2])===Number(h[5])*-1?a=a.replace(f,`rotate(${h[3]}, ${h[1]}, ${h[2]})`):a=R(a),a},K=o(e),tt=c(t),q=this._el.animate(tt,K);return q.ready.then(()=>l(n)&&n.call(this,q)),q.finished.then(()=>{let a=tt[tt.length-1];for(let f in a){let h=wn(f);h.startsWith("text-")?this._el.style[f]=a[f]:f!=="offset"&&f in a&&this._el.setAttribute(h,h===$e?X(a[f]):h===Ae?z(a[f]):R(a[f]))}s.forEach(f=>{f[we](!0);let h=this._el.querySelectorAll(Dt),g=this._el.querySelectorAll(`${Dt}[${we}]`);h.length===g.length&&h.forEach(_=>_.remove())}),l(i)&&i.call(this,q)}),this}function On(t){t.extendInstance({animateTo:bn})}var Oe=On;var Re=Symbol(),_e=Symbol(),H=Symbol(),yt=Symbol(),gt=Symbol(),Rn="unknown",ve="Graphane SVG Template Engine:",Vt=[];J({name:"g-content",execute(t,{expression:e,data:n,evalExpression:i}){t.content(i(e,n))}});J({name:"g-if",execute(t,{expression:e,data:n,evalExpression:i}){t.style.visibility(i(e,n)?"inherit":"hidden")}});J({name:"g-bind",alias:":",argument:!0,execute(t,{expression:e,argument:n,data:i,evalExpression:r}){let o={...i,$$:["d","transform"].includes(n)?t["$"+n]:()=>t[n]()};o.$$.dynamic=(s,u=200,d=0)=>{t.animateTo((L(s)?s:[s]).map(p=>E(p)&&"offset"in p?{[n]:p.value,offset:p.offset}:{[n]:p}),{duration:u,delay:d})};let c=r(e,o);if(n==="class"){if(L(c)){t.classList.add(...c.filter(s=>!!s));return}if(E(c)){Object.entries(c).forEach(([s,u])=>{u?t.classList.add(s):t.classList.remove(s)});return}c&&t.classList.add(c);return}if(n==="style"){Object.entries(c).forEach(([s,u])=>t.style[s](u));return}y(c)||t[n](c)}});J({name:"g-on",alias:"@",argument:!0,execute(t,{expression:e,argument:n,data:i,evalExpression:r}){t[gt]=t[gt]||{};let o=t[gt][n]=t[gt][n]||new Map;o.has(e)&&t.removeEventListener(n,o.get(e));let c=function(s){let u=r(e,i,t);l(u)&&u.call(t,s)};t.addEventListener(n,c),o.set(e,c),n==="init"&&!t[Re]&&(t[Re]=!0,t.dispatchEvent(new Event("init")))}});J({name:"g-for",template:!0,execute(t,{expression:e,data:n}){t[H]=t[H]||[];let i=0;Pn(e,n,r=>{if(t[H][i])Et(t[H][i],r,!1);else{let o=t.gSVG("g");t.children().forEach(c=>{o.add(c.cloneNode(!0))}),Et(o,r),t.before(o.el),o[_e]=!0,t[H].push(o)}i++},r=>{for(;t[H].length>r.length;)t[H].pop().remove()})}});function J({name:t,alias:e,argument:n,template:i,execute:r}){let o=`^(${t}${n?":":""}${e?`|${e})`:")"}${n?"(.*)$":"$"}`,c=new RegExp(o,"i");Vt.push({name:t,alias:e,argument:n,template:i,execute:r,check:c})}function _n(t){for(let e of Vt){let n=e.check.exec(t);if(n){let i=n[2];return{...e,argument:i}}}}function vn(t){return t.replace(/[{}()[\]]/g,"").split(",").map(e=>e.includes(":")?e.split(":")[1]:e).map(e=>e.trim())}function Ln(t){return t[Symbol.iterator]?{iterator:[...t],type:W}:qt(t)?{iterator:Array(t<0?0:0|t).fill(0).map((e,n)=>n),type:b}:E(t)?{iterator:Object.entries(t).map(e=>e.reverse()),type:S}:{iterator:t,type:Rn}}function Le(t,e,n=null){try{let i=Object.keys(e).filter(Ut);return mt(i,`return ( ${t} ); `).apply(n,i.map(o=>e[o]))}catch(i){console.warn(ve,i.message,` `,t)}}function Pn(t,e,n,i){let r="__$$iterator",o="__$$callback",c="__$$final";try{let[s,u]=t.split(" of ");s=s.trim(),u=u.trim();let d=Le(u,e)||[],{iterator:p,type:x}=Ln(d);x===S&&!s.startsWith("[")&&(s=`[${s.replace(/(^\()|(\)$)/g,"")}]`);let R=vn(s),X=s.startsWith("(")?s:`(${s})`,z=Object.keys(e).filter(Ut),K=` ${r}.forEach(${X} => { ${o}({${z}${z.length?",":""}${R.join(",")}}); }); ${c}(${r}); `;return mt([...z,r,o,c],K)(...z.map(q=>e[q]),p,n,i)}catch(s){console.warn(ve,s)}}function Et(t,e,n=!0){if(n&&t[_e])return;t[yt]=t[yt]||[];let i=t.attributes();for(let o of[...i]){let c=o.name,s=_n(c);s&&(t[yt].push({...s,expression:o.value}),t.removeAttribute(c))}let r=!1;for(let o of t[yt])o.execute(t,{...o,data:e,evalExpression:Le}),r=o.template||r;if(!r)for(let o of t.children())Et(o,e)}function Mn(t={}){Et(this,t),this.dispatchEvent(new Event("render"))}function Cn(t){t.install(Oe),t.extendInstance({render:Mn}),t.extendSetup({extendTemplate:{defineDirective:J,obtainDirective(e){return Vt.find(n=>n.name===e)}}})}var Pe=Cn;var Bt=Symbol(),kt=Symbol();function In(t,e){return e===Bt?t:te(t,e)}function Me(t={}){let e={};function n(i,r,o,c){i in t||(e[i]||(e[i]={}),Object.defineProperty(t,i,{enumerable:!1,configurable:!0,writable:!0,value(s=void 0,u=Bt){if(N(s)||y(s)){if(u=s||Bt,u in e[i])return e[i][u]}else t=s;let d=t.reduce((p,x)=>{let R=In(x,u);return typeof R>"u"?p:p===kt?R:o(p,R)},r);return d=typeof c=="function"?c(d):d,t!==s&&(e[i][u]=d),d}}))}return n("$min",kt,(i,r)=>r>i?i:r),n("$max",kt,(i,r)=>r<i?i:r),n("$count",0,i=>i+1),n("$sum",0,(i,r)=>r+i),n("$avg",{n:0,i:0},(i,r)=>(i.n++,i.i+=Number(r),i),i=>i.i/i.n),n("$distinct",new Set,(i,r)=>(i.add(r),i),i=>[...i]),t}var Un=t=>{t.extendSetup({extendComposer(e){l(e)?e(M.prototype):Object.assign(M.prototype,e)}})};j.install(Pe).install(Un);var Dn="composer",Gt="update",Ht="svg",Ce=t=>`script[type=${t}],g-script[type=${t}]`,Ie=t=>!t||t.baseVal?.value===0,M=class extends k{static install(e){j.install(e)}#t=null;#e=!1;isRendering=!1;async#i(e){let n=await fetch(e);if(n.status!==200)throw new Error(`${n.statusText} (${n.status}): ${n.url}`);return n.text()}async#u(){let e=[...this.querySelectorAll(Ce("plugin"))];for(let n of e){let i=n.getAttribute("src");if(i){let o=await import(new URL(i,document.location.href).href);o?.default&&j.install(o.default)}}}async#r(){let e=this[m];if(this.#t=null,e.content.innerHTML="",e.svgSrc)e.content.innerHTML=await this.#i(e.svgSrc);else{let i=this.querySelector("template")?.content||this.querySelector(Ht);i&&e.content.append(i.cloneNode(!0))}let n=e.content.querySelector(Ht);return n&&(this.#t=j(n),Ie(this.#t.width())&&Ie(this.#t.height())&&(this.#t.width("100%"),this.#t.height("100%"))),!0}async#n(e){let n=this[m],i=e+"Src",r=this.querySelector(Ce(e));return r&&(n[i]=r.getAttribute("src")),n[i]?this.#i(n[i]):r?.textContent}async#s(){let e=await this.#n("methods");e&&(this[m].methods=Se({$:this},e))}async#o(){let e=await this.#n("config");e&&(this[m].config=Nt(e))}async#c(){let e=await this.#n("data");e&&(this[m].data=Xt(e)||Kt(e)?Nt(e):Zt(e))}constructor(){super();let e=this[m];this.shadowRoot.innerHTML=` <style> :host { display : inline-block; width : max-content; height : max-content; } </style><span id="content"></span> `,e.content=this.shadowRoot.querySelector("#content")}[T](){return!this.load()}async[V](e){let n=[];try{for(let i of e){let r=i.target;if(r===this&&!i.attributeName)return this.load();if(r.tagName.toLowerCase()===Ht)n.push(this.#r());else if(r.tagName==="SCRIPT"){let o={data:this.#c,methods:this.#s,config:this.#o}[r.type.toLowerCase()];o&&n.push(o())}}}catch(i){return console.error(i.message),this[$]("error",i.message),!1}if(n.length)return await Promise.all(n),this.update()}async load(){try{this.#e=!1,await this.#u(),await Promise.all([this.#r(),this.#o(),this.#s(),this.#c()]),this.#e=!0,this[$]("load")}catch(e){return console.error(e.message),this[$]("error",e.message),!1}return this.update(!0)}async update(e=!1){if(!(this.isRendering&&!e)&&this.#t){this.rendered=!1,this.isRendering=!0;let n=this[m],i=Me(n.methods.data?n.methods.data(F(n.data)):F(n.data)),r={...n.methods,...L(i)?{}:i,data:i,$:this};await this.#t.render(r),this.isRendering=!1,this.rendered=!0}}get svg(){return this.#t}get loaded(){return this.#e}};M.prototype.update=re(M.prototype.update,1);ce(M).extension(le).attribute({name:"svg-src",type:v,value:"",posUpdate:T}).attribute({name:"data",type:S,value:[],posUpdate:Gt}).attribute({name:"data-src",type:v,posUpdate:T}).property({name:"methods",type:S,value:{},posUpdate:Gt}).attribute({name:"methods-src",type:v,posUpdate:T}).attribute({name:"config",type:S,value:{},posUpdate:Gt}).attribute({name:"config-src",type:v,posUpdate:T}).tag(Dn);})();