export const title = '6) <code>:</code> (g-bind alias)';
export const description = 'bind attributes with :';

export function script () {
const svg = gSVG(document.querySelector('#svg'));
  svg.render({
    position: [10, 10, 80, 80],
    color  : 'red'
  });
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <rect :x      = "position[0]" 
        :y      = "position[1]" 
        :width  = "position[2]" 
        :height = "position[3]" 
        :fill   = "color">
  </rect>
</svg>
<pre id="result"></pre>`;
