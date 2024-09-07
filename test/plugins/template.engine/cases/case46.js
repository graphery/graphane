export const title = '46) g-content with $$.fromURL() and $$.currentContent()';
export const description = `load an external SVG with $$.svg()`;

export async function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render();
  svg.querySelector('g').addEventListener('load', () => {
    document.querySelector('#result').innerHTML = sourceFormat(svg.source());
  });
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <g g-content="$$.fromURL($$.currentContent().trim())">
    /test/plugins/template.engine/assets/image.svg
  </g>
</svg>
<pre id="result"></pre>`;
