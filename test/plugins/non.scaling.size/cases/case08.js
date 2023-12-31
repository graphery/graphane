export const title       = '8) Resize and keep g stroke-width aspect';
export const description = `[DEPRECATED] resize an SVG an keep the line stroke-width aspect`;

export function script () {
  const div = document.querySelector('#show');
  const svg = gSVG().viewBox(0, 0, 100, 100)
                    .preserveAspectRatio('none')
                    .width('100%').height('100%');
  const g   = svg.add('g').style.stroke('#000');
  g.add('line')
   .x1(20).y1(20).x2(20).y2(30)
   .stroke_width(2)
   .keepAspect('stroke');
  g.add('line')
   .x1(20).y1(30).x2(30).y2(30)
   .stroke_width(2)
   .keepAspect('stroke');
  g.add('line')
   .x1(30).y1(30).x2(30).y2(20)
   .stroke_width(2)
   .keepAspect('stroke');
  g.add('line')
   .x1(30).y1(20).x2(20).y2(20)
   .stroke_width(2)
   .keepAspect('stroke');


  g.add('line')
   .x1(60).y1(60).x2(60).y2(70)
   .stroke_width(2)
  g.add('line')
   .x1(60).y1(70).x2(70).y2(70)
   .stroke_width(2)
  g.add('line')
   .x1(70).y1(70).x2(70).y2(60)
   .stroke_width(2)
  g.add('line')
   .x1(70).y1(60).x2(60).y2(60)
   .stroke_width(2)
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

