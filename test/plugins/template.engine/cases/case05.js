export const title       = '5) g-bind';
export const description = 'bind attributes with g-bind';

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render({
    position : [10, 10, 80, 80],
    color    : 'red'
  });
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <rect g-bind:x      = "position[0]" 
        g-bind:y      = "position[1]" 
        g-bind:width  = "position[2]" 
        g-bind:height = "position[3]" 
        g-bind:fill   = "color">
  </rect>
</svg>
<pre id="result"></pre>`;
