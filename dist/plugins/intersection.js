/* graphane - 1.0.0-beta.2 */ (()=>{var a="intersection.enter",f="intersection.exit",i=Symbol(),h={root:null,rootMargin:"0px",threshold:Array(21).fill(0).map((e,t)=>t*.05)};function u(e){let t=!1;this[i]&&this[i].disconnect(),this[i]=new IntersectionObserver(s=>{s.forEach(n=>{n.isIntersecting&&n.intersectionRatio>=e?t||(t=!0,this.dispatchEvent(new CustomEvent(a,{bubbles:!0,cancelable:!0,composed:!0}))):(t=!1,this.dispatchEvent(new CustomEvent(f,{bubbles:!0,cancelable:!0,composed:!0})))})},h),this[i].observe(this._el||this)}var r=u;function m(e){e.extendInstance({intersection:r}),e.extendTemplate&&e.extendTemplate.defineDirective({name:"g-intersection",execute(t,{expression:s,evalExpression:n,data:c}){let l=n(s,c);t.intersection(l)}})}var o=m;globalThis.gSVG&&globalThis.gSVG.install(o);customElements.whenDefined("g-composer").then(e=>{e.install(o)});})();