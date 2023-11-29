import { isObject, isString, isFunction, isArray } from '../helpers/types.js';

const SVG       = 'SVG';
const ANIMATE   = 'animate';
const FILL      = 'none';
const FREEZE    = 'freeze';
const PATH      = 'path';
const D         = 'd';
const TRANSFORM = 'transform';
const ROTATE    = 'rotate';
const TRANSLATE = 'translate';
const OFFSET    = 'offset';
const INHERIT   = 'inherit';
const FINISHED  = 'finished';
const DEG_TYPES = [ROTATE, 'skewX', 'skewY'];
const DEG       = 'deg';
const PX        = 'px';
const MS        = 'ms';
const exception = ['width', 'height'];

/**
 * The reduced-motion flag
 * @type {boolean}
 */
let reduceMotion = false;
if (window.matchMedia) {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  reduceMotion     = mediaQuery.matches;
  mediaQuery.addEventListener('change', () => {
    reduceMotion = mediaQuery.matches;
  });
}

/**
 * Convert property name to attribute with hyphens
 * @param {string} name
 * @returns {string}
 */
const toHyphen = name => name.replace(/([A-Z])/g, '-$1').toLowerCase();

/**
 * @param {object|array<object>} keyframes
 * @param {number|object} [options]
 * @param {function|null} [startCallback]
 * @param {function|null} [endCallback]
 * @return {gSVGObject}
 * Notice: the original animateTo method is overwriting for this plugin
 */
function animateTo (keyframes, options = {duration : 200}, startCallback = null, endCallback = null) {

  const gSVG = this.gSVG;

  /**
   * Fixed and configure default values for .animateTo() options
   * @param {object} opts
   * @returns {object}
   */
  const normalizeOptions = (opts) => {
    const normalizedConfig = isObject(opts) ? Object.assign({}, opts) : {duration : opts};
    if (reduceMotion) {
      normalizedConfig.duration = 0;
    }
    normalizedConfig.fill = FILL;
    return normalizedConfig;
  }

  /**
   * Transform and configure default values for .animate() keyframes. Detect unsupported attributes.
   * @param {object|[{}]} originalKeyframes
   * @returns {[{}]}
   */
  const normalizeKeyframes = (originalKeyframes) => {
    originalKeyframes     = isArray(originalKeyframes) ?
      originalKeyframes :
      [originalKeyframes];
    const computedStyle   = window.getComputedStyle(this._el);
    const normalizeFrames = [];
    const alternativeKeys = new Set();
    for (let keyframe of originalKeyframes) {
      const normalized = Object.assign({}, keyframe);
      for (let key in normalized) {
        if (!(key in computedStyle) || exception.includes(key)) {
          alternativeKeys.add(key);
        } else if (key === D) {
          normalized.d = `${ PATH }("${ normalized.d }")`
        } else if (key === TRANSFORM) {
          normalized.transform = transform(normalized.transform)
        }
      }
      normalizeFrames.push(normalized);
    }
    addAlternatives(alternativeKeys, normalizeFrames);
    return normalizeFrames;
  }

  const alternatives    = []
  /**
   * create SMIL animate as alternative
   * @param {Set} keys
   * @param {[{}]} normalizeFrames
   */
  const addAlternatives = (keys, normalizeFrames) => {
    if (keys.size) {
      const computedFrames = new KeyframeEffect(null, normalizeFrames).getKeyframes();
      const initialTime    = this.closest(SVG) ? this.closest(SVG).getCurrentTime() * 1000 : 0;
      for (let key of keys) {
        const altAnimate = gSVG(ANIMATE)
          .attributeName(key)
          .dur(config.duration + MS)
          .begin((0 | initialTime + (options.delay || 0)) + MS)
          .fill(FREEZE);
        if (normalizeFrames.length === 1) {
          altAnimate.to(normalizeFrames[0][key]);
        } else {
          const keyTimes = [];
          const values   = [];
          for (let n in computedFrames) {
            const frame = computedFrames[n];
            if (key in normalizeFrames[n]) {
              keyTimes.push(frame.computedOffset);
              values.push(normalizeFrames[n][key]);
            }
          }
          if (keyTimes[0] !== 0) {
            keyTimes.unshift(0);
            values.unshift(this[key]() || INHERIT);
          }
          if (keyTimes[keyTimes.length - 1] !== 1) {
            keyTimes.push(1);
            values.push(this[key]() || INHERIT);
          }
          altAnimate.keyTimes(keyTimes.join(';')).values(values.join(';'));
        }
        alternatives.push(altAnimate);
        altAnimate.attachTo(this)
      }
    }
  };

  /**
   * Normalize a transform property
   * @param {object|string} property
   * @returns {string|*}
   */
  const transform = (property) => {
    if (isString(property)) {
      property = JSON.parse('{' +
                            property
                              .replace(/\s*\(\s*/g, ':[')
                              .replace(/\s*\)\s*/g, '],')
                              .split(/\s*,\s*|\s.*/).join(',')
                              .replace(/(\w+):/g, '"$1":')
                              .replace(/,$/, '')
                            + '}');
    }
    let result = '';
    for (let key in property) {
      if (key === ROTATE) {
        const values = transformValue(property[key]);
        if (values.length > 1) {
          result += `${ TRANSLATE }(${ values[1] }${ PX },${ values[2] }${ PX }) `
        }
        result += `${ key }(${ values[0] }${ transformUnit(key) }) `
        if (values.length > 1) {
          result += `${ TRANSLATE }(-${ values[1] }${ PX },-${ values[2] }${ PX }) `
        }
      } else {
        result += `${ key }(${ transformValue(property[key]).map(v => v + transformUnit(key)).join(',') }) `
      }
    }
    return result;
  }

  /**
   * Create a normalized transform value array
   * @param {*} value
   * @returns {[]}
   */
  const transformValue = (value) => (isArray(value) ? value : String(value).split(/\s+|,/));

  /**
   * Return the transform value
   * @param {string} type
   * @returns {string}
   */
  const transformUnit = (type) => DEG_TYPES.includes(type) ?
    DEG :
    type === TRANSLATE ? PX : '';

  /**
   * Convert to valida attribute value
   * @param {string|*} value
   * @returns {string|*}
   */
  const value2attribute = (value) =>
    isString(value) ?
      value.replace(/(deg)|(px)/g, '').trim() :
      value

  /**
   * Transform d CSS property to valid d attribute format
   * @param {string} d
   * @returns {string}
   */
  const d2attribute = (d) => d
    .replace(/(path\s*\(\s*["'])|(["']\s*\)\s*$)/g, '')
    .trim()
    .replace(/([a-zA-Z])\s*/g, '$1')
    .replace(/\s+/g, ',');

  /**
   * Transform d CSS property to valid d attribute format
   * @param {string} transform
   * @returns {string}
   */
  const transform2attribute = (transform) => {
    const regex = /translate\((.*)px,(.*)px\) rotate\((.*)deg\) translate\((.*)px,(.*)px\)\s+/;
    const match = regex.exec(transform);
    if (match && Number(match[1]) === Number(match[4]) * -1 && Number(match[2]) === Number(match[5]) * -1) {
      transform = transform.replace(regex, `rotate(${match[3]}, ${match[1]}, ${match[2]})`)
    } else {
      transform = value2attribute(transform);
    }
    return transform;
  }


  // Main code
  const config    = normalizeOptions(options);
  const frames    = normalizeKeyframes(keyframes);
  const animation = this._el.animate(frames, config);

  animation.ready.then(() => isFunction(startCallback) && startCallback.call(this, animation));

  animation.finished.then(() => {
    const lastAttributes = frames[frames.length - 1];
    for (let attr in lastAttributes) {
      const attrKey = toHyphen(attr);
      if (attrKey.startsWith("text-")) {
        this._el.style[attr] = lastAttributes[attr];
      } else if (attr !== OFFSET && attr in lastAttributes) {
        this._el.setAttribute(
          attrKey,
          attrKey === D ?
            d2attribute(lastAttributes[attr]) :
            attrKey === TRANSFORM ?
              transform2attribute(lastAttributes[attr]) :
              value2attribute(lastAttributes[attr]));
      }
    }
    alternatives.forEach(altAnimate => {
      altAnimate[FINISHED](true);
      const animates = this._el.querySelectorAll(ANIMATE);
      const finished = this._el.querySelectorAll(`${ ANIMATE }[${ FINISHED }]`);
      if (animates.length === finished.length) {
        animates.forEach(a => a.remove())
      }
    });
    isFunction(endCallback) && endCallback.call(this, animation);
  });

  return this;
}


export function svgPlugin (setup) {
  // Update gSVGObject
  setup.extendInstance({
    animateTo
  });
}