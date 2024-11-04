export const title       = '4) triangle and circle';
export const description = `create a triangle with regularPolygon and a circle`;

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gSVG().viewBox('0 0 200 200').width(200)
  const path = svg.add('path').fill('none').stroke_width(1).stroke('black').id('path');
  path.d.regularPolygon(100, 100, 99, 3).circle(100, 100, 99);
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
}

export default `<div id="show"></div>
<pre id="result"></pre>`;
