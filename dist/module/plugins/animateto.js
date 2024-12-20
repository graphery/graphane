/* graphane - 1.0.0-beta.8 */ var B="function";var G="object",H="string";var E=r=>typeof r===G,x=r=>typeof r===H,g=r=>typeof r===B;var $=r=>Array.isArray(r);var T=r=>r.replace(/-([a-z0-9])/g,(l,p)=>p.toUpperCase());var b="animate",J="path",j="d",w="transform",L="rotate",a="translate",_="inherit",I="finished",V=[L,"skewX","skewY"],W=[a,"width","height","x","y","cx","cy","r","rx","ry","dx","dy"],Y=(r,l)=>["text","tspan"].includes(r)&&["x","y"].includes(l),y=!1;if(window.matchMedia){let r=window.matchMedia("(prefers-reduced-motion: reduce)");y=r.matches,r.addEventListener("change",()=>{y=r.matches})}var P=r=>r.replace(/([A-Z])/g,"-$1").toLowerCase();function Z(r,l={duration:200},p=null,N=null){let k=this.gSVG,C=t=>{let e=E(t)?{...t}:{duration:t};return y&&(e.duration=0),e.fill="none",e},D=t=>{t=$(t)?t:[t];let e=window.getComputedStyle(this._el),n=[],i=new Set;for(let c of t){let o={};for(let u in c){let s=T(u);o[s]=f(c[u],s),!(s in e)||Y(this.tagName(),s)?i.add(s):s===j?o.d=`${J}("${o.d}")`:s===w&&(o.transform=R(o.transform))}n.push(o)}return M(i,n),n},A=[],M=(t,e)=>{if(t.size){let n=new KeyframeEffect(null,e).getKeyframes();for(let i of t){let c=k(b).attributeName(i).dur(h.duration+"ms").fill("freeze");if(e.length===1)c.to(e[0][i]);else{let o=[],u=[];for(let s in n){let U=n[s];i in e[s]&&(o.push(U.computedOffset),u.push(e[s][i]))}o[0]!==0&&(o.unshift(0),u.unshift(this[i]()||_)),o[o.length-1]!==1&&(o.push(1),u.push(this[i]()||_)),c.keyTimes(o.join(";")).values(u.join(";"))}A.push(c),c.attachTo(this),c.beginElementAt(h.delay||0)}}},R=t=>{x(t)&&(t=JSON.parse("{"+t.replace(/\s*\(\s*/g,":[").replace(/\s*\)\s*/g,"],").split(/\s*,\s*|\s.*/).join(",").replace(/(\w+):/g,'"$1":').replace(/,$/,"")+"}"));let e="";for(let n in t)if(n===L){let i=S(t[n]);i.length>1&&(e+=`${a}(${f(i[1],a)},${f(i[2],a)}) `),e+=`${n}(${f(i[0],n)}) `,i.length>1&&(e+=`${a}(-${f(i[1],a)},-${f(i[2],a)}) `)}else e+=`${n}(${S(t[n]).map(i=>f(i,n)).join(",")}) `;return e},S=t=>$(t)?t:String(t).split(/\s+|,/),f=(t,e)=>V.includes(e)?t+"deg":W.includes(e)?t+"px":t,O=t=>x(t)?t.replace(/(deg)|(px)/g,"").trim():t,z=t=>t.replace(/(path\s*\(\s*["'])|(["']\s*\)\s*$)/g,"").trim().replace(/([a-zA-Z])\s*/g,"$1").replace(/\s+/g,","),F=t=>{let e=/translate\((.*)px,(.*)px\) rotate\((.*)deg\) translate\((.*)px,(.*)px\)\s+/,n=e.exec(t);return n&&Number(n[1])===Number(n[4])*-1&&Number(n[2])===Number(n[5])*-1?t=t.replace(e,`rotate(${n[3]}, ${n[1]}, ${n[2]})`):t=O(t),t},h=C(l),m=D(r),d=this._el.animate(m,h);return d.ready.then(()=>g(p)&&p.call(this,d)),d.finished.then(()=>{let t=m[m.length-1];for(let e in t){let n=P(e);n.startsWith("text-")?this._el.style[e]=t[e]:e!=="offset"&&e in t&&this._el.setAttribute(n,n===j?z(t[e]):n===w?F(t[e]):O(t[e]))}A.forEach(e=>{e[I](!0);let n=this._el.querySelectorAll(b),i=this._el.querySelectorAll(`${b}[${I}]`);n.length===i.length&&n.forEach(c=>c.remove())}),g(N)&&N.call(this,d)}),this}function q(r){r.extendInstance({animateTo:Z})}var X=q;export{X as default};