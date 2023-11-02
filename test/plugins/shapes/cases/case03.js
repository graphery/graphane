export const title = '3) Shape barArc';
export const description = `create a bar`;

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gSVG().viewBox('0 0 200 500').width(200).height(200)
  svg.add('path').d.barArc(100, 250, 100, 10, -85, 0)
  svg.add('path').d.barArc(100, 250, 105, 20, 5, 90)
  svg.add('path').d.barArc(100, 250, 110, 30, 95, 180)
  svg.add('path').d.barArc(100, 250, 115, 40, 185, 270)
  svg.attachTo(div);
  code.innerHTML = div.innerHTML.replace(/</g, "&lt;");
}

export default `<div id="show"></div>
<pre id="result"></pre>`;
