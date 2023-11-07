export const title       = '42) Create SVG path with string';
export const description = 'use .d("...")';

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gSVG('svg').viewBox(0, 0, 100, 100).width(100).height(100);
  svg.add('path').stroke('black').stroke_width(10).fill('none')
     .d("M10,10L10,90L90,90L90,10Z");
  svg.attachTo(div);
  code.innerHTML = div.innerHTML.replace(/</g, "&lt;");
}

export default `<div id="show"></div>
<pre id="result"></pre>`;