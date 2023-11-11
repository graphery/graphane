export const title       = '44) transform a square with string';
export const description = 'use .transform()';

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gSVG('svg').viewBox(0, 0, 100, 100).width(100).height(100);
  svg.add('rect')
     .x(10).y(10).width(90).height(90)
     .transform('translate(30,30) scale(0.3, 0.3)');
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
}

export default `<div id="show"></div>
<pre id="result"></pre>`;