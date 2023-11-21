export const title = '2) load a simple SVG with $$.svg()';
export const description = `load an external SVG with $$.svg()`;

export async function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render();
  svg.querySelector('g').addEventListener('load', () => {
    document.querySelector('#result').innerHTML = sourceFormat(svg.source());
  });
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <g g-load="$$.svg('/test/plugins/load/assets/image.svg')"></g>
</svg>
<pre id="result"></pre>`;
