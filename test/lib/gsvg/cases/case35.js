// 35) add a plugin

export const description = `
define and add a plugin
`;

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gSVG().viewBox(0, 0, 100, 100).width(100).height(100);
  svg.attachTo(div);
  gSVG.install((setup) => {
    setup.extendInstance(
      {
        test () {
          this.add('circle').cx(50).cy(50).r(40);
          return this;
        }
      }
    );
  });
  svg.add('g').test().fill('red');
  code.innerHTML = sourceFormat(svg.source());
}

export default `<div id="show"></div>
<pre id="result"></pre>`;
