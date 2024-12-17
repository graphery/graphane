export const title       = '22) g-for <code>(key, value) in obj</code>';
export const description = 'g-for with object';

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render({
    data : {
      a: {cx : 25, cy : 25, color : 'red'},
      b: {cx : 50, cy : 50, color : 'green'},
      c: {cx : 75, cy : 75, color : 'blue'},
    }
  });
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <g g-for="(value, key) in data">
    <circle   :id = '"circle_" + key'
              :cx = "value.cx" 
              :cy = "value.cy"
            :fill = "value.color"
                r = "25"></circle>
     <text g-content = "key" 
                  :x = "value.cx - 3" 
                  :y = "value.cy + 6"
                fill = "white"></text>
  </g>
</svg>
<pre id="result"></pre>`;
