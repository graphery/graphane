/**
 * Returns the source code representation of an SVG element by serializing
 * it to a string, excluding any reference comment as '<!-- ref -->'>
 *
 * @returns {string} The source code representation of the SVG element.
 */
function toSource () {
  const xml = new XMLSerializer();
  const str = xml.serializeToString(this.el);
 return str.replaceAll('<!-- ref -->', '');
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