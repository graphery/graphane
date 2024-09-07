export const title = '50) g-load with $$.fromURL() and text file';
export const description = `load an external TXT file`;

export async function script () {
  const svg = gSVG(document.querySelector('#svg'));
  await svg.render();
  svg.addEventListener('load', (evt) => {
    document.querySelector('#result').innerHTML = sourceFormat(svg.source());
  });
}

export default `<svg viewBox="0 0 500 50" id="svg" style="width: 500px; height: 100px">
  <text x="0" y="10" g-content="$$.fromURL('/test/plugins/template.engine/assets/text.txt')">...</text>
</svg>
<pre id="result"></pre>`;
