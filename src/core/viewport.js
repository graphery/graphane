import { CONTEXT, FIRE_EVENT } from "./base.js";
import { STRING, NUMBER }      from '../helpers/types.js';

const EVENT_IN  = 'enterViewport';
const EVENT_OUT = 'exitViewport';
const OBSERVER  = Symbol();
const options   = {
  "root"       : null,
  "rootMargin" : "0px",
  "threshold"  : Array(21).fill(0).map((x,y) => y * 0.05)
};

export function viewport (defineObject) {
  defineObject
    .attribute({name : 'viewport-once-class', type : STRING, value : ''})
    .attribute({name : 'viewport-class', type : STRING, value : ''})
    .attribute({name : 'viewport-ratio', type : NUMBER, value : 0, posUpdate : observer})
}

const add    = (classList, classes) => classes && classes.split(/\s+/).forEach(cl => classList.add(cl));
const remove = (classList, classes) => classes && classes.split(/\s+/).forEach(cl => classList.remove(cl));

function observer () {
  const ctx       = this [CONTEXT];
  const classList = this.classList;
  let intersected = false;
  if (this[OBSERVER]) {
    this[OBSERVER].disconnect();
  }
  this[OBSERVER] = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= ctx.viewportRatio) {
        if (!intersected) {
          add(classList, ctx.viewportOnceClass);
          add(classList, ctx.viewportClass);
          intersected = true;
          this[FIRE_EVENT](EVENT_IN);
        }
      } else {
        remove(classList, ctx.viewportClass);
        intersected = false;
        this[FIRE_EVENT](EVENT_OUT);
      }
    });
  }, options);
  this[OBSERVER].observe(this);
}


export default viewport;
