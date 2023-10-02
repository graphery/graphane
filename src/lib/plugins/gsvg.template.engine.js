import {
  ARRAY, OBJECT, NUMBER,
  isArray, isObject, isNumber, isFunction, isUndefined
}                         from '../../helpers/types.js';
import { createFunction } from '../../helpers/function.create.js';
import { Operations }     from '../../helpers/array.operations.js';
import { clone }          from '../../helpers/objects.js';
import animateToPlugin    from './gsvg.animateto.js';

const CLONED     = Symbol();
const CLONES     = Symbol();
const TEMPLATE   = Symbol();
const EVENTS     = Symbol();
const UNKNOWN    = 'unknown';
const LABEL      = 'Graphane SVG Template Engine:';
const directives = [];

const TRANSFORM_CONVERSION = (keys) =>
  keys.reduce((obj, name) => {
    obj[name] = (...args) => `${ name }(${ args.join(',') }) `;
    return obj
  }, {})
const TRANSFORM_ATTRIBUTES = ['transform', 'gradientTransform', 'patternTransform'];
const TRANSFORM_FUNCTIONS  = TRANSFORM_CONVERSION(
  ['matrix', 'matrix3d', 'perspective', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ',
   'scale', 'scale3d', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'translate',
   'translate3d', 'translateX', 'translateY', 'translateZ']
);


/**
 * g-context
 * Directive that sets the content of an element to the result of the given expression, especially
 * with <tspan></tspan> and <text></text>.
 * @example
 * <text g-content:="value"></text>
 */
defineDirective({
  name : 'g-content',
  execute (gObject, {expression, data, evalExpression}) {
    gObject.content(evalExpression(expression, data));
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
  execute (gObject, {expression, data, evalExpression}) {
    gObject.style.visibility(evalExpression(expression, data) ? 'inherit' : 'hidden');
  }
});

/**
 * g-bind: or :
 * Directive allowing to set attributes on elements based on the result of the expression. It is
 * necessary to indicate the attribute name after the directive or the shorthand.
 * @example
 * <rect g-bind:x="valueX" :y="valueY"></rect>
 */
defineDirective({
  name     : 'g-bind',
  alias    : ':',
  argument : true,
  execute (gObject, {expression, argument, data, evalExpression}) {
    const context = {
      ...data,
      ...(TRANSFORM_ATTRIBUTES.includes(argument) ? TRANSFORM_FUNCTIONS : {}),
      $ : {
        ...data.$,
        d : argument === 'd' ? gObject.$d : undefined,
        animate (value, duration = 200, delay = 0) {
          gObject.animateTo({[argument] : value}, {duration, delay});
        }
      },
    }
    const value   = evalExpression(expression, context);
    if (argument === 'class') {
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
    if (argument === 'style') {
      Object.entries(value).forEach(([key, val]) => gObject.style[key](val));
      return;
    }
    if (!isUndefined(value)) {
      gObject[argument](argument === 'd' ? '' + value : value);
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
  name     : 'g-on',
  alias    : '@',
  argument : true,
  execute (gObject, {expression, argument : event, data, evalExpression}) {
    gObject[EVENTS] = gObject[EVENTS] || {};
    const manager   = gObject[EVENTS][event] = gObject[EVENTS][event] || new Map();
    if (manager.has(expression)) {
      gObject.removeEventListener(event, manager[expression]);
    }
    const wrapper = function (evt) {
      let handler = evalExpression(expression, data);
      if (isFunction(handler)) {
        handler.call(this, evt);
      }
    }
    gObject.addEventListener(event, wrapper);
    manager.set(expression, wrapper);
    if (event === 'load') {
      gObject.dispatchEvent(new Event('load'));
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
  name     : 'g-for',
  template : true,
  execute (def, {expression, data}) {
    def[CLONES] = def[CLONES] || [];
    let n       = 0;
    evalForExpression(
      expression,
      data,
      (subData) => {
        if (def[CLONES][n]) {
          process(def[CLONES][n], subData, false);
        } else {
          const g = def.gSVG('g');
          def.children().forEach(child => {
            g.add(child.cloneNode(true));
          });
          process(g, subData);
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
      });
  }
});


/**
 * defineDirective - add a new directive
 * @param {Object}   config
 * @param {Function} execute
 */
function defineDirective ({name, alias, argument, template, execute}) {

  let source  = `^(${
    name
  }${
    argument ? ':' : ''
  }${
    alias ? `|${ alias })` : ')'
  }${
    argument ? `(.*)$` : `$`
  }`
  const check = new RegExp(source, 'i')

  directives.push({
    name,
    alias,
    argument,
    template,
    execute,
    check
  });

}

/**
 * findDirective - seeks a defined directive
 * @param {string} key
 * @returns {Object}
 */
function findDirective (key) {
  for (const definition of directives) {
    const match = definition.check.exec(key);
    if (match) {
      let argument = match[2];
      return {...definition, argument}
    }
  }
}

/**
 * getVariables - analyzes a string with destructuring and extract the final variables
 * @param {string} expression
 * @returns {Array<string>}
 */
function getVariables (expression) {
  return expression
    .replace(/[{}()[\]]/g, '')
    .split(',')
    .map(k => k.includes(':') ? k.split(':')[1] : k)
    .map(k => k.trim());
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
    return {iterator : Array(v < 0 ? 0 : v).fill(0).map((v, i) => i), type : NUMBER};
  }
  if (isObject(v)) {
    return {iterator : Object.entries(v).map(m => m.reverse()), type : OBJECT};
  }
  return {iterator : v, type : UNKNOWN};
}

/**
 * evalExpression - evaluate an expression with a data context
 * @param {string} code
 * @param {object} data
 * @returns {*}
 */
function evalExpression (code, data) {
  try {
    const fn = createFunction(
      Object.keys(data).filter(n => !isNumber(n)),
      `return ( ${ code } ); `
    );
    return fn(...Object.values(data));
  } catch (err) {
    console.warn(LABEL, err.message);
  }
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
function evalForExpression (code, data, each, final) {
  const iteratorName = '__$$iterator';
  const callbackName = '__$$callback';
  const finalName    = '__$$final';
  try {
    let [left, right]      = code.split(' of ');
    left                   = left.trim();
    right                  = right.trim();
    const value            = evalExpression(right, data) || [];
    const {iterator, type} = toArray(value);
    if (type === OBJECT && left[0] !== '[') {
      left = `[${ left.replace(/(^\()|(\)$)/g, '') }]`;
    }
    const variables    = getVariables(left);
    const args         = left[0] !== '(' ? `(${ left })` : left;
    const dataKeys     = Object.keys(data);
    const codeFunction = `
      ${ iteratorName }.forEach(${ args } => {
        ${ callbackName }({${ dataKeys }${ dataKeys.length ?
      ',' :
      '' }${ variables.join(',') }});
      });
      ${ finalName }(${ iteratorName });
    `;
    const fn           = createFunction([...dataKeys, iteratorName, callbackName, finalName], codeFunction);
    return fn(...Object.values(data), iterator, each, final);
  } catch (err) {
    console.warn(LABEL, err);
  }
}

/**
 * process - evaluates a gObject object and renders the content with the directives, creating new
 * elements, adding content, filling in attributes, etc.
 * @param {Object} el
 * @param {Object} data
 * @param {boolean} [checkCloned=true]
 * @example
 * svg.render(records)
 */
function process (el, data, checkCloned = true) {
  if (checkCloned && el[CLONED]) {
    return
  }
  el[TEMPLATE] = el[TEMPLATE] || [];
  const attrs  = el.attributes();
  for (let attr of [...attrs]) {
    const attributeName = attr.name;
    const result        = findDirective(attributeName);
    if (result) {
      el[TEMPLATE].push({...result, expression : attr.value});
      el.removeAttribute(attributeName);
    }
  }
  let template = false;
  for (let directive of el[TEMPLATE]) {
    directive.execute(el, {...directive, data, evalExpression});
    template = directive.template || template;
  }
  if (!template) {
    for (const child of el.children()) {
      process(child, data);
    }
  }
}

/**
 *
 * @param {Object|Array} [context]
 */
function render (context = {}) {
  process(this, {
    ...context,
    ...(Array.isArray(context.data) ? {} : context.data),
    $ : context.data ? {
      ...context.$,
      ...Operations(context.data),
      data    : context.data,
      rawData : clone(context.data),
    } : {}
  });
}


/**
 * Install template plugin
 * @param {object} setup
 * @example gSVG.install(templateEngine)
 */
export default function templateEngine (setup) {
  // Dependencies
  animateToPlugin(setup);
  // Install
  setup.extendInstance({
    render
  });
  setup.extendSetup({
    extendTemplate : {
      defineDirective,
      obtainDirective (name) {
        return directives.find(directive => directive.name === name);
      }
    }
  })
}