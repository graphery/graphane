import {
  ARRAY, OBJECT, NUMBER,
  isArray, isObject, isNumber, isFunction, isUndefined
}                            from '../helpers/types.js';
import { createFunction }    from '../helpers/function.create.js';
import { isValidIdentifier } from "../helpers/identifier.js";
import animateToPlugin       from './animateto.js';

const INIT       = Symbol();
const CLONED     = Symbol();
const CLONES     = Symbol();
const DIRECTIVES = Symbol();
const EVENTS     = Symbol();
const REPLACE    = Symbol();
const UNKNOWN    = 'unknown';
const directives = {};

/**
 * Throws an error with a specified message, scope, and code context.
 *
 * @param {string} message - The error message to be thrown.
 * @param {string} scope - The scope or context in which the error occurred.
 * @param {string} code - The code snippet or reference causing the error.
 * @throws {Error} Throws an error concatenating the message, scope, and code.
 */
const throwError = (message, scope, code) => {
  throw new Error(message + ` in ${ scope }\n` + code);
}

/**
 * Normalizes an attribute name by converting it to a predefined case format, if applicable.
 *
 * This function takes an attribute name string, and checks it against a predefined list of
 * attribute names. If the attribute name is found in the list, it returns the correctly formatted
 * version of the attribute name. If the attribute name is not found, it returns the original
 * attribute name.
 *
 * The list of attributes includes:
 * - attributeName       - attributeType    - baseFrequency    - calcMode
 * - clipPathUnits       - diffuseConstant  - edgeMode         - gradientTransform
 * - gradientUnits       - kernelMatrix     - kernelUnitLength - lengthAdjust
 * - limitingConeAngle   - markerHeight     - markerUnits      - markerWidth
 * - maskContentUnits    - maskUnits        - numOctaves       - pathLength
 * - patternContentUnits - patternTransform - patternUnits     - pointsAtX
 * - pointsAtY           - pointsAtZ        - preserveAlpha    - preserveAspectRatio
 * - primitiveUnits      - refX             - refY             - requiredExtensions
 * - requiredFeatures    - specularConstant - specularExponent - spreadMethod
 * - startOffset         - stdDeviation     - stitchTiles      - surfaceScale
 * - systemLanguage      - tableValues      - targetX          - targetY
 * - textLength          - viewBox          - xChannelSelector - yChannelSelector
 * - zoomAndPan
 *
 * @param {string} attribute - The attribute name to normalize.
 * @returns {string} The normalized attribute name if found, else the original attribute name.
 */
const normalizeAttribute = ((attributes) =>
    (attribute) => attributes[attribute] || attribute
)(
  'attributeName attributeType baseFrequency calcMode clipPathUnits diffuseConstant edgeMode gradientTransform gradientUnits kernelMatrix kernelUnitLength lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY requiredExtensions requiredFeatures specularConstant specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength viewBox xChannelSelector yChannelSelector zoomAndPan'
    .split(' ')
    .reduce(
      (a, c) => {
        a[c.toLowerCase()] = c;
        return a;
      },
      {}
    )
);


/**
 * Replaces an element with a comment element containing a reference to the original element.
 * The original element is removed from the DOM.
 *
 * @param {Object} element - The element to be replaced.
 */
function replaceWithComment (element) {
  if (!element?.el?.parentNode) {
    return;
  }
  const comment = document.createComment(` ref `);
  element.parentNode().insertBefore(comment, element.el);
  element.remove();
  comment[REPLACE] = element;
}

/**
 * Restore an element with its reference comment.
 * The comment is removed from the DOM and the element is returned.
 *
 * @param {Node} comment - The comment reference to be restored.
 * @return {Node} - The element that the comment is a reference.
 */
function restoreFromComment (comment) {
  const element = comment[REPLACE];
  comment.parentNode.insertBefore(element.el, comment);
  comment.remove();
  return element;
}

/**
 * g-context
 * Directive that sets the content of an element to the result of the given expression, especially
 * with <tspan></tspan> and <text></text>.
 * @example
 * <text g-content:="value"></text>
 */
defineDirective({
  name : 'g-content',
  exec (gObject, {expr, data, evalExpr}) {
    // gObject.content(evalExpr(expr, data));
    const context = {
      ...data,
      $$ : {
        fromURL        : async (src) => {
          const res = await fetch(src);
          if (res.status === 200) {
            return res.text();
          }
          console.warn(`Failed to load URL: ${ src } (${ res.status })`);
        },
        currentContent : gObject.content
      }
    };
    const result  = evalExpr(expr, context);
    const event   = new CustomEvent('load', {bubbles : true, detail : gObject});
    const norm    = c => isUndefined(c) ? '' : c;
    if (typeof result === 'object' && result.then) {
      result.then(result => {
        gObject.content(norm(result));
        gObject.dispatchEvent(event);
      });
    } else {
      gObject.content(norm(result));
      gObject.dispatchEvent(event);
    }
  }
});

/**
 * g-if
 * Directive that provides an expressive way to show and hide elements.
 * @example
 * <g g-if="value"></g>
 */
defineDirective({
  name : 'g-if',
  exec (gObject, {expr, data, evalExpr}) {
    if (!evalExpr(expr, data)) {
      replaceWithComment(gObject);
    }
  }
});

/**
 * g-bind: or :
 * Directive allowing to set attributes on elements based on the result of the expr. It is
 * necessary to indicate the attribute name after the directive or the shorthand.
 * @example
 * <rect g-bind:x="valueX" :y="valueY"></rect>
 */
defineDirective({
  name  : 'g-bind',
  alias : ':',
  arg   : true,
  exec (gObject, {expr, arg, data, evalExpr}) {
    arg                     = normalizeAttribute(arg);
    const context           = {
      ...data,
      $$ : ['d', 'transform'].includes(arg) ?
        gObject['$' + arg] :
        {}
    };
    context.$$.currentValue = gObject[arg];
    context.$$.dynamic      = (value, duration = 200, delay = 0) => {
      gObject.animateTo(
        (isArray(value) ? value : [value]).map(v =>
          isObject(v) && 'offset' in v ?
            {[arg] : v.value, offset : v.offset} :
            {[arg] : v}
        ),
        {duration, delay}
      );
    };
    let value               = evalExpr(expr, context);
    if (arg === 'class') {
      if (isArray(value)) {
        gObject.classList.add(...value.filter(val => !!val));
        return;
      }
      if (isObject(value)) {
        Object.entries(value).forEach(([key, val]) => {
          val ? gObject.classList.add(key) : gObject.classList.remove(key)
        });
        return;
      }
      if (value) {
        gObject.classList.add(value);
      }
      return;
    }
    if (arg === 'style') {
      Object.entries(value).forEach(([key, val]) => gObject.style[key](val));
      return;
    }
    if (!isUndefined(value)) {
      gObject[arg](value);
    }
  }
});

/**
 * g-on: or @
 * Directive than allows you to easily run code on dispatched events.
 * @example
 * <rect g-on:click="run"></rect>
 */
defineDirective({
  name  : 'g-on',
  alias : '@',
  arg   : true,
  exec (gObject, {expr, arg : event, data, evalExpr, error, code}) {
    gObject[EVENTS] = gObject[EVENTS] || {};
    const manager   = gObject[EVENTS][event] = gObject[EVENTS][event] || new Map();
    if (manager.has(expr)) {
      gObject.removeEventListener(event, manager.get(expr));
    }
    const handler = function (evt) {
      try {
        let fn = evalExpr(expr, data, gObject);
        if (isFunction(fn)) {
          fn.call(gObject, evt);
        }
      } catch (err) {
        error(err.message, `g-on:${ event }="${ expr }"`, code);
      }
    };
    gObject.addEventListener(event, handler);
    manager.set(expr, handler);
    if (event === 'init' && !gObject[INIT]) {
      gObject[INIT] = true;
      gObject.dispatchEvent(new Event('init'));
    }
  }
});

/**
 * g-for
 * Directive allows you to create elements by iterating through a list. It is only aceptable over
 * <defs></defs> element and clones the content for each item into the collection.
 * @example
 * <defs g-for="record of records">
 *   <rect :x="record.x" :y="record.y" :width="record.width" :height="record.height"></rect>
 * </defs>
 */
defineDirective({
  name : 'g-for',
  tmpl : true,
  exec (def, {expr, data, error}) {
    def[CLONES] = def[CLONES] || [];
    let n       = 0;
    evalForExpr(
      expr,
      data,
      (subData) => {
        if (def[CLONES][n]) {
          process(def[CLONES][n], subData, error, false);
        } else {
          const g = def.gSVG('g');
          def.children().forEach(child => {
            g.add(child.cloneNode(true));
          });
          process(g, subData, error);
          def.before(g.el);
          g[CLONED] = true;
          def[CLONES].push(g);
        }
        n++;
      },
      (subData) => {
        while (def[CLONES].length > subData.length) {
          def[CLONES].pop().remove();
        }
      }
    );
    replaceWithComment(def);
  }
});


/**
 * defineDirective - add a new directive
 * @param {Object}   config
 * @param {Function} exec
 */
function defineDirective ({name, alias, arg, tmpl, exec}) {

  let source  = `^(${
    name
  }${
    arg ? ':' : ''
  }${
    alias ? `|${ alias })` : ')'
  }${
    arg ? `(.*)$` : `$`
  }`
  const check = new RegExp(source, 'i')

  directives[name] = {
    name,
    alias,
    arg,
    tmpl,
    exec,
    check
  };

}

/**
 * findDirective - seeks a defined directive
 * @param {string} key
 * @returns {Object}
 */
function findDirective (key) {
  for (const name in directives) {
    const definition = directives[name];
    const match      = definition.check.exec(key);
    if (match) {
      let arg = match[2];
      return {...definition, arg}
    }
  }
}

/**
 * getVariables - analyzes a string with destructuring and extract the final variables
 * @param {string} expr
 * @returns {Array<string>}
 */
function getVariables (expr) {
  return expr
    .replace(/[{}()[\]]/g, '')
    .split(',')
    .map(k => (k.includes(':') ? k.split(':')[1].trim() : k).trim());
}

/**
 * toIterator - convert a variable into an Array
 * @param {any} v
 * @returns {{iterator: Array, type: string}}
 */
function toArray (v) {
  if (v[Symbol.iterator]) {
    return {iterator : [...v], type : ARRAY};
  }
  if (isNumber(v)) {
    return {iterator : Array(v < 0 ? 0 : 0 | v).fill(0).map((v, i) => i), type : NUMBER};
  }
  if (isObject(v)) {
    return {iterator : Object.entries(v).map(m => m.reverse()), type : OBJECT};
  }
  return {iterator : v, type : UNKNOWN};
}

/**
 * evalExpr - evaluate an expression with a data context
 * @param {string} code
 * @param {object} data
 * @param {object} [context=null]
 * @returns {*}
 */
function evalExpr (code, data, context = null) {
  const keys = Object.keys(data).filter(isValidIdentifier);
  const fn   = createFunction(
    keys,
    `return ( ${ code } ); `
  );
  const evalResult = fn.apply(context, keys.map(key => data[key]));
  if (Number.isNaN(evalResult)) {
    throw new Error(`The expression "${code}" returned a NaN (Not a Number) value`);
  }
  return evalResult;
}

/**
 * evalForExpression - evaluates an expression ` in ` with a data context and calls for each
 * occurrence to the callback
 * @param {string} code
 * @param {object} data
 * @param {function} each
 * @param {function} final
 * @returns {*}
 */
function evalForExpr (code, data, each, final) {
  const iteratorName     = '__$$iterator';
  const callbackName     = '__$$callback';
  const finalName        = '__$$final';
  let [left, right]      = code.split(' of ');
  left                   = left.trim();
  right                  = right.trim();
  const value            = evalExpr(right, data) || [];
  const {iterator, type} = toArray(value);
  if (type === OBJECT && !left.startsWith('[')) {
    left = `[${ left.replace(/(^\()|(\)$)/g, '') }]`;
  }
  const variables    = getVariables(left);
  const args         = !left.startsWith('(') ? `(${ left })` : left;
  const dataKeys     = Object.keys(data).filter(isValidIdentifier);
  const codeFunction = `
    ${ iteratorName }.forEach(${ args } => {
      ${ callbackName }({${ dataKeys }${ dataKeys.length ?
    ',' :
    '' }${ variables.join(',') }});
    });
    ${ finalName }(${ iteratorName });
  `;
  const fn           = createFunction([...dataKeys, iteratorName, callbackName, finalName], codeFunction);
  return fn(...dataKeys.map(key => data[key]), iterator, each, final);
}


/**
 * The process function processes the given element and its children by finding directives in its attributes
 * and executing the corresponding directive functions.
 *
 * @param {HTMLElement} el - The element to be processed
 * @param {object} data - The data to be used by the directive functions
 * @param {function} error - The error handler function
 * @param {boolean} [checkCloned=true] - Flag indicating whether to check if the element is cloned
 * @returns {void}
 */
function process (el, data, error, checkCloned = true) {
  if (checkCloned && el[CLONED]) {
    return
  }
  const code     = el.outerHTML();
  el[DIRECTIVES] = el[DIRECTIVES] || [];
  const attrs    = el.attributes();
  for (let attr of [...attrs]) {
    const attributeName = attr.name;
    const result        = findDirective(attributeName);
    if (result) {
      el[DIRECTIVES].push({...result, expr : attr.value});
      el.removeAttribute(attributeName);
    }
  }
  let tmpl = false;
  for (let directive of el[DIRECTIVES]) {
    try {
      directive.exec(el, {...directive, data, evalExpr, error, code});
    } catch (err) {
      error(
        err.message,
        {
          directive  : directive.name,
          argument   : directive.arg,
          expression : directive.expr,
          toString () {
            return `${ directive.name }${ directive.arg ?
              ':' + directive.arg :
              '' }="${ directive.expr }"`
          }
        },
        code);
    }
    tmpl = directive.tmpl || tmpl;
  }
  if (!tmpl) {
    for (const child of el.childNodes()) {
      if (child.el[REPLACE]) {
        process(restoreFromComment(child.el), data, error);
      } else if (child.el?.nodeType === 1) {
        process(child, data, error);
      }
    }
  }
}


/**
 * Renders the content in the given context.
 * @param {Object} context - The context object containing the data for rendering.
 * @param {Function} [error=throwError()] - The error handling function to be called in case of errors.
 * @return {undefined}
 */
function render (context = {}, error = throwError) {
  process(this, context, error);
  this.dispatchEvent(new Event('render'));
}


/**
 * Removes all occurrences of the '<!-- ref -->' string from the outer HTML of the current element.
 *
 * @return {string} The modified outer HTML string with the '<!-- ref -->' string removed.
 */
function source () {
  return this.outerHTML().replaceAll('<!-- ref -->', '');
}


/**
 * Install template plugin
 * @param {object} setup
 * @example gSVG.install(templateEngine)
 */
function install (setup) {

  // Dependencies
  setup.install(animateToPlugin);

  // Install plugin
  setup.extendInstance({
    render,
    source
  });

  // template plugins
  setup.extendSetup({
    extendTemplate : {
      defineDirective,
      getDirective (name) {
        return directives[name];
      }
    }
  });
}

export default install;