/**
 * This callback is displayed as part of the Requester class.
 * @callback resizeObserver~callback
 * @param {SVGMatrix} currentMatrix
 * @param {SVGMatrix} prevMatrix
 */

const resizeObserverCache = new WeakMap();

/**
 * resizeObserver - call the callback if the SVG is resized
 * @param {resizeObserver~callback} [callback]
 * @returns {gSVG}
 */
function resizeObserver (callback = () => void(0)) {
  const self = this;
  const svg  = this.el.tagName.toLowerCase() === 'svg' ? this.el : this.closest('svg').el;
  if (resizeObserverCache.has(svg)) {
    return resizeObserverCache.get(svg).push(callback);
  }
  resizeObserverCache.set(svg, [callback]);
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
      const callbacks = resizeObserverCache.get(svg);
      for (let cb of callbacks) {
        cb.call(self, currentMatrix, prevMatrix);
      }
      const event = new CustomEvent("resize", {detail: {currentMatrix, prevMatrix}});
      self.el.dispatchEvent(event);
      prevMatrix = currentMatrix;
    }
    window.requestAnimationFrame(check);
  };
  check();
  return self;
}


/**
 * resizeObserver plugins installer
 * @usage gySVG.install( resizeObserver )
 */
export default function resizeObserverPlugin (setup) {
  // Update gySVGObject
  setup.extendInstance({
    resizeObserver
  });
}
