export const title       = '09) animateTo() line simple';
export const description = 'move the x1, x2, y1 and y2 line attributes';

export function script () {
  const div  = document.querySelector('#show');
  const run  = document.querySelector('#run');
  const code = document.querySelector('#result');
  const svg  = gSVG().viewBox(0, 0, 100, 100).width(100).height(100);
  const line = svg.add('line').x1(10).y1(10).x2(10).y2(90).stroke('black');
  svg.attachTo(div);
  code.innerHTML = div.innerHTML.replace(/</g, "&lt;");
  run.addEventListener('click', () => {
    line.animateTo(
      {x1 : 90},
      1000,
      () => code.innerHTML = 'moving...',
      () => code.innerHTML = div.innerHTML.replace(/</g, "&lt;")
    );
  });
}

export default `<div id="show"></div>
<button id="run">move</button>
<pre id="result"></pre>`;
