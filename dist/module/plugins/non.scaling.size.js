/* graphane - 1.0.0-beta.6 */ var m=new WeakSet;function v(t){if(m.has(t))return;let e=t.getScreenCTM(),n=()=>{let s=t.getScreenCTM();s!==null&&(s.a!==e.a||s.b!==e.b||s.c!==e.c||s.d!==e.d||s.e!==e.e||s.f!==e.f)&&(t.dispatchEvent(new CustomEvent("resize",{detail:{currentMatrix:s,prevMatrix:e}})),e=s),window.requestAnimationFrame(n)};m.add(t),n()}function k(t){t.extendInstance(e=>{e.addEventListener=function(n,s,a){n==="resize"&&this.el.tagName.toLowerCase()==="svg"&&v(this.el),this.el.addEventListener(n,s,a)}})}var g=k;var l=Symbol(),z=t=>t?.split(/\)\s*/).filter(e=>!!e).map(e=>e.split(/\s*\(/)).reduce((e,n)=>(e[n.shift()]=n.pop().split(/,/).map(s=>isNaN(s)?s:Number(s)),e),{})||{};function c(t="size"){let e=this.closest("svg");return e?e._el.getRootNode()===e._el?(e.addEventListener("attach",()=>{c.call(this,t)}),this):(this[l]&&e.removeEventListener("resize",this[l]),t==="stroke"&&E(e,this),t==="size"&&(S(e,this),e.addEventListener("resize",this[l])),this):(this.top().addEventListener("attach",()=>{c.call(this,t)}),this)}function S(t,e){let n=t.getScreenCTM()||{a:1,d:1},s=e.tagName().toLowerCase(),a=s==="text"?{x:e.x(),y:e.y()}:s==="circle"?{x:e.cx(),y:e.cy()}:e.getBBox(),i=z(e.transform());i.scale||(i.scale=[1,1]),i.translate||(i.translate=[0,0]),n.a=n.a*i.scale[0],n.d=n.d*i.scale[1],e[l]=x=>{let r=x.detail.currentMatrix,d=e.transform("").transform,f=n.a/r.a,p=n.d/r.d,h=a.x*(r.a/n.a)-a.x,u=a.y*(r.d/n.d)-a.y;Object.keys(i).filter(o=>!["scale","translate"].includes(o)).forEach(o=>d[o](...i[o])),(f!==1||p!==1)&&d.scale(f,p),(h!==0||u!==0)&&d.translate(h,u)}}function E(t,e){e.vector_effect("non-scaling-stroke")}function C(t){t.install(g),t.extendInstance({keepAspect(e){return console.warn(e==="stroke"?`".keepAspect('stroke')" is deprecated; use ".vector_effect('non-scaling-stroke')" instead.`:'".keepAspect()" is deprecated; use ".nonScalingSize()" instead.'),c.call(this,e)},nonScalingSize:c}),t.extendTemplate&&(t.extendTemplate.defineDirective({name:"g-keep-aspect",exec(e,{expr:n}){console.warn('"g-keep-aspect" directive is deprecated; use "g-non-scaling-size" instead.'),e.nonScalingSize(n)}}),t.extendTemplate.defineDirective({name:"g-non-scaling-size",exec(e){c.call(e,"size")}}))}var T=C;export{T as default};