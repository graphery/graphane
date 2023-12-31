export const title       = '7) Resize and keep g size aspect';
export const description = `resize an SVG an keep the g size aspect`;

export function script () {
  const div = document.querySelector('#show');
  const svg = gSVG().viewBox(0, 0, 100, 100)
                    .preserveAspectRatio('none')
                    .width('100%').height('100%');
  const g1   = svg.add('g').style.stroke('#000').stroke_width(2).nonScalingSize();
  g1.add('line')
   .x1(20).y1(20).x2(20).y2(30);
  g1.add('line')
   .x1(20).y1(30).x2(30).y2(30);
  g1.add('line')
   .x1(30).y1(30).x2(30).y2(20);
  g1.add('line')
   .x1(30).y1(20).x2(20).y2(20);

  const g2   = svg.add('g').style.stroke('#000').stroke_width(2);
  g2.add('line')
   .x1(60).y1(60).x2(60).y2(70);
  g2.add('line')
   .x1(60).y1(70).x2(70).y2(70);
  g2.add('line')
   .x1(70).y1(70).x2(70).y2(60);
  g2.add('line')
   .x1(70).y1(60).x2(60).y2(60);
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

