export const title = '5) g-load and g-for with use';
export const description = `load an external SVG in a g-for with use`;

export async function script () {
  const svg = gSVG(document.querySelector('#svg'));
  await svg.render();
  svg.addEventListener('load', (evt) => {
    document.querySelector('#result').innerHTML = sourceFormat(svg.source());
  });
}

export default `<svg viewBox="0 0 500 50" id="svg" style="width: 500px; height: 100px">
  <defs g-load="$$.svg('/test/plugins/load/assets/image.svg').width(50).height(50).id('image')">
  </defs>
  <defs g-for="n of 10">
    <use g-bind:transform="$$.translate(n * 50, 0)" href="#image"/>
  </defs>
</svg>
<pre id="result"></pre>`;
