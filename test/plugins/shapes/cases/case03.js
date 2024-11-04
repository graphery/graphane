export const title       = '3) Shape arc';
export const description = `create a bar`;

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gSVG().viewBox('0 0 200 500').width(200).height(200)
  svg.add('path').fill('none').stroke_width(10).stroke('black').d.arc(100, 250, 100, 50, 0)
  svg.add('path').fill('none').stroke_width(10).stroke('black').d.arc(100, 250, 100, 60, 90)
  svg.add('path').fill('none').stroke_width(10).stroke('black').d.arc(100, 250, 100, 70, 180)
  svg.add('path').fill('none').stroke_width(10).stroke('black').d.arc(100, 250, 100, 80, 270)
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
}

export default `<div id="show"></div>
<pre id="result"></pre>`;
