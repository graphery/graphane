import observeResize from './observe.resize.js';

const KEEP_ASPECT = Symbol();
const interpreter = (s) => s?.split(/\)\s*/)
                            .filter(x => !!x)
                            .map(x => x.split(/\s*\(/))
                            .reduce((o, r) => {
                              o[r.shift()] = r.pop()
                                              .split(/,/)
                                              .map(n => isNaN(n) ? n : Number(n));
                              return o;
                            }, {}) || {};

/**
 * keepAspect - keep the size and the stroke when the SVG is resized
 * @param {string|boolean} [option = 'size']
 * @returns {gSVG}
 */
function keepAspect (option = 'size') {
  const svg = this.closest('svg');
  if (!svg) {
    this.top().addEventListener('attach', () => {
      keepAspect.call(this, option);
    });
    return this;
  }
  if (svg._el.getRootNode() === svg._el) {
    svg.addEventListener('attach', () => {
      keepAspect.call(this, option);
    });
    return this;
  }
  if (this[KEEP_ASPECT]) {
    svg.removeEventListener('resize', this[KEEP_ASPECT]);
  }
  if (option === 'stroke') {
    keepStroke(svg, this);
  }
  if (option === 'size') {
    keepSize(svg, this);
    svg.addEventListener('resize', this[KEEP_ASPECT]);
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
  const tag         = el.tagName().toLowerCase();
  const box         = tag === 'text' ?
    {x : el.x(), y : el.y()} :
    tag === 'circle' ?
      {x : el.cx(), y : el.cy()} :
      el.getBBox();
  const init        = interpreter(el.transform());
  if (!init.scale) {
    init.scale = [1, 1];
  }
  if (!init.translate) {
    init.translate = [0, 0];
  }
  originalCTM.a   = originalCTM.a * init.scale[0];
  originalCTM.d   = originalCTM.d * init.scale[1];
  el[KEEP_ASPECT] = (evt) => {
    const currentCTM = evt.detail.currentMatrix;
    const transform  = el.transform('').transform;
    const scaleX     = (originalCTM.a / currentCTM.a);
    const scaleY     = (originalCTM.d / currentCTM.d);
    const translateX = box.x * (currentCTM.a / originalCTM.a) - box.x;
    const translateY = box.y * (currentCTM.d / originalCTM.d) - box.y;
    Object.keys(init)
          .filter(x => !['scale', 'translate'].includes(x))
          .forEach(x => transform[x](...init[x]))
    if (scaleX !== 1 || scaleY !== 1) {
      transform.scale(scaleX, scaleY);
    }
    if (translateX !== 0 || translateY !== 0) {
      transform.translate(translateX, translateY);
    }
  };
}

/**
 *
 * @param {gSVGObject} svg
 * @param {gSVGObject} el
 */
function keepStroke (svg, el) {
  el.vector_effect('non-scaling-stroke');
}

function install (setup) {

  // Install dependencies
  setup.install(observeResize);

  // Update gSVGObject
  setup.extendInstance({
    keepAspect (option) {
      if (option === 'stroke') {
        console.warn('".keepAspect(\'stroke\')" is deprecated; use ".vector_effect(\'non-scaling-stroke\')" instead.');
      } else {
        console.warn(`".keepAspect()" is deprecated; use ".nonScalingSize()" instead.`);
      }
      return keepAspect.call(this, option)
    },
    nonScalingSize : keepAspect
  });

  // Add template directive
  if (setup.extendTemplate) {
    setup.extendTemplate.defineDirective({
      name : 'g-keep-aspect',
      exec (gObject, {expr}) {
        console.warn('"g-keep-aspect" directive is deprecated; use "g-non-scaling-size" instead.');
        gObject.nonScalingSize(expr);
      }
    })
    setup.extendTemplate.defineDirective({
      name : 'g-non-scaling-size',
      exec (gObject) {
        // gObject.nonScalingSize('size');
        keepAspect.call(gObject, 'size')
      }
    })
  }

}

export default install;