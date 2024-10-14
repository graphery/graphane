export const title       = '44) camel case attribute';
export const description = 'g-bind:viewBox';

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render({
    values  : [
      {value: 25, color : 'red'},
      {value: 50, color : 'green'},
      {value: 75, color : 'blue'},
      {value: 45, color : 'violet'},
      {value: 67, color : 'lime'},
      {value: 150, color : 'orange'},
    ]
  });
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());
}

export default `<svg 
  g-bind:viewBox="[
    0, 
    0, 
    values.reduce((a, c) => a > c.value ? a : c.value, 0) + 10, 
    values.reduce((a, c) => a > c.value ? a : c.value, 0) + 10]" 
  id="svg" 
  style="width: 100px; height: 100px"
>
  <g g-for="r of values">
    <circle :cx   = "r.value" 
            :cy   = "r.value"
            :fill = "r.color"
            r     = "5">
    </circle>
  </g>
</svg>
<pre id="result"></pre>`;
