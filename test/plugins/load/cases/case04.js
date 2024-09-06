export const title = '4) g-load and g-for';
export const description = `load an external SVG in a g-for`;

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render();
  svg.addEventListener('load', (evt) => {
    document.querySelector('#result').innerHTML = sourceFormat(svg.source());
  });
}

export default `<svg viewBox="0 0 500 50" id="svg" style="width: 500px; height: 100px"">
  <defs g-for="n of 10">
    <g g-bind:transform="$$.translate(n * 50, 0)" 
       g-load="$$.url('/test/plugins/load/assets/image.svg').width(50).height(50)"></g>
  </defs>
</svg>
<pre id="result"></pre>`;
