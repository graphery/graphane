export const title       = '01) animateTo()';
export const description = 'move a circle with single frame, duration and start/end callbacks';

export function script () {
  const div    = document.querySelector('#show');
  const run    = document.querySelector('#run');
  const code   = document.querySelector('#result');
  const svg    = gSVG().viewBox(0, 0, 100, 100).width(100).height(100);
  const circle = svg.add('circle').cx(10).cy(10).r(10);
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
  run.addEventListener('click', () => {
    circle.animateTo(
      circle.cx() === 10 ? {cx : 90, cy : 90} : {cx : 10, cy : 10},
      1000,
      () => code.innerHTML = 'moving...',
      () => code.innerHTML = sourceFormat(svg.source())
    );
  });
}

export default `<div id="show"></div>
<button id="run">move</button>
<pre id="result"></pre>`;
