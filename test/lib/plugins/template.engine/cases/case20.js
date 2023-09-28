export const title = '20) g-bind update render';
export const description = 'g-bind update values and render again';

export function script () {
const svg = gSVG(document.querySelector('#svg'));
  svg.render({
    values: [
      {cx: 20, cy: 20, color: 'red'},
      {cx: 50, cy: 50, color: 'green'},
      {cx: 80, cy: 80, color: 'blue'},
    ]
  });
  svg.render({
    values: [
      {cx: 80, cy: 20, color: 'red'},
      {cx: 50, cy: 50, color: 'green'},
      {cx: 20, cy: 80, color: 'blue'},
    ]
  });
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
<circle :id   = '"circle1"'
   :cx   = "values[0].cx"
   :cy   = "values[0].cy"
   r     = "10"
   :fill = "values[0].color"/>
<circle :id   = '"circle2"'
   :cx   = "values[1].cx"
   :cy   = "values[1].cy"
   r     = "10"
   :fill = "values[1].color"/>
<circle :id   = '"circle3"'
   :cx   = "values[2].cx"
   :cy   = "values[2].cy"
   r     = "10"
   :fill = "values[2].color"/>
</svg>
<pre id="result"></pre>`;