export const title       = '1) formal SVG source';
export const description = `create a very simple SVG element vs .source()`;

export function script () {
  const div   = document.querySelector('#show');
  const code  = document.querySelector('#result');
  const code2 = document.querySelector('#result2');
  const svg   = gSVG().viewBox('0,0,100,100').width(100).height(100)
  svg.add('line').x1(10).y1(10).x2(90).y2(90).stroke('black').stroke_width(10);
  svg.add('line').x1(10).y1(90).x2(90).y2(10).stroke('black').stroke_width(10);
  svg.attachTo(div);
  code.innerHTML  = sourceFormat(svg.toSource());
  code2.innerHTML = sourceFormat(svg.source());
}

export default `<div id="show"></div>
<pre id="result"></pre>
<pre id="result2"></pre>`;
