export const title       = '4) Shape arc direction';
export const description = `create a bar with optional direction`;

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gSVG().viewBox('0 0 200 200').width(200)
  svg.add('circle').fill('red').cx(75).cy(100).r(50);
  const path = svg.add('path').fill('none').stroke_width(1).stroke('black').id('path');
  path.d.arc(75, 100, 60, -180, 240);
  svg.add('text')
     .add('textPath').href(path.ref()).method('align').content('testing the path');
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
}

export default `<div id="show"></div>
<pre id="result"></pre>`;
