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

/**
 * @typedef operators
 * @type {object}
 * @property {function} $filter
 * @property {function} $map
 * @property {function} $min
 * @property {function} $max
 * @property {function} $sum
 * @property {function} $count
 * @property {function} $avg
 * @property {function} $distinct
 */

/**
 *
 * @param {Object|Array} [data={}]
 * @returns {object}
 */
export function operations (data = {}) {

  const cache  = {}

  /**
   *
   * @param {String} name
   * @param {Number|Object|Symbol} init
   * @param {Function} op
   * @param {Function} [finish]
   */
  function operation (name, init, op, finish) {
    if ((name in data)) {
      return;
    }
    if (!cache[name]) {
      cache[name] = {};
    }
    Object.defineProperty(
      data,
      name,
      {
        enumerable   : false,
        configurable : true,
        writable     : true,
        value (arr = undefined, prop = DIRECT) {
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
    );
  }

  operation('$min', INITIAL, (result, value) => value > result ? result : value);
  operation('$max', INITIAL, (result, value) => value < result ? result : value);
  operation('$count', 0, (result) => result + 1);
  operation('$sum', 0, (result, value) => value + result);
  operation('$avg', {n : 0, i : 0}, (result, value) => {
    result.n++;
    result.i += Number(value);
    return result;
  }, (result) => result.i / result.n);
  operation('$distinct', new Set(), (result, value) => {
    result.add(value);
    return result;
  }, (result) => [...result]);

  return data;
}
