/* graphane - 1.0.0-beta.1 */ var l="intersection.enter",a="intersection.exit",i=Symbol(),u={root:null,rootMargin:"0px",threshold:Array(21).fill(0).map((t,e)=>e*.05)};function f(t){let e=!1;this[i]&&this[i].disconnect(),this[i]=new IntersectionObserver(s=>{s.forEach(n=>{n.isIntersecting&&n.intersectionRatio>=t?e||(e=!0,this.dispatchEvent(new CustomEvent(l,{bubbles:!0,cancelable:!0,composed:!0}))):(e=!1,this.dispatchEvent(new CustomEvent(a,{bubbles:!0,cancelable:!0,composed:!0})))})},u),this[i].observe(this._el||this)}var o=f;function d(t){t.extendInstance({intersection:o}),t.extendTemplate&&t.extendTemplate.defineDirective({name:"g-intersection",execute(e,{expression:s,evalExpression:n,data:r}){let c=n(s,r);e.intersection(c)}})}var m=d;export{m as default};