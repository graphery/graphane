export const title       = '23) g-bing of <code>svg</code>';
export const description = 'g-bind with svg element';

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render({
    viewBox: '0 0 100 100',
    data : ['red', 'green', 'blue', 'orange']
  });
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());
}

export default `<svg id="svg" 
     :viewBox="[0, 0, (data.length + 1) * 25, (data.length + 1) * 25]" 
     :style="{
      width: ((data.length + 1) * 25) + 'px', 
      height: ((data.length + 1) * 25) + 'px'
     }" 
     style="border: 1px solid black">
  <g g-for="(color, idx) of data">
    <circle   :id = '"circle_" + idx'
              :cx = "(idx + 1) * 25" 
              :cy = "(idx + 1) * 25"
            :fill = "color"
                r = "25"></circle>
     <text g-content = "idx" 
                  :x = "((idx + 1) * 25) - 3" 
                  :y = "((idx + 1) * 25) + 6"
                fill = "white"></text>
  </g>
</svg>
<pre id="result"></pre>`;
