/* graphane - 0.1.0-alpha.6 */ var V="function";var Y="object",J="string";var j=r=>typeof r===Y,m=r=>typeof r===J,$=r=>typeof r===V;var g=r=>Array.isArray(r);var w=r=>r.replace(/-([a-z0-9])/g,(p,a)=>a.toUpperCase());var _="SVG",x="animate",W="none",Z="freeze",X="path",I="d",L="transform",R="rotate",b="translate",q="offset",C="inherit",D="finished",K=[R,"skewX","skewY"],Q="deg",u="px",M="ms",v=["width","height","x","y","cx","cy","r","rx","ry"],N=!1;if(window.matchMedia){let r=window.matchMedia("(prefers-reduced-motion: reduce)");N=r.matches,r.addEventListener("change",()=>{N=r.matches})}var tt=r=>r.replace(/([A-Z])/g,"-$1").toLowerCase();function et(r,p={duration:200},a=null,y=null){let k=this.gSVG,F=t=>{let e=j(t)?{...t}:{duration:t};return N&&(e.duration=0),e.fill=W,e},G=t=>{t=g(t)?t:[t];let e=window.getComputedStyle(this._el),n=[],i=new Set;for(let c of t){let o={};for(let f in c){let s=w(f);o[s]=c[f],v.includes(s)&&(o[s]=o[s]+"px"),s in e?s===I?o.d=`${X}("${o.d}")`:s===L&&(o.transform=P(o.transform)):i.add(s)}n.push(o)}return z(i,n),n},S=[],z=(t,e)=>{if(t.size){let n=new KeyframeEffect(null,e).getKeyframes(),i=this.closest(_)?this.closest(_).getCurrentTime()*1e3:0;for(let c of t){let o=k(x).attributeName(c).dur(T.duration+M).begin((0|i+(p.delay||0))+M).fill(Z);if(e.length===1)o.to(e[0][c]);else{let f=[],s=[];for(let h in n){let H=n[h];c in e[h]&&(f.push(H.computedOffset),s.push(e[h][c]))}f[0]!==0&&(f.unshift(0),s.unshift(this[c]()||C)),f[f.length-1]!==1&&(f.push(1),s.push(this[c]()||C)),o.keyTimes(f.join(";")).values(s.join(";"))}S.push(o),o.attachTo(this)}}},P=t=>{m(t)&&(t=JSON.parse("{"+t.replace(/\s*\(\s*/g,":[").replace(/\s*\)\s*/g,"],").split(/\s*,\s*|\s.*/).join(",").replace(/(\w+):/g,'"$1":').replace(/,$/,"")+"}"));let e="";for(let n in t)if(n===R){let i=A(t[n]);i.length>1&&(e+=`${b}(${i[1]}${u},${i[2]}${u}) `),e+=`${n}(${i[0]}${E(n)}) `,i.length>1&&(e+=`${b}(-${i[1]}${u},-${i[2]}${u}) `)}else e+=`${n}(${A(t[n]).map(i=>i+E(n)).join(",")}) `;return e},A=t=>g(t)?t:String(t).split(/\s+|,/),E=t=>K.includes(t)?Q:t===b?u:"",O=t=>m(t)?t.replace(/(deg)|(px)/g,"").trim():t,U=t=>t.replace(/(path\s*\(\s*["'])|(["']\s*\)\s*$)/g,"").trim().replace(/([a-zA-Z])\s*/g,"$1").replace(/\s+/g,","),B=t=>{let e=/translate\((.*)px,(.*)px\) rotate\((.*)deg\) translate\((.*)px,(.*)px\)\s+/,n=e.exec(t);return n&&Number(n[1])===Number(n[4])*-1&&Number(n[2])===Number(n[5])*-1?t=t.replace(e,`rotate(${n[3]}, ${n[1]}, ${n[2]})`):t=O(t),t},T=F(p),d=G(r),l=this._el.animate(d,T);return l.ready.then(()=>$(a)&&a.call(this,l)),l.finished.then(()=>{let t=d[d.length-1];for(let e in t){let n=tt(e);n.startsWith("text-")?this._el.style[e]=t[e]:e!==q&&e in t&&this._el.setAttribute(n,n===I?U(t[e]):n===L?B(t[e]):O(t[e]))}S.forEach(e=>{e[D](!0);let n=this._el.querySelectorAll(x),i=this._el.querySelectorAll(`${x}[${D}]`);n.length===i.length&&n.forEach(c=>c.remove())}),$(y)&&y.call(this,l)}),this}function it(r){r.extendInstance({animateTo:et})}export{it as svgPlugin}; //# sourceMappingURL=animateto.js.map