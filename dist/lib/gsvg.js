/* graphane - 0.1.0-alpha.5 */ var Y="function",z="undefined",q="object",v="string";var Q="boolean";var Z="symbol",L="",A=",";var a=t=>typeof t===q,E=t=>typeof t===v,b=t=>typeof t===Y;var x=t=>typeof t===z,P=t=>typeof t===Z,R=t=>typeof t===Q;var _=t=>t===null;var w="gSVGObject",K="http://www.w3.org/2000/svg",X="svg",O="d",I="transform",F="appendChild",m="insertBefore",B="insertAdjacentElement",G="attach",T=new WeakMap,C=new Set,W=t=>t[0]==="_"||P(t)||["el","gSVG"].includes(t),N=(t,e)=>t instanceof e,tt=()=>w+Math.random().toString(32).substring(2),M=t=>a(t)&&!_(t)&&t[Symbol.toStringTag]===w,et=t=>p(document.createElementNS(K,t)),S=t=>E(t)?et(t):a(t)&&t!==null?M(t)?t:p(t):t,nt=t=>({content:"innerHTML",source:"outerHTML",parent:"parentElement",next:"nextElementSibling",previous:"previousElementSibling",add:F,addBefore:m})[t]||t,rt=t=>["append","before","after",F,m,B].includes(t)?function(...e){let r=[],n=[],i=[];return t===B?(r.push(e[0]),n.push(S(e[1]))):t===m?(n.push(S(e[0])),i.push(e[1]||this.firstChild||null)):n.push(...e.map(S)),n.every(c=>c?._el)?(this[t](...r,...n.map(c=>c&&c._el),...i),n.forEach(c=>c._el.dispatchEvent(new Event(G))),n.length>1?n:n[0]):n[0]}:null,g=class{constructor(e){this._el=e,this.gSVG=l}get[Symbol.toStringTag](){return w}get el(){return this._el}attachTo(e){return(a(e)?M(e)?e._el:e:document.querySelector(e)).appendChild(this._el),this._el.dispatchEvent(new Event(G)),this}id(e){return e?(this._el.setAttribute("id",e),this):this._el.id||(this._el.id=tt())}ref(){return`#${this.id()}`}url(){return`url(${this.ref()})`}parents(){let e=[],r=this;for(;r=r.parentElement();)e.push(r);return e}top(){return this.parents().pop()||this}},p=t=>{if(!a(t)||_(t))return null;if(T.has(t))return T.get(t);let e=new Proxy(new g(t),{get(r,n){if(W(n))return r[n];if(!x(r[n]))return(...s)=>(f(e,n,s),r[n].call(e,...s));if([O,I,"$"+O,"$"+I].includes(n)){let s="",o=n[0]==="$";o&&(n=n.substring(1));let u=n===O?it:ot,d=new Proxy(h=>(f(e,n,[h]),x(h)?t.getAttribute(n):(h?t.setAttribute(n,h):t.removeAttribute(n),e)),{get(h,D){return(...V)=>D===Symbol.toPrimitive?s:(s+=u(e,D,V),!o&&t?.setAttribute(n,s),d)}});return d}let i=nt(n),c=rt(i)||t[i];return b(c)?(...s)=>{f(e,n,s);let o=c.call(t,...s);return x(o)?e:H(o)}:k(t,i,e)}});return T.set(t,e),e},k=(t,e,r,n)=>{let i=e.replace(/_/g,"-"),c=(...s)=>{if(f(r,n?`${n}.${e}`:e,s),s.length===0){let u=t?.hasAttribute&&t.hasAttribute(i)?t.getAttribute(i):t[i];return H(u)}let o=s[0];if(N(t,CSSStyleDeclaration))return t[i]=o,r;if(i in t&&!C.has(i)){let u=t[i];if(String(u)===String(o))return r;try{t[i]=o}catch{C.add(i)}if(a(t[i])&&t[i]===o||t[i]!==u)return r;C.add(i)}return o!==0&&!o?t?.removeAttribute&&t.removeAttribute(i):t?.setAttribute&&t.setAttribute(i,R(o)?"":String(s)),r};return new Proxy(c,{get(s,o){let u=t[i][o];return b(u)?(...d)=>(f(r,`${e}.${o}`,d),u.call(t[i],...d)||r):k(t[i],o,r,i)},set(s,o,u){return t[i][o]=u,!0}})},H=t=>N(t,HTMLCollection)||N(t,NodeList)?[...t].map(e=>p(e)):N(t,SVGElement)?p(t):E(t)?t===""||Number.isNaN(Number(t))?t:Number(t):t,J=[],f=(t,e,r,n=[])=>{for(let i of J)i(l,t,e,r,n)},$={},it=(t,e,r)=>(f(t,`d.${e}`,r,Object.keys($).map(n=>`d.${n}`)),$[e]?$[e].apply(t,r):`${e}${r.join(A)}`),ot=(t,e,r)=>(f(t,`transform.${e}`,r),`${e}(${r.join(A)})`);function l(t){return f(null,L,[t]),S(x(t)?X:t)}l.isWrapped=M;var y=t=>e=>b(e)?e(t):Object.assign(t,e),j={install:U,extendConstructor:y(l),extendInstance:y(g.prototype),extendPath:y($),beforeEveryCall(t){b(t)&&J.push(t)}};j.extendSetup=y(j);function U(t){return t(j),l}l.install=U;var ut=l;export{ut as default,l as gSVG}; //# sourceMappingURL=gsvg.js.map