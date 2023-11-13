export const title       = '2) styleObserver in a sub element';
export const description = ` change sub element color with style-observer plugin `;

export function script () {
  const div     = document.querySelector('#show');
  const button = document.querySelector('#change');
  const check  = document.querySelector('#check');
  const code    = document.querySelector('#result');
  const svg     = gSVG().viewBox('0 0 100 100').width(100).height(100)
  const line1   = svg.add('line').x1(10).y1(10).x2(90).y2(90)
                     .style.stroke('black').style.stroke_width(10);
  svg.add('line').x1(10).y1(90).x2(90).y2(10).stroke('black').stroke_width(10);
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
  line1.styleObserver(['stroke'], (style) => {
    check.innerHTML = style.stroke.current === 'rgb(255, 0, 0)' ? 'ok' : '...';
  });
  button.addEventListener('click', () => {
    line1.style.stroke(line1.style.stroke() === 'black' ? 'red' : 'black');
    code.innerHTML = sourceFormat(svg.source());
  });
}

export default `<div id="show"></div>
<button id="change">change</button> <span id="check">...</span>
<pre id="result"></pre>`;
