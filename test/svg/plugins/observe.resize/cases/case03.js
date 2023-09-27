export const title       = '3) Resize an SVG fire an event';
export const description = `resize an SVG with resize-observer plugin fire an event`;

export function script () {
  const div    = document.querySelector('#show');
  const button = document.querySelector('#change');
  const check  = document.querySelector('#check');
  const code   = document.querySelector('#result');
  const svg    = gSVG().viewBox('0 0 100 100').width(100).height(100)
  svg.add('line').x1(10).y1(10).x2(90).y2(90).stroke('black').stroke_width(10);
  svg.add('line').x1(10).y1(90).x2(90).y2(10).stroke('black').stroke_width(10);
  svg.attachTo(div);
  code.innerHTML = div.innerHTML.replace(/</g, "&lt;");
  svg.resizeObserver();
  svg.addEventListener('resize', (evt) => {
    const {currentMatrix, prevMatrix} = event.detail;
    check.innerHTML     = currentMatrix.a === 0.5 && prevMatrix.a === 1 ? 'ok' : '...';
    code.innerHTML  = div.innerHTML.replace(/</g, "&lt;");
  });
  button.addEventListener('click', () => {
    if (svg.width() === 100) {
      svg.width(50).height(50);
    } else {
      svg.width(100).height(100);
    }
  });
}

export default `<div id="show"></div>
<button id="change">change</button> <span id="check">...</span>
<pre id="result"></pre>`;
