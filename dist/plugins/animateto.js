/* graphane - 0.1.0-alpha.4 */ var U="function";var B="object",H="string";var T=r=>typeof r===B,d=r=>typeof r===H,h=r=>typeof r===U;var m=r=>Array.isArray(r);var j="SVG",$="animate",P="none",V="freeze",Y="path",w="d",Z="transform",D="rotate",g="translate",q="offset",_="inherit",I="finished",Q=[D,"skewX","skewY"],X="deg",f="px",L="ms",K=["width","height"],x=!1;if(window.matchMedia){let r=window.matchMedia("(prefers-reduced-motion: reduce)");x=r.matches,r.addEventListener("change",()=>{x=r.matches})}var W=r=>r.replace(/([A-Z])/g,"-$1").toLowerCase();function v(r,b={duration:200},N=null,S=null){let M=this.gSVG,R=t=>{let e=T(t)?Object.assign({},t):{duration:t};return x&&(e.duration=0),e.fill=P,e},k=t=>{t=m(t)?t:[t];let e=window.getComputedStyle(this._el),n=[],i=new Set;for(let c of t){let s=Object.assign({},c);for(let o in s)!(o in e)||K.includes(o)?i.add(o):o===w?s.d=`${Y}("${s.d}")`:o===Z&&(s.transform=F(s.transform));n.push(s)}return C(i,n),n},A=[],C=(t,e)=>{if(t.size){let n=new KeyframeEffect(null,e).getKeyframes(),i=this.closest(j)?this.closest(j).getCurrentTime()*1e3:0;for(let c of t){let s=M($).attributeName(c).dur(E.duration+L).begin((0|i+(b.delay||0))+L).fill(V);if(e.length===1)s.to(e[0][c]);else{let o=[],a=[];for(let p in n){let J=n[p];c in e[p]&&(o.push(J.computedOffset),a.push(e[p][c]))}o[0]!==0&&(o.unshift(0),a.unshift(this[c]()||_)),o[o.length-1]!==1&&(o.push(1),a.push(this[c]()||_)),s.keyTimes(o.join(";")).values(a.join(";"))}A.push(s),s.attachTo(this)}}},F=t=>{d(t)&&(t=JSON.parse("{"+t.replace(/\s*\(\s*/g,":[").replace(/\s*\)\s*/g,"],").split(/\s*,\s*|\s.*/).join(",").replace(/(\w+):/g,'"$1":').replace(/,$/,"")+"}"));let e="";for(let n in t)if(n===D){let i=y(t[n]);i.length>1&&(e+=`${g}(${i[1]}${f},${i[2]}${f}) `),e+=`${n}(${i[0]}${O(n)}) `,i.length>1&&(e+=`${g}(-${i[1]}${f},-${i[2]}${f}) `)}else e+=`${n}(${y(t[n]).map(i=>i+O(n)).join(",")}) `;return e},y=t=>m(t)?t:String(t).split(/\s+|,/),O=t=>Q.includes(t)?X:t===g?f:"",G=t=>d(t)?t.replace(/(deg)|(px)/g,"").trim():t,z=t=>t.replace(/(path\s*\(\s*["'])|(["']\s*\)\s*$)/g,"").trim().replace(/([a-zA-Z])\s*/g,"$1").replace(/\s+/g,","),E=R(b),l=k(r),u=this._el.animate(l,E);return u.ready.then(()=>h(N)&&N.call(this,u)),u.finished.then(()=>{let t=l[l.length-1];for(let e in t){let n=W(e);/^text-/.test(n)?this._el.style[e]=t[e]:e!==q&&e in t&&this._el.setAttribute(n,n===w?z(t[e]):G(t[e]))}A.forEach(e=>{e[I](!0);let n=this._el.querySelectorAll($),i=this._el.querySelectorAll(`${$}[${I}]`);n.length===i.length&&n.forEach(c=>c.remove())}),h(S)&&S.call(this,u)}),this}function nt(r){r.extendInstance({animateTo:v})}export{nt as svgPlugin}; //# sourceMappingURL=animateto.js.map