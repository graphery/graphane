/* graphane - 0.1.0-alpha.7 */ (()=>{var B="function";var H="object",V="string";var T=r=>typeof r===H,g=r=>typeof r===V,x=r=>typeof r===B;var $=r=>Array.isArray(r);var w=r=>r.replace(/-([a-z0-9])/g,(a,p)=>p.toUpperCase());var b="animate",J="path",j="d",_="transform",L="rotate",l="translate",I="inherit",D="finished",P=[L,"skewX","skewY"],W=[l,"width","height","x","y","cx","cy","r","rx","ry","dx","dy"],Y=(r,a)=>["text","tspan"].includes(r)&&["x","y"].includes(a),N=!1;if(window.matchMedia){let r=window.matchMedia("(prefers-reduced-motion: reduce)");N=r.matches,r.addEventListener("change",()=>{N=r.matches})}var Z=r=>r.replace(/([A-Z])/g,"-$1").toLowerCase();function q(r,a={duration:200},p=null,A=null){let k=this.gSVG,C=t=>{let e=T(t)?{...t}:{duration:t};return N&&(e.duration=0),e.fill="none",e},M=t=>{t=$(t)?t:[t];let e=window.getComputedStyle(this._el),n=[],i=new Set;for(let c of t){let o={};for(let u in c){let s=w(u);o[s]=f(c[u],s),!(s in e)||Y(this.tagName(),s)?i.add(s):s===j?o.d=`${J}("${o.d}")`:s===_&&(o.transform=G(o.transform))}n.push(o)}return R(i,n),n},S=[],R=(t,e)=>{if(t.size){let n=new KeyframeEffect(null,e).getKeyframes();for(let i of t){let c=k(b).attributeName(i).dur(h.duration+"ms").fill("freeze");if(e.length===1)c.to(e[0][i]);else{let o=[],u=[];for(let s in n){let U=n[s];i in e[s]&&(o.push(U.computedOffset),u.push(e[s][i]))}o[0]!==0&&(o.unshift(0),u.unshift(this[i]()||I)),o[o.length-1]!==1&&(o.push(1),u.push(this[i]()||I)),c.keyTimes(o.join(";")).values(u.join(";"))}S.push(c),c.attachTo(this),c.beginElementAt(h.delay||0)}}},G=t=>{g(t)&&(t=JSON.parse("{"+t.replace(/\s*\(\s*/g,":[").replace(/\s*\)\s*/g,"],").split(/\s*,\s*|\s.*/).join(",").replace(/(\w+):/g,'"$1":').replace(/,$/,"")+"}"));let e="";for(let n in t)if(n===L){let i=O(t[n]);i.length>1&&(e+=`${l}(${f(i[1],l)},${f(i[2],l)}) `),e+=`${n}(${f(i[0],n)}) `,i.length>1&&(e+=`${l}(-${f(i[1],l)},-${f(i[2],l)}) `)}else e+=`${n}(${O(t[n]).map(i=>f(i,n)).join(",")}) `;return e},O=t=>$(t)?t:String(t).split(/\s+|,/),f=(t,e)=>P.includes(e)?t+"deg":W.includes(e)?t+"px":t,E=t=>g(t)?t.replace(/(deg)|(px)/g,"").trim():t,z=t=>t.replace(/(path\s*\(\s*["'])|(["']\s*\)\s*$)/g,"").trim().replace(/([a-zA-Z])\s*/g,"$1").replace(/\s+/g,","),F=t=>{let e=/translate\((.*)px,(.*)px\) rotate\((.*)deg\) translate\((.*)px,(.*)px\)\s+/,n=e.exec(t);return n&&Number(n[1])===Number(n[4])*-1&&Number(n[2])===Number(n[5])*-1?t=t.replace(e,`rotate(${n[3]}, ${n[1]}, ${n[2]})`):t=E(t),t},h=C(a),m=M(r),d=this._el.animate(m,h);return d.ready.then(()=>x(p)&&p.call(this,d)),d.finished.then(()=>{let t=m[m.length-1];for(let e in t){let n=Z(e);n.startsWith("text-")?this._el.style[e]=t[e]:e!=="offset"&&e in t&&this._el.setAttribute(n,n===j?z(t[e]):n===_?F(t[e]):E(t[e]))}S.forEach(e=>{e[D](!0);let n=this._el.querySelectorAll(b),i=this._el.querySelectorAll(`${b}[${D}]`);n.length===i.length&&n.forEach(c=>c.remove())}),x(A)&&A.call(this,d)}),this}function K(r){r.extendInstance({animateTo:q})}var y=K;globalThis.gSVG&&globalThis.gSVG.install(y);customElements.whenDefined("g-composer").then(r=>{r.install(y)});})();