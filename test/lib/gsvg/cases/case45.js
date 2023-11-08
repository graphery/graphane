export const title       = '45) transform a square with pseudo functions';
export const description = 'use .transform.translate().scale()';

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gSVG('svg').viewBox(0, 0, 100, 100).width(100).height(100);
  svg.add('rect')
     .x(10).y(10).width(90).height(90)
     .transform.translate(30,30).scale(0.3, 0.3);
  svg.attachTo(div);
  code.innerHTML = div.innerHTML.replace(/</g, "&lt;");
}

export default `<div id="show"></div>
<pre id="result"></pre>`;