/* graphane - 0.1.0-alpha.9 */ var s="_$tag",o="_$children",a=t=>({[s]:d(t),[o]:m(t),...u(t)}),g=(t,e)=>{b(t,e),f(t,e)},u=t=>t.getAttributeNames().reduce((e,n)=>(e[n]=t[n](),e),{}),i=t=>Object.keys(t).filter(e=>![s,o].includes(e)),b=(t,e)=>i(e).forEach(n=>t[n](e[n])),d=t=>t.tagName().toLowerCase(),m=t=>t.children().map(e=>a(e)),f=(t,e)=>(e[o]||[]).forEach(n=>{let c=t.append(n[s]);i(n).forEach(r=>c[r](n[r])),f(c,n)});function h(t){t.extendTemplate&&t.extendTemplate.defineDirective({name:"g-object",execute(e,{expression:n,evalExpression:c,data:r}){e.fromObject(c(n,r))}}),t.extendInstance({toObject(){return a(this)},fromObject(e){return g(this,e)}})}var O=h;export{O as default};