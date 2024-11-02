export const title       = '7) spiral';
export const description = `create an spiral`;

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gSVG().viewBox('0 0 200 200').width(200)
  svg.add('circle').fill('black').cx(100).cy(100).r(100);
  const path = svg.add('path').fill('none').stroke_width(2).stroke('white').id('path');
  path.d.spiral(100, 100, 10, 100, 0, 360 * 10);
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
}

export default `<div id="show"></div>
<pre id="result"></pre>`;
