export const title       = '07) .toSource() with several defs';
export const description = 'code with one regular defs and one defs g-for';


export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render({
    data : {
      a: {cx : 25, cy : 25, color : 'red'},
      b: {cx : 50, cy : 50, color : 'green'},
      c: {cx : 75, cy : 75, color : 'blue'},
    }
  });
  document.querySelector('#result').innerHTML = sourceFormat(svg.toSource());
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <defs>
    <circle id="test" r="25"></circle>
  </defs>
  <g g-for="(value, key) in data">
    <use
       href = "#test"
        :id = '"circle_" + key'
        :x = "value.cx" 
        :y = "value.cy"
      :fill = "value.color"
         ></use>
     <text g-content = "key" 
                  :x = "value.cx - 3" 
                  :y = "value.cy + 6"
                fill = "white"></text>
  </g>
</svg>
<pre id="result"></pre>`;
