export const title = '7) g-content';
export const description = `previous behaviour`;

export async function script () {
  const svg = gSVG(document.querySelector('#svg'));
  await svg.render();
  svg.addEventListener('load', (evt) => {
    document.querySelector('#result').innerHTML = sourceFormat(svg.source());
  });
}

export default `<svg viewBox="0 0 500 50" id="svg" style="width: 500px; height: 100px">
  <text x="0" y="0" g-content="'/test/plugins/load/assets/text.txt'">hola, mundo</text>
</svg>
<pre id="result"></pre>`;
