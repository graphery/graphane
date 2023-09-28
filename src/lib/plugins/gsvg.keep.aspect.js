import resizeObserver from './gsvg.observe.resize.js';
import styleObserver  from './gsvg.observe.style.js';


/**
 * keepAspect - keep the size for text and line elements and the stroke for all elements when the
 * SVG is resized or the style is changed.
 * @returns {gSVG}
 */
function keepAspect () {
  const svg = this.closest('svg');
  switch (this.el.tagName.toLowerCase()) {
    case 'text':
      keepTextAspect(svg, this);
      break;
    case 'line':
      keepLineAspect(svg, this);
      break;
    default:
      keepStrokeAspect(svg, this);
  }
  return this;
}


/**
 *
 * @param {gySVGObject} svg
 * @param {gySVGObject} shape
 */
function keepStrokeAspect (svg, shape) {
  let originalCTM     = svg.getScreenCTM() || {a: 1, d: 1};
  let keepStrokeWidth = 0;
  svg.resizeObserver((currentCTM) => {
    const proportion = Math.max(currentCTM.a / originalCTM.a, currentCTM.d / originalCTM.d);
    shape.stroke_width(keepStrokeWidth / proportion);
  });
  svg.styleObserver('stroke-width', (values) => {
    const currentCTM = svg.getScreenCTM();
    keepStrokeWidth  = Number.parseFloat(values['stroke-width'].current);
    const proportion = Math.max(currentCTM.a / originalCTM.a, currentCTM.d / originalCTM.d);
    shape.stroke_width(keepStrokeWidth / proportion);
  })
}

/**
 *
 * @param {gySVGObject} svg
 * @param {gySVGObject} text
 */
function keepTextAspect (svg, text) {
  const originalCTM = svg.getScreenCTM() || {a: 1, d: 1};
  text.el._keepX    = text.x();
  text.el._keepY    = text.y();
  svg.resizeObserver((currentCTM) => {
    text.transform(`scale( ${originalCTM.a / currentCTM.a}, ${originalCTM.d / currentCTM.d})`);
    text.x(text.el._keepX / (originalCTM.a / currentCTM.a));
    text.y(text.el._keepY / (originalCTM.d / currentCTM.d));
  });
}

/**
 *
 * @param {gySVGObject} svg
 * @param {gySVGObject} line
 */
function keepLineAspect (svg, line) {
  const originalCTM = svg.getScreenCTM() || {a: 1, d: 1};
  line.el._keepX1   = line.x1();
  line.el._keepX2   = line.x2();
  line.el._keepY1   = line.y1();
  line.el._keepY2   = line.y2();
  svg.resizeObserver((currentCTM) => {
    line.transform(`scale( ${originalCTM.a / currentCTM.a}, ${originalCTM.d / currentCTM.d})`);
    line.x1(line.el._keepX1 / (originalCTM.a / currentCTM.a));
    line.x2(line.el._keepX2 / (originalCTM.a / currentCTM.a));
    line.y1(line.el._keepY1 / (originalCTM.d / currentCTM.d));
    line.y2(line.el._keepY2 / (originalCTM.d / currentCTM.d));
  });
}

export default function keepAspectPlugin (setup) {

  // Install dependencies
  setup.install(resizeObserver);
  setup.install(styleObserver);

  // Update gSVGObject
  setup.extendInstance({
    keepAspect
  });

}