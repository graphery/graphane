export const title       = '40) update g-for';
export const description = 'create a SVG and update';

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render({
    values : [
      {cx : 25, cy : 25, color : 'red'},
      {cx : 50, cy : 50, color : 'green'},
      {cx : 75, cy : 75, color : 'blue'},
    ]
  });
  document.querySelector('#update').addEventListener('click', () => {
    svg.render({
      values : [
        {cx : 75, cy : 25, color : 'red'},
        {cx : 50, cy : 50, color : 'green'},
        {cx : 25, cy : 75, color : 'blue'},
      ]
    });
    document.querySelector('#result').innerHTML = sourceFormat(svg.source());
  });
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <defs g-for="value of values">
    <circle :cx   = "value.cx" 
            :cy   = "value.cy"
            :fill = "value.color"
            r     = "25">
    </circle>
  </defs>
</svg>
<button id="update">update</button>
<pre id="result"></pre>`;