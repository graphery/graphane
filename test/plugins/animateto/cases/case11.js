export const title       = '11) animateTo() width and height';
export const description = 'move rect attributes x, y, width and height';

export function script () {
  const div  = document.querySelector('#show');
  const run  = document.querySelector('#run');
  const code = document.querySelector('#result');
  const svg  = gSVG().viewBox(0, 0, 100, 100).width(100).height(100);
  const line = svg.add('rect').x(0).y(0).width(40).height(40).fill('black');
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
  run.addEventListener('click', () => {
    line.animateTo(
      [
        {x: 0,  y: 0,  width: 40, height: 40},
        {x: 90, y: 0,  width: 10, height: 10},
        {x: 60, y: 60, width: 40, height: 40},
        {x: 0,  y: 90, width: 10, height: 10},
        {x: 0,  y: 0,  width: 40, height: 40}
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
