import { getProperty }           from "./objects.js";
import { isUndefined, isString } from "./types.js";

const DIRECT  = Symbol();
const INITIAL = Symbol();

function getValue (obj, prop) {
  if (prop === DIRECT) {
    return obj;
  }
  return getProperty(obj, prop);
}

export function Operations (data) {

  const cache = {}

  /**
   *
   * @param {String} name
   * @param {Number|Object|Symbol} init
   * @param {Function} op
   * @param {Function} [finish]
   * @returns {Function}
   */
  function operation (name, init, op, finish) {
    if (!cache[name]) {
      cache[name] = {};
    }
    return (arr = undefined, prop = DIRECT) => {
      if (isString(arr) || isUndefined(arr)) {
        prop = arr || DIRECT;
        if ((prop in cache[name])) {
          return cache[name][prop];
        }
      } else {
        data = arr;
      }
      let result = data.reduce((result, record) => {
        const value = getValue(record, prop);
        if (typeof value === 'undefined') {
          return result;
        }
        return result === INITIAL ? value : op(result, value);
      }, init);
      result     = typeof finish === 'function' ? finish(result) : result;
      if (data !== arr) {
        cache[name][prop] = result
      }
      return result;
    }
  }


  const min      = operation('min', INITIAL, (result, value) => value > result ? result : value);
  const max      = operation('max', INITIAL, (result, value) => value < result ? result : value);
  const count    = operation('count', 0, (result) => result + 1);
  const sum      = operation('sum', 0, (result, value) => value + result);
  const avg      = operation('avg', {n : 0, i : 0}, (result, value) => {
    result.n++;
    result.i += Number(value);
    return result;
  }, (result) => result.i / result.n);
  const distinct = operation('distinct', new Set(), (result, value) => {
    result.add(value);
    return result;
  }, (result) => [...result]);

  return {
    min,
    max,
    sum,
    count,
    avg,
    distinct,
  }
}
