/**
 * Returns the source code representation of an SVG element by serializing
 * it to a string, excluding any elements with the 'data-type' attribute
 * set to 'graphane'.
 *
 * @returns {string} The source code representation of the SVG element.
 */
function toSource () {
  const removeDefs = (node) => {
    if (node.nodeType === 1 && node.getAttribute('data-type') === 'graphane') {
      return node.remove();
    }
    node.childNodes.forEach(removeDefs);
    return node;
  }

  const el = removeDefs(this._el.cloneNode(true));
  return (new XMLSerializer()).serializeToString(el);
}


/**
 * Install template plugin
 * @param {object} setup
 * @example gSVG.install(templateEngine)
 */
function install (setup) {

  // Install plugin
  setup.extendInstance({
    toSource
  });

}

export default install;