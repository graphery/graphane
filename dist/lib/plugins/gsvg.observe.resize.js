/* graphane - 0.1.0-alpha.3 */ var r=new WeakMap;function v(n=()=>{}){let c=this,s=this.el.tagName.toLowerCase()==="svg"?this.el:this.closest("svg").el;if(r.has(s))return r.get(s).push(n);r.set(s,[n]);let t={},i=()=>{let e=s.getScreenCTM();if(e!==null&&(e.a!==t.a||e.b!==t.b||e.c!==t.c||e.d!==t.d||e.e!==t.e||e.f!==t.f)){let o=r.get(s);for(let l of o)l.call(c,e,t);let a=new CustomEvent("resize",{detail:{currentMatrix:e,prevMatrix:t}});c.el.dispatchEvent(a),t=e}window.requestAnimationFrame(i)};return i(),c}function u(n){n.extendInstance({resizeObserver:v})}export{u as svgPlugin}; //# sourceMappingURL=gsvg.observe.resize.js.map