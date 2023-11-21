export const title       = '7) g-on';
export const description = 'bind event with g-on:click';

export function script () {
  const svg  = gSVG(document.querySelector('#svg'));
  const data = {
    position : [10, 10, 80, 80],
    color    : 'red',
    click () {
      if (data.position[0] === 10) {
        data.position = [20, 20, 60, 60];
      } else {
        data.position = [10, 10, 80, 80];
      }
      svg.render(data);
    }
  };
  svg.render(data);
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <rect :x         = "position[0]" 
        :y         = "position[1]" 
        :width     = "position[2]" 
        :height    = "position[3]" 
        :fill      = "color"
        style      = "cursor: pointer"
        g-on:click = "click">
  </rect>
</svg>
<pre id="result"></pre>`;
