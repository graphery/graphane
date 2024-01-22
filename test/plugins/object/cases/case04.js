export const title       = '4) g-object width attributes';
export const description = `set an object from SVG object `;

export async function script () {
  const result = document.querySelector('#result');
  const svg    = gSVG(document.querySelector('#svg'));
  const obj = {
    "x": 10,
    "y": 10,
    "width": 90,
    "height": 90,
    "fill": "red"
  };
  await svg.render({obj});
  result.innerHTML = sourceFormat(svg.source());
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <rect g-object="obj"></rect>
</svg>
<pre id="result"></pre>`;
