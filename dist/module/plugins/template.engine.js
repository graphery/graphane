/* graphane - 0.1.0-alpha.8 */ var ot="function",st="undefined",I="object",ct="string",P="array",D="number";var A=t=>typeof t===I,j=t=>typeof t===ct,L=t=>typeof t===ot,H=t=>typeof t===D&&!isNaN(t),J=t=>typeof t===st;var S=t=>Array.isArray(t);var Y=t=>t.replace(/-([a-z0-9])/g,(e,r)=>r.toUpperCase());var U=new Map;var at=async function(){}.constructor;function V(t,e,r=!1){let o=`${t.join(",")} ${e}`;if(U.has(o))return U.get(o);let f=new(r?at:Function)(...t,e);return U.set(o,f),f}function B(t){try{return new Function(`let ${t} = 0`),!0}catch{return!1}}var G="animate",ft="path",K="d",Z="transform",X="rotate",N="translate",q="inherit",Q="finished",ut=[X,"skewX","skewY"],lt=[N,"width","height","x","y","cx","cy","r","rx","ry","dx","dy"],pt=(t,e)=>["text","tspan"].includes(t)&&["x","y"].includes(e),W=!1;if(window.matchMedia){let t=window.matchMedia("(prefers-reduced-motion: reduce)");W=t.matches,t.addEventListener("change",()=>{W=t.matches})}var mt=t=>t.replace(/([A-Z])/g,"-$1").toLowerCase();function dt(t,e={duration:200},r=null,o=null){let f=this.gSVG,c=n=>{let i=A(n)?{...n}:{duration:n};return W&&(i.duration=0),i.fill="none",i},u=n=>{n=S(n)?n:[n];let i=window.getComputedStyle(this._el),s=[],l=new Set;for(let $ of n){let m={};for(let y in $){let d=Y(y);m[d]=x($[y],d),!(d in i)||pt(this.tagName(),d)?l.add(d):d===K?m.d=`${ft}("${m.d}")`:d===Z&&(m.transform=T(m.transform))}s.push(m)}return p(l,s),s},a=[],p=(n,i)=>{if(n.size){let s=new KeyframeEffect(null,i).getKeyframes();for(let l of n){let $=f(G).attributeName(l).dur(_.duration+"ms").fill("freeze");if(i.length===1)$.to(i[0][l]);else{let m=[],y=[];for(let d in s){let it=s[d];l in i[d]&&(m.push(it.computedOffset),y.push(i[d][l]))}m[0]!==0&&(m.unshift(0),y.unshift(this[l]()||q)),m[m.length-1]!==1&&(m.push(1),y.push(this[l]()||q)),$.keyTimes(m.join(";")).values(y.join(";"))}a.push($),$.attachTo(this),$.beginElementAt(_.delay||0)}}},T=n=>{j(n)&&(n=JSON.parse("{"+n.replace(/\s*\(\s*/g,":[").replace(/\s*\)\s*/g,"],").split(/\s*,\s*|\s.*/).join(",").replace(/(\w+):/g,'"$1":').replace(/,$/,"")+"}"));let i="";for(let s in n)if(s===X){let l=h(n[s]);l.length>1&&(i+=`${N}(${x(l[1],N)},${x(l[2],N)}) `),i+=`${s}(${x(l[0],s)}) `,l.length>1&&(i+=`${N}(-${x(l[1],N)},-${x(l[2],N)}) `)}else i+=`${s}(${h(n[s]).map(l=>x(l,s)).join(",")}) `;return i},h=n=>S(n)?n:String(n).split(/\s+|,/),x=(n,i)=>ut.includes(i)?n+"deg":lt.includes(i)?n+"px":n,O=n=>j(n)?n.replace(/(deg)|(px)/g,"").trim():n,C=n=>n.replace(/(path\s*\(\s*["'])|(["']\s*\)\s*$)/g,"").trim().replace(/([a-zA-Z])\s*/g,"$1").replace(/\s+/g,","),E=n=>{let i=/translate\((.*)px,(.*)px\) rotate\((.*)deg\) translate\((.*)px,(.*)px\)\s+/,s=i.exec(n);return s&&Number(s[1])===Number(s[4])*-1&&Number(s[2])===Number(s[5])*-1?n=n.replace(i,`rotate(${s[3]}, ${s[1]}, ${s[2]})`):n=O(n),n},_=c(e),k=u(t),b=this._el.animate(k,_);return b.ready.then(()=>L(r)&&r.call(this,b)),b.finished.then(()=>{let n=k[k.length-1];for(let i in n){let s=mt(i);s.startsWith("text-")?this._el.style[i]=n[i]:i!=="offset"&&i in n&&this._el.setAttribute(s,s===K?C(n[i]):s===Z?E(n[i]):O(n[i]))}a.forEach(i=>{i[Q](!0);let s=this._el.querySelectorAll(G),l=this._el.querySelectorAll(`${G}[${Q}]`);s.length===l.length&&s.forEach($=>$.remove())}),L(o)&&o.call(this,b)}),this}function ht(t){t.extendInstance({animateTo:dt})}var v=ht;var tt=Symbol(),et=Symbol(),g=Symbol(),M=Symbol(),F=Symbol(),$t="unknown",nt="Graphane SVG Template Engine:",z=[];w({name:"g-content",execute(t,{expression:e,data:r,evalExpression:o}){t.content(o(e,r))}});w({name:"g-if",execute(t,{expression:e,data:r,evalExpression:o}){t.style.visibility(o(e,r)?"inherit":"hidden")}});w({name:"g-bind",alias:":",argument:!0,execute(t,{expression:e,argument:r,data:o,evalExpression:f}){let c={...o,$$:["d","transform"].includes(r)?t["$"+r]:()=>t[r]()};c.$$.dynamic=(a,p=200,T=0)=>{t.animateTo((S(a)?a:[a]).map(h=>A(h)&&"offset"in h?{[r]:h.value,offset:h.offset}:{[r]:h}),{duration:p,delay:T})};let u=f(e,c);if(r==="class"){if(S(u)){t.classList.add(...u.filter(a=>!!a));return}if(A(u)){Object.entries(u).forEach(([a,p])=>{p?t.classList.add(a):t.classList.remove(a)});return}u&&t.classList.add(u);return}if(r==="style"){Object.entries(u).forEach(([a,p])=>t.style[a](p));return}J(u)||t[r](u)}});w({name:"g-on",alias:"@",argument:!0,execute(t,{expression:e,argument:r,data:o,evalExpression:f}){t[F]=t[F]||{};let c=t[F][r]=t[F][r]||new Map;c.has(e)&&t.removeEventListener(r,c.get(e));let u=function(a){let p=f(e,o,t);L(p)&&p.call(t,a)};t.addEventListener(r,u),c.set(e,u),r==="init"&&!t[tt]&&(t[tt]=!0,t.dispatchEvent(new Event("init")))}});w({name:"g-for",template:!0,execute(t,{expression:e,data:r}){t[g]=t[g]||[];let o=0;gt(e,r,f=>{if(t[g][o])R(t[g][o],f,!1);else{let c=t.gSVG("g");t.children().forEach(u=>{c.add(u.cloneNode(!0))}),R(c,f),t.before(c.el),c[et]=!0,t[g].push(c)}o++},f=>{for(;t[g].length>f.length;)t[g].pop().remove()})}});function w({name:t,alias:e,argument:r,template:o,execute:f}){let c=`^(${t}${r?":":""}${e?`|${e})`:")"}${r?"(.*)$":"$"}`,u=new RegExp(c,"i");z.push({name:t,alias:e,argument:r,template:o,execute:f,check:u})}function xt(t){for(let e of z){let r=e.check.exec(t);if(r){let o=r[2];return{...e,argument:o}}}}function yt(t){return t.replace(/[{}()[\]]/g,"").split(",").map(e=>e.includes(":")?e.split(":")[1]:e).map(e=>e.trim())}function Nt(t){return t[Symbol.iterator]?{iterator:[...t],type:P}:H(t)?{iterator:Array(t<0?0:0|t).fill(0).map((e,r)=>r),type:D}:A(t)?{iterator:Object.entries(t).map(e=>e.reverse()),type:I}:{iterator:t,type:$t}}function rt(t,e,r=null){try{let o=Object.keys(e).filter(B);return V(o,`return ( ${t} ); `).apply(r,o.map(c=>e[c]))}catch(o){console.warn(nt,o.message,` `,t)}}function gt(t,e,r,o){let f="__$$iterator",c="__$$callback",u="__$$final";try{let[a,p]=t.split(" of ");a=a.trim(),p=p.trim();let T=rt(p,e)||[],{iterator:h,type:x}=Nt(T);x===I&&!a.startsWith("[")&&(a=`[${a.replace(/(^\()|(\)$)/g,"")}]`);let O=yt(a),C=a.startsWith("(")?a:`(${a})`,E=Object.keys(e).filter(B),_=` ${f}.forEach(${C} => { ${c}({${E}${E.length?",":""}${O.join(",")}}); }); ${u}(${f}); `;return V([...E,f,c,u],_)(...E.map(b=>e[b]),h,r,o)}catch(a){console.warn(nt,a)}}function R(t,e,r=!0){if(r&&t[et])return;t[M]=t[M]||[];let o=t.attributes();for(let c of[...o]){let u=c.name,a=xt(u);a&&(t[M].push({...a,expression:c.value}),t.removeAttribute(u))}let f=!1;for(let c of t[M])c.execute(t,{...c,data:e,evalExpression:rt}),f=c.template||f;if(!f)for(let c of t.children())R(c,e)}function Et(t={}){R(this,t),this.dispatchEvent(new Event("render"))}function bt(t){t.install(v),t.extendInstance({render:Et}),t.extendSetup({extendTemplate:{defineDirective:w,obtainDirective(e){return z.find(r=>r.name===e)}}})}var Mt=bt;export{Mt as default};