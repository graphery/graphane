/* graphane - 0.1.0-alpha.3 */ var c=new WeakMap;function h(s=()=>{}){let e=this,l=this.el.tagName.toLowerCase()==="svg"?this.el:this.closest("svg").el;if(c.has(l))return c.get(l).push(s);c.set(l,[s]);let t={},a=()=>{let r=l.getScreenCTM();if(r!==null&&(r.a!==t.a||r.b!==t.b||r.c!==t.c||r.d!==t.d||r.e!==t.e||r.f!==t.f)){let o=c.get(l);for(let g of o)g.call(e,r,t);let n=new CustomEvent("resize",{detail:{currentMatrix:r,prevMatrix:t}});e.el.dispatchEvent(n),t=r}window.requestAnimationFrame(a)};return a(),e}function d(s){s.extendInstance({resizeObserver:h})}var u=0,k=0,i=new Map,p=!1;function b(s,e=()=>{}){let l=this.el;typeof s=="string"&&(s=[s]);let t;i.has(l)?t=i.get(l):(t={computedStyles:getComputedStyle(l),styles:{},keys:[]},i.set(l,t));for(let a of s)t.styles[a]||(t.styles[a]={lastValue:t.computedStyles[a],callbacks:new Set},t.keys.push(a)),t.styles[a].callbacks.add(e);return f(),this}function f(s){if(!p||s-k<100){p=!0,u=window.requestAnimationFrame(f);return}if(!s)return;k=s;let e=null;for(let[l,t]of i.entries()){for(let a of t.keys){let r=t.computedStyles.getPropertyValue(a),o=t.styles[a].lastValue;if(r!==o){e||(e=new Map);for(let n of t.styles[a].callbacks)e.has(n)?e.get(n)[a]={current:r,last:o}:e.set(n,{[a]:{current:r,last:o}});t.styles[a].lastValue=r}}if(e){for(let[a,r]of e.entries())a.call(l,r);e=null}}u=window.requestAnimationFrame(f)}function y(s){s.extendInstance({styleObserver:b})}function v(){let s=this.closest("svg");switch(this.el.tagName.toLowerCase()){case"text":w(s,this);break;case"line":S(s,this);break;default:m(s,this)}return this}function m(s,e){let l=s.getScreenCTM()||{a:1,d:1},t=0;s.resizeObserver(a=>{let r=Math.max(a.a/l.a,a.d/l.d);e.stroke_width(t/r)}),s.styleObserver("stroke-width",a=>{let r=s.getScreenCTM();t=Number.parseFloat(a["stroke-width"].current);let o=Math.max(r.a/l.a,r.d/l.d);e.stroke_width(t/o)})}function w(s,e){let l=s.getScreenCTM()||{a:1,d:1};e.el._keepX=e.x(),e.el._keepY=e.y(),s.resizeObserver(t=>{e.transform(`scale( ${l.a/t.a}, ${l.d/t.d})`),e.x(e.el._keepX/(l.a/t.a)),e.y(e.el._keepY/(l.d/t.d))})}function S(s,e){let l=s.getScreenCTM()||{a:1,d:1};e.el._keepX1=e.x1(),e.el._keepX2=e.x2(),e.el._keepY1=e.y1(),e.el._keepY2=e.y2(),s.resizeObserver(t=>{e.transform(`scale( ${l.a/t.a}, ${l.d/t.d})`),e.x1(e.el._keepX1/(l.a/t.a)),e.x2(e.el._keepX2/(l.a/t.a)),e.y1(e.el._keepY1/(l.d/t.d)),e.y2(e.el._keepY2/(l.d/t.d))})}function z(s){s.install(d),s.install(y),s.extendInstance({keepAspect:v})}export{z as svgPlugin}; //# sourceMappingURL=gsvg.keep.aspect.js.map