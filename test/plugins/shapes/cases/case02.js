export const title = '2) Shape barArc';
export const description = `create a bar`;

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gSVG().viewBox('0 0 200 500').width(200).height(200)
  svg.add('path').d.barArc(100, 250, 95, 10, -85, 0)
  svg.add('path').d.barArc(100, 250, 95, 20, 85, 5)
  svg.add('path').d.barArc(100, 250, 95, 30, 85, 95)
  svg.add('path').d.barArc(100, 250, 95, 40, -85, 270)
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
}

export default `<div id="show"></div>
<pre id="result"></pre>`;
