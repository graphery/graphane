/* graphane - 0.1.0-alpha.5 */ (()=>{var Fe="function",qt="undefined",$="object",_="string",H="array",b="number",I="boolean",Ve="date",ke="symbol",U="",tt=",";var Ge=";",g=t=>typeof t===$,E=t=>typeof t===_,f=t=>typeof t===Fe,Wt=t=>typeof t===b&&!isNaN(t),y=t=>typeof t===qt,Jt=t=>typeof t===ke,Yt=t=>typeof t===I,P=t=>Array.isArray(t),Nt=t=>t instanceof Date&&!isNaN(t),O=t=>t===null,Xt=t=>t.replace(/-([a-z0-9])/g,(e,n)=>n.toUpperCase());function Be(t){if(E(t))try{let e=t.replace(/^\s*{/,"").replace(/}\s*$/,"").split(/((?:[^;^,"']|"[^"]*"|'[^']*')+)/).filter(n=>!["",";",","].includes(n.trim())).map(n=>n.split(":")).map(n=>`"${n[0].trim()}":${J(n[1].trim(),void 0,!0)}`).join(",");return JSON.parse(`{${e}}`)}catch(e){console.error(e);return}else if(g(t))return t}function Kt(t){if(E(t))return t.trim().startsWith("[")?(t.match(/\[(.*?)[^\]]]/g)||[]).map(e=>Kt(e.substring(1,e.length-1))):t.split(/[,;]/).map(e=>J(e.trim()));if(P(t))return t}function J(t,e,n=!1){if(!E(t))return t;if(t=He(t.trim()),e===H)return Kt(t);if(e===$)return Be(t);if(y(e)||e===b){if(y(t)||t==="")return;let i=+t;if(!Number.isNaN(i)||e===b)return i}if(y(e)||e===I){if(t==="true")return!0;if(t==="false")return!1;if(e===I)return t==="0"?!1:!!t}if(e===Ve){try{let i=new Date(t);if(!Number.isNaN(i.getTime()))return i}catch{}return}if(y(e)||e===_)return n?`"${t}"`:t}function He(t){return t[0]==="'"&&t[t.length-1]==="'"||t[0]==='"'&&t[t.length-1]==='"'?t.substring(1,t.length-1):t}function Zt(t){return/^\s*{(.|\s)*}\s*$/.test(t)}function Qt(t){return/^\s*\[(.|\s)*]\s*$/.test(t)}function jt(t){let e=[];return t.split(/(\r\n|\r|\n)/).map(n=>n.trim()).filter(n=>n).reduce((n,i,r)=>{let c={},o=i.split(/((?:[^;^,"']|"[^"]*"|'[^']*')+)/).filter(s=>![U,Ge,tt].includes(s.trim()));return r===0?(e=[...o.map(s=>JSON.parse(s))],n):(o.forEach((s,u)=>{c[e[u]]=JSON.parse(s)}),n.push(c),n)},[])}function $t(t){let e=`return (${t});`,n=new Function(e)();return typeof n=="function"?n():n}var te=new WeakSet,Y=!1,St=(t,e)=>f(e)?function n(i){if(te.has(i))return i;for(let c in i)g(i[c])&&!O(i[c])&&(i[c]=n(i[c]));let r=new Proxy(i,{get(c,o){let s=Reflect.get(i,o);return f(s)&&Nt(c)&&E(o)&&o.substring(0,3)==="set"&&f(e)&&(s=function(...u){let d=Reflect.get(c,o).apply(c,u);return!Y&&e(t),d}),Nt(c)?s.bind(c):s},set(c,o,s){let u,d=c[o]===s;return g(s)&&!O(s)?u=Reflect.set(c,o,n(s)):u=Reflect.set(c,o,s),!Y&&!d&&e(t),u},deleteProperty(c,o){let s=Reflect.deleteProperty(c,o);return!Y&&e(t),s}});return te.add(r),r}(t):t;St.stop=()=>Y=!0;St.start=()=>Y=!1;var et=St;var X=!1,nt=!0;function ze(t){return t===null?null:t.constructor?new t.constructor:{}}function C(t){if(!g(t))return t;let e=t===null?null:Object.assign(ze(t),t);for(let n in e)g(e[n])&&(e[n]=C(e[n]));return e}function ee(t,e){let n=[],i=[];function r(o,s){if(o===null||s===null)return X;if(f(o.valueOf)&&f(s.valueOf)&&(o!==o.valueOf()||s!==s.valueOf()))return o.valueOf()===s.valueOf()&&o.constructor===s.constructor;if(n.indexOf(o)>-1&&i.indexOf(s)>-1)return nt;let u=Object.keys(o),d=Object.keys(s);if(u.length!==d.length)return X;if(u.length>0){n.push(o),i.push(s);let p=u.length;for(;p--;){let x=u[p];if(!c(o[x],s[x]))return X}}return nt}function c(o,s){if(o===s)return nt;let u=typeof o;return u!==typeof s?X:u===b&&isNaN(o)&&isNaN(s)?nt:u===$?r(o,s):X}return c(t,e)}function ne(t,e){let n=t,i=E(e)?e.split("."):e;for(let r=0;r<i.length;r++){if(y(n[i[r]]))return;n=n[i[r]]}return n}var rt=globalThis.GRAPHANE_PREFIX||"g-",qe=Symbol(),m=Symbol(),D=Symbol(),S=Symbol(),xt=Object.defineProperty;function We(t,e,n,i=!1){if(!(t.ready===!1||!e))if(i)n?t.setAttribute(e,U):t.removeAttribute(e);else{let r=O(n)||y(n)?U:n.toString();t.hasAttribute(e)&&t.getAttribute(e)!==r&&t.setAttribute(e,r)}}function Je(t){this[m]={};let e=t;do{let n=it.get(e);for(let i in n)if(n.hasOwnProperty(i)&&this.hasOwnProperty(i)){let r=this[i];delete this[i],this[i]=y(r)?C(n[i]):r}else i in this[m]||(this[m][i]=C(n[i]));e=Object.getPrototypeOf(e)}while(e!==HTMLElement)}function Ye(){new MutationObserver(t=>{for(let e of t)if(!e.attributeName){this[S]("update");break}(y(this.ready)||this.ready)&&f(this[D])&&this[D](t)}).observe(this,{attributes:!0,childList:!0,subtree:!0,characterData:!0})}var it=new WeakMap,st=class extends HTMLElement{constructor(){super(),Je.call(this,new.target),new.target[qe]?.forEach(e=>f(e)&&e.call(this,this)),f(this[D])&&Ye.call(this)}[S](e,n={},i=!1){return this.dispatchEvent(new CustomEvent(e,{bubbles:!0,cancelable:!0,detail:n,composed:i}))}};function Xe(t,e){e.propertyName||(e.propertyName=Xt(e.name)),ie(t,{name:e.propertyName,value:e.value,get:e.get,set:e.set,attribute:e.name,type:e.type,preUpdate:e.preUpdate,posUpdate:e.posUpdate,posUpdateEvent:e.posUpdateEvent,schema:e.schema});let n=Object.getPrototypeOf(t),i="observedAttributes",r=Object.getOwnPropertyDescriptor(t,i),c=Object.getOwnPropertyDescriptor(n,i),o=r?r.get:void 0;xt(t,i,Ze(t,e,n,o,r,c));let s="attributeChangedCallback",u=Object.getOwnPropertyDescriptor(t.prototype,s),d=Object.getOwnPropertyDescriptor(n.prototype,s),p=u?u.value:void 0;xt(t.prototype,s,Ke(e,p,d))}function Ke(t,e,n){return{value:function(i,r,c){if(t.name===i){let o=t.propertyName;this[o]!==c&&(t.type===I?this[o]=this.hasAttribute(t.name):this[o]=J(c,t.type))}else e&&e.apply(this,arguments);n?.value&&n.value.apply(this,arguments)},enumerable:!1,writable:!0,configurable:!0}}function Ze(t,e,n,i,r,c){let o={enumerable:!1,configurable:!0};return r?c?o.get=function(){return[e.name,...i.call(t),...c.get.call(n)]}:o.get=function(){return[e.name,...i.call(t)]}:o.get=c?function(){return[e.name,...c.get.call(n)]}:function(){return[e.name]},o}function ie(t,e){xt(t.prototype,e.name,{set:re(e),get:je(e),configurable:!0,enumerable:!1}),it.has(t)||it.set(t,{}),it.get(t)[e.name]=e.value}function Qe(t,e){O(t.posUpdateEvent)||(t.posUpdateEvent?this[S](t.posUpdateEvent,{[t.name]:e}):this[S]("update",{[t.name]:e})),f(t.posUpdate)?t.posUpdate.call(this,e):f(this[t.posUpdate])&&this[t.posUpdate]()}function re(t){return function(e){let n=this[m];f(t.preUpdate)&&!t.preUpdate.call(this,e)||(t.schema&&(et.stop(),e=t.schema.normalize(e),et.start()),!(!g(e)&&ee(n[t.name],e))&&(f(t.set)?t.set.call(this,e):n[t.name]=E(e)&&t.type?J(e,t.type):e,t.attribute&&![H,$].includes(t.type)&&We(this,t.name,e,t.type===I),Qe.call(this,t,e)))}}function je(t){return function(){if(f(t.get))return t.get.call(this);{let e=this[m];switch(t.type){case b:return y(e[t.name])?void 0:Number(e[t.name]);case I:return!!e[t.name];case $:case H:return et(e[t.name]||(t.type===$?{}:[]),n=>re(t).call(this,n));default:return e[t.name]}}}}function tn(t,e){customElements.get(rt+e.toLowerCase())||customElements.define(rt+e.toLowerCase(),t)}function se(t,e={}){return e.property=(...n)=>(n.forEach(i=>ie(t,{...i})),e),e.attribute=(...n)=>(n.forEach(i=>Xe(t,{...i})),e),e.tag=n=>(tn(t,n),e),e.extension=n=>(n.call(e,e,t),e),e}function oe(t,e){let n=new WeakMap;return function(...i){clearTimeout(n.get(this)),n.set(this,setTimeout(()=>{t.apply(this,i)},e))}}function wt(t,e){let n=new WeakMap,i=[];return function(...r){return clearTimeout(n.get(this)),new Promise((c,o)=>{i.push({resolve:c,reject:o}),n.set(this,setTimeout(()=>{try{let s=t.apply(this,r);i.forEach(u=>u.resolve(s))}catch(s){i.forEach(u=>u.reject(s))}finally{i.length=0}},e))})}}function At(t,e){return function(...n){if(t.apply(this,n))return e.apply(this,n)}}function Tt(t,e){return function(...n){let i=t.apply(this,n);return i instanceof Promise?i.then(r=>e.call(this,r)||r):e.call(this,i)||i}}var ce=1,z=Symbol(),A=Symbol(),ue=Symbol(),bt=Symbol();var F=class extends st{constructor(e){super(),this.attachShadow({mode:"open"}),this[m].ready=e||!1,this[m].rendered=!1,y(e)&&(this.ready=!0)}get ready(){return this[m].ready}set ready(e){let n=this[m],i=n.ready;n.ready=!!e,i===!1&&n.ready===!0&&(this[S]("ready",{ready:!0}),f(this[A])&&this[A]())}get rendered(){return this[m].rendered}set rendered(e){let n=this[m],i=n.rendered;n.rendered=!!e,i===!1&&n.rendered===!0&&this[S]("render",{rendered:!0})}connectedCallback(){let e=this.getBoundingClientRect(),n=getComputedStyle(this).flexDirection,i=()=>{let{width:r,height:c}=this.getBoundingClientRect(),o=getComputedStyle(this).flexDirection;(r!==e.width||c!==e.height||o!==n)&&(f(this[ue])&&this[ue](r,c,r-e.width,c-e.height),e={width:r,height:c},n=o,this[S]("resize",e)),this[m]._resizeObserver=window.requestAnimationFrame(i)};i()}disconnectedCallback(){window.cancelAnimationFrame(this[m]._resizeObserver)}};function en(t,e){let n={name:e.name.startsWith("--")?e.name:`--${rt}${e.name}`,initialValue:e.initialValue??e.value??"",syntax:e.syntax??"*",inherits:e.inherits??!0};t.prototype[bt]||(t.prototype[bt]={}),t.prototype[bt][n.name]=n}function nn(t){if(f(t.prototype[A])){let e=t.prototype[A];t.prototype[A]=At(function(){return this.rendered=!1,this.ready},wt(Tt(async function(){return e.apply(this)},function(n){this.rendered=n!==!1,this.rendered&&f(this[z])&&this[z]()}),ce))}if(f(t.prototype[z])){let e=t.prototype[z];t.prototype[z]=At(function(n){return n&&(this[m].rendered=!0),this.ready&&this[m].rendered},wt(Tt(async function(...n){return e.apply(this,n)},function(){this[S]("refresh")}),ce))}}function ae(t){nn(t);let e=se(t,{style:(...n)=>(n.forEach(i=>en(t,{...i})),e)});return e}F.RENDER=A;F.REFRESH=z;F.CHANGE=D;var rn="enterViewport",sn="exitViewport",ot=Symbol(),on={root:null,rootMargin:"0px",threshold:[0,.5,.1,.15,.2,.25,.3,.35,.4,.45,.5,.55,.6,.65,.7,.75,.8,.85,.9,.95,1]};function cn(t){t.attribute({name:"viewport-once-class",type:_,value:"",posUpdate:Ot}).attribute({name:"viewport-class",type:_,value:"",posUpdate:Ot}).attribute({name:"viewport-ratio",type:b,value:0,posUpdate:Ot})}function fe(t,e){e&&e.split(" ").forEach(n=>t.add(n))}function un(t,e){e&&e.split(" ").forEach(n=>t.remove(n))}function Ot(){let t=this[m],e=this.classList,n=!1;this[ot]&&this[ot].disconnect(),this[ot]=new IntersectionObserver(i=>{i.forEach(r=>{r.isIntersecting&&r.intersectionRatio>=t.viewportRatio?n||(fe(e,t.viewportOnceClass),fe(e,t.viewportClass),n=!0,this[S](rn)):n&&(un(e,t.viewportClass),n=!1,this[S](sn))})},on),this[ot].observe(this)}var le=cn;var Lt="gSVGObject",an="http://www.w3.org/2000/svg",fn="svg",Rt="d",he="transform",pe="appendChild",Pt="insertBefore",de="insertAdjacentElement",me="attach",ye="innerHTML",vt=new WeakMap,_t=new Set,ln=t=>Jt(t)||t.startsWith("_")||["el","gSVG","then"].includes(t),ct=(t,e)=>t instanceof e,hn=()=>Lt+Math.random().toString(32).substring(2),It=t=>g(t)&&!O(t)&&t[Symbol.toStringTag]===Lt,dn=t=>ht(document.createElementNS(an,t)),ut=t=>E(t)?dn(t):g(t)&&t!==null?It(t)?t:ht(t):t,pn=t=>({content:ye,source:"outerHTML",parent:"parentElement",next:"nextElementSibling",previous:"previousElementSibling",add:pe,addBefore:Pt})[t]||t,mn=t=>["append","before","after",pe,Pt,de].includes(t)?function(...e){let n=[],i=[],r=[];return t===de?(n.push(e[0]),i.push(ut(e[1]))):t===Pt?(i.push(ut(e[0])),r.push(e[1]||this.firstChild||null)):i.push(...e.map(ut)),i.every(c=>c?._el)?(this[t](...n,...i.map(c=>c&&c._el),...r),i.forEach(c=>c._el.dispatchEvent(new Event(me))),i.length>1?i:i[0]):i[0]}:null,lt=class{constructor(e){this._el=e,this.gSVG=V}get[Symbol.toStringTag](){return Lt}get el(){return this._el}attachTo(e){return(g(e)?It(e)?e._el:e:document.querySelector(e)).appendChild(this._el),this._el.dispatchEvent(new Event(me)),this}id(e){return e?(this._el.setAttribute("id",e),this):this._el.id||(this._el.id=hn())}ref(){return`#${this.id()}`}url(){return`url(${this.ref()})`}parents(){let e=[],n=this;for(;n=n.parentElement();)e.push(n);return e}top(){return this.parents().pop()||this}},ht=t=>{if(!g(t)||O(t))return null;if(vt.has(t))return vt.get(t);let e=new Proxy(new lt(t),{get(n,i){if(ln(i))return n[i];if(!y(n[i]))return(...o)=>(M(e,i,o),n[i].call(e,...o));if([Rt,he,"$"+Rt,"$"+he].includes(i)){let o="";i[0]==="$"&&(i=i.substring(1));let u=i===Rt?yn:gn,d=new Proxy(p=>(M(e,i,[p]),y(p)?t.getAttribute(i):(p?t.setAttribute(i,p):t.removeAttribute(i),e)),{get(p,x){return x in p?Reflect.get(p,x):(...R)=>{if(x===Symbol.toPrimitive){let W=o;return o="",W}return o+=u(e,x,R),t?.setAttribute(i,o),d}}});return d}let r=pn(i),c=mn(r)||t[r];return f(c)?(...o)=>{M(e,i,o);let s=c.call(t,...o);return y(s)?e:Ee(s)}:ge(t,r,e)}});return vt.set(t,e),e},ge=(t,e,n,i)=>{let r=e.replace(/_/g,"-"),c=(...o)=>{if(M(n,i?`${i}.${e}`:e,o),o.length===0){let u=t?.hasAttribute&&t.hasAttribute(r)?t.getAttribute(r):t[r];return Ee(u)}let s=o[0];if(ct(t,CSSStyleDeclaration))return t[r]=s,n;if(r in t&&!_t.has(r)){let u=t[r];if(String(u)===String(s))return n;try{t[r]=s}catch{_t.add(r)}if(g(t[r])&&t[r]===s||t[r]!==u||r===ye)return n;_t.add(r)}return s!==0&&!s?t?.removeAttribute&&t.removeAttribute(r):t?.setAttribute&&t.setAttribute(r,Yt(s)?"":String(o)),n};return new Proxy(c,{get(o,s){let u=t[r][s];return f(u)?(...d)=>(M(n,`${e}.${s}`,d),u.call(t[r],...d)||n):ge(t[r],s,n,r)},set(o,s,u){return t[r][s]=u,!0}})},Ee=t=>ct(t,HTMLCollection)||ct(t,NodeList)?[...t].map(e=>ht(e)):ct(t,SVGElement)?ht(t):E(t)?t===""||Number.isNaN(Number(t))?t:Number(t):t,Ne=[],M=(t,e,n,i=[])=>{for(let r of Ne)r(V,t,e,n,i)},at={},yn=(t,e,n)=>(M(t,`d.${e}`,n,Object.keys(at).map(i=>`d.${i}`)),at[e]?at[e].apply(t,n):`${e}${n.join(tt)}`),gn=(t,e,n)=>(M(t,`transform.${e}`,n),`${e}(${n.join(tt)})`);function V(t){return M(null,U,[t]),ut(y(t)?fn:t)}V.isWrapped=It;var ft=t=>e=>f(e)?e(t):Object.assign(t,e),Mt={install:$e,extendConstructor:ft(V),extendInstance:ft(lt.prototype),extendPath:ft(at),beforeEveryCall(t){f(t)&&Ne.push(t)}};Mt.extendSetup=ft(Mt);function $e(t){return t(Mt),V}V.install=$e;var dt=V;var Ut=new Map,En=/function\s+([\p{L}\p{Nl}$_][\p{L}\p{Nl}$_\p{Mn}\p{Mc}\p{Nd}\p{Pc}]*)\s*\(/gmu,Nn=async function(){}.constructor;function pt(t,e,n=!1){let i=`${t.join(",")} ${e}`;if(Ut.has(i))return Ut.get(i);let r=new(n?Nn:Function)(...t,e);return Ut.set(i,r),r}function Se(t,e){let n=[...e.matchAll(En)].map(i=>i[1]);try{return pt(Object.keys(t),`${e}; return {${n.map(r=>`${r}: typeof ${r} === 'function' ? ${r} : undefined`)}}; `)(...Object.values(t))}catch(i){console.warn(i.message,` `,e)}}function Ct(t){try{return new Function(`let ${t} = 0`),!0}catch{return!1}}var xe="SVG",Dt="animate",$n="none",Sn="freeze",xn="path",we="d",Ae="transform",Re="rotate",Ft="translate",wn="offset",Te="inherit",be="finished",An=[Re,"skewX","skewY"],Tn="deg",K="px",Oe="ms",bn=["width","height"],Vt=!1;if(window.matchMedia){let t=window.matchMedia("(prefers-reduced-motion: reduce)");Vt=t.matches,t.addEventListener("change",()=>{Vt=t.matches})}var On=t=>t.replace(/([A-Z])/g,"-$1").toLowerCase();function Rn(t,e={duration:200},n=null,i=null){let r=this.gSVG,c=a=>{let l=g(a)?{...a}:{duration:a};return Vt&&(l.duration=0),l.fill=$n,l},o=a=>{a=P(a)?a:[a];let l=window.getComputedStyle(this._el),h=[],N=new Set;for(let v of a){let T={...v};for(let w in T)!(w in l)||bn.includes(w)?N.add(w):w===we?T.d=`${xn}("${T.d}")`:w===Ae&&(T.transform=d(T.transform));h.push(T)}return u(N,h),h},s=[],u=(a,l)=>{if(a.size){let h=new KeyframeEffect(null,l).getKeyframes(),N=this.closest(xe)?this.closest(xe).getCurrentTime()*1e3:0;for(let v of a){let T=r(Dt).attributeName(v).dur(Z.duration+Oe).begin((0|N+(e.delay||0))+Oe).fill(Sn);if(l.length===1)T.to(l[0][v]);else{let w=[],j=[];for(let Et in h){let De=h[Et];v in l[Et]&&(w.push(De.computedOffset),j.push(l[Et][v]))}w[0]!==0&&(w.unshift(0),j.unshift(this[v]()||Te)),w[w.length-1]!==1&&(w.push(1),j.push(this[v]()||Te)),T.keyTimes(w.join(";")).values(j.join(";"))}s.push(T),T.attachTo(this)}}},d=a=>{E(a)&&(a=JSON.parse("{"+a.replace(/\s*\(\s*/g,":[").replace(/\s*\)\s*/g,"],").split(/\s*,\s*|\s.*/).join(",").replace(/(\w+):/g,'"$1":').replace(/,$/,"")+"}"));let l="";for(let h in a)if(h===Re){let N=p(a[h]);N.length>1&&(l+=`${Ft}(${N[1]}${K},${N[2]}${K}) `),l+=`${h}(${N[0]}${x(h)}) `,N.length>1&&(l+=`${Ft}(-${N[1]}${K},-${N[2]}${K}) `)}else l+=`${h}(${p(a[h]).map(N=>N+x(h)).join(",")}) `;return l},p=a=>P(a)?a:String(a).split(/\s+|,/),x=a=>An.includes(a)?Tn:a===Ft?K:"",R=a=>E(a)?a.replace(/(deg)|(px)/g,"").trim():a,W=a=>a.replace(/(path\s*\(\s*["'])|(["']\s*\)\s*$)/g,"").trim().replace(/([a-zA-Z])\s*/g,"$1").replace(/\s+/g,","),G=a=>{let l=/translate\((.*)px,(.*)px\) rotate\((.*)deg\) translate\((.*)px,(.*)px\)\s+/,h=l.exec(a);return h&&Number(h[1])===Number(h[4])*-1&&Number(h[2])===Number(h[5])*-1?a=a.replace(l,`rotate(${h[3]}, ${h[1]}, ${h[2]})`):a=R(a),a},Z=c(e),Q=o(t),B=this._el.animate(Q,Z);return B.ready.then(()=>f(n)&&n.call(this,B)),B.finished.then(()=>{let a=Q[Q.length-1];for(let l in a){let h=On(l);h.startsWith("text-")?this._el.style[l]=a[l]:l!==wn&&l in a&&this._el.setAttribute(h,h===we?W(a[l]):h===Ae?G(a[l]):R(a[l]))}s.forEach(l=>{l[be](!0);let h=this._el.querySelectorAll(Dt),N=this._el.querySelectorAll(`${Dt}[${be}]`);h.length===N.length&&h.forEach(v=>v.remove())}),f(i)&&i.call(this,B)}),this}function ve(t){t.extendInstance({animateTo:Rn})}var _e=Symbol(),Pe=Symbol(),k=Symbol(),mt=Symbol(),yt=Symbol(),vn="unknown",Me="Graphane SVG Template Engine:",kt=[];q({name:"g-content",execute(t,{expression:e,data:n,evalExpression:i}){t.content(i(e,n))}});q({name:"g-if",execute(t,{expression:e,data:n,evalExpression:i}){t.style.visibility(i(e,n)?"inherit":"hidden")}});q({name:"g-bind",alias:":",argument:!0,execute(t,{expression:e,argument:n,data:i,evalExpression:r}){let c={...i,$$:["d","transform"].includes(n)?t["$"+n]:()=>t[n]()};c.$$.dynamic=(s,u=200,d=0)=>{t.animateTo((P(s)?s:[s]).map(p=>g(p)&&"offset"in p?{[n]:p.value,offset:p.offset}:{[n]:p}),{duration:u,delay:d})};let o=r(e,c);if(n==="class"){if(P(o)){t.classList.add(...o.filter(s=>!!s));return}if(g(o)){Object.entries(o).forEach(([s,u])=>{u?t.classList.add(s):t.classList.remove(s)});return}o&&t.classList.add(o);return}if(n==="style"){Object.entries(o).forEach(([s,u])=>t.style[s](u));return}y(o)||t[n](o)}});q({name:"g-on",alias:"@",argument:!0,execute(t,{expression:e,argument:n,data:i,evalExpression:r}){t[yt]=t[yt]||{};let c=t[yt][n]=t[yt][n]||new Map;c.has(e)&&t.removeEventListener(n,c.get(e));let o=function(s){let u=r(e,i,t);f(u)&&u.call(t,s)};t.addEventListener(n,o),c.set(e,o),n==="init"&&!t[_e]&&(t[_e]=!0,t.dispatchEvent(new Event("init")))}});q({name:"g-for",template:!0,execute(t,{expression:e,data:n}){t[k]=t[k]||[];let i=0;Ln(e,n,r=>{if(t[k][i])gt(t[k][i],r,!1);else{let c=t.gSVG("g");t.children().forEach(o=>{c.add(o.cloneNode(!0))}),gt(c,r),t.before(c.el),c[Pe]=!0,t[k].push(c)}i++},r=>{for(;t[k].length>r.length;)t[k].pop().remove()})}});function q({name:t,alias:e,argument:n,template:i,execute:r}){let c=`^(${t}${n?":":""}${e?`|${e})`:")"}${n?"(.*)$":"$"}`,o=new RegExp(c,"i");kt.push({name:t,alias:e,argument:n,template:i,execute:r,check:o})}function _n(t){for(let e of kt){let n=e.check.exec(t);if(n){let i=n[2];return{...e,argument:i}}}}function Pn(t){return t.replace(/[{}()[\]]/g,"").split(",").map(e=>e.includes(":")?e.split(":")[1]:e).map(e=>e.trim())}function Mn(t){return t[Symbol.iterator]?{iterator:[...t],type:H}:Wt(t)?{iterator:Array(t<0?0:0|t).fill(0).map((e,n)=>n),type:b}:g(t)?{iterator:Object.entries(t).map(e=>e.reverse()),type:$}:{iterator:t,type:vn}}function Le(t,e,n=null){try{let i=Object.keys(e).filter(Ct);return pt(i,`return ( ${t} ); `).apply(n,i.map(c=>e[c]))}catch(i){console.warn(Me,i.message,` `,t)}}function Ln(t,e,n,i){let r="__$$iterator",c="__$$callback",o="__$$final";try{let[s,u]=t.split(" of ");s=s.trim(),u=u.trim();let d=Le(u,e)||[],{iterator:p,type:x}=Mn(d);x===$&&!s.startsWith("[")&&(s=`[${s.replace(/(^\()|(\)$)/g,"")}]`);let R=Pn(s),W=s.startsWith("(")?s:`(${s})`,G=Object.keys(e).filter(Ct),Z=` ${r}.forEach(${W} => { ${c}({${G}${G.length?",":""}${R.join(",")}}); }); ${o}(${r}); `;return pt([...G,r,c,o],Z)(...G.map(B=>e[B]),p,n,i)}catch(s){console.warn(Me,s)}}function gt(t,e,n=!0){if(n&&t[Pe])return;t[mt]=t[mt]||[];let i=t.attributes();for(let c of[...i]){let o=c.name,s=_n(o);s&&(t[mt].push({...s,expression:c.value}),t.removeAttribute(o))}let r=!1;for(let c of t[mt])c.execute(t,{...c,data:e,evalExpression:Le}),r=c.template||r;if(!r)for(let c of t.children())gt(c,e)}function In(t={}){gt(this,t),this.dispatchEvent(new Event("render"))}function Ie(t){t.install(ve),t.extendInstance({render:In}),t.extendSetup({extendTemplate:{defineDirective:q,obtainDirective(e){return kt.find(n=>n.name===e)}}})}var Bt=Symbol(),Gt=Symbol();function Un(t,e){return e===Bt?t:ne(t,e)}function Ue(t={}){let e={};function n(i,r,c,o){i in t||(e[i]||(e[i]={}),Object.defineProperty(t,i,{enumerable:!1,configurable:!0,writable:!0,value(s=void 0,u=Bt){if(E(s)||y(s)){if(u=s||Bt,u in e[i])return e[i][u]}else t=s;let d=t.reduce((p,x)=>{let R=Un(x,u);return typeof R>"u"?p:p===Gt?R:c(p,R)},r);return d=typeof o=="function"?o(d):d,t!==s&&(e[i][u]=d),d}}))}return n("$min",Gt,(i,r)=>r>i?i:r),n("$max",Gt,(i,r)=>r<i?i:r),n("$count",0,i=>i+1),n("$sum",0,(i,r)=>r+i),n("$avg",{n:0,i:0},(i,r)=>(i.n++,i.i+=Number(r),i),i=>i.i/i.n),n("$distinct",new Set,(i,r)=>(i.add(r),i),i=>[...i]),t}var Cn=t=>{t.extendSetup({extendComposer(e){f(e)?e(L.prototype):Object.assign(L.prototype,e)}})};dt.install(Ie).install(Cn);var Dn="composer",Ht="update",zt="SVG",Ce=t=>`script[type=${t}],g-script[type=${t}]`,L=class extends F{#t=null;#e=!1;isRendering=!1;async#i(e){let n=await fetch(e);if(n.status!==200)throw new Error(`${n.statusText} (${n.status}): ${n.url}`);return n.text()}async#u(){let e=[...this.querySelectorAll(Ce("plugin"))];for(let n of e){let i=n.getAttribute("src");i&&dt.install((await import(i))?.svgPlugin)}}async#r(){let e=this[m];if(this.#t=null,e.content.innerHTML="",e.svgSrc)e.content.innerHTML=await this.#i(e.svgSrc);else{let i=this.querySelector("template")?.content||this.querySelector(zt);i&&e.content.append(i.cloneNode(!0))}let n=e.content.querySelector(zt);return n&&(this.#t=dt(n),(!this.#t.width()||this.#t.width()?.baseVal?.value===0)&&this.#t.width("100%")),!0}async#n(e){let n=this[m],i=e+"Src",r=this.querySelector(Ce(e));return r&&(n[i]=r.getAttribute("src")),n[i]?this.#i(n[i]):r?.textContent}async#s(){let e=await this.#n("methods");e&&(this[m].methods=Se({$:this},e))}async#o(){let e=await this.#n("config");e&&(this[m].config=$t(e))}async#c(){let e=await this.#n("data");e&&(this[m].data=Zt(e)||Qt(e)?$t(e):jt(e))}constructor(){super();let e=this[m];this.shadowRoot.innerHTML=` <style> :host { display : inline-block; width : max-content; height : max-content; } </style><span id="content"></span> `,e.content=this.shadowRoot.querySelector("#content")}[A](){return this.load()}async[D](e){let n=[];try{for(let i of e){let r=i.target;if(r===this&&!i.attributeName)return this.load();if(r.tagName===zt)n.push(this.#r());else if(r.tagName==="SCRIPT"){let c={data:this.#c,methods:this.#s,config:this.#o}[r.type.toLowerCase()];c&&n.push(c())}}}catch(i){return console.error(i.message),this[S]("error",i.message),!1}if(n.length)return await Promise.all(n),this.update()}async load(){try{this.#e=!1,await this.#u(),await Promise.all([this.#r(),this.#o(),this.#s(),this.#c()]),this.#e=!0}catch(e){return console.error(e.message),this[S]("error",e.message),!1}return this.update(!0)}async update(e=!1){if(!(this.isRendering&&!e)&&this.#t){this.isRendering=!0;let n=this[m],i=Ue(n.methods.data?n.methods.data(C(n.data)):C(n.data)),r={...n.methods,...P(i)?{}:i,data:i,$:this};await this.#t.render(r),this.isRendering=!1}}get svg(){return this.#t}get loaded(){return this.#e}};L.prototype.update=oe(L.prototype.update,1);ae(L).extension(le).attribute({name:"svg-src",type:_,value:"",posUpdate:A}).attribute({name:"data",type:$,value:[],posUpdate:Ht}).attribute({name:"data-src",type:_,posUpdate:A}).property({name:"methods",type:$,value:{},posUpdate:Ht}).attribute({name:"methods-src",type:_,posUpdate:A}).attribute({name:"config",type:$,value:{},posUpdate:Ht}).attribute({name:"config-src",type:_,posUpdate:A}).tag(Dn);})(); //# sourceMappingURL=composer.js.map