/* graphane - 0.1.0-alpha.6 */ var h=new WeakSet;function x(t){if(h.has(t))return;let e=t.getScreenCTM(),n=()=>{let s=t.getScreenCTM();s!==null&&(s.a!==e.a||s.b!==e.b||s.c!==e.c||s.d!==e.d||s.e!==e.e||s.f!==e.f)&&(t.dispatchEvent(new CustomEvent("resize",{detail:{currentMatrix:s,prevMatrix:e}})),e=s),window.requestAnimationFrame(n)};h.add(t),n()}function m(t){t.extendInstance(e=>{e.addEventListener=function(n,s,a){n==="resize"&&this.el.tagName.toLowerCase()==="svg"&&x(this.el),this.el.addEventListener(n,s,a)}})}var o=Symbol(),k=t=>t?.split(/\)\s*/).filter(e=>!!e).map(e=>e.split(/\s*\(/)).reduce((e,n)=>(e[n.shift()]=n.pop().split(/,/).map(s=>Number.isNaN(Number(s))?s:Number(s)),e),{})||{};function l(t="size"){let e=this.closest("svg");return e?e._el.getRootNode()===e._el?(e.addEventListener("attach",()=>{l.call(this,t)}),this):(this[o]&&e.removeEventListener("resize",this[o]),t==="stroke"&&S(e,this),t==="size"&&(z(e,this),e.addEventListener("resize",this[o])),this):(this.top().addEventListener("attach",()=>{l.call(this,t)}),this)}function z(t,e){let n=t.getScreenCTM()||{a:1,d:1},s=e.tagName().toLowerCase(),a=s==="text"?{x:e.x(),y:e.y()}:s==="circle"?{x:e.cx(),y:e.cy()}:e.getBBox(),i=k(e.transform());i.scale||(i.scale=[1,1]),i.translate||(i.translate=[0,0]),n.a=n.a*i.scale[0],n.d=n.d*i.scale[1],e[o]=v=>{let r=v.detail.currentMatrix,d=e.transform("").transform,f=n.a/r.a,u=n.d/r.d,g=a.x*(r.a/n.a)-a.x,p=a.y*(r.d/n.d)-a.y;Object.keys(i).filter(c=>!["scale","translate"].includes(c)).forEach(c=>d[c](...i[c])),(f!==1||u!==1)&&d.scale(f,u),(g!==0||p!==0)&&d.translate(g,p)}}function S(t,e){e.vector_effect("non-scaling-stroke")}function C(t){t.install(m),t.extendInstance({keepAspect(e){return console.warn(e==="stroke"?`".keepAspect('stroke')" is deprecated; use ".vector_effect('non-scaling-stroke')" instead.`:'".keepAspect()" is deprecated; use ".nonScalingSize()" instead.'),l.call(this,e)},nonScalingSize:l}),t.extendTemplate&&(t.extendTemplate.defineDirective({name:"g-keep-aspect",execute(e,{expression:n}){console.warn('"g-keep-aspect" directive is deprecated; use "g-non-scaling-size" instead.'),e.nonScalingSize(n)}}),t.extendTemplate.defineDirective({name:"g-non-scaling-size",execute(e){e.nonScalingSize("size")}}))}export{C as svgPlugin}; //# sourceMappingURL=non.scaling.size.js.map