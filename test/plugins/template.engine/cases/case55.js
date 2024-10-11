export const title       = '55) g-if and g-for in same element';
export const description = 'g-if and g-for do not work properly together!!!';

export function script () {
  const svg     = gSVG(document.querySelector('#svg'));
  const update = document.querySelector('#update');
  const visible = document.querySelector('#visible');

  function updateSource () {
    svg.render({value: Number(update.value), visible: visible.checked});
    document.querySelector('#result').innerHTML = sourceFormat(svg.source());
  }

  update.addEventListener('input', updateSource);
  visible.addEventListener('input', updateSource);

  updateSource();
}

export default `<svg id="svg" viewBox="0 0 400 200" width="200" height="100">
  <g g-if="visible"
     g-for="col of 10" >
    <rect g-if="value > col"
          :x="col * 40" y="0" 
          height="200" width="38" 
          fill="#00D800">
          <title g-content="value"></title>
    </rect>
  </g>
</svg>
<p><label>value: <input type="number" value="5" max="10" id="update"></label></p>
<p><label>visible: <input type="checkbox" id="visible"></label></p>
<pre id="result"></pre>`;
