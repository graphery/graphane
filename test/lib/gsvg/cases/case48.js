export const title       = '48) promise support';
export const description = 'a promise return a gSVG object';

export async function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = await gSVG().viewBox('0,0,100,100').width(100).height(100)
  await svg.add('line').x1(10).y1(10).x2(90).y2(90).stroke('black').stroke_width(10);
  await svg.add('line').x1(10).y1(90).x2(90).y2(10).stroke('black').stroke_width(10);
  await svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
}

export default `<div id="show"></div>
<pre id="result"></pre>`;