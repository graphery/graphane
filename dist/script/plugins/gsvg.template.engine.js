/* graphane - 0.1.0-alpha.6 */ var ft="function",ut="undefined",O="object",lt="string",H="array",j="number";var E=t=>typeof t===O,G=t=>typeof t===lt,T=t=>typeof t===ft,J=t=>typeof t===j&&!isNaN(t),K=t=>typeof t===ut;var b=t=>Array.isArray(t);var Z=t=>t.replace(/-([a-z0-9])/g,(e,r)=>r.toUpperCase());var P=new Map;var pt=async function(){}.constructor;function V(t,e,r=!1){let i=`${t.join(",")} ${e}`;if(P.has(i))return P.get(i);let f=new(r?pt:Function)(...t,e);return P.set(i,f),f}function U(t){try{return new Function(`let ${t} = 0`),!0}catch{return!1}}var X="SVG",B="animate",mt="none",ht="freeze",dt="path",q="d",v="transform",nt="rotate",W="translate",$t="offset",Q="inherit",tt="finished",xt=[nt,"skewX","skewY"],yt="deg",w="px",et="ms",gt=["width","height","x","y","cx","cy","r","rx","ry"],z=!1;if(window.matchMedia){let t=window.matchMedia("(prefers-reduced-motion: reduce)");z=t.matches,t.addEventListener("change",()=>{z=t.matches})}var Nt=t=>t.replace(/([A-Z])/g,"-$1").toLowerCase();function Et(t,e={duration:200},r=null,i=null){let f=this.gSVG,c=n=>{let o=E(n)?{...n}:{duration:n};return z&&(o.duration=0),o.fill=mt,o},u=n=>{n=b(n)?n:[n];let o=window.getComputedStyle(this._el),s=[],l=new Set;for(let d of n){let m={};for(let x in d){let h=Z(x);m[h]=d[x],gt.includes(h)&&(m[h]=m[h]+"px"),h in o?h===q?m.d=`${dt}("${m.d}")`:h===v&&(m.transform=A(m.transform)):l.add(h)}s.push(m)}return p(l,s),s},a=[],p=(n,o)=>{if(n.size){let s=new KeyframeEffect(null,o).getKeyframes(),l=this.closest(X)?this.closest(X).getCurrentTime()*1e3:0;for(let d of n){let m=f(B).attributeName(d).dur(F.duration+et).begin((0|l+(e.delay||0))+et).fill(ht);if(o.length===1)m.to(o[0][d]);else{let x=[],h=[];for(let D in s){let at=s[D];d in o[D]&&(x.push(at.computedOffset),h.push(o[D][d]))}x[0]!==0&&(x.unshift(0),h.unshift(this[d]()||Q)),x[x.length-1]!==1&&(x.push(1),h.push(this[d]()||Q)),m.keyTimes(x.join(";")).values(h.join(";"))}a.push(m),m.attachTo(this)}}},A=n=>{G(n)&&(n=JSON.parse("{"+n.replace(/\s*\(\s*/g,":[").replace(/\s*\)\s*/g,"],").split(/\s*,\s*|\s.*/).join(",").replace(/(\w+):/g,'"$1":').replace(/,$/,"")+"}"));let o="";for(let s in n)if(s===nt){let l=$(n[s]);l.length>1&&(o+=`${W}(${l[1]}${w},${l[2]}${w}) `),o+=`${s}(${l[0]}${L(s)}) `,l.length>1&&(o+=`${W}(-${l[1]}${w},-${l[2]}${w}) `)}else o+=`${s}(${$(n[s]).map(l=>l+L(s)).join(",")}) `;return o},$=n=>b(n)?n:String(n).split(/\s+|,/),L=n=>xt.includes(n)?yt:n===W?w:"",_=n=>G(n)?n.replace(/(deg)|(px)/g,"").trim():n,C=n=>n.replace(/(path\s*\(\s*["'])|(["']\s*\)\s*$)/g,"").trim().replace(/([a-zA-Z])\s*/g,"$1").replace(/\s+/g,","),g=n=>{let o=/translate\((.*)px,(.*)px\) rotate\((.*)deg\) translate\((.*)px,(.*)px\)\s+/,s=o.exec(n);return s&&Number(s[1])===Number(s[4])*-1&&Number(s[2])===Number(s[5])*-1?n=n.replace(o,`rotate(${s[3]}, ${s[1]}, ${s[2]})`):n=_(n),n},F=c(e),I=u(t),N=this._el.animate(I,F);return N.ready.then(()=>T(r)&&r.call(this,N)),N.finished.then(()=>{let n=I[I.length-1];for(let o in n){let s=Nt(o);s.startsWith("text-")?this._el.style[o]=n[o]:o!==$t&&o in n&&this._el.setAttribute(s,s===q?C(n[o]):s===v?g(n[o]):_(n[o]))}a.forEach(o=>{o[tt](!0);let s=this._el.querySelectorAll(B),l=this._el.querySelectorAll(`${B}[${tt}]`);s.length===l.length&&s.forEach(d=>d.remove())}),T(i)&&i.call(this,N)}),this}function rt(t){t.extendInstance({animateTo:Et})}var it=Symbol(),ot=Symbol(),y=Symbol(),k=Symbol(),M=Symbol(),bt="unknown",st="Graphane SVG Template Engine:",Y=[];S({name:"g-content",execute(t,{expression:e,data:r,evalExpression:i}){t.content(i(e,r))}});S({name:"g-if",execute(t,{expression:e,data:r,evalExpression:i}){t.style.visibility(i(e,r)?"inherit":"hidden")}});S({name:"g-bind",alias:":",argument:!0,execute(t,{expression:e,argument:r,data:i,evalExpression:f}){let c={...i,$$:["d","transform"].includes(r)?t["$"+r]:()=>t[r]()};c.$$.dynamic=(a,p=200,A=0)=>{t.animateTo((b(a)?a:[a]).map($=>E($)&&"offset"in $?{[r]:$.value,offset:$.offset}:{[r]:$}),{duration:p,delay:A})};let u=f(e,c);if(r==="class"){if(b(u)){t.classList.add(...u.filter(a=>!!a));return}if(E(u)){Object.entries(u).forEach(([a,p])=>{p?t.classList.add(a):t.classList.remove(a)});return}u&&t.classList.add(u);return}if(r==="style"){Object.entries(u).forEach(([a,p])=>t.style[a](p));return}K(u)||t[r](u)}});S({name:"g-on",alias:"@",argument:!0,execute(t,{expression:e,argument:r,data:i,evalExpression:f}){t[M]=t[M]||{};let c=t[M][r]=t[M][r]||new Map;c.has(e)&&t.removeEventListener(r,c.get(e));let u=function(a){let p=f(e,i,t);T(p)&&p.call(t,a)};t.addEventListener(r,u),c.set(e,u),r==="init"&&!t[it]&&(t[it]=!0,t.dispatchEvent(new Event("init")))}});S({name:"g-for",template:!0,execute(t,{expression:e,data:r}){t[y]=t[y]||[];let i=0;wt(e,r,f=>{if(t[y][i])R(t[y][i],f,!1);else{let c=t.gSVG("g");t.children().forEach(u=>{c.add(u.cloneNode(!0))}),R(c,f),t.before(c.el),c[ot]=!0,t[y].push(c)}i++},f=>{for(;t[y].length>f.length;)t[y].pop().remove()})}});function S({name:t,alias:e,argument:r,template:i,execute:f}){let c=`^(${t}${r?":":""}${e?`|${e})`:")"}${r?"(.*)$":"$"}`,u=new RegExp(c,"i");Y.push({name:t,alias:e,argument:r,template:i,execute:f,check:u})}function St(t){for(let e of Y){let r=e.check.exec(t);if(r){let i=r[2];return{...e,argument:i}}}}function At(t){return t.replace(/[{}()[\]]/g,"").split(",").map(e=>e.includes(":")?e.split(":")[1]:e).map(e=>e.trim())}function Tt(t){return t[Symbol.iterator]?{iterator:[...t],type:H}:J(t)?{iterator:Array(t<0?0:0|t).fill(0).map((e,r)=>r),type:j}:E(t)?{iterator:Object.entries(t).map(e=>e.reverse()),type:O}:{iterator:t,type:bt}}function ct(t,e,r=null){try{let i=Object.keys(e).filter(U);return V(i,`return ( ${t} ); `).apply(r,i.map(c=>e[c]))}catch(i){console.warn(st,i.message,` `,t)}}function wt(t,e,r,i){let f="__$$iterator",c="__$$callback",u="__$$final";try{let[a,p]=t.split(" of ");a=a.trim(),p=p.trim();let A=ct(p,e)||[],{iterator:$,type:L}=Tt(A);L===O&&!a.startsWith("[")&&(a=`[${a.replace(/(^\()|(\)$)/g,"")}]`);let _=At(a),C=a.startsWith("(")?a:`(${a})`,g=Object.keys(e).filter(U),F=` ${f}.forEach(${C} => { ${c}({${g}${g.length?",":""}${_.join(",")}}); }); ${u}(${f}); `;return V([...g,f,c,u],F)(...g.map(N=>e[N]),$,r,i)}catch(a){console.warn(st,a)}}function R(t,e,r=!0){if(r&&t[ot])return;t[k]=t[k]||[];let i=t.attributes();for(let c of[...i]){let u=c.name,a=St(u);a&&(t[k].push({...a,expression:c.value}),t.removeAttribute(u))}let f=!1;for(let c of t[k])c.execute(t,{...c,data:e,evalExpression:ct}),f=c.template||f;if(!f)for(let c of t.children())R(c,e)}function Lt(t={}){R(this,t),this.dispatchEvent(new Event("render"))}function jt(t){t.install(rt),t.extendInstance({render:Lt}),t.extendSetup({extendTemplate:{defineDirective:S,obtainDirective(e){return Y.find(r=>r.name===e)}}})}export{jt as svgPlugin}; //# sourceMappingURL=gsvg.template.engine.js.map