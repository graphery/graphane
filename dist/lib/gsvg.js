/* graphane - 0.1.0-alpha.3 */ (()=>{var $="function",R="undefined",U="object",k="string";var H="boolean";var J="symbol",E="",M=",";var a=t=>typeof t===U,b=t=>typeof t===k,A=t=>typeof t===$;var h=t=>typeof t===R,P=t=>typeof t===J,L=t=>typeof t===H;var p=t=>t===null;var m="gSVGObject",Y="http://www.w3.org/2000/svg",z="svg",q="path",g="d",_=new WeakMap,O=new Set,Q=t=>t[0]==="_"||P(t)||["el","gSVG"].includes(t),S=(t,e)=>t instanceof e,Z=()=>m+Math.random().toString(32).substring(2),w=t=>a(t)&&!p(t)&&t[Symbol.toStringTag]===m,K=t=>N(document.createElementNS(Y,t)),j=t=>b(t)?K(t):a(t)&&t!==null?w(t)?t:N(t):t,X=t=>({content:"innerHTML",source:"outerHTML",parent:"parentElement",next:"nextElementSibling",previous:"previousElementSibling"})[t]||t,x=class{constructor(e){this._el=e,this.gSVG=c}get[Symbol.toStringTag](){return m}get el(){return this._el}add(e){let n=j(e);return n&&this._el.appendChild(n._el),n}addBefore(e){let n=j(e);return n&&this._el.insertBefore(n._el,this._el.firstChild||null),n}attachTo(e){return(a(e)?w(e)?e._el:e:document.querySelector(e)).appendChild(this._el),this}id(e){return e?(this._el.setAttribute("id",e),this):this._el.id||(this._el.id=Z())}ref(){return`#${this.id()}`}url(){return`url(${this.ref()})`}},N=t=>{if(!a(t)||p(t))return null;if(_.has(t))return _.get(t);let e=new Proxy(new x(t),{get(n,i){if(Q(i))return n[i];if(!h(n[i]))return(...r)=>(l(e,i,r),n[i].call(e,...r));if(i===g&&t.tagName.toLowerCase()===q){let r=t.getAttribute(g)||"",f=new Proxy(u=>(l(e,i,[u]),b(u)?t.setAttribute(g,u)||e:t.getAttribute(g)),{get(u,o){return(...s)=>(r+=D(e,o,s),t?.setAttribute(i,r),f)}});return f}if(i==="$d"){let r="",f=new Proxy({},{get(u,o){return(...s)=>{if(o===Symbol.toPrimitive)return r;let d=D(e,o,s);return r+=d,f}}});return f}return i=X(i),A(t[i])?(...r)=>{l(e,i,r);let f=t[i].call(t,...r);return h(f)?e:V(f)}:G(t,i,e)}});return _.set(t,e),e},G=(t,e,n,i)=>{let r=e.replace(/_/g,"-"),f=(...u)=>{if(l(n,i?`${i}.${e}`:e,u),u.length===0){let s=t?.hasAttribute&&t.hasAttribute(r)?t.getAttribute(r):t[r];return V(s)}let o=u[0];if(S(t,CSSStyleDeclaration))return t[r]=o,n;if(r in t&&!O.has(r)){let s=t[r];if(String(s)===String(o))return n;try{t[r]=o}catch{O.add(r)}if(a(t[r])&&t[r]===o||t[r]!==s)return n;O.add(r)}return o!==0&&!o?t?.removeAttribute&&t.removeAttribute(r):t?.setAttribute&&t.setAttribute(r,L(o)?"":String(u)),n};return new Proxy(f,{get(u,o){let s=t[r][o];return A(s)?(...d)=>(l(n,`${e}.${o}`,d),s.call(t[r],...d)||n):G(t[r],o,n,r)},set(u,o,s){return t[r][o]=s,!0}})},V=t=>S(t,HTMLCollection)||S(t,NodeList)?[...t].map(e=>N(e)):S(t,SVGElement)?N(t):b(t)?t===""||Number.isNaN(Number(t))?t:Number(t):t,I=[],l=(t,e,n,i=[])=>{for(let r of I)r(c,t,e,n,i)},y={},D=(t,e,n)=>(l(t,`d.${e}`,n,Object.keys(y).map(i=>`d.${i}`)),y[e]?y[e].apply(t,n):`${e}${n.join(M)}`);function c(t){return l(null,E,[t]),j(h(t)?z:t)}c.isWrapped=w;c.extend=t=>(console.warn("gSVG.extend() for old plugin is deprecated. Please, use gSVG.install() for new plugins."),t(c,x),c);var B={install:C,installAsync:T,extendConstructor(t){Object.assign(c,t)},extendInstance(t){Object.assign(x.prototype,t)},extendPath(t){Object.assign(y,t)},extendSetup(t){Object.assign(B,t)},beforeEveryCall(t){typeof t===$&&I.push(t)}};function C(t){return b(t)?T(t):(t(B),c)}c.install=C;async function T(t){let e=(await import(t)).default;return C(e)}c.installAsync=T;var F=c;(typeof gobalThis<"u"?globalThis:window).gSVG=F;})(); //# sourceMappingURL=gsvg.js.map