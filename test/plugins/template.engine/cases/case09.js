export const title       = '9) g-for (<code>value of values</code>)';
export const description = 'g-for simple';

export async function script () {
  const svg = gSVG(document.querySelector('#svg'));
  await svg.render({
    values : [
      {cx : 25, cy : 25, color : 'red'},
      {cx : 50, cy : 50, color : 'green'},
      {cx : 75, cy : 75, color : 'blue'},
    ]
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
<pre id="result"></pre>`;
