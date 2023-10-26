import { CSS_PROPS, COMPONENT_PREFIX } from './base.js';

const buildName   = (name) => /^--/.test(name) ? name : `--${ COMPONENT_PREFIX }${ name }`;


/**
 * Get a CSS Property Value (current or default value)
 * @param {Element}       component  - Object from a class inherited from Base
 * @param {Map}           cssProps   - Map with CSS Properties
 * @param {string|Object} name       - CSS property name or CSS property descriptor
 * @returns {*}                      - Current CSS property value
 */
export function getCSSPropertyValue (component, cssProps, name) {
  name         = typeof name === 'object' ? name.name : name;
  const result = getComputedStyle(component).getPropertyValue(name);
  if ((typeof result === 'undefined' || result === '') &&
      cssProps &&
      cssProps.hasOwnProperty(name)) {
    return cssProps[name].value;
  }
  return result;
}

/**
 * Get the list of CSS Property Descriptors
 * @param {Object} component - Object from a class inherited from Base
 * @returns {Map}            - List of CSS properties
 */
export function getCSSPropertyDescriptors (component) {
  return component[CSS_PROPS] || {};
}

/**
 * Get the list of CSS Properties
 * @param {Object} component - Object from a class inherited from Base
 * @returns {array<string>}  - List of CSS property keys accepted by that component
 */
export function getCSSProperties (component) {
  return Object.keys(getCSSPropertyDescriptors(component));
}

/**
 * Get a CSS Properties descriptor
 * @param {Object}        component - Object from a class inherited from Base
 * @param {string|Object} name      - CSS property name or CSS property descriptor
 * @returns {object}                - Return a CSS property descriptor
 */
export function getCSSProperty (component, name) {
  const cssProps = getCSSPropertyDescriptors(component);
  name           = buildName(typeof name === 'object' ? name.name : name);
  return cssProps[name];
}

/**
 * Return a valid "var()" string with all CSS properties passed as parameters
 * @param {Object}        component - Object from a class inherited from Base
 * @param {string|object} name      - CSS property name or CSS property descriptor
 * @returns {string}                - "var()" string
 */
export function getCSSVar (component, ...name) {
  let result       = '';
  let defaultValue = '';
  for (let i = 0; i < name.length; i++) {
    const property = getCSSProperty(component, name[i]);
    result += `${ result ? ', ' : '' } var(${ buildName(property?.name || name[i]) }`;
    defaultValue = property?.initialValue;
  }
  if (defaultValue) {
    result += `, ${ defaultValue }`;
  }
  result += ')'.repeat(name.length);
  return result;
}

