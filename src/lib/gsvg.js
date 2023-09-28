import {
  FUNCTION, EMPTY_STRING, COMA,
  isSymbol, isObject, isString, isUndefined, isFunction, isBoolean, isNull
} from '../helpers/types.js';

const NAME         = 'gSVGObject';
const NS           = 'http://www.w3.org/2000/svg';
const SVG          = 'svg';
const PATH         = 'path';
const D            = 'd';
const cache        = new WeakMap();
const readonlyProp = new Set();


/**
 * Check if is direct access member
 * @param {string} prop
 * @returns {boolean}
 */
const directAccess = (prop) => prop[0] === '_' || isSymbol(prop) || ['el','gSVG'].includes(prop);

/**
 * Check the instance
 * @param {object} o
 * @param {object} p
 * @returns {boolean}
 */
const is = (o, p) => o instanceof p;

/**
 * Create a random id
 * @returns {string}
 */
const randomId = () => NAME + Math.random().toString(32).substring(2);

/**
 * Check if the element is wrapped or not
 * @param {*} el
 * @returns {boolean}
 */
const isWrapped = (el) => isObject(el) && !isNull(el) && el[Symbol.toStringTag] === NAME;

/**
 * Create a new element
 * @param tag
 * @returns {gSVGObject}
 */
const create = (tag) => wrapper(document.createElementNS(NS, tag));

/**
 * Create, wrap or return the wrapped object
 * @param {gSVGObject|object|string} tag
 * @returns {gSVGObject|object}
 */
const createWrap = (tag) =>
  isString(tag) ?
    create(tag) :
    isObject(tag) && tag !== null ?
      isWrapped(tag) ?
        tag :
        wrapper(tag) :
      tag;

/**
 * Return the original method name for an alias
 * @param {string} prop
 * @returns {string}
 */
const alias = (prop) => ({
  content  : 'innerHTML',
  source   : 'outerHTML',
  parent   : 'parentElement',
  next     : 'nextElementSibling',
  previous : 'previousElementSibling'
})[prop] || prop;


/**
 * @typedef {Object} gSVGObject
 */

/**
 * GSVGObject
 */
class GSVGObject {

  constructor (element) {
    this._el  = element;
    this.gSVG = gSVG;
  }

  get [Symbol.toStringTag] () {
    return NAME;
  }

  /**
   * el
   * @type {Object}
   */
  get el () {
    return this._el;
  }

  /**
   * @param {gSVGObject|Object|string} tag
   * @returns {gSVGObject}
   */
  add (tag) {
    let r = createWrap(tag);
    if (r) {
      this._el.appendChild(r._el);
    }
    return r;
  }

  /**
   * @param {gSVGObject|Object|string} tag
   * @returns {gSVGObject}
   */
  addBefore (tag) {
    let r = createWrap(tag);
    if (r) {
      this._el.insertBefore(r._el, this._el.firstChild || null);
    }
    return r;
  }

  /**
   * @param {string|Object} tag
   * @returns {gSVGObject}
   */
  attachTo (tag) {
    const r = isObject(tag) ?
      (isWrapped(tag) ?
          tag._el :
          tag
      ) :
      document.querySelector(tag);
    r.appendChild(this._el);
    return this;
  }

  /**
   * gSVGObject.id()
   * @param {string} [value]
   * @returns {string|gSVGObject}
   */
  id (value) {
    if (!value) {
      return this._el.id || (this._el.id = randomId());
    }
    this._el.setAttribute('id', value);
    return this;
  }

  /**
   * gSVGObject.ref()
   * @returns {string}
   */
  ref () {
    return `#${ this.id() }`;
  }

  /**
   * gSVGObject.url()
   * @returns {string}
   */
  url () {
    return `url(${ this.ref() })`;
  }

}

/**
 *
 * @param element
 * @returns {gSVGObject}
 */
const wrapper = (element) => {
  if (!isObject(element) || isNull(element)) {
    return null;
  }
  if (cache.has(element)) {
    return cache.get(element);
  }
  const proxy = new Proxy(
    new GSVGObject(element),
    // Handler
    {
      get (wrapped, prop) {
        // Symbol return
        if (directAccess(prop)) {
          return wrapped[prop];
        }
        // Return the wrapper method
        if (!isUndefined(wrapped[prop])) {
          return (...args) => {
            preCall(proxy, prop, args);
            return wrapped[prop].call(proxy, ...args);
          }
        }
        // Special case <path d=""/>
        if (prop === D && element.tagName.toLowerCase() === PATH) {
          let content  = element.getAttribute(D) || '';
          const dProxy = new Proxy(
            (arg) => {
              preCall(proxy, prop, [arg])
              return isString(arg) ?
                element.setAttribute(D, arg) || proxy :
                element.getAttribute(D)
            },
            {
              get (_target, command) {
                return (...args) => {
                  content += pathD(proxy, command, args);
                  element?.setAttribute(prop, content);
                  return dProxy;
                };
              }
            }
          );
          return dProxy;
        }
        // Special case <path g-bind:d=""/>
        if (prop === '$d') {
          let content  = '';
          const dProxy = new Proxy(
						{},
            {
              get (_target, command) {
                return (...args) => {
                  if (command === Symbol.toPrimitive)  {
                    return content
                  }
                  const d = pathD(proxy, command, args);
                  content += d;
                  return dProxy;
                };
              }
            }
          );
          return dProxy;
        }
        prop = alias(prop);
        // Return the element method
        if (isFunction(element[prop])) {
          return (...args) => {
            preCall(proxy, prop, args);
            const result = element[prop].call(element, ...args);
            return (
              isUndefined(result) ?
                proxy :
                adaptedResult(result)
            );
          };
        }
        // Return the wrapped method
        return methodWrapper(element, prop, proxy);
      }
    }
  );
  cache.set(element, proxy);
  return proxy;
};

/**
 *
 * @param {Object} element
 * @param {string} prop
 * @param {Object} parentWrapper
 * @param {string} [parentProp]
 * @returns {Proxy<function()>}
 */
const methodWrapper = (element, prop, parentWrapper, parentProp) => {
  const propNormalized = prop.replace(/_/g, '-');
  const f              = (...args) => {
    preCall(parentWrapper, parentProp ? `${ parentProp }.${ prop }` : prop, args);
    // Get value
    if (args.length === 0) {
      const result = element?.hasAttribute && element.hasAttribute(propNormalized) ?
        element.getAttribute(propNormalized) :
        element[propNormalized];
      return adaptedResult(result);
    }
    // Set value as property
    const value = args[0];
    if (is(element, CSSStyleDeclaration)) {
      element[propNormalized] = value;
      return parentWrapper;
    }
    if (propNormalized in element && !readonlyProp.has(propNormalized)) {
      const previousValue = element[propNormalized];
      if (String(previousValue) === String(value)) {  // !!Check!!
        return parentWrapper;
      }
      try {
        element[propNormalized] = value;
      } catch (err) {
        readonlyProp.add(propNormalized);
      }
      if (
        (isObject(element[propNormalized]) && element[propNormalized] === value) ||
        element[propNormalized] !== previousValue
      ) {
        return parentWrapper;
      }
      readonlyProp.add(propNormalized);
    }
    // Set value as attribute
    if (value !== 0 && !value) {
      element?.removeAttribute && element.removeAttribute(propNormalized);
    } else {
      element?.setAttribute && element.setAttribute(propNormalized, isBoolean(value) ? '' : String(args));
    }
    return parentWrapper;
  };
  return new Proxy(
    f,
    {
      get (_target, prop2) {
        const result = element[propNormalized][prop2];
        return (
          isFunction(result) ?
            (...args) => {
              preCall(parentWrapper, `${ prop }.${ prop2 }`, args)
              return result.call(element[propNormalized], ...args) || parentWrapper;
            } :
            methodWrapper(element[propNormalized], prop2, parentWrapper, propNormalized)
        );
      },
      set (_target, prop2, value2) {
        element[propNormalized][prop2] = value2;
        return true;
      }
    }
  );
};

/**
 * adaptedResult
 * @param {*} result
 * @returns {*}
 */
const adaptedResult = (result) => {
  return (
    is(result, HTMLCollection) || is(result, NodeList) ?
      [...result].map(x => wrapper(x)) :
      is(result, SVGElement) ?
        wrapper(result) :
        isString(result) ?
          result === '' || Number.isNaN(Number(result)) ?
            result :
            Number(result) :
          result
  );
};

const registeredCalls = [];

/**
 * pluginCallback
 * @param {Object} wrapped
 * @param {string} prop
 * @param {Array} args
 * @param {Array} [extensions]
 */
const preCall = (wrapped, prop, args, extensions = []) => {
  for (let call of registeredCalls) {
    call(gSVG, wrapped, prop, args, extensions);
  }
};

const registeredPathD = {};

/**
 * pathD
 * @param {Object} wrapped
 * @param {string} prop
 * @param {Array} args
 */
const pathD = (wrapped, prop, args) => {
  preCall(wrapped, `d.${ prop }`, args, Object.keys(registeredPathD).map(k => `d.${ k }`));
  return registeredPathD[prop] ?
    registeredPathD[prop].apply(wrapped, args) :
    `${ prop }${ args.join(COMA) }`
}

/**
 * @typedef {function} gSVG
 */

/**
 * gSVG
 * @param {Object|gSVGObject|string} [el]
 * @returns {gSVGObject|Object|null}
 * @constructor
 */
export function gSVG (el) {
  preCall(null, EMPTY_STRING, [el]);
  return createWrap(isUndefined(el) ? SVG : el);
}

/**
 * gSVG.isWrapped()
 * @type {function({Object}) : boolean}
 */
gSVG.isWrapped = isWrapped;

/**
 * gSVG.extend
 * @param {Function} plugin
 * @return {gSVG}
 */
gSVG.extend = (plugin) => {
  console.warn('gSVG.extend() for old plugin is deprecated. ' +
               'Please, use gSVG.install() for new plugins.')
  plugin(gSVG, GSVGObject);
  return gSVG;
}

const setup = {
  install      : install,
  installAsync : installAsync,
  extendConstructor (extension) {
    Object.assign(gSVG, extension);
  },
  extendInstance (extension) {
    Object.assign(GSVGObject.prototype, extension);
  },
  extendPath (extension) {
    Object.assign(registeredPathD, extension);
  },
  extendSetup (extension) {
    Object.assign(setup, extension);
  },
  beforeEveryCall (callback) {
    if (typeof callback === FUNCTION) {
      registeredCalls.push(callback);
    }
  }
};

/**
 * gSVG.install - load new plugins
 * @param {Function|string} plugin
 * @return {gSVG|Promise}
 */
function install (plugin) {
  if (isString(plugin)) {
    return installAsync(plugin);
  }
  plugin(setup);
  return gSVG;
}

gSVG.install = install;

async function installAsync (source) {
  const plugin = (await import(source)).default;
  return install(plugin)
}

gSVG.installAsync = installAsync;

export default gSVG;
