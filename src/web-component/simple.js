/**
 *
 * Simple class for Graphane web component
 *
 * @module simple
 * @version 0.0.2
 * @author Pablo Almunia
 *
 */
import {
  str2value, toCamel, isUndefined, isFunction, isObject, isString, isNull,
  NUMBER, BOOLEAN, OBJECT, ARRAY, EMPTY_STRING,
}                    from '../lib/types/index.js';
import objectObserve from '../lib/observify/object.js';
import {
  equal, clone
}                    from '../lib/object/index.js';

// Constants
const COMPONENT_PREFIX = globalThis.GRAPHANE_PREFIX || 'g-';

// private symbols
/**
 * Symbol used for defines a private context used with `this [ CONTEXT ]`.
 * @type {symbol}
 */
const INITIALIZERS = Symbol();

// Public symbols
/**
 * Symbol used for defines a private context used with `this [ CONTEXT ]`.
 * @type {symbol}
 */
const CONTEXT    = Symbol();
/**
 * Symbol used for defines the LOCAL DOM CHANGE event handler into the class
 * inherited from Simple. This method is called when the Local Dom component is
 * changed, includes its attributes.
 * @type {symbol}
 */
const CHANGE     = Symbol();
/**
 * Symbol used as method name for fire an event.
 * @type {symbol}
 */
const FIRE_EVENT = Symbol();
/**
 * Shortcut to Object.defineProperty
 * @type {(o: object, p: PropertyKey, attributes: (PropertyDescriptor))}
 */
const defProp    = Object.defineProperty;

/**
 * Update an attribute into the HTML
 * @param {HTMLElement} element
 * @param {string} attribute
 * @param {any} value
 * @param {boolean} [asBoolean=false]
 * @returns {undefined}
 */
function updateAttribute (element, attribute, value, asBoolean = false) {
  if (element.ready === false || !attribute) {
    return;
  }
  if (asBoolean) {
    if (value) {
      element.setAttribute(attribute, EMPTY_STRING);
    } else {
      element.removeAttribute(attribute);
    }
  } else {
    const valueNormalized = isNull(value) || isUndefined(value) ? EMPTY_STRING : value.toString();
    if (element.hasAttribute(attribute) && element.getAttribute(attribute) !== valueNormalized) {
      element.setAttribute(attribute, valueNormalized);
    }
  }
}

/**
 * Initialize context values
 */
function initValues (target) {
  this[CONTEXT] = {};
  let proto     = target;
  do {
    const init = initialValues.get(proto);
    for (let p in init) {
      // See: https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
      if (init.hasOwnProperty(p) && this.hasOwnProperty(p)) {
        const tmp = this[p];
        delete this[p];
        this[p] = isUndefined(tmp) ? clone(init[p]) : tmp;
      } else if (!(p in this[CONTEXT])) {
        this[CONTEXT][p] = clone(init[p]);
      }
    }
    proto = Object.getPrototypeOf(proto);
  } while (proto !== HTMLElement);
}

/**
 * Active the mutation observer
 */
function observeMutation () {
  new MutationObserver((mutations) => {
    for (let mutation of mutations) {
      if (!mutation.attributeName) {
        this[FIRE_EVENT]('update');
        break;
      }
    }
    if (
      (isUndefined(this.ready) || this.ready) &&
      isFunction(this[CHANGE])
    ) {
      this[CHANGE](mutations);
    }
  }).observe(this, {attributes : true, childList : true, subtree : true, characterData : true});
}


// Global initial values
const initialValues = new WeakMap();

/**
 * Simple class for Graphane Web Component
 *
 * @fires 'update'  - This event fires when the component is changed
 */
class Simple extends HTMLElement {

  constructor () {
    super();
    initValues.call(this, new.target);
    new.target[INITIALIZERS]?.forEach(fn => isFunction(fn) && fn.call(this, this));
    if (isFunction(this[CHANGE])) {
      observeMutation.call(this);
    }
  }

  /**
   * Fire an event
   * @private
   * @param {string} event             - event name
   * @param {Object} [detail={}]       - optional event detail object
   * @param {boolean} [composed=false] - optional event propagate across the shadow DOM boundary
   * @returns {boolean}                - return true
   */
  [FIRE_EVENT] (event, detail = {}, composed = false) {
    return this.dispatchEvent(new CustomEvent(
      event,
      {bubbles : true, cancelable : true, detail, composed}
    ));
  }

}

/**
 *
 * Attribute descriptor used into defineAttribute
 *
 * @typedef {Object} attributeDescriptor
 * @property {string} name                          - Attribute name.
 * @property {string} [propertyName]                - Property name associated with this attribute.
 *                                                    If it's omitted a default name is generated
 *                                                    with a camel case structure.
 * @property {string} [type]                        - Specific type (boolean, number, string,
 *                                                    object, array).
 * @property {*} [value]                            - Default value.
 * @property {Function} [get]                       - Get accessor method.
 * @property {Function} [set]                       - Set accessor method.
 * @property {(Function|string|symbol)} [preUpdate] - Callback or method reference to be called
 *                                                    previously to update.
 * @property {(Function|string|symbol)} [posUpdate] - Callback or method reference to be called
 *                                                    after update.
 * @property {string} [posUpdateEvent]              - Event name fired after the update.
 * @property {object} [schema={}]                   - Data Schema
 */

/**
 *
 * Define an attribute and its property into a class
 *
 * @param {Class} Class                    - class to extend
 * @param {attributeDescriptor} attribute - options into a {@link attributeDescriptor}
 */
function defineAttribute (Class, attribute) {

  // Property
  if (!attribute.propertyName) {
    attribute.propertyName = toCamel(attribute.name);
  }
  defineProperty(Class, {
    name           : attribute.propertyName,
    value          : attribute.value,
    get            : attribute.get,
    set            : attribute.set,
    attribute      : attribute.name,
    type           : attribute.type,
    preUpdate      : attribute.preUpdate,
    posUpdate      : attribute.posUpdate,
    posUpdateEvent : attribute.posUpdateEvent,
    schema         : attribute.schema
  });

  // Prototype
  const prototype = Object.getPrototypeOf(Class);

  // observedAttributes
  const OBSERVE_ATTRIBUTES         = 'observedAttributes';
  const descriptorObsAttr          = Object.getOwnPropertyDescriptor(
    Class,
    OBSERVE_ATTRIBUTES
  );
  // observedAttributes
  const descriptorObsAttrPrototype = Object.getOwnPropertyDescriptor(
    prototype,
    OBSERVE_ATTRIBUTES
  );
  let previousGet                  = descriptorObsAttr ? descriptorObsAttr.get : undefined;
  defProp(
    Class,
    OBSERVE_ATTRIBUTES,
    descriptorObservedAttributes(
      Class,
      attribute,
      prototype,
      previousGet,
      descriptorObsAttr,
      descriptorObsAttrPrototype
    )
  );

  // attributeChangedCallback
  const ATTRIBUTE_CHANGED_CALLBACK    = 'attributeChangedCallback';
  const descriptorAttrChgCbk          = Object.getOwnPropertyDescriptor(
    Class.prototype,
    ATTRIBUTE_CHANGED_CALLBACK
  );
  const descriptorAttrChgCbkPrototype = Object.getOwnPropertyDescriptor(
    prototype.prototype,
    ATTRIBUTE_CHANGED_CALLBACK
  );
  let previousFunction                = descriptorAttrChgCbk ?
    descriptorAttrChgCbk.value :
    undefined;
  defProp(
    Class.prototype,
    ATTRIBUTE_CHANGED_CALLBACK,
    defineAttributeDescriptor(attribute, previousFunction, descriptorAttrChgCbkPrototype)
  );

}

/**
 * Return the attribute descriptor
 * @param {Object} attribute
 * @param {Function} previousFunction
 * @param {Object} descriptorAttrChgCbkPrototype
 * @returns {Object}
 */
function defineAttributeDescriptor (attribute, previousFunction, descriptorAttrChgCbkPrototype) {
  return {
    /**
     * @this {Base}
     */
    value : function (name, oldValue, value) {
      if (attribute.name === name) {
        const propertyName = attribute.propertyName;
        if (this[propertyName] !== value) {
          if (attribute.type === BOOLEAN) {
            this[propertyName] = this.hasAttribute(attribute.name);
          } else {
            this[propertyName] = str2value(value, attribute.type);
          }
        }
      } else if (previousFunction) {
        previousFunction.apply(this, arguments);
      }
      if (descriptorAttrChgCbkPrototype?.value) {
        descriptorAttrChgCbkPrototype.value.apply(this, arguments);
      }
    }
    ,
    enumerable   : false,
    writable     : true,
    configurable : true
  };
}

/**
 * Return the observedAttribute descriptor
 * @param {Object} Class
 * @param {Object} attribute
 * @param {Object} prototype
 * @param {Function} previousGet
 * @param {Object} descriptorObsAttr
 * @param {Object} descriptorObsAttrPrototype
 * @returns {Object}
 */
function descriptorObservedAttributes (Class, attribute, prototype, previousGet, descriptorObsAttr, descriptorObsAttrPrototype) {
  const descriptor = {
    enumerable   : false,
    configurable : true
  };
  if (descriptorObsAttr) {
    if (descriptorObsAttrPrototype) {
      descriptor.get = function () {
        return [attribute.name,
                ...previousGet.call(Class),
                ...descriptorObsAttrPrototype.get.call(prototype)];
      };
    } else {
      descriptor.get = function () {
        return [attribute.name, ...previousGet.call(Class)];
      };
    }
  } else {
    if (descriptorObsAttrPrototype) {
      descriptor.get = function () {
        return [attribute.name, ...descriptorObsAttrPrototype.get.call(prototype)];
      };
    } else {
      descriptor.get = function () {
        return [attribute.name];
      };
    }
  }

  return descriptor;
}

/**
 *
 * Property descriptor used into defineProperty
 *
 * @typedef {Object} propertyDescriptor
 * @property {string}                   name              - Property name
 * @property {*}                        [value]           - Default value
 * @property {string}                   [attribute]       - Associated attribute name
 * @property {string}                   [type]            - Specific type (boolean, number, string,
 *                                                          function, object, array).
 * @property {(Function|string|symbol)} [preUpdate]       - Callback or method to call previously
 *                                                          to update
 * @property {(Function|string|symbol)} [posUpdate]       - Callback or method reference to call
 *                                                          after update
 * @property {string}                   [posUpdateEvent]  - Event name fired after update
 */

/**
 *
 * Define a property into the class
 *
 * @param {Function} Class              - class to extend
 * @param {propertyDescriptor} property - options into a {@link propertyDescriptor}
 */
function defineProperty (Class, property) {

  // Property
  defProp(
    Class.prototype,
    property.name,
    {
      set          : definePropertySet(property),
      get          : definePropertyGet(property),
      configurable : true,
      enumerable   : false
    }
  );

  // Value
  if (!initialValues.has(Class)) {
    initialValues.set(Class, {});
  }
  initialValues.get(Class)[property.name] = property.value;

}

/**
 * Pos processing function
 * @param {Object} property
 * @param {*} value
 */
function pos (property, value) {
  // Event emit
  if (!isNull(property.posUpdateEvent)) {
    if (property.posUpdateEvent) {
      this[FIRE_EVENT](property.posUpdateEvent, {[property.name] : value});
    } else {
      this[FIRE_EVENT]('update', {[property.name] : value});
    }
  }

  // pos update function
  if (isFunction(property.posUpdate)) {
    property.posUpdate.call(this, value);
  } else if (isFunction(this[property.posUpdate])) {
    this[property.posUpdate]();
  }

}

/**
 * Return the property set function
 * @param {Object} property
 * @returns {function}
 */
function definePropertySet (property) {
  return function (value) {
    let ctx = this[CONTEXT];

    // Pre
    if (isFunction(property.preUpdate)) {
      if (!property.preUpdate.call(this, value)) {
        return;
      }
    }

    // Schema normalization
    if (property.schema) {
      objectObserve.IGNORE = true;
      value                = property.schema.normalize(value);
      objectObserve.IGNORE = false;
    }

    // Is it change?
    if (!isObject(value) && equal(ctx[property.name], value)) {
      return;
    }

    // Custom update
    if (isFunction(property.set)) {
      property.set.call(this, value);
    } else {
      // String conversion updated
      if (isString(value) && property.type) {
        ctx[property.name] = str2value(value, property.type);
      } else {
        // Default updated
        ctx[property.name] = value;
      }
    }

    // Update attribute
    if (property.attribute && ![ARRAY, OBJECT].includes(property.type)) {
      updateAttribute(this, property.name, value, property.type === BOOLEAN);
    }

    // Pos update
    pos.call(this, property, value);

  };
}

/**
 * Return the property get function
 * @param {Object} property
 * @returns {function}
 */
function definePropertyGet (property) {
  return function () {
    if (isFunction(property.get)) {
      return property.get.call(this);
    } else {
      const ctx = this[CONTEXT];
      switch (property.type) {
        case NUMBER:
          return isUndefined(ctx[property.name]) ?
            undefined :
            Number(ctx[property.name]);
        case BOOLEAN:
          return !!ctx[property.name];
        case OBJECT:
        case ARRAY:
          return objectObserve(
            ctx[property.name] || (property.type === OBJECT ? {} : []),
            obj => definePropertySet(property).call(this, obj)
          );
        default:
          return ctx[property.name];
      }
    }
  };
}


/**
 *
 * Define a collection from a child custom tag. The collection has this structure:
 * ClassObj.<name>.<element_id> = {property: value, property: value, ...}
 *
 * @param {Function} Class              - class when the new property is created
 * @param {Object} options
 * @return {void}
 */
function defineCollection (Class, options) {
  const {name, tag, properties} = options;
  defProp(Class.prototype, name, {
    get () {
      const result = {};
      this.querySelectorAll(tag).forEach(element => {
        if (!element.id) {
          element.id = '_' + Math.random().toString(36).substr(2);
        }
        result[element.id] = {};
        properties.forEach(property => {
          result[element.id][property] = isUndefined(element[property]) ?
            element.getAttribute(property) :
            element[property];
        });
      });
      return objectObserve(result, (obj) => {
        this[name] = obj;
      });
    },
    set (obj) {
      const ids = [];
      for (let id of Object.keys(obj)) {
        ids.push(id);
        let element = this.querySelector(`#${ id }`);
        if (!element) {
          element    = document.createElement(tag);
          element.id = id;
          properties.forEach(property => {
            if (!isUndefined(obj[id][property])) {
              element[property] = obj[id][property];
            }
          });
          this.appendChild(element);
          continue;
        }
        properties.forEach(property => {
          if (!isUndefined(obj[id][property]) &&
              obj[id][property] !== element[property]) {
            element[property] = obj[id][property];
          }
        });
      }
      for (let element of this.querySelectorAll(tag)) {
        if (ids.indexOf(element.id) === -1) {
          element.parentNode.removeChild(element);
        }
      }
    }
  });
}

/**
 * Register the Web Component
 * @param {Function} Class - Class for this custom component
 * @param {string }name    - Tag Name
 */
function registreComponent (Class, name) {

  // Registre custom element
  if (!customElements.get(COMPONENT_PREFIX + name.toLowerCase())) {
    customElements.define(COMPONENT_PREFIX + name.toLowerCase(), Class);
  }

}

/**
 * Define a Base or
 * @param {Function} Class
 * @param {Object} [def={}]
 * @returns {object}
 */
function define (Class, def = {}) {
  def.property  = (...properties) => {
    properties.forEach(property => defineProperty(Class, Object.assign({}, property)));
    return def;
  };
  def.attribute = (...attributes) => {
    attributes.forEach(attribute => defineAttribute(Class, Object.assign({}, attribute)));
    return def;
  };
  def.tag       = (name) => {
    registreComponent(Class, name);
    return def;
  };
  def.extension = (fn) => {
    fn.call(defineObject, defineObject, Class)
    return def
  }
  return def;
}

/**
 * Export
 */
export {
  Simple as default,
  Simple,
  define,
  CHANGE,
  CONTEXT,
  FIRE_EVENT,
  COMPONENT_PREFIX
};
