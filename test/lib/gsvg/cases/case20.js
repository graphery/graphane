// 20) children()

export const description = `
children return an array of wrapped elements
`;

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gSVG().viewBox(0, 0, 100, 100).width(100).height(100)
  svg.add('circle');
  svg.add('circle');
  svg.add('circle');
  svg.add('circle');
  svg.children().forEach((circle, n) => {
    const r = (n + 1) * 10
    circle.cx(50).cy(50).r(r).fill('none').stroke('black');
  });
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
}

export default `<div id="show"></div>
<pre id="result"></pre>`;
