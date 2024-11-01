export const title       = '10) g-for (<code>(value, idx) of values</code>)';
export const description = 'g-for with index';

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render({
    values : [
      {cx : 25, cy : 25, color : 'red'},
      {cx : 50, cy : 50, color : 'green'},
      {cx : 75, cy : 75, color : 'blue'},
    ]
  });
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <g g-for="(value, idx) of values">
    <circle   :id = '"circle" + idx'
              :cx = "value.cx" 
              :cy = "value.cy"
            :fill = "value.color"
                r = "25"></circle>
     <text g-content = "idx + 1" 
                  :x = "value.cx - 3" 
                  :y = "value.cy + 6"
                fill = "white"></text>
  </g>
</svg>
<pre id="result"></pre>`;
