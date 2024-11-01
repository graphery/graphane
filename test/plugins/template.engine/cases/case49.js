export const title = '49) g-load with $$.fromURL() and g-for with use';
export const description = `load an external SVG and use in g-for`;

export async function script () {
  const svg = gSVG(document.querySelector('#svg'));
  await svg.render();
  svg.addEventListener('load', (evt) => {
    document.querySelector('#result').innerHTML = sourceFormat(svg.source());
  });
}

export default `<svg viewBox="0 0 500 50" id="svg" style="width: 500px; height: 100px">
  <defs g-content="$$.fromURL('/test/plugins/template.engine/assets/image.svg')"
        g-on:load="event => event.detail.querySelector('svg').width(50).height(50).id('image')">
  </defs>
  <g g-for="n of 10">
    <use g-bind:transform="$$.translate(n * 50, 0)" href="#image"/>
  </g>
</svg>
<pre id="result"></pre>`;
