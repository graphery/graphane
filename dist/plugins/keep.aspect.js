/* graphane - 0.1.0-alpha.5 */ var o=new WeakMap;function g(t=()=>{}){let e=this,s=this.el.tagName.toLowerCase()==="svg"?this.el:this.closest("svg").el;if(o.has(s))return o.get(s).push(t);o.set(s,[t]);let n={},i=()=>{let a=s.getScreenCTM();if(a!==null&&(a.a!==n.a||a.b!==n.b||a.c!==n.c||a.d!==n.d||a.e!==n.e||a.f!==n.f)){let r=o.get(s);for(let l of r)l.call(e,a,n);let c=new CustomEvent("resize",{detail:{currentMatrix:a,prevMatrix:n}});e.el.dispatchEvent(c),n=a}window.requestAnimationFrame(i)};return i(),e}function f(t){t.extendInstance({resizeObserver:g})}function h(t="size"){let e=this.closest("svg");return e?e._el.getRootNode()===e._el?(e.addEventListener("attach",s=>{h.call(this,t)}),this):(t==="stroke"?x(e,this):v(e,this),this):(this.top().addEventListener("attach",s=>{h.call(this,t)}),this)}function v(t,e){let s=t.getScreenCTM()||{a:1,d:1},n=e.tagName().toLowerCase()==="text"?{x:e.x(),y:e.y()}:e.getBBox();t.resizeObserver(i=>{let a=e.transform("").transform,r=s.a/i.a,c=s.d/i.d,l=n.x*(i.a/s.a)-n.x,d=n.y*(i.d/s.d)-n.y;(r!==1||c!==1)&&a.scale(s.a/i.a,s.d/i.d),(d!==0||d!==0)&&a.translate(l,d)})}function x(t,e){let s=t.getScreenCTM()||{a:1,d:1};e.el._strokeWidth=parseFloat(getComputedStyle(e._el).strokeWidth),t.resizeObserver(n=>{e.style.strokeWidth(e.el._strokeWidth*Math.max(s.a/n.a,s.d/n.d))})}function k(t){t.install(f),t.extendInstance({keepAspect:h}),t.extendTemplate&&t.extendTemplate.defineDirective({name:"g-keep-aspect",execute(e,{expression:s}){e.keepAspect(s)}})}export{k as svgPlugin}; //# sourceMappingURL=keep.aspect.js.map