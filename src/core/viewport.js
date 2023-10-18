import { CONTEXT, FIRE_EVENT } from "./base.js";
import { STRING, NUMBER }      from '../helpers/types.js';

const EVENT_IN  = 'enterViewport';
const EVENT_OUT = 'exitViewport';
const OBSERVER  = Symbol();
const options   = {
  "root"       : null,
  "rootMargin" : "0px",
  "threshold"  : [0, 0.5, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1]
};

function viewport (defineObject) {
  defineObject
    .attribute({name : 'viewport-once-class', type : STRING, value : '', posUpdate : observer})
    .attribute({name : 'viewport-class', type : STRING, value : '', posUpdate : observer})
    .attribute({name : 'viewport-ratio', type : NUMBER, value : 0, posUpdate : observer})
}

function add (classList, classes) {
  if (classes) {
    classes.split(' ').forEach(cl => classList.add(cl));
  }
}

function remove (classList, classes) {
  if (classes) {
    classes.split(' ').forEach(cl => classList.remove(cl));
  }
}

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
      } else if (intersected) {
        remove(classList, ctx.viewportClass);
        intersected = false;
        this[FIRE_EVENT](EVENT_OUT);
      }
    });
  }, options);
  this[OBSERVER].observe(this);
}


export default viewport;