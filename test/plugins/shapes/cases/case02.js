export const title = '2) Shape circle';
export const description = `create a circle`;

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gSVG().viewBox('0 0 100 100').width(100).height(100)
  svg.add('path').stroke('black').stroke_width(3).fill('red')
     .d.circle(50, 50, 42);
  svg.add('rect').x(20).y(40).width(60).height(20).fill('white');
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
}

export default `<div id="show"></div>
<pre id="result"></pre>`;
