// 10) attachTo an element into a SVG

export const description = `
add a line element by .attachTo method to a wrapped SVG'
`;

export function script () {
  const div   = document.querySelector('#show');
  const code  = document.querySelector('#result');
  const svg   = gSVG().viewBox(0, 0, 100, 100).width(100).height(100)
  const line1 = gSVG('line').x1(10).y1(10).x2(90).y2(90).stroke('black').stroke_width(10);
  const line2 = gSVG('line').x1(10).y1(90).x2(90).y2(10).stroke('black').stroke_width(10);
  line1.attachTo(svg);
  line2.attachTo(svg);
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
}

export default `<div id="show"></div>
<pre id="result"></pre>`;
