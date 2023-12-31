export const title       = '2) Resize and keep circle aspect';
export const description = `resize an SVG an keep the circle radius and stroke with nonScalingSize`;

export function script () {
  const div = document.querySelector('#show');
  const svg = gSVG().viewBox(0, 0, 100, 100)
                    .preserveAspectRatio('none')
                    .width('100%').height('100%');
  const g   = svg.add('g').style.stroke('#000');
  g.add('circle')
               .cx(30).cy(30).r(10)
               .fill('none')
               .stroke_width(5)
               .nonScalingSize();
  g.add('circle')
   .cx(60).cy(60).r(10)
   .fill('none')
   .stroke_width(5);
  svg.attachTo(div);
  document.querySelector('#change').addEventListener('click', () => {
    div.style.width  = (Number.parseInt(div.style.width) + 50) + 'px';
    div.style.height = (Number.parseInt(div.style.height) + 50) + 'px';
  });
  document.querySelector('#minus').addEventListener('click', () => {
    div.style.width  = (Number.parseInt(div.style.width) - 50) + 'px';
    div.style.height = (Number.parseInt(div.style.height) - 50) + 'px';
  });
  const result   = document.querySelector('#result');
  result.innerHTML = sourceFormat(svg.source());
  svg.addEventListener('resize', () => {
    result.innerHTML  = sourceFormat(svg.source());
  });
}

export default `
<div id="show" style="width:100px; height: 100px"></div>
<button id="change">up size</button> <button id="minus">down size</button>
<pre id="result"></pre>
`;

