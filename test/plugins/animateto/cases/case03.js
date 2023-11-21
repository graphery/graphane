export const title       = '03) animateTo() style property'
export const description = 'move a circle with single frame, duration and start/end callbacks ';

export function script () {
  const div  = document.querySelector('#show');
  const run  = document.querySelector('#run');
  const code = document.querySelector('#result');
  const svg  = gSVG().viewBox(0, 0, 100, 100).width(100).height(100);
  const text = svg.add('text').x(0).y(50).content('hello world');
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
  run.addEventListener('click', () => {
    text.animateTo(
      window.getComputedStyle(text.el).textShadow !== 'rgb(255, 0, 0) 2px 2px 2px' ?
        {textShadow : 'rgb(255, 0, 0) 2px 2px 2px'} :
        {textShadow : 'none'},
      1000,
      () => code.innerHTML = 'moving...',
      () => code.innerHTML = sourceFormat(svg.source())
    );
  });
}

export default `<div id="show"></div>
<button id="run">move</button>
<pre id="result"></pre>`;
