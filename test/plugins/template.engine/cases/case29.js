export const title       = '29) g-bind:d with shape plugin';
export const description = 'g-bind:d with shape plugin';

export async function script () {
  gSVG.install((await import('/src/plugins/shapes.js')).default);
  const svg = gSVG(document.querySelector('#svg'));
  svg.render();
}

export default `<svg id="svg" viewBox="0 0 300 300" width="300" height="300">
  <path g-bind:d="$$.barArc(150,150,125,50,180)"/>
</svg>
<pre id="result"></pre>`;
