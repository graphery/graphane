export const title       = '6) Shape arc direction';
export const description = `create a bar with optional direction`;

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gSVG().viewBox('0 0 200 200').width(200)
  svg.add('circle').fill('red').cx(75).cy(100).r(50);
  const path = svg.add('path').fill('none').stroke_width(1).stroke('black').id('path');
  path.d.arc(75, 100, 60, -120, 60, 0);
  svg.add('text')
     .add('textPath').href(path.ref()).method('align').content('testing the path');
  svg.attachTo(div);
  code.innerHTML = div.innerHTML.replace(/</g, "&lt;");
}

export default `<div id="show"></div>
<pre id="result"></pre>`;