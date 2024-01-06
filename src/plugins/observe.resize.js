/**
 * This callback is displayed as part of the Requester class.
 * @callback resizeObserver~callback
 * @param {SVGMatrix} currentMatrix
 * @param {SVGMatrix} prevMatrix
 */

const observerCache = new WeakSet();

/**
 * resizeObserver - call the callback if the SVG is resized
 * @param {Object} svg
 */
function observeResize (svg) {
  if (observerCache.has(svg)) {
    return;
  }
  let prevMatrix = svg.getScreenCTM();
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
}


/**
 * resizeObserver plugins installer
 * @usage gySVG.install( resizeObserver )
 */
function install (setup) {
  // Update gySVGObject
  setup.extendInstance((proto) => {
    proto.addEventListener = function(type, listener, options) {
      if (type === 'resize' && this.el.tagName.toLowerCase() === 'svg') {
        observeResize(this.el);
      }
      this.el.addEventListener(type, listener, options);
    }
  });
}

export default install;