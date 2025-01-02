import { isFunction } from "./types.js";

/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered.
 * The function will be called after it stops being called for N milliseconds.
 * Warning: does not work correctly for methods, use debounceMethod() in that case.
 * @param {Function} fn   - original function
 * @param {number}   wait - number of milliseconds before the call
 * @return {Function}
 */
export function debounce (fn, wait) {
  let n = 0;
  return function (...args) {
    clearTimeout(n);
    n = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

/**
 * Returns a promised function, that, as long as it continues to be invoked, will not be triggered.
 * The function will be called after it stops being called for N milliseconds.
 * Warning: does not work correctly for methods, use debounceMethodAsync() in that case.
 * @param {Function} fn   - original function
 * @param {number}   wait - number of milliseconds before the call
 * @return {Function}
 */
export function debounceAsync (fn, wait) {
  let timeout    = 0;
  const promises = [];
  return function (...args) {
    clearTimeout(timeout);
    return new Promise((resolve, reject) => {
      promises.push({resolve, reject});
      timeout = setTimeout(() => {
        try {
          const res = fn.apply(this, args);
          promises.forEach(p => p.resolve(res));
        } catch (err) {
          promises.forEach(p => p.reject(err));
        }
      }, wait);
    });
  };
}

/**
 * Returns a method, that, as long as it continues to be invoked, will not be triggered for
 * the same instance.
 * The method will be called after it stops being called for N milliseconds.
 * @param {function} fn   - original function
 * @param {number}   wait - number of milliseconds before the call
 * @return {function}
 */
export function debounceMethod (fn, wait) {
  const prev = new WeakMap();
  return function (...args) {
    clearTimeout(prev.get(this));
    prev.set(this, setTimeout(() => {
      fn.apply(this, args);
    }, wait));
  };
}

/**
 * Returns an async method, that, as long as it continues to be invoked, will not be triggered.
 * The method will be called after it stops being called for N milliseconds.
 * @param {Function} fn   - original function
 * @param {number}   wait - number of milliseconds before the call
 * @return {Function}
 */
export function debounceMethodAsync (fn, wait) {
  const instances = new WeakMap();
  const promises  = [];
  return function (...args) {
    clearTimeout(instances.get(this));
    return new Promise((resolve, reject) => {
      promises.push({resolve, reject});
      instances.set(this, setTimeout(() => {
        try {
          const res = fn.apply(this, args);
          promises.forEach(p => p.resolve(res));
        } catch (err) {
          promises.forEach(p => p.reject(err));
        } finally {
          promises.length = 0;
        }
      }, wait));
    })
  };
}

/**
 * Returns a method, that, as long as it continues to be invoked, will not be triggered.
 * The method will be called after it stops being called for N milliseconds.
 * @param {Function} fn   - original function
 * @param {number}   wait - number of milliseconds before the call
 * @return {Function}
 */
export function debounceMethodParameter (fn, wait) {
  const prev = new WeakMap();
  return function (...args) {
    if (prev.get(this)) {
      clearTimeout(prev.get(this)[args[0]]);
    } else {
      prev.set(this, {});
    }
    prev.get(this)[args[0]] = setTimeout(() => {
      delete prev.get(this)[args[0]];
      fn.apply(this, args);
    }, wait);
  };
}

/**
 * Returns a function, that, as long as it continues to be invoked if the precCondition function
 * don't return true with the same arguments.
 * @param {Function} condition - pre condition function
 * @param {Function} fn        - original function
 * @return {Function}
 */
export function preCondition (condition, fn) {
  return function (...args) {
    if (condition.apply(this, args)) {
      return fn.apply(this, args);
    }
  };
}

/**
 * Return a function that execute after the function is called.
 * @param {Function} fn  - original function
 * @param {Function} pos - function called after the original
 * @return {Function}
 */
export function posExecution (fn, pos) {
  return function (...args) {
    const result = fn.apply(this, args);
    if (isFunction(result.then)) {
      return result.then((res) => {
        return pos.call(this, res) || res
      });
    }
    return pos.call(this, result) || result;
  }
}