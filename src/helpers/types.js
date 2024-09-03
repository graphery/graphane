export const FUNCTION  = 'function';
export const UNDEFINED = 'undefined';
export const OBJECT    = 'object';
export const STRING    = 'string';
export const ARRAY     = 'array';
export const NUMBER    = 'number';
export const BOOLEAN   = 'boolean';
export const DATE      = 'date';
export const SYMBOL    = 'symbol';

export const EMPTY_STRING = '';
export const COMA         = ',';
export const COLON        = ':';
export const SEMICOLON    = ';';

export const isObject    = (v) => typeof v === OBJECT;
export const isString    = (v) => typeof v === STRING;
export const isFunction  = (v) => typeof v === FUNCTION;
export const isNumber    = (v) => typeof v === NUMBER && !isNaN(v);
export const isUndefined = (v) => typeof v === UNDEFINED;
export const isSymbol    = (v) => typeof v === SYMBOL;
export const isBoolean   = (v) => typeof v === BOOLEAN;
export const isArray     = (v) => Array.isArray(v);
export const isDate      = (v) => v instanceof Date && !isNaN(v);
export const isNull      = (v) => v === null;

/**
 * Convert attribute name to camel property name
 * @param {string} name
 * @return {string}
 */
export const toCamel = name => name.replace(/-([a-z0-9])/g, (x, y) => y.toUpperCase());

/**
 * Converto property name to hyphen attribute name
 * @param {string} name
 * @return {string}
 */
export const toHyphen = name => {
  name = name.replace(/([A-Z])/g, '-$1').toLowerCase();
  return name[0] === '-' ? name.slice(1) : name;
};


/**
 * Convert an object property to an attribute string
 * @param {Object} value
 * @return {string|undefined}
 */
export function object2attribute (value) {
  if (isObject(value)) {
    let str = '';
    for (let key of Object.keys(value)) {
      str += `${ str ? '; ' : '' }${ key }: ${ value[key] }`;
    }
    return str;
  } else if (isString(value)) {
    return value;
  }
  return undefined;
}

/**
 * Convert an attribute string to an object property
 * @param {string} value
 * @return {Object|undefined}
 */
export function attribute2object (value) {
  if (isString(value)) {
    try {
      const normalized = value
        .replace(/^\s*{/,'')
        .replace(/}\s*$/,'')
        .split(/((?:[^;^,"']|"[^"]*"|'[^']*')+)/)
        .filter(partial => !['', ';', ','].includes(partial.trim()))
        .map(partial => partial.split(':'))
        .map(partial => `"${ partial[0].trim() }":${ str2value(
          partial[1].trim(),
          undefined,
          true
        ) }`)
        .join(',');
      return JSON.parse(`{${ normalized }}`);
    } catch (err) {
      console.error(err);
      return undefined;
    }
  } else if (isObject(value)) {
    return value;
  }
  return undefined;
}

/**
 * Convert an attribute string to an array
 * @param {string} value
 * @return {Object|undefined}
 */
export function attribute2array (value) {
  if (isString(value)) {
    if (value.trim()[0] === '[') {
      return (value.match(/\[(.*?)[^\]]]/g) || []).map(arr => attribute2array(arr.substring(
        1,
        arr.length - 1
      )));
    } else {
      return value.split(/[,;]/).map(str => str2value(str.trim()));
    }
  } else if (isArray(value)) {
    return value;
  }
  return undefined;
}

/**
 * Convert an attribute string to an array of objects
 * @param {string} value
 * @return {Object|undefined}
 */
export function attribute2arrayObject (value) {
  if (isString(value)) {
    if (value.trim()[0] === '[') {
      return (value.match(/\[(.*?)[^\]]]/g) || []).map(arr => attribute2object(arr.substring(
        1,
        arr.length - 1
      )));
    } else {
      return [attribute2object(value)];
    }
  } else if (isArray(Array)) {
    return value;
  }
  return undefined;
}


/**
 *
 * @param {Object} value
 * @return {string|undefined}
 */
export function array2attribute (value) {
  if (isArray(value)) {
    let str = JSON.stringify(value);
    return str.substr(1, str.length - 2)
              .replace(/,/g, ', ')
              .replace(/"/g, '');
  } else if (isString(value)) {
    return value;
  }
  return undefined;
}

/**
 * Convert a string into a value number, boolean or string (with "" if quote is true)
 * @private
 * @param {string} str
 * @param {string} [type]
 * @param {boolean} [quote=false]
 * @return {any}
 */
export function str2value (str, type, quote = false) {
  if (!isString(str)) {
    return str;
  }
  str = removeDoubleQuote(str.trim());
  if (type === ARRAY) {
    return attribute2array(str);
  }
  if (type === OBJECT) {
    return attribute2object(str);
  }
  if (isUndefined(type) || type === NUMBER) {
    if (isUndefined(str) || str === '') {
      return undefined;
    }
    let value = +str;
    if (!Number.isNaN(value) || type === NUMBER) {
      return value;
    }
  }
  if (isUndefined(type) || type === BOOLEAN) {
    if (str === 'true') {
      return true;
    } else if (str === 'false') {
      return false;
    }
    if (type === BOOLEAN) {
      if (str === '0') {
        return false;
      }
      return !!str;
    }
  }
  if (type === DATE) {
    try {
      let value = new Date(str);
      if (!Number.isNaN(value.getTime())) {
        return value;
      }
    } catch (e) {
      void (0);
    }
    return undefined;
  }
  if (isUndefined(type) || type === STRING) {
    return quote ? `"${ str }"` : str;
  }
}

function removeDoubleQuote (str) {
  if (
    (str[0] === '\'' && str[str.length - 1] === '\'') ||
    (str[0] === '"' && str[str.length - 1] === '"')
  ) {
    return str.substring(1, str.length - 1);
  }
  return str;
}

/**
 *
 * @param {string} str
 * @returns {boolean}
 */
export function isLikeObject(str) {
  return /^\s*{(.|\s)*}\s*$/.test(str);
}

/**
 *
 * @param {string} str
 * @returns {boolean}
 */
export function isLikeArray(str) {
  return /^\s*\[(.|\s)*]\s*$/.test(str);
}


export function csvStr2obj (str) {
  let keys = [];
  return str
    .split(/(\r\n|\r|\n)/)
    .map(r => r.trim())
    .filter(r => r)
    .reduce(
      (result, row, idx) => {
        const obj   = {};
        const parts = row
          .split(/((?:[^;^,"']|"[^"]*"|'[^']*')+)/)
          .filter(partial => ![EMPTY_STRING, SEMICOLON, COMA].includes(partial.trim()));
        if (idx === 0) {
          keys = [...parts.map(p => JSON.parse(p))];
          return result;
        }
        parts.forEach((part, i) => {
          obj[keys[i]] = JSON.parse(part);
        });
        result.push(obj);
        return result;
      },
      []
    );
}

export function jsStr2obj (str) {
  const code = `return (${ str });`
  const ret  = (new Function(code))();
  return typeof ret === 'function' ? ret() : ret;
}

export function funcStr2obj (str, $) {
  return (new Function('$', `${ str };let ___$$$ret = {};${
    [...str.matchAll(/\s*function\s*(\w+)/gm)]
      .map(x => `if (typeof ${ x[1] } === 'function') ___$$$ret.${ x[1] } = ${ x[1] };`)
      .join('')
  } return ___$$$ret;`))($);
}