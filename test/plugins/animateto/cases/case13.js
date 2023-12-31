export const title       = '13) animateTo() rx and ry';
export const description = 'move rect attributes rx and ry';

export function script () {
  const div  = document.querySelector('#show');
  const run  = document.querySelector('#run');
  const code = document.querySelector('#result');
  const svg  = gSVG().viewBox(0, 0, 100, 100).width(100).height(100);
  const line = svg.add('rect').x(20).y(20).width(60).height(60).fill('black');
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
  run.addEventListener('click', () => {
    line.animateTo(
      [
        {rx: 0,  ry: 0},
        {rx: 40, ry: 10},
        {rx: 40, ry: 40},
        {rx: 10,  ry: 40},
        {rx: 0,  ry: 0}
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
