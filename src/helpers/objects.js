import {
  OBJECT, NUMBER, UNDEFINED,
  isObject, isFunction, isString, isUndefined, isNull
} from './types.js';

const NOT_EQUAL = false;                            // Return values
const EQUAL     = true;

/**
 * Create a new object (empty) with same constructor
 * @param {object} obj - object as seed
 * @returns {object}   - a new object
 */
export function createOther (obj) {
  if (obj === null) return null;
  if (obj.constructor) {
    return new obj.constructor();
  }
  return {};
}

/**
 * Clone an object (plain object and array)
 * @param {object} obj - object to clone
 * @returns {object}   - new object
 */
export function clone (obj) {
  if (!isObject(obj)) {
    return obj;
  }
  const copy = obj === null ? null : Object.assign(createOther(obj), obj);
  for (let p in copy) {
    if (isObject(copy[p])) {
      copy [p] = clone(copy[p]);
    }
  }
  return copy;
}

/**
 * Object comparison (equivalent with same all enumerable properties and equal constructor)
 * @param {*} objectA - first object to comparison
 * @param {*} objectB - second object to comparison
 * @returns {boolean}
 */
export function equal (objectA, objectB) {
  const aStack = [],                             // Stack array
        bStack = [];

  /**
   * Compare objects
   * @param {object} a - first object
   * @param {object} b - second object
   * @returns {boolean}
   */
  function checkObject (a, b) {
    if (isNull(a) || isNull(b)) {               // if one is null, they are different
      return NOT_EQUAL;
    }

    if (
      isFunction(a.valueOf) &&                  // valueOf() is a function in both values
      isFunction(b.valueOf) &&
      (a !== a.valueOf() || b !== b.valueOf())
    ) {
      return (
        a.valueOf() === b.valueOf() &&
        a.constructor === b.constructor);       // Check if equal
    }

    if (aStack.indexOf(a) > -1 &&               // Check if the object has been previously processed
        bStack.indexOf(b) > -1) {
      return EQUAL;
    }
    let aKeys = Object.keys(a);                 // Get property keys
    let bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {        // Check the number of properties
      return NOT_EQUAL;
    }
    if (aKeys.length > 0) {
      aStack.push(a);                           // Storage objects into stacks for recursive references
      bStack.push(b);
      let i = aKeys.length;
      while (i--) {                             // Check each property value (recursive call)
        const key = aKeys[i];
        if (!check(a[key], b[key])) {
          return NOT_EQUAL;
        }
      }
    }
    return EQUAL;
  }

  /**
   * Compare elements
   * @param {*} a - first element
   * @param {*} b - second element
   * @returns {boolean}
   */
  function check (a, b) {
    if (a === b) {                               // Strict comparison
      return EQUAL;
    }
    const aType = typeof a,                      // Get value types
          bType = typeof b;
    if (aType !== bType) {                       // Different type is a not equal value from this point
      return NOT_EQUAL;
    }
    if (aType === NUMBER &&                      // Special case: Not is a Number (NaN !== NaN)
        isNaN(a) &&
        isNaN(b)) {
      return EQUAL;
    }

    if (aType === OBJECT) {                      // Objects
      return checkObject(a, b);
    }
    return NOT_EQUAL;                            // Not equal
  }

  return check(objectA, objectB);
}

/**
 * get a deep property
 * @param {object} obj
 * @param {string|array|Symbol} path
 * @returns {undefined|*}
 */
export function getProperty (obj, path) {
  let tmp      = obj;
  let elements = isString(path) ? path.split('.') : path;
  for (let i = 0; i < elements.length; i++) {
    if (isUndefined(tmp[elements[i]])) {
      return undefined;
    }
    tmp = tmp[elements[i]];
  }
  return tmp;
}

/**
 * Create a Schema object
 * @param {object} schema
 * @returns {{normalize(object): void}}
 * @constructor
 */
export function Schema (schema) {
  walker(schema, (obj, key) => {
    if (!obj.$schema && (key === 'properties' || key === 'items')) {
      obj.$schema = {};
      obj.$schema = Schema(obj);
    }
  });
  const arrayNormalization  = (obj) => { // Array
    if (!Array.isArray(obj)) {
      obj = [];
    }
    for (let key in obj) {
      // Update type
      const type = getType(obj[key]);
      if (type !== schema.items.type.name) {
        obj[key] = new schema.items.type(obj[key]).valueOf();
      }
      // Sub schema
      if (schema.items.$schema) {
        obj[key] = schema.items.$schema.normalize(obj[key]);
      }
    }
    return obj;
  };
  const objectNormalization = (obj) => { // Object
    if (!isObject(obj)) {
      obj = {};
    }
    const {properties} = schema;
    for (let key in obj) {
      const property = properties[key];
      // Remove unknown values
      if (!property) {
        delete obj[key];
        continue;
      }
      // Update type
      if (getType(obj[key]) !== property.type.name) {
        obj[key] = new property.type(obj[key]).valueOf();
        if (getType(obj[key]) !== property.type.name || (property.type === Number && Number.isNaN(obj[key]))) {
          delete obj[key];
        }
      }
      // Sub schema
      if (property.$schema) {
        obj[key] = property.$schema.normalize(obj[key]);
      }
    }
    // Add missing values
    for (let key in properties) {
      const property = properties[key];
      if (isUndefined(obj[key]) && !isUndefined(property.default)) {
        obj[key] = new property.type(property.default).valueOf();
      }
      if (property.$schema) {
        obj[key] = property.$schema.normalize(obj[key]);
      }
    }
    return obj;
  };
  return {normalize : schema.items ? arrayNormalization : objectNormalization}
}

/**
 * @typedef walkerCallback
 * @type function
 * @param {object} obj
 * @param {string} key
 * @param {*} value
 * @param {object} root
 * @param {array<string>} keys
 */

/**
 * Walk an object keys
 * @param {object} obj
 * @param {walkerCallback} callback
 */
export function walker (obj, callback) {
  if (!isObject(obj) || !isFunction(callback)) {
    return;
  }
  (function inspect (currentObj, keys) {
    for (let key in currentObj) {
      keys.push(key);
      if (isObject(currentObj[key])) {
        inspect(currentObj[key], keys);
      }
      callback(currentObj, key, currentObj[key], obj, keys);
      keys.pop();
    }
  })(obj, []);
}

function getType (value) {
  if (isNull(value)) {
    return 'null';
  }
  if (isUndefined(value)) {
    return UNDEFINED;
  }
  return value.constructor.name
}


/**
 * Performs a deep assignment of properties from one or more source objects to a target object.
 * Copies all nested properties and arrays recursively while maintaining immutability of the source objects.
 *
 * @param {Object} target The target object to which properties will be assigned. Must be a non-null object.
 * @param {...Object} sources One or more source objects whose properties will be deeply assigned to the target object.
 * @return {Object} The modified target object with the deeply assigned properties.
 * @throws {TypeError} If the target is not a non-null object.
 */
export function deepObjectAssign(target, ...sources) {
  // Ensure target is an object
  if (typeof target !== 'object' || target === null) {
    throw new TypeError('Target must be a non-null object');
  }

  // Iterate over each source object
  sources.forEach(source => {
    // Skip not object and null
    if (typeof source !== 'object' || source === null) {
      return;
    }

    // Iterate over the source's own properties
    Object.keys(source).forEach(key => {
      const sourceValue = source[key];
      const targetValue = target[key];

      // If sourceValue is an object, recurse
      if (sourceValue && typeof sourceValue === 'object') {
        // Initialize the nested structure in the target if it doesn't exist or isn't an object
        if (!targetValue || typeof targetValue !== 'object') {
          target[key] = Array.isArray(sourceValue) ? [] : {};
        }
        // Recursively assign nested objects
        deepObjectAssign(target[key], sourceValue);
      } else {
        // Otherwise, copy the value
        target[key] = sourceValue;
      }
    });
  });

  return target;
}
