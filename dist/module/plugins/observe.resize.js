/* graphane - 1.0.1 [module:plugin.observe.resize] */ var a=new WeakSet;function s(n){if(a.has(n))return;let t=n.getScreenCTM(),i=()=>{let e=n.getScreenCTM();e!==null&&(e.a!==t.a||e.b!==t.b||e.c!==t.c||e.d!==t.d||e.e!==t.e||e.f!==t.f)&&(n.dispatchEvent(new CustomEvent("resize",{detail:{currentMatrix:e,prevMatrix:t}})),t=e),window.requestAnimationFrame(i)};a.add(n),i()}function c(n){n.extendInstance(t=>{t.addEventListener=function(i,e,r){i==="resize"&&this.el.tagName.toLowerCase()==="svg"&&s(this.el),this.el.addEventListener(i,e,r)}})}var o=c;export{o as default};