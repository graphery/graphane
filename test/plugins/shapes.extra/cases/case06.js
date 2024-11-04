export const title       = '6) pentagon';
export const description = `create a pentagon with regularPolygon`;

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gSVG().viewBox('0 0 200 200').width(200)
  svg.add('circle').fill('red').cx(100).cy(100).r(100);
  const path = svg.add('path').fill('none').stroke_width(1).stroke('black').id('path');
  path.d.regularPolygon(100, 100, 100, 5);
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
}

export default `<div id="show"></div>
<pre id="result"></pre>`;
