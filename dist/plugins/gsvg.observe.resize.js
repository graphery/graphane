/* graphane - 0.1.0-alpha.6 */ (()=>{var s=new WeakSet;function o(n){if(s.has(n))return;let t=n.getScreenCTM(),i=()=>{let e=n.getScreenCTM();e!==null&&(e.a!==t.a||e.b!==t.b||e.c!==t.c||e.d!==t.d||e.e!==t.e||e.f!==t.f)&&(n.dispatchEvent(new CustomEvent("resize",{detail:{currentMatrix:e,prevMatrix:t}})),t=e),window.requestAnimationFrame(i)};s.add(n),i()}function c(n){n.extendInstance(t=>{t.addEventListener=function(i,e,a){i==="resize"&&this.el.tagName.toLowerCase()==="svg"&&o(this.el),this.el.addEventListener(i,e,a)}})}var r=c;gSVG&&gSVG.install(r);customElements.whenDefined("g-composer").then(n=>{n.install(r)});})();