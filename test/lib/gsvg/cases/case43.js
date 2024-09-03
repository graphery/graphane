export const title       = '43) Create SVG path with pseudo functions';
export const description = 'use .d.M().L()';

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gSVG('svg').viewBox(0, 0, 100, 100).width(100).height(100);
  svg.add('path').stroke('black').stroke_width(10).fill('none')
     .d.M(10,10).L(10,90).L(90,90).L(90,10).Z();
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
}

export default `<div id="show"></div>
<pre id="result"></pre>`;