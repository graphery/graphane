export const title       = '3) g-object';
export const description = `set an object from SVG object structure`;

export async function script () {
  const result = document.querySelector('#result');
  const svg    = gSVG(document.querySelector('#svg'));
  const obj = {
    "_$children": [
      {
        "_$tag": "rect",
        "_$children": [],
        "x": 20,
        "y": 20,
        "width": 80,
        "height": 80,
        "fill": "green"
      }
    ]
  }
  await svg.render({obj});
  result.innerHTML = sourceFormat(svg.source());
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <g g-object="obj"></g>
</svg>
<pre id="result"></pre>`;
