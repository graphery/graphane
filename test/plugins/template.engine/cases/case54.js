export const title       = '54) g-for and g-if in same element';
export const description = 'g-for and g-if concurrency behaviour';

export function script () {
  const svg     = gSVG(document.querySelector('#svg'));
  const update = document.querySelector('#update');

  function updateSource () {
    svg.render({value: Number(update.value)});
    document.querySelector('#result').innerHTML = sourceFormat(svg.source());
  }

  update.addEventListener('input', updateSource);

  updateSource();
}

export default `<svg id="svg" viewBox="0 0 400 200" width="200" height="100">
  <rect g-for="col of 10" 
        g-if="value > col"
        :x="col * 40" y="0" 
        height="200" width="38" 
        fill="#00D800">
        <title g-content="value"></title>
  </rect>
</svg>
<p><label>value: <input type="number" value="5" max="10" id="update"></label></p>
<pre id="result"></pre>`;
