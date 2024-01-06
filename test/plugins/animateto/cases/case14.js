export const title       = '14) animateTo() x and y with text';
export const description = 'move text attributes x and y';

export function script () {
  const div  = document.querySelector('#show');
  const run  = document.querySelector('#run');
  const code = document.querySelector('#result');
  const svg  = gSVG().viewBox(0, 0, 100, 100).width(100).height(100);
  const el = svg.add('text').x(10).y(10).fill('black').content('test');
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
  run.addEventListener('click', () => {
    el.animateTo(
      [
        {x : 10, y : 10},
        {x : 70, y : 10},
        {x : 70, y : 80},
        {x : 10, y : 80}
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
