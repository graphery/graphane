import { getProperty }                                 from "./objects.js";
import { isUndefined, isString, isObject, isFunction } from "./types.js";

const DIRECT   = Symbol();
const INITIAL  = Symbol();
const define   = (obj, name, value) => Object.defineProperty(obj, name, {
  enumerable   : false,
  configurable : true,
  writable     : true,
  value
});
const getValue = (obj, prop) => prop === DIRECT ? obj : getProperty(obj, prop);

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
 * @param {Array|Object} [data={}]
 * @returns {object}
 */
export function operations (data = {}) {

  if (!isObject(data)) {
    return data;
  }

  const cache = {}

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
    define(
      data,
      name,
      (arr = undefined, prop = DIRECT) => {
        if (isString(arr) || isUndefined(arr)) {
          prop = arr || DIRECT;
          if ((prop in cache[name])) {
            return cache[name][prop];
          }
          arr = data;
        }
        let result = arr.reduce((result, record) => {
          const value = getValue(record, prop);
          if (isUndefined(value)) {
            return result;
          }
          return result === INITIAL ? value : op(result, value);
        }, isFunction(init) ? init() : init);
        result     = isFunction(finish) ? finish(result) : result;
        if (data !== arr) {
          cache[name][prop] = result
        }
        return result === init ? 0 : result;
      }
    );
    define(
      data,
      name + 'Before',
      (num, prop) => data[name](data.slice(0, num), prop)
    );
  }

  operation('$min', INITIAL, (result, value) => value > result ? result : value);
  operation('$max', INITIAL, (result, value) => value < result ? result : value);
  operation('$count', 0, (result) => result + 1);
  operation('$sum', 0, (result, value) => value + result);
  operation('$avg', () => ({n : 0, i : 0}), (result, value) => {
    result.n++;
    result.i += Number(value);
    return result;
  }, (result) => isNaN(result.i / result.n) ? 0 : (result.i / result.n));
  operation('$distinct', () => new Set(), (result, value) => {
    result.add(value);
    return result;
  }, (result) => [...result]);

  return data;
}
