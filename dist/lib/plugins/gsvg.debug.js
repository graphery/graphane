/* graphane - 0.1.0-alpha.3 */ (()=>{var o="gSVG debug -",f={a:["animate","animateMotion","animateTransform","circle","clipPath","defs","desc","discard","ellipse","filter","foreignObject","g","image","line","linearGradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","style","svg","switch","symbol","text","title","use","view"],animate:["desc","metadata","title"],animateMotion:["desc","metadata","mpath","title"],animateTransform:["desc","metadata","title"],circle:["animate","animateMotion","animateTransform","desc","discard","metadata","mpath","set","title"],clipPath:["animate","animateMotion","animateTransform","circle","desc","discard","ellipse","line","metadata","mpath","path","polygon","polyline","rect","set","text","title","use"],defs:["a","animate","animateMotion","animateTransform","circle","clipPath","defs","desc","discard","ellipse","filter","foreignObject","g","image","line","linearGradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","style","svg","switch","symbol","text","title","use","view"],desc:[],discard:["desc","metadata","title"],ellipse:["animate","animateMotion","animateTransform","desc","discard","metadata","mpath","set","title"],feBlend:["animate","set"],feColorMatrix:["animate","set"],feComponentTransfer:["feFuncA","feFuncB","feFuncG","feFuncR"],feComposite:["animate","set"],feConvolveMatrix:["animate","set"],feDiffuseLighting:["desc","metadata","title"],feDisplacementMap:["animate","set"],feDistantLight:["animate","set"],feDropShadow:["animate","set"],feFlood:["animate","set"],feFuncA:["animate","set"],feFuncB:["animate","set"],feFuncG:["animate","set"],feFuncR:["animate","set"],feGaussianBlur:["animate","set"],feImage:["animate","animateTransform","set"],feMerge:["feMergeNode"],feMergeNode:["animate","set"],feMorphology:["animate","set"],feOffset:["animate","set"],fePointLight:["animate","set"],feSpecularLighting:["desc","metadata","title"],feSpotLight:["animate","set"],feTile:["animate","set"],feTurbulence:["animate","set"],filter:["animate","desc","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","feSpecularLighting","feTile","feTurbulence","metadata","set","title"],foreignObject:[],g:["a","animate","animateMotion","animateTransform","circle","clipPath","defs","desc","discard","ellipse","filter","foreignObject","g","image","line","linearGradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","style","svg","switch","symbol","text","title","use","view"],image:["animate","animateMotion","animateTransform","desc","discard","metadata","mpath","set","title"],line:["animate","animateMotion","animateTransform","desc","discard","metadata","mpath","set","title"],linearGradient:["animate","animateTransform","desc","metadata","set","stop","title"],marker:["a","animate","animateMotion","animateTransform","circle","clipPath","defs","desc","discard","ellipse","filter","foreignObject","g","image","line","linearGradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","style","svg","switch","symbol","text","title","use","view"],mask:["a","animate","animateMotion","animateTransform","circle","clipPath","defs","desc","discard","ellipse","filter","foreignObject","g","image","line","linearGradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","style","svg","switch","symbol","text","title","use","view"],metadata:[],mpath:["desc","metadata","title"],path:["animate","animateMotion","animateTransform","desc","discard","metadata","mpath","set","title"],pattern:["a","animate","animateMotion","animateTransform","circle","clipPath","defs","desc","discard","ellipse","filter","foreignObject","g","image","line","linearGradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","style","svg","switch","symbol","text","title","use","view"],polygon:["animate","animateMotion","animateTransform","desc","discard","metadata","mpath","set","title"],polyline:["animate","animateMotion","animateTransform","desc","discard","metadata","mpath","set","title"],radialGradient:["animate","animateTransform","desc","metadata","set","stop","title"],rect:["animate","animateMotion","animateTransform","desc","discard","metadata","mpath","set","title"],set:["desc","metadata","title"],stop:["animate","set"],style:[],svg:["a","animate","animateMotion","animateTransform","circle","clipPath","defs","desc","discard","ellipse","filter","foreignObject","g","image","line","linearGradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","style","svg","switch","symbol","text","title","use","view"],switch:["a","animate","animateMotion","animateTransform","circle","desc","discard","ellipse","foreignObject","g","image","line","metadata","mpath","path","polygon","polyline","rect","set","svg","switch","text","title","use"],symbol:["a","animate","animateMotion","animateTransform","circle","clipPath","defs","desc","discard","ellipse","filter","foreignObject","g","image","line","linearGradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","style","svg","switch","symbol","text","title","use","view"],text:["a","animate","animateMotion","animateTransform","desc","discard","metadata","mpath","set","text","textPath","title","tspan"],textPath:["a","animate","desc","metadata","set","title","tspan"],title:[],tspan:["a","animate","desc","metadata","set","title","tspan"],use:["animate","animateMotion","animateTransform","desc","discard","metadata","mpath","set","title"],view:["desc","metadata","title"]},M=["length","value","item","contains","add","remove","replace","supports","toggle","entries","forEach","keys","values"],T=["class"],E=["M","m","A","a","C","c","S","s","L","l","H","h","V","v","Q","q","T","t","Z","z"],p=0,b=1,m=2,g=t=>t.replace(/_([a-z0-9])/g,(e,a)=>a.toUpperCase()),h=(t,e)=>g(e)in t||g(e)in getComputedStyle(t),L=(t,e)=>f[t]&&f[t].includes(e),v=(t,e,a)=>{let i=t.el.tagName,n=Object.getPrototypeOf(t);return e.indexOf("style.")===0?h(t.el,e.substring(6)):e.indexOf("classList.")===0?O(i,e.substring(10)):e.indexOf("d.")===0?k(n,i,e.substring(2))||a.includes(e):n[e]||h(t.el,e)||T.includes(e)||a.includes(e)},O=(t,e)=>!!M.includes(e),k=(t,e,a)=>!!(E.includes(a)||t._d&&t._d[a]);function u(){try{throw new Error("myError")}catch(t){let e=t.stack.split(` `);return e.shift(),e.shift(),e.shift(),e.shift(),e.shift(),e.join(` `).trim()}}function y(t){return t.map(e=>JSON.stringify(e,w)).join(", ")}function w(t,e){return typeof e=="function"?`[function ${e.name}]`:typeof e=="object"&&Object.getPrototypeOf(e)!==Object.prototype?e.toString():e}var s=Symbol("svg.debug logger");function l(t){t.extendConstructor({debugLevel(e){this.DEBUG_LEVEL=e},debugLogger(e){this[s]=e},get DEBUG_NONE(){return p},get DEBUG_ERROR(){return b},get DEBUG_ALL(){return m},[s]:console}),t.beforeEveryCall((e,a,i,n,G=[])=>{if(e.DEBUG_LEVEL===p)return;let c=e[s].log||e[s].info||e[s].warn,d=e[s].error;if(a===null){e.DEBUG_LEVEL>=m&&c(`${o} call gSVG( ${y(n)} )`);return}let r=a.el.tagName;if(!v(a,i,G))return d(`${o} unknown method ${r}.${i}() ${u()}`);if(i==="add"&&!L(r,n[0]))return d(`${o} invalid element ${r}.${i}( '${n[0]}' ) ${u()}`);e.DEBUG_LEVEL>=m&&c(`${o} call ${r}.${i}( ${y(n)} )`)})}gSVG&&gSVG.install(l);})(); //# sourceMappingURL=gsvg.debug.js.map