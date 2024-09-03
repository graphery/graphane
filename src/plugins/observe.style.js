/**
 * This callback is displayed as part of the Requester class.
 * @callback cssObserver~callback
 * @param {SVGElement|gySVGObject} svg
 * @param {object} styleValues
 */

/**
 * Observe CSS changes
 */
const TIMEOUT     = 100;
let requestId     = 0;
let lastExecution = 0;
let elements      = new Map();
let run           = false;

/**
 *
 * @param {string|Array<string>} properties - List of CSS property to observe
 * @param {Function}             callback   - function called when the CSS is changed
 * @returns {gSVG}
 */
function styleObserver (properties, callback = () => void (0)) {
  const element = this.el;
  if (typeof properties === 'string') {
    properties = [properties];
  }
  let observer;
  if (!elements.has(element)) {
    observer = {computedStyles : getComputedStyle(element), styles : {}, keys : []};
    elements.set(element, observer);
  } else {
    observer = elements.get(element);
  }
  for (let property of properties) {
    if (!observer.styles[property]) {
      observer.styles[property] = {
        lastValue : observer.computedStyles[property],
        callbacks : new Set()
      };
      observer.keys.push(property);
    }
    observer.styles[property].callbacks.add(callback);
  }
  observe();
  return this;
}

/**
 * function for observe CSS with requestAnimationFrame
 * @param {number} [timestamp]
 */
function observe (timestamp) {
  if (!run || (timestamp - lastExecution < TIMEOUT)) {
    run       = true;
    requestId = window.requestAnimationFrame(observe);
    return;
  }
  if (!timestamp) {
    return;
  }
  lastExecution = timestamp;
  let callbacks = null;
  for (let [element, observer] of elements.entries()) {
    for (let styleName of observer.keys) {
      const currentStyle = observer.computedStyles.getPropertyValue(styleName);
      const lastStyle    = observer.styles[styleName].lastValue;
      if (currentStyle !== lastStyle) {
        if (!callbacks) {
          callbacks = new Map();
        }
        for (let callback of observer.styles[styleName].callbacks) {
          if (callbacks.has(callback)) {
            callbacks.get(callback)[styleName] = {
              current : currentStyle,
              last    : lastStyle
            };
          } else {
            callbacks.set(callback, {
              [styleName] : {
                current : currentStyle,
                last    : lastStyle
              }
            });
          }
        }
        observer.styles[styleName].lastValue = currentStyle;
      }
    }
    if (callbacks) {
      for (let [callback, values] of callbacks.entries()) {
        callback.call(element, values);
      }
      callbacks = null;
    }
  }
  requestId = window.requestAnimationFrame(observe);
}

/**
 * styleObserver
 * @usage gySVG.extension( styleObserver )
 * @type {{styleObserver() : gySVGObject}}
 */
function install (setup) {
  // Update gSVGObject
  setup.extendInstance({
    styleObserver
  });
}

export default install;