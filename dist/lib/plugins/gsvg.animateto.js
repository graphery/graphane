/* graphane - 0.1.0-alpha.3 */ (()=>{var U="function";var B="object",H="string";var j=r=>typeof r===B,d=r=>typeof r===H,m=r=>typeof r===U;var h=r=>Array.isArray(r);var w="SVG",g="animate",P="none",Y="freeze",Z="path",_="d",q="transform",M="rotate",$="translate",Q="offset",I="inherit",L="finished",X=[M,"skewX","skewY"],K="deg",f="px",D="ms",W=["width","height"],x=!1;if(window.matchMedia){let r=window.matchMedia("(prefers-reduced-motion: reduce)");x=r.matches,r.addEventListener("change",()=>{x=r.matches})}var v=r=>r.replace(/([A-Z])/g,"-$1").toLowerCase();function tt(r,N={duration:200},S=null,A=null){let R=this.gSVG,k=t=>{let e=j(t)?Object.assign({},t):{duration:t};return x&&(e.duration=0),e.fill=P,e},C=t=>{t=h(t)?t:[t];let e=window.getComputedStyle(this._el),n=[],i=new Set;for(let c of t){let s=Object.assign({},c);for(let o in s)!(o in e)||W.includes(o)?i.add(o):o===_?s.d=`${Z}("${s.d}")`:o===q&&(s.transform=G(s.transform));n.push(s)}return F(i,n),n},y=[],F=(t,e)=>{if(t.size){let n=new KeyframeEffect(null,e).getKeyframes(),i=this.closest(w)?this.closest(w).getCurrentTime()*1e3:0;for(let c of t){let s=R(g).attributeName(c).dur(T.duration+D).begin((0|i+(N.delay||0))+D).fill(Y);if(e.length===1)s.to(e[0][c]);else{let o=[],a=[];for(let p in n){let J=n[p];c in e[p]&&(o.push(J.computedOffset),a.push(e[p][c]))}o[0]!==0&&(o.unshift(0),a.unshift(this[c]()||I)),o[o.length-1]!==1&&(o.push(1),a.push(this[c]()||I)),s.keyTimes(o.join(";")).values(a.join(";"))}y.push(s),s.attachTo(this)}}},G=t=>{d(t)&&(t=JSON.parse("{"+t.replace(/\s*\(\s*/g,":[").replace(/\s*\)\s*/g,"],").split(/\s*,\s*|\s.*/).join(",").replace(/(\w+):/g,'"$1":').replace(/,$/,"")+"}"));let e="";for(let n in t)if(n===M){let i=O(t[n]);i.length>1&&(e+=`${$}(${i[1]}${f},${i[2]}${f}) `),e+=`${n}(${i[0]}${E(n)}) `,i.length>1&&(e+=`${$}(-${i[1]}${f},-${i[2]}${f}) `)}else e+=`${n}(${O(t[n]).map(i=>i+E(n)).join(",")}) `;return e},O=t=>h(t)?t:String(t).split(/\s+|,/),E=t=>X.includes(t)?K:t===$?f:"",V=t=>d(t)?t.replace(/(deg)|(px)/g,"").trim():t,z=t=>t.replace(/(path\s*\(\s*["'])|(["']\s*\)\s*$)/g,"").trim().replace(/([a-zA-Z])\s*/g,"$1").replace(/\s+/g,","),T=k(N),l=C(r),u=this._el.animate(l,T);return u.ready.then(()=>m(S)&&S.call(this,u)),u.finished.then(()=>{let t=l[l.length-1];for(let e in t){let n=v(e);/^text-/.test(n)?this._el.style[e]=t[e]:e!==Q&&e in t&&this._el.setAttribute(n,n===_?z(t[e]):V(t[e]))}y.forEach(e=>{e[L](!0);let n=this._el.querySelectorAll(g),i=this._el.querySelectorAll(`${g}[${L}]`);n.length===i.length&&n.forEach(c=>c.remove())}),m(A)&&A.call(this,u)}),this}function b(r){r.extendInstance({animateTo:tt})}gSVG&&gSVG.install(b);})(); //# sourceMappingURL=gsvg.animateto.js.map