export const title       = '1) toObject';
export const description = `extract an object with SVG structure`;

export async function script () {
  const result = document.querySelector('#result');
  const svg    = gSVG(document.querySelector('#svg'));
  result.innerHTML = JSON.stringify(svg.toObject(), null, 2);
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <g fill="orange">
    <rect x="40" y="40" width="20" height="20"/>
  </g>
</svg>
<pre id="result"></pre>`;
