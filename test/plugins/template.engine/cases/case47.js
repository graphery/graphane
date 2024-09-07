export const title = '47) g-content with $$.fromURL() and g-on:load';
export const description = `load an external SVG and configure width and height`;

export async function script () {
  const svg = gSVG(document.querySelector('#svg'));
  await svg.render();
  svg.querySelector('g').addEventListener('load', () => {
    document.querySelector('#result').innerHTML = sourceFormat(svg.source());
  });
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <g g-content="$$.fromURL('/test/plugins/template.engine/assets/image.svg')" 
     g-on:load="(ev) => ev.detail.querySelector('svg').width(50).height(50)"></g>
</svg>
<pre id="result"></pre>`;
