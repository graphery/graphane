/* graphane - 1.0.0-beta.2 */ (()=>{var r="_$tag",o="_$children",a=t=>({[r]:b(t),[o]:d(t),...f(t)}),m=(t,e)=>{u(t,e),l(t,e)},f=t=>t.getAttributeNames().reduce((e,n)=>(e[n]=t[n](),e),{}),g=t=>Object.keys(t).filter(e=>![r,o].includes(e)),u=(t,e)=>g(e).forEach(n=>t[n](e[n])),b=t=>t.tagName().toLowerCase(),d=t=>t.children().map(e=>a(e)),l=(t,e)=>(e[o]||[]).forEach(n=>{let s=t.append(n[r]);g(n).forEach(c=>s[c](n[c])),l(s,n)});function h(t){t.extendTemplate&&t.extendTemplate.defineDirective({name:"g-object",execute(e,{expression:n,evalExpression:s,data:c}){e.fromObject(s(n,c))}}),t.extendInstance({toObject(){return a(this)},fromObject(e){return m(this,e)}})}var i=h;globalThis.gSVG&&globalThis.gSVG.install(i);customElements.whenDefined("g-composer").then(t=>{t.install(i)});})();