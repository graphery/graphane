// 6) Wrap a gSVG element

export const description = `
(re)wrap an gSVG element
`;

export function script () {
  const div  = document.querySelector('div#show');
  const code = document.querySelector('#result');
  const svg1 = gSVG();
  const svg  = gSVG(svg1).viewBox(0, 0, 100, 100).width(100).height(100)
  svg.add('line').x1(10).y1(10).x2(90).y2(90).stroke('black').stroke_width(10);
  svg.add('line').x1(10).y1(90).x2(90).y2(10).stroke('black').stroke_width(10);
  svg.attachTo(div);
  code.innerHTML = div.innerHTML.replace(/</g, "&lt;");
}

export default `<div id="show"></div>
<pre id="result"></pre>`;
