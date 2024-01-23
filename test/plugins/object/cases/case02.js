export const title       = '2) fromObject';
export const description = `set an object from SVG object structure`;

export async function script () {
  const result = document.querySelector('#result');
  const svg    = gSVG(document.querySelector('#svg'));
  const obj = {
    "_$children": [
      {
        "_$tag": "rect",
        "_$children": [],
        "x": 30,
        "y": 30,
        "width": 30,
        "height": 30,
        "fill": "blue"
      }
    ]
  }
  result.innerHTML = JSON.stringify(obj, null, 2);
  svg.fromObject(obj);
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
</svg>
<pre id="result"></pre>`;
