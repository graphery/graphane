// 11) attachTo an element into a no wrapped SVG

export const description = `
add a line element by .attachTo method to a no wrapped SVG'
`;

export function script () {
  const div   = document.querySelector('#show');
  const code  = document.querySelector('#result');
  const line1 = gSVG('line').x1(10).y1(10).x2(90).y2(90).stroke('black').stroke_width(10);
  const line2 = gSVG('line').x1(10).y1(90).x2(90).y2(10).stroke('black').stroke_width(10);
  line1.attachTo('#show svg');
  line2.attachTo('#show svg');
  const svg   = div.querySelector('svg');
  code.innerHTML = sourceFormat(svg.outerHTML);
}

export default `<div id="show"><svg viewBox="0,0,100,100" width="100" height="100"></svg></div>
<pre id="result"></pre>`;
