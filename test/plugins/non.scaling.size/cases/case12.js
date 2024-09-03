export const title       = '12) Resize and keep rotate rectangle aspect';
export const description = `resize an SVG an keep the rotate rectangle aspect`;

export function script () {
  const div = document.querySelector('#show');
  const svg = gSVG().viewBox(0, 0, 100, 100)
                    .preserveAspectRatio('none')
                    .width('100%').height('100%');
  const g   = svg.add('g').style.stroke('#000');
  const g2  = g.add('g').nonScalingSize();
  g2.add('rect')
    .x(20).y(20).width(10).height(10)
    .fill('none')
    .stroke_width(2)
    .transform.rotate(45, 25, 25);
  g.add('rect')
   .x(60).y(60).width(10).height(10)
   .fill('none')
   .stroke_width(2)
   .nonScalingSize()
   .transform.rotate(45, 65, 65);
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

