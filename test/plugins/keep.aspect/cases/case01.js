export const title       = '1) Resize and keep the text size';
export const description = `resize an SVG an keep the text size with keepAspect`;

export function script () {
  const div    = document.querySelector('#show');
  const button = document.querySelector('#change');
  const code   = document.querySelector('#result');
  const svg    = gSVG().viewBox('0 0 100 100').width(200).height(200)
                       .style.border('1px solid black');
  const text   = svg.add('text').x(10).y(50).content('hello word')
                    .style.fontFamily('sans-serif').style.fontSize('14px');
  text.keepAspect(true);
  svg.attachTo(div);
  code.innerHTML = div.innerHTML.replace(/</g, "&lt;");
  svg.resizeObserver((current, prev) => {
    code.innerHTML  = div.innerHTML.replace(/</g, "&lt;");
  });
  button.addEventListener('click', () => {
    if (svg.width() === 200) {
      svg.width(100).height(100);
    } else {
      svg.width(200).height(200);
    }
  });
}

export default `<div id="show"></div>
<button id="change">change</button>
<pre id="result"></pre>`;
