import {
  EMPTY_STRING, COMA,
  isSymbol, isObject, isString, isUndefined, isFunction, isBoolean, isNull, is
} from '../helpers/types.js';

const NAME                    = 'gSVGObject';
const NS                      = 'http://www.w3.org/2000/svg';
const SVG                     = 'svg';
const D                       = 'd';
const TRANSFORM               = 'transform';
const APPEND_CHILD            = 'appendChild';
const INSERT_BEFORE           = 'insertBefore';
const INSERT_ADJACENT_ELEMENT = 'insertAdjacentElement';
const ATTACH                  = 'attach';
const INNER_HTML              = 'innerHTML';

const cache        = new WeakMap();
const readonlyProp = new Set();


/**
 * Check if is direct access member
 * @param {string} prop
 * @returns {boolean}
 */
const directAccess = (prop) => isSymbol(prop) || prop.startsWith('_') || ['el', 'gSVG', 'then'].includes(prop);

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
  content   : INNER_HTML,
  source    : 'outerHTML',
  parent    : 'parentElement',
  next      : 'nextElementSibling',
  previous  : 'previousElementSibling',
  add       : APPEND_CHILD,
  addBefore : INSERT_BEFORE
})[prop] || prop;

/**
 * Return a wrapped method for append element operations
 * @param {string} method
 * @returns {function|null}
 */
const appendMethods = (method) => {
  return ['append', 'before', 'after',
          APPEND_CHILD, INSERT_BEFORE, INSERT_ADJACENT_ELEMENT].includes(method) ?
    function (...params) {
      const a = [];
      const b = [];
      const c = [];
      if (method === INSERT_ADJACENT_ELEMENT) {
        a.push(params[0]);
        b.push(createWrap(params[1]));
      } else if (method === INSERT_BEFORE) {
        b.push(createWrap(params[0]));
        c.push(params[1] || this.firstChild || null);
      } else {
        b.push(...params.map(createWrap))
      }
      if (!b.every(el => el?._el)) {
        return null;
      }
      this[method](...[...a, ...b.map(el => el._el), ...c]);
      b.forEach(el => el._el.dispatchEvent(new Event(ATTACH)));
      return b.length > 1 ? b : b[0];
    } :
    null;
}


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
    this._el.dispatchEvent(new Event(ATTACH));
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

  /**
   * gSVGObject.parents()
   * @returns {[{object}]}
   */
  parents () {
    const result = [];
    let el       = this;
    while (el = el.parentElement()) {
      result.push(el);
    }
    return result;
  }

  /**
   * gSVGObject.parents()
   * @returns {object}
   */
  top () {
    return this.parents().pop() || this;
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
        // Special cases 'd' and 'transform'
        if ([D, TRANSFORM, '$' + D, '$' + TRANSFORM].includes(prop)) {
          let content   = '';
          let directive = prop[0] === '$';
          if (directive) {
            prop = prop.substring(1);
          }
          const processor = prop === D ? pathD : elTransform;
          const dProxy    = new Proxy(
            (arg) => {
              preCall(proxy, prop, [arg]);
              if (isUndefined(arg)) {
                return element.getAttribute(prop);
              }
              arg ?
                element.setAttribute(prop, arg) :
                element.removeAttribute(prop);
              return proxy;
            },
            {
              get (_target, command) {
                if (command in _target) {
                  return Reflect.get(_target, command);
                }
                return (...args) => {
                  if (command === Symbol.toPrimitive) {
                    const ret = content;
                    content   = '';
                    return ret
                  }
                  content += processor(proxy, command, args);
                  element?.setAttribute(prop, content);
                  return dProxy;
                };
              }
            }
          );
          return dProxy;
        }
        // Return the element method
        const altProp = alias(prop);
        const fn      = appendMethods(altProp) || element[altProp];
        if (isFunction(fn)) {
          return (...args) => {
            preCall(proxy, prop, args);
            const result = fn.call(element, ...args);
            return (
              isUndefined(result) ?
                proxy :
                adaptedResult(result)
            );
          };
        }
        // Return the wrapped method
        return methodWrapper(element, altProp, proxy);
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
        element[propNormalized] !== previousValue ||
        propNormalized === INNER_HTML
      ) {
        return parentWrapper;
      }
      readonlyProp.add(propNormalized);
    }
    // Set value as attribute
    if (value !== 0 && !value) {
      element?.removeAttribute && element.removeAttribute(propNormalized);
    } else {
      element?.setAttribute && element.setAttribute(propNormalized, isBoolean(value) ?
        '' :
        String(args));
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
          result === '' || isNaN(result) ?
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
 * elTransform
 * @param {Object} wrapped
 * @param {string} prop
 * @param {Array} args
 */
const elTransform = (wrapped, prop, args) => {
  preCall(wrapped, `transform.${ prop }`, args);
  return `${ prop }(${ args.join(COMA) })`
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

const Extensor = (obj) => (extension) => isFunction(extension) ?
  extension(obj) :
  Object.assign(obj, extension);

const setup       = {
  install,
  extendConstructor : Extensor(gSVG),
  extendInstance    : Extensor(GSVGObject.prototype),
  extendPath        : Extensor(registeredPathD),
  beforeEveryCall (callback) {
    if (isFunction(callback)) {
      registeredCalls.push(callback);
    }
  }
};
setup.extendSetup = Extensor(setup);

/**
 * gSVG.install - load new plugins
 * @param {Function} plugin
 * @return {gSVG|Promise}
 */
function install (plugin) {
  plugin(setup);
  return gSVG;
}

gSVG.install = install;

export default gSVG;
