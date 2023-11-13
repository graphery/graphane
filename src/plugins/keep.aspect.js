import { svgPlugin as resizeObserver } from './observe.resize.js';

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
  const BBox        = el.tagName().toLowerCase() === 'text' ?
    {x : el.x(), y : el.y()} :
    el.getBBox();
  svg.resizeObserver((currentCTM) => {
    const transform = el.transform('').transform;
    const scaleX = originalCTM.a / currentCTM.a;
    const scaleY = originalCTM.d / currentCTM.d;
    const translateX = BBox.x * (currentCTM.a / originalCTM.a) - BBox.x;
    const translateY = BBox.y * (currentCTM.d / originalCTM.d) - BBox.y;
    if (scaleX !== 1 || scaleY !== 1) {
      transform.scale(originalCTM.a / currentCTM.a, originalCTM.d / currentCTM.d)
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