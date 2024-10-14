export const title       = '21) g-bind:transform with functions';
export const description = '<code>:transform="translate() + scale()</code> with functions';

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render();
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <g g-for="n of 5">
    <rect x="10" y="10" width="80" height="80" :transform="$$.translate(n * 20, 0).scale(0.2, (n * 0.2) + 0.1)"></rect>
  </g>
</svg>
<pre id="result"></pre>`;