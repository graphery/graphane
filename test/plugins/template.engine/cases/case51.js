export const title       = '51) g-for in defs element with attributes';
export const description = 'g-for and defs element behaviour';

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

export default `<svg id="svg" viewBox="0 0 400 200" width="200" height="100">
  <g g-for="col of value" fill="#00D800">
    <rect :x="col * 40" y="0" 
          height="200" width="38" 
          />
  </g>
</svg>
<p><label>value: <input type="number" value="5" max="10" id="update"></label></p>
<pre id="result"></pre>`;
