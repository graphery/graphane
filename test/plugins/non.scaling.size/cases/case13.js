export const title       = '13) Resize and keep translate rectangle aspect';
export const description = `resize an SVG an keep the translate rectangle aspect with an auxiliar G`;

export function script () {
  const div = document.querySelector('#show');
  const svg = gSVG().viewBox(0, 0, 100, 100)
                    .preserveAspectRatio('none')
                    .width('100%').height('100%');
  const g = svg.add('g').style.stroke('#000');
  const g1   = g.add('g').nonScalingSize();
  g1.add('rect')
    .x(0).y(0).width(10).height(10)
    .fill('none')
    .stroke_width(2)
    .transform.rotate(45,25,25).translate(20, 20);
  const g2   = g.add('g').nonScalingSize();
  g2.add('rect')
   .x(0).y(0).width(10).height(10)
   .fill('none')
   .stroke_width(2)
   .transform.rotate(45,65,65).translate(60, 60);
  svg.attachTo(div);
  document.querySelector('#change').addEventListener('click', () => {
    div.style.width  = (Number.parseInt(div.style.width) + 50) + 'px';
    div.style.height = (Number.parseInt(div.style.height) + 50) + 'px';
  });
  document.querySelector('#minus').addEventListener('click', () => {
    div.style.width  = (Number.parseInt(div.style.width) - 50) + 'px';
    div.style.height = (Number.parseInt(div.style.height) - 50) + 'px';
  });
  const result     = document.querySelector('#result');
  result.innerHTML = sourceFormat(svg.source());
  svg.addEventListener('resize', () => {
    result.innerHTML = sourceFormat(svg.source());
  });
}

export default `
<div id="show" style="width:100px; height: 100px"></div>
<button id="change">up size</button> <button id="minus">down size</button>
<pre id="result"></pre>
`;

