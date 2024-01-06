export const title       = '15) animateTo() dx and dy with text';
export const description = 'move text attributes dx and dy';

export function script () {
  const div  = document.querySelector('#show');
  const run  = document.querySelector('#run');
  const code = document.querySelector('#result');
  const svg  = gSVG().viewBox(0, 0, 100, 100).width(100).height(100);
  const el = svg.add('text').dx(10).dy(10).rotate(0).fill('black').content('test');
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
  run.addEventListener('click', () => {
    el.animateTo(
      [
        {dx : 10, dy : 10},
        {dx : 70, dy : 10},
        {dx : 70, dy : 80},
        {dx : 10, dy : 80}
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
