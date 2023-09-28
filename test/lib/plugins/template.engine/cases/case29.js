export const title       = '29) g-bind:d with shape plugin';
export const description = 'g-bind:d with shape plugin';

export async function script () {
  await gSVG.install('/src/lib/plugins/gsvg.shapes.js');
  const svg = gSVG(document.querySelector('#svg'));
  svg.render();
}

export default `<svg id="svg" viewBox="0 0 300 300" width="300" height="300">
  <path g-bind:d="$.d.barArc(150,150,150,50,0,180)"/>
</svg>
<pre id="result"></pre>`;
