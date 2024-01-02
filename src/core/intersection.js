import { CONTEXT, FIRE_EVENT } from "./base.js";
import { STRING, NUMBER }      from '../helpers/types.js';
import intersection            from "../helpers/intersection.js";

export function intersectionCoreExtension (defineObject) {
  defineObject
    .attribute({name : 'intersection-once-class', type : STRING, value : ''})
    .attribute({name : 'intersection-class', type : STRING, value : ''})
    .attribute({name : 'intersection-ratio', type : NUMBER, value : 0, posUpdate : observer})
}

const add    = (classList, classes) => classes && classes.split(/\s+/).forEach(cl => classList.add(cl));
const remove = (classList, classes) => classes && classes.split(/\s+/).forEach(cl => classList.remove(cl));

function observer () {
  const ctx       = this[CONTEXT];
  const classList = this.classList;
  this.addEventListener('intersection.enter', () => {
    add(classList, ctx.intersectionOnceClass);
    add(classList, ctx.intersectionClass);
  });
  this.addEventListener('intersection.exit', () => {
    remove(classList, ctx.intersectionClass);
  });
  intersection.call(this, ctx.intersectionRatio);
}


export default intersectionCoreExtension;
