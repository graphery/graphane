/* graphane - 0.1.0-alpha.5 */ (()=>{var v="function",q="undefined",Q="object",Z="string";var K="boolean";var X="symbol",L="",A=",";var a=t=>typeof t===Q,E=t=>typeof t===Z,b=t=>typeof t===v;var x=t=>typeof t===q,P=t=>typeof t===X,R=t=>typeof t===K;var _=t=>t===null;var w="gSVGObject",W="http://www.w3.org/2000/svg",tt="svg",T="d",I="transform",G="appendChild",C="insertBefore",B="insertAdjacentElement",F="attach",O=new WeakMap,m=new Set,et=t=>t[0]==="_"||P(t)||["el","gSVG"].includes(t),S=(t,e)=>t instanceof e,nt=()=>w+Math.random().toString(32).substring(2),M=t=>a(t)&&!_(t)&&t[Symbol.toStringTag]===w,rt=t=>y(document.createElementNS(W,t)),N=t=>E(t)?rt(t):a(t)&&t!==null?M(t)?t:y(t):t,it=t=>({content:"innerHTML",source:"outerHTML",parent:"parentElement",next:"nextElementSibling",previous:"previousElementSibling",add:G,addBefore:C})[t]||t,ot=t=>["append","before","after",G,C,B].includes(t)?function(...e){let r=[],n=[],i=[];return t===B?(r.push(e[0]),n.push(N(e[1]))):t===C?(n.push(N(e[0])),i.push(e[1]||this.firstChild||null)):n.push(...e.map(N)),n.every(c=>c?._el)?(this[t](...r,...n.map(c=>c&&c._el),...i),n.forEach(c=>c._el.dispatchEvent(new Event(F))),n.length>1?n:n[0]):n[0]}:null,p=class{constructor(e){this._el=e,this.gSVG=l}get[Symbol.toStringTag](){return w}get el(){return this._el}attachTo(e){return(a(e)?M(e)?e._el:e:document.querySelector(e)).appendChild(this._el),this._el.dispatchEvent(new Event(F)),this}id(e){return e?(this._el.setAttribute("id",e),this):this._el.id||(this._el.id=nt())}ref(){return`#${this.id()}`}url(){return`url(${this.ref()})`}parents(){let e=[],r=this;for(;r=r.parentElement();)e.push(r);return e}top(){return this.parents().pop()||this}},y=t=>{if(!a(t)||_(t))return null;if(O.has(t))return O.get(t);let e=new Proxy(new p(t),{get(r,n){if(et(n))return r[n];if(!x(r[n]))return(...o)=>(f(e,n,o),r[n].call(e,...o));if([T,I,"$"+T,"$"+I].includes(n)){let o="";n[0]==="$"&&(n=n.substring(1));let u=n===T?st:ct,d=new Proxy(h=>(f(e,n,[h]),x(h)?t.getAttribute(n):(h?t.setAttribute(n,h):t.removeAttribute(n),e)),{get(h,D){return(...Y)=>{if(D===Symbol.toPrimitive){let z=o;return o="",z}return o+=u(e,D,Y),t?.setAttribute(n,o),d}}});return d}let i=it(n),c=ot(i)||t[i];return b(c)?(...o)=>{f(e,n,o);let s=c.call(t,...o);return x(s)?e:k(s)}:V(t,i,e)}});return O.set(t,e),e},V=(t,e,r,n)=>{let i=e.replace(/_/g,"-"),c=(...o)=>{if(f(r,n?`${n}.${e}`:e,o),o.length===0){let u=t?.hasAttribute&&t.hasAttribute(i)?t.getAttribute(i):t[i];return k(u)}let s=o[0];if(S(t,CSSStyleDeclaration))return t[i]=s,r;if(i in t&&!m.has(i)){let u=t[i];if(String(u)===String(s))return r;try{t[i]=s}catch{m.add(i)}if(a(t[i])&&t[i]===s||t[i]!==u)return r;m.add(i)}return s!==0&&!s?t?.removeAttribute&&t.removeAttribute(i):t?.setAttribute&&t.setAttribute(i,R(s)?"":String(o)),r};return new Proxy(c,{get(o,s){let u=t[i][s];return b(u)?(...d)=>(f(r,`${e}.${s}`,d),u.call(t[i],...d)||r):V(t[i],s,r,i)},set(o,s,u){return t[i][s]=u,!0}})},k=t=>S(t,HTMLCollection)||S(t,NodeList)?[...t].map(e=>y(e)):S(t,SVGElement)?y(t):E(t)?t===""||Number.isNaN(Number(t))?t:Number(t):t,H=[],f=(t,e,r,n=[])=>{for(let i of H)i(l,t,e,r,n)},$={},st=(t,e,r)=>(f(t,`d.${e}`,r,Object.keys($).map(n=>`d.${n}`)),$[e]?$[e].apply(t,r):`${e}${r.join(A)}`),ct=(t,e,r)=>(f(t,`transform.${e}`,r),`${e}(${r.join(A)})`);function l(t){return f(null,L,[t]),N(x(t)?tt:t)}l.isWrapped=M;var g=t=>e=>b(e)?e(t):Object.assign(t,e),j={install:J,extendConstructor:g(l),extendInstance:g(p.prototype),extendPath:g($),beforeEveryCall(t){b(t)&&H.push(t)}};j.extendSetup=g(j);function J(t){return t(j),l}l.install=J;var U=l;(typeof gobalThis<"u"?globalThis:window).gSVG=U;})(); //# sourceMappingURL=gsvg.js.map