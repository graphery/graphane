/* graphane - 0.1.0-alpha.6 */ var a="function";var p=e=>typeof e===a;var s={},l=async(e,t)=>{if(!s[t]){let r=await fetch(t);r.status===200&&(s[t]=await r.text())}return s[t]?(e.content(s[t]),e.querySelector("svg")):null},x=e=>{let t=[],r=new Proxy(function(){return t},{get(u,n){return n===Symbol.toPrimitive?()=>e:n==="then"?o=>o(r):(...o)=>(t.push({command:n,args:o}),r)}});return r};function $(e){e.extendTemplate&&e.extendTemplate.defineDirective({name:"g-load",execute(t,{expression:r,evalExpression:u,data:n}){let o={...n,$$:{svg(i){return x(i)}}},c=u(r,o);l(t,c).then(i=>{i&&p(c)&&c().forEach(f=>{i[f.command](f.args)}),t.dispatchEvent(new Event("load",{bubbles:!0}))})}})}export{$ as svgPlugin}; //# sourceMappingURL=gsvg.load.js.map