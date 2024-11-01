export const title       = '24) g-for basic generation';
export const description = 'g-for basic generation';

export function script () {
  const svg     = gSVG(document.querySelector('#svg'));
  const update = document.querySelector('#update');

  async function updateSource () {
    svg.render({value: Number(update.value)});
    document.querySelector('#result').innerHTML = sourceFormat(svg.source());
  }

  update.addEventListener('input', updateSource);

  updateSource();
}

export default `<svg id="svg" viewBox="0 0 200 200" width="200" height="200">
  <g g-for="n of value">
    <rect id="rect" height="18" width="18" fill="#00D800"
          :x="(n - (Math.floor(n / 10) * 10)) * 20" :y="Math.floor(n / 10) * 20"/>
  </g>
</svg>
<p><label>value: <input type="number" value="5" max="100" id="update"></label></p>
<pre id="result"></pre>`;
