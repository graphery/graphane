import {
  isObject, isNull, isFunction, isDate, isString
} from './types.js';

/**
 * Observe an object in deep
 * @param {Object}  obj        - object to observe
 * @param {Function} callback  - function called when any is changed
 * @return {Object}
 */

const cache = new WeakSet();
let ignore  = false;

/**
 * Observe an object modifications
 * @param {Object}   object
 * @param {Function} callback
 * @returns {Object}
 */
export const objectObserver = (object, callback) => {
  if (!isObject(object) || isNull(object) || !isFunction(callback)) {
    return object;
  }
  return (function observe (obj) {
    if (cache.has(obj)) {
      return obj;
    }
    for (let prop in obj) {
      if (isObject(obj[prop]) && !isNull(obj[prop])) {
        obj[prop] = observe(obj[prop]);
      }
    }
    const result = new Proxy(obj, {
      get (target, prop) {
        let value = Reflect.get(obj, prop);
        if (isFunction(value) &&
            isDate(target) &&
            isString(prop) &&
            prop.substring(0, 3) === 'set' &&
            isFunction(callback)
        ) {
          value = function (...args) {
            const ret = Reflect.get(target, prop).apply(target, args);
            !ignore && callback(object);
            return ret;
          }
        }
        return isDate(target) ? value.bind(target) : value;
      },
      set (target, prop, value) {
        let ret;
        const same = target[prop] === value;
        if (isObject(value) && !isNull(value)) {
          ret = Reflect.set(target, prop, observe(value));
        } else {
          ret = Reflect.set(target, prop, value);
        }
        !ignore && !same && callback(object);
        return ret;
      },
      deleteProperty (target, prop) {
        let ret = Reflect.deleteProperty(target, prop);
        !ignore && callback(object);
        return ret;
      }
    });
    cache.add(result);
    return result;
  })(object);
};

objectObserver.stop  = () => ignore = true;
objectObserver.start = () => ignore = false;

export default objectObserver;