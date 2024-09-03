export const title       = '12) cicle animateTo() cx, cy and r';
export const description = 'move circle attributes cx, cy, and r';

export function script () {
  const div  = document.querySelector('#show');
  const run  = document.querySelector('#run');
  const code = document.querySelector('#result');
  const svg  = gSVG().viewBox(0, 0, 100, 100).width(100).height(100);
  const circle = svg.add('circle').cx(10).cy(10).r(10).fill('black').stroke('red').stroke_width(1);
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
  run.addEventListener('click', () => {
    circle.animateTo(
      [
        {cx: 10,  cy: 10,  r: 10, strokeWidth: 1, stroke: 'red'},
        {cx: 90, cy: 0,  r: 40, strokeWidth: 10, stroke: 'blue'},
        {cx: 60, cy: 60, r: 10, strokeWidth: 1, stroke: 'red'},
        {cx: 0,  cy: 90, r: 40, strokeWidth: 10, stroke: 'blue'},
        {cx: 10,  cy: 10,  r: 10, strokeWidth: 1, stroke: 'red'}
      ],
      {duration : 2000},
      () => code.innerHTML = 'moving...',
      () => code.innerHTML = sourceFormat(svg.source())
    );
  });
}

export default `<div id="show"></div>
<button id="run">move</button>
<pre id="result"></pre>`;
