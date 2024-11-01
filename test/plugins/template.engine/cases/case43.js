export const title       = '43) g-if with g-for';
export const description = 'conditional loop';

export function script () {
  const svg   = gSVG(document.querySelector('#svg'));
  let display = true;
  svg.render({
    display,
    values  : [
      {cx : 25, cy : 25, color : 'red'},
      {cx : 50, cy : 50, color : 'green'},
      {cx : 75, cy : 75, color : 'blue'},
    ]
  });
  document.querySelector('#update').addEventListener('click', () => {
    display = !display;
    svg.render({
      display,
      values  : [
        {cx : 25, cy : 25, color : 'red'},
        {cx : 50, cy : 50, color : 'green'},
        {cx : 75, cy : 75, color : 'blue'},
      ]
    });
    document.querySelector('#result').innerHTML = sourceFormat(svg.source());
  });
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <g g-if="display" >
    <g g-for="value of values">
      <circle :cx   = "value.cx" 
              :cy   = "value.cy"
              :fill = "console.log('fill') || value.color"
              r     = "25">
      </circle>
    </g>
  </g>
</svg>
<button id="update">update</button>
<pre id="result"></pre>`;
