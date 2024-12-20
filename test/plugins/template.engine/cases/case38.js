export const title       = '38) .source()';
export const description = 'the plugin rewrite svg.toSource() method for remove <code>g g-for</code>';


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
