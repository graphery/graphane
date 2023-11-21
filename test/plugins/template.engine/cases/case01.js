export const title       = '1) Create SVG by template';
export const description = 'create a very simple SVG template';

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render({
    x      : 10,
    y      : 10,
    width  : 80,
    height : 80,
    color  : 'red'
  });
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <rect :x="x" :y="y" :width="width" :height="height" :fill="color"></rect>
</svg>
<pre id="result"></pre>`;
