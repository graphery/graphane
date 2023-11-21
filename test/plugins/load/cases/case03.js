export const title = '3) load a simple SVG with $$.svg() and change width and height';
export const description = `load an external SVG with $$.svg().width().height()`;

export async function script () {
  const svg = gSVG(document.querySelector('#svg'));
  await svg.render();
  svg.querySelector('g').addEventListener('load', () => {
    document.querySelector('#result').innerHTML = sourceFormat(svg.source());
  });
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <g g-load="$$.svg('/test/plugins/load/assets/image.svg').width(50).height(50)"></g>
</svg>
<pre id="result"></pre>`;
