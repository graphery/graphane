export const title       = '39) Update the template';
export const description = 'create a SVG and update with new the data';

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render({
    x      : 10,
    y      : 10,
    width  : 80,
    height : 80,
    color  : 'red'
  });
  document.querySelector('#update').addEventListener('click', () => {
    svg.render({
      x      : 20,
      y      : 20,
      width  : 40,
      height : 40,
      color  : 'blue'
    });
    document.querySelector('#result').innerHTML = sourceFormat(svg.source());
  });
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <rect :x="x" :y="y" :width="width" :height="height" :fill="color"></rect>
</svg>
<button id="update">update</button>
<pre id="result"></pre>`;
