export const title       = '10) Resize and keep line aspect (stroke-width)';
export const description = `[DEPRECATED] resize an SVG an keep the line stroke-width`;

export function script () {
  const div    = document.querySelector('#show');
  const svg    = gSVG().viewBox(0, 0, 100, 100)
                       .preserveAspectRatio('none')
                       .width('100%').height('100%');
  const gLines = svg.add('g').style.stroke('#000').stroke_width(5);
  const l1     = gLines.add('line')
                       .x1(10).x2(90)
                       .y1(10).y2(90)
                       .stroke_width(10);
  const l2     = gLines.add('line')
                       .x1(90).x2(10)
                       .y1(10).y2(90)
                       .style.strokeWidth(10);
  const l3     = gLines.add('line')
                       .x1(0).x2(100)
                       .y1(50).y2(50);
  const l4     = gLines.add('line')
                       .x1(50).x2(50)
                       .y1(0).y2(100);
  l1.keepAspect('stroke');
  l2.keepAspect('stroke');
  l3.keepAspect('stroke');
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

