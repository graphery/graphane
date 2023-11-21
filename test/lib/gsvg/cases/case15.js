// 15) create a circle and add

export const description = `
create a circle and add into the SVG element
`;

export function script () {
  const div    = document.querySelector('#show');
  const code   = document.querySelector('#result');
  const svg    = gSVG().viewBox(0, 0, 100, 100).width(100).height(100)
  const circle = gSVG('circle').cx(50).cy(50).r(40);
  svg.add(circle);
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
}

export default `<div id="show"></div>
<pre id="result"></pre>`;
