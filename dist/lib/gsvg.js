/* graphane - 1.0.0-beta.1 */ (()=>{var W="function",q="undefined",Q="object",Z="string";var K="boolean";var X="symbol",L="",A=",";var h=t=>typeof t===Q,_=t=>typeof t===Z,b=t=>typeof t===W;var x=t=>typeof t===q,R=t=>typeof t===X,I=t=>typeof t===K;var T=t=>t===null;var M="gSVGObject",tt="http://www.w3.org/2000/svg",et="svg",O="d",P="transform",G="appendChild",m="insertBefore",B="insertAdjacentElement",F="attach",V="innerHTML",C=new WeakMap,j=new Set,nt=t=>R(t)||t.startsWith("_")||["el","gSVG","then"].includes(t),S=(t,e)=>t instanceof e,rt=()=>M+Math.random().toString(32).substring(2),D=t=>h(t)&&!T(t)&&t[Symbol.toStringTag]===M,it=t=>p(document.createElementNS(tt,t)),$=t=>_(t)?it(t):h(t)&&t!==null?D(t)?t:p(t):t,ot=t=>({content:V,source:"outerHTML",parent:"parentElement",next:"nextElementSibling",previous:"previousElementSibling",add:G,addBefore:m})[t]||t,st=t=>["append","before","after",G,m,B].includes(t)?function(...e){let i=[],n=[],r=[];return t===B?(i.push(e[0]),n.push($(e[1]))):t===m?(n.push($(e[0])),r.push(e[1]||this.firstChild||null)):n.push(...e.map($)),n.every(c=>c?._el)?(this[t](...i,...n.map(c=>c&&c._el),...r),n.forEach(c=>c._el.dispatchEvent(new Event(F))),n.length>1?n:n[0]):n[0]}:null,E=class{constructor(e){this._el=e,this.gSVG=d}get[Symbol.toStringTag](){return M}get el(){return this._el}attachTo(e){return(h(e)?D(e)?e._el:e:document.querySelector(e)).appendChild(this._el),this._el.dispatchEvent(new Event(F)),this}id(e){return e?(this._el.setAttribute("id",e),this):this._el.id||(this._el.id=rt())}ref(){return`#${this.id()}`}url(){return`url(${this.ref()})`}parents(){let e=[],i=this;for(;i=i.parentElement();)e.push(i);return e}top(){return this.parents().pop()||this}},p=t=>{if(!h(t)||T(t))return null;if(C.has(t))return C.get(t);let e=new Proxy(new E(t),{get(i,n){if(nt(n))return i[n];if(!x(i[n]))return(...o)=>(f(e,n,o),i[n].call(e,...o));if([O,P,"$"+O,"$"+P].includes(n)){let o="";n[0]==="$"&&(n=n.substring(1));let u=n===O?ct:ut,a=new Proxy(l=>(f(e,n,[l]),x(l)?t.getAttribute(n):(l?t.setAttribute(n,l):t.removeAttribute(n),e)),{get(l,N){return N in l?Reflect.get(l,N):(...z)=>{if(N===Symbol.toPrimitive){let v=o;return o="",v}return o+=u(e,N,z),t?.setAttribute(n,o),a}}});return a}let r=ot(n),c=st(r)||t[r];return b(c)?(...o)=>{f(e,n,o);let s=c.call(t,...o);return x(s)?e:k(s)}:H(t,r,e)}});return C.set(t,e),e},H=(t,e,i,n)=>{let r=e.replace(/_/g,"-"),c=(...o)=>{if(f(i,n?`${n}.${e}`:e,o),o.length===0){let u=t?.hasAttribute&&t.hasAttribute(r)?t.getAttribute(r):t[r];return k(u)}let s=o[0];if(S(t,CSSStyleDeclaration))return t[r]=s,i;if(r in t&&!j.has(r)){let u=t[r];if(String(u)===String(s))return i;try{t[r]=s}catch{j.add(r)}if(h(t[r])&&t[r]===s||t[r]!==u||r===V)return i;j.add(r)}return s!==0&&!s?t?.removeAttribute&&t.removeAttribute(r):t?.setAttribute&&t.setAttribute(r,I(s)?"":String(o)),i};return new Proxy(c,{get(o,s){let u=t[r][s];return b(u)?(...a)=>(f(i,`${e}.${s}`,a),u.call(t[r],...a)||i):H(t[r],s,i,r)},set(o,s,u){return t[r][s]=u,!0}})},k=t=>S(t,HTMLCollection)||S(t,NodeList)?[...t].map(e=>p(e)):S(t,SVGElement)?p(t):_(t)?t===""||Number.isNaN(Number(t))?t:Number(t):t,U=[],f=(t,e,i,n=[])=>{for(let r of U)r(d,t,e,i,n)},g={},ct=(t,e,i)=>(f(t,`d.${e}`,i,Object.keys(g).map(n=>`d.${n}`)),g[e]?g[e].apply(t,i):`${e}${i.join(A)}`),ut=(t,e,i)=>(f(t,`transform.${e}`,i),`${e}(${i.join(A)})`);function d(t){return f(null,L,[t]),$(x(t)?et:t)}d.isWrapped=D;var y=t=>e=>b(e)?e(t):Object.assign(t,e),w={install:J,extendConstructor:y(d),extendInstance:y(E.prototype),extendPath:y(g),beforeEveryCall(t){b(t)&&U.push(t)}};w.extendSetup=y(w);function J(t){return t(w),d}d.install=J;var Y=d;(typeof gobalThis<"u"?globalThis:window).gSVG=Y;})();