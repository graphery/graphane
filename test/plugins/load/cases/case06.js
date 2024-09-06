export const title = '6) g-load and text';
export const description = `load an external TXT`;

export async function script () {
  const svg = gSVG(document.querySelector('#svg'));
  await svg.render();
  svg.addEventListener('load', (evt) => {
    document.querySelector('#result').innerHTML = sourceFormat(svg.source());
  });
}

export default `<svg viewBox="0 0 500 50" id="svg" style="width: 500px; height: 100px">
  <text x="0" y="0" g-load="'/test/plugins/load/assets/text.txt'">hola, mundo</text>
</svg>
<pre id="result"></pre>`;
