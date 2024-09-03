export const title       = '10) animateTo() line with incomplete offset';
export const description = 'move the x1, x2, y1 and y2 line attributes with offset';

export function script () {
  const div  = document.querySelector('#show');
  const run  = document.querySelector('#run');
  const code = document.querySelector('#result');
  const svg  = gSVG().viewBox(0, 0, 100, 100).width(100).height(100);
  const line = svg.add('line').x1(10).y1(10).x2(10).y2(90).stroke('black');
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
  run.addEventListener('click', () => {
    line.animateTo(
      [
        {y1 : 10},
        {y1 : 90, stroke : 'red', offset : 0.2},
        {x1 : 90, x2 : 10, y2 : 90, stroke : line.stroke()}
      ],
      {duration : 1000},
      () => code.innerHTML = 'moving...',
      () => code.innerHTML = sourceFormat(svg.source())
    );
  });
}

export default `<div id="show"></div>
<button id="run">move</button>
<pre id="result"></pre>`;
