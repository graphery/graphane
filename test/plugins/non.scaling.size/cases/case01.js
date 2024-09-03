export const title       = '1) Resize and keep the text size';
export const description = `resize an SVG an keep the text size with nonScalingSize`;

export function script () {
  const div    = document.querySelector('#show');
  const svg    = gSVG().viewBox('0 0 100 100').width(100).height(100)
                       .style.border('1px solid black');
  svg.add('line').x1(0).x2(100).y1(0).y2(100).stroke('lightgrey').stroke_width(1);
  svg.add('line').x1(100).x2(0).y1(0).y2(100).stroke('lightgrey').stroke_width(1);
  const text   = svg.add('text').x(10).y(50).content('hello word')
                    .dominant_baseline('middle')
                    .style.fontFamily('sans-serif').style.fontSize('14px');
  text.nonScalingSize();
  svg.attachTo(div);
  document.querySelector('#change').addEventListener('click', () => {
    svg.width(svg.width() + 50);
    svg.height(svg.height() + 50);
  });
  document.querySelector('#minus').addEventListener('click', () => {
    svg.width(svg.width() - 50);
    svg.height(svg.height() - 50);
  });
  const result   = document.querySelector('#result');
  result.innerHTML = sourceFormat(svg.source());
  svg.addEventListener('resize', () => {
    result.innerHTML  = sourceFormat(svg.source());
  });

}

export default `<div id="show"></div>
<button id="change">up size</button> <button id="minus">down size</button>
<pre id="result"></pre>`;
