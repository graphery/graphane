import { svgPlugin as resizeObserver } from './observe.resize.js';

const interpreter = (s) => s?.split(/\)\s*/)
                            .filter(x => !!x)
                            .map(x => x.split(/\s*\(/))
                            .reduce((o, r) => {
                              o[r.shift()] = r.pop()
                                              .split(/,/)
                                              .map(n => Number.isNaN(Number(n)) ? n : Number(n));
                              return o;
                            }, {}) || {};

/**
 * keepAspect - keep the size and the stroke when the SVG is resized
 * @param {string} [option = 'size']
 * @returns {gSVG}
 */
function keepAspect (option = 'size') {
  const svg = this.closest('svg');
  if (!svg) {
    this.top().addEventListener('attach', (evt) => {
      keepAspect.call(this, option);
    });
    return this;
  }
  if (svg._el.getRootNode() === svg._el) {
    svg.addEventListener('attach', (evt) => {
      keepAspect.call(this, option);
    });
    return this;
  }
  if (option === 'stroke') {
    keepStroke(svg, this);
  } else {
    keepSize(svg, this);
  }
  return this;
}


/**
 *
 * @param {gSVGObject} svg
 * @param {gSVGObject} el
 */
function keepSize (svg, el) {
  const originalCTM = svg.getScreenCTM() || {a : 1, d : 1};
  const box        = el.tagName().toLowerCase() === 'text' ?
    {x : el.x(), y : el.y()} :
    el.getBBox();
  const init = interpreter(el.transform());
  if (!init.scale) {
    init.scale = [1,1];
  }
  if (!init.translate) {
    init.translate = [0, 0];
  }
  originalCTM.a = originalCTM.a * init.scale[0];
  originalCTM.d = originalCTM.d * init.scale[1];
  svg.resizeObserver((currentCTM) => {
    const transform = el.transform('').transform;
    const scaleX = (originalCTM.a / currentCTM.a);
    const scaleY = (originalCTM.d / currentCTM.d);
    const translateX = box.x * (currentCTM.a / originalCTM.a) - box.x;
    const translateY = box.y * (currentCTM.d / originalCTM.d) - box.y;
    Object.keys(init)
          .filter(x => !['scale','translate'].includes(x))
          .forEach(x => transform[x](...init[x]))
    if (scaleX !== 1 || scaleY !== 1) {
      transform.scale(scaleX, scaleY);
    }
    if (translateY !== 0 || translateY !== 0) {
      transform.translate(translateX, translateY);
    }
  });
}

/**
 *
 * @param {gSVGObject} svg
 * @param {gSVGObject} el
 */
function keepStroke (svg, el) {
  const originalCTM  = svg.getScreenCTM() || {a : 1, d : 1};
  el.el._strokeWidth = parseFloat(getComputedStyle(el._el).strokeWidth);
  svg.resizeObserver((currentCTM) => {
    el.style.strokeWidth(el.el._strokeWidth * Math.max(originalCTM.a / currentCTM.a, originalCTM.d / currentCTM.d));
  });
}

export function svgPlugin (setup) {

  // Install dependencies
  setup.install(resizeObserver);

  // Update gSVGObject
  setup.extendInstance({
    keepAspect
  });

  if (setup.extendTemplate) {
    setup.extendTemplate.defineDirective({
      name : 'g-keep-aspect',
      execute (gObject, {expression}) {
        gObject.keepAspect(expression);
      }
    })
  }

}