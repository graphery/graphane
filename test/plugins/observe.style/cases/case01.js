export const title       = '1) Change SVG color';
export const description = ` change SVG color with style-observer plugin `;

export function script () {
  const div    = document.querySelector('#show');
  const button = document.querySelector('#change');
  const check  = document.querySelector('#check');
  const code   = document.querySelector('#result');
  const svg    = gSVG().viewBox('0 0 100 100').width(100).height(100)
                       .style.stroke('black').style.stroke_width(10);
  svg.add('line').x1(10).y1(10).x2(90).y2(90);
  svg.add('line').x1(10).y1(90).x2(90).y2(10);
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
  svg.styleObserver(['stroke'], (style) => {
    check.innerHTML = style.stroke.current === 'rgb(255, 0, 0)' ? 'ok' : '...';
  });
  button.addEventListener('click', () => {
    svg.style.stroke(svg.style.stroke() === 'black' ? 'red' : 'black');
    code.innerHTML = sourceFormat(svg.source());
  });
}

export default `<div id="show"></div>
<button id="change">change</button> <span id="check">...</span>
<pre id="result"></pre>`;
