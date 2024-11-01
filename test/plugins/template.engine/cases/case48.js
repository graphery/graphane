export const title = '48) g-load with $$.fromURL() in g-for';
export const description = `load an external SVG in a g-for`;

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render();
  svg.addEventListener('load', (evt) => {
    document.querySelector('#result').innerHTML = sourceFormat(svg.source());
  });
}

export default `<svg viewBox="0 0 500 50" id="svg" style="width: 500px; height: 100px"">
  <g g-for="n of 10">
    <g g-bind:transform="$$.translate(n * 50, 0)" 
       g-content="$$.fromURL('/test/plugins/template.engine/assets/image.svg')"
       g-on:load="event => event.detail.querySelector('svg').width(50).height(50)"></g>
  </g>
</svg>
<pre id="result"></pre>`;
