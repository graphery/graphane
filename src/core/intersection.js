import { CONTEXT, FIRE_EVENT } from "./base.js";
import { STRING, NUMBER }      from '../helpers/types.js';
import intersection            from "../helpers/intersection.js";

const OBSERVER = Symbol();

export function intersectionCoreExtension (defineObject) {
  defineObject
    .attr({name : 'intersection-once-class', type : STRING, value : ''})
    .attr({name : 'intersection-class', type : STRING, value : ''})
    .attr({name : 'intersection-ratio', type : NUMBER, value : 0, posUpdate : observer})
}

const add    = (classList, classes) => classes && classes.split(/\s+/).forEach(cl => classList.add(cl));
const remove = (classList, classes) => classes && classes.split(/\s+/).forEach(cl => classList.remove(cl));
const resend = (el, event) => {
  event.preventDefault();
  const resend = () => {
    el.removeEventListener('render', resend);
    el[FIRE_EVENT](event.type, event.detail, event.composed);
  }
  el.addEventListener('render', resend)
}

function observer () {
  const ctx       = this[CONTEXT];
  if (this[OBSERVER]) {
    return intersection.call(this, ctx.intersectionRatio);
  }
  this[OBSERVER] = true;
  const classList = this.classList;
  this.addEventListener('intersection.enter', (event) => {
    add(classList, ctx.intersectionOnceClass);
    add(classList, ctx.intersectionClass);
    if (!this.rendered) {
      resend(this, event);
    }
  });
  this.addEventListener('intersection.exit', (event) => {
    remove(classList, ctx.intersectionClass);
    if (!this.rendered) {
      resend(this, event);
    }
  });
  intersection.call(this, ctx.intersectionRatio);
}


export default intersectionCoreExtension;
