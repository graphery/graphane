export const title       = '4) Shape arc';
export const description = `create a bar`;

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gSVG().viewBox('0 0 200 500').width(200).height(200)
  svg.add('path').fill('none').stroke_width(10).stroke('black').d.arc(100, 250, 100, -85, 0)
  svg.add('path').fill('none').stroke_width(10).stroke('black').d.arc(100, 250, 100, 5, 90)
  svg.add('path').fill('none').stroke_width(10).stroke('black').d.arc(100, 250, 100, 95, 180)
  svg.add('path').fill('none').stroke_width(10).stroke('black').d.arc(100, 250, 100, 185, 270)
  svg.attachTo(div);
  code.innerHTML = div.innerHTML.replace(/</g, "&lt;");
}

export default `<div id="show"></div>
<pre id="result"></pre>`;
