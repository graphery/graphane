/* graphane - 1.0.0-beta.3 */ var W="function",q="undefined",v="object",Q="string";var Z="boolean";var K="symbol",L="",p=",";var h=t=>typeof t===v,_=t=>typeof t===Q,b=t=>typeof t===W;var x=t=>typeof t===q,R=t=>typeof t===K,I=t=>typeof t===Z;var T=t=>t===null;var w="gSVGObject",X="http://www.w3.org/2000/svg",tt="svg",O="d",P="transform",F="appendChild",M="insertBefore",B="insertAdjacentElement",G="attach",H="innerHTML",C=new WeakMap,j=new Set,et=t=>R(t)||t.startsWith("_")||["el","gSVG","then"].includes(t),$=(t,e)=>t instanceof e,nt=()=>w+Math.random().toString(32).substring(2),D=t=>h(t)&&!T(t)&&t[Symbol.toStringTag]===w,rt=t=>A(document.createElementNS(X,t)),S=t=>_(t)?rt(t):h(t)&&t!==null?D(t)?t:A(t):t,it=t=>({content:H,source:"outerHTML",parent:"parentElement",next:"nextElementSibling",previous:"previousElementSibling",add:F,addBefore:M})[t]||t,ot=t=>["append","before","after",F,M,B].includes(t)?function(...e){let i=[],n=[],r=[];return t===B?(i.push(e[0]),n.push(S(e[1]))):t===M?(n.push(S(e[0])),r.push(e[1]||this.firstChild||null)):n.push(...e.map(S)),n.every(c=>c?._el)?(this[t](...i,...n.map(c=>c&&c._el),...r),n.forEach(c=>c._el.dispatchEvent(new Event(G))),n.length>1?n:n[0]):n[0]}:null,E=class{constructor(e){this._el=e,this.gSVG=d}get[Symbol.toStringTag](){return w}get el(){return this._el}attachTo(e){return(h(e)?D(e)?e._el:e:document.querySelector(e)).appendChild(this._el),this._el.dispatchEvent(new Event(G)),this}id(e){return e?(this._el.setAttribute("id",e),this):this._el.id||(this._el.id=nt())}ref(){return`#${this.id()}`}url(){return`url(${this.ref()})`}parents(){let e=[],i=this;for(;i=i.parentElement();)e.push(i);return e}top(){return this.parents().pop()||this}},A=t=>{if(!h(t)||T(t))return null;if(C.has(t))return C.get(t);let e=new Proxy(new E(t),{get(i,n){if(et(n))return i[n];if(!x(i[n]))return(...o)=>(f(e,n,o),i[n].call(e,...o));if([O,P,"$"+O,"$"+P].includes(n)){let o="";n[0]==="$"&&(n=n.substring(1));let u=n===O?st:ct,a=new Proxy(l=>(f(e,n,[l]),x(l)?t.getAttribute(n):(l?t.setAttribute(n,l):t.removeAttribute(n),e)),{get(l,N){return N in l?Reflect.get(l,N):(...Y)=>{if(N===Symbol.toPrimitive){let z=o;return o="",z}return o+=u(e,N,Y),t?.setAttribute(n,o),a}}});return a}let r=it(n),c=ot(r)||t[r];return b(c)?(...o)=>{f(e,n,o);let s=c.call(t,...o);return x(s)?e:U(s)}:k(t,r,e)}});return C.set(t,e),e},k=(t,e,i,n)=>{let r=e.replace(/_/g,"-"),c=(...o)=>{if(f(i,n?`${n}.${e}`:e,o),o.length===0){let u=t?.hasAttribute&&t.hasAttribute(r)?t.getAttribute(r):t[r];return U(u)}let s=o[0];if($(t,CSSStyleDeclaration))return t[r]=s,i;if(r in t&&!j.has(r)){let u=t[r];if(String(u)===String(s))return i;try{t[r]=s}catch{j.add(r)}if(h(t[r])&&t[r]===s||t[r]!==u||r===H)return i;j.add(r)}return s!==0&&!s?t?.removeAttribute&&t.removeAttribute(r):t?.setAttribute&&t.setAttribute(r,I(s)?"":String(o)),i};return new Proxy(c,{get(o,s){let u=t[r][s];return b(u)?(...a)=>(f(i,`${e}.${s}`,a),u.call(t[r],...a)||i):k(t[r],s,i,r)},set(o,s,u){return t[r][s]=u,!0}})},U=t=>$(t,HTMLCollection)||$(t,NodeList)?[...t].map(e=>A(e)):$(t,SVGElement)?A(t):_(t)?t===""||Number.isNaN(Number(t))?t:Number(t):t,V=[],f=(t,e,i,n=[])=>{for(let r of V)r(d,t,e,i,n)},g={},st=(t,e,i)=>(f(t,`d.${e}`,i,Object.keys(g).map(n=>`d.${n}`)),g[e]?g[e].apply(t,i):`${e}${i.join(p)}`),ct=(t,e,i)=>(f(t,`transform.${e}`,i),`${e}(${i.join(p)})`);function d(t){return f(null,L,[t]),S(x(t)?tt:t)}d.isWrapped=D;var y=t=>e=>b(e)?e(t):Object.assign(t,e),m={install:J,extendConstructor:y(d),extendInstance:y(E.prototype),extendPath:y(g),beforeEveryCall(t){b(t)&&V.push(t)}};m.extendSetup=y(m);function J(t){return t(m),d}d.install=J;var lt=d;export{lt as default,d as gSVG};