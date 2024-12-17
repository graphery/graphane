export const title       = '57) g-for="x in number"';
export const description = 'g-for with "in" and number';

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
  <g g-for="n in value">
    <rect :id="'rect-' + n" height="18" width="18" fill="#00D800"
          :x="((n - 1) % 10) * 20" :y="Math.floor((n - 1) / 10) * 20"/>
    <text :id="'text-' + n" fill="#000"
          :x="(((n - 1) % 10) * 20) + 10" :y="(Math.floor((n - 1) / 10) * 20) + 10"
          alignment-baseline="middle" text-anchor="middle"
          font-family="sans-serif" font-size="12"
          g-content="n"></text>
  </g>
</svg>
<p><label>value: <input type="number" value="11" max="100" id="update"></label></p>
<pre id="result"></pre>`;
