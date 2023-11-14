/**
 * This callback is displayed as part of the Requester class.
 * @callback resizeObserver~callback
 * @param {SVGMatrix} currentMatrix
 * @param {SVGMatrix} prevMatrix
 */

const observerCache = new WeakSet();

/**
 * resizeObserver - call the callback if the SVG is resized
 * @param {resizeObserver~callback} [callback]
 * @returns {gSVG}
 */
function observeResize () {
  const svg  = this.el.tagName.toLowerCase() === 'svg' ? this.el : this.closest('svg')?.el;
  if (!svg) {
    this.top().addEventListener('attach', () => observeResize.call(this));
    return this;
  }
  if (observerCache.has(svg)) {
    return this;
  }
  let prevMatrix = {};
  const check    = () => {
    const currentMatrix = svg.getScreenCTM();
    if (currentMatrix !== null && (
      currentMatrix.a !== prevMatrix.a ||
      currentMatrix.b !== prevMatrix.b ||
      currentMatrix.c !== prevMatrix.c ||
      currentMatrix.d !== prevMatrix.d ||
      currentMatrix.e !== prevMatrix.e ||
      currentMatrix.f !== prevMatrix.f)
    ) {
      svg.dispatchEvent(new CustomEvent("resize", {detail : {currentMatrix, prevMatrix}}));
      prevMatrix = currentMatrix;
    }
    window.requestAnimationFrame(check);
  };
  observerCache.add(svg);
  check();
  return this;
}


/**
 * resizeObserver plugins installer
 * @usage gySVG.install( resizeObserver )
 */
export function svgPlugin (setup) {
  // Update gySVGObject
  setup.extendInstance({
    observeResize
  });
}
