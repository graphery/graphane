export const title       = '27) g-for with big number of elements';
export const description = 'g-for with big number of elements';

export function script () {
  const svg     = gSVG(document.querySelector('#svg'));
  const updateA = document.querySelector('#updateA');
  const updateB = document.querySelector('#updateB');
  const updateC = document.querySelector('#updateC');

  async function updateSource () {
    svg.render({data : [Number(updateA.value), Number(updateB.value), Number(updateC.value)]});
  }

  updateA.addEventListener('input', updateSource);
  updateB.addEventListener('input', updateSource);
  updateC.addEventListener('input', updateSource);

  updateSource();
}

export default `<svg id="svg" viewBox="0 0 1800 600" width="900" height="300">
  <g g-for="(value, idx) of data" :transform="'translate(' + (idx * 615) + ')'">
    <g g-for="row of 30">
      <g g-for="col of 30">
        <rect g-if="value > (row * 30) + col"
              :x="col * 20" :y="row * 20" 
              height="18" width="18" 
              fill="#00D800"/>
      </g>
    </g>
  </g>
</svg>
<p><label>A: <input type="number" value="450" max="900" id="updateA"></label></p>
<p><label>B: <input type="number" value="750" max="900" id="updateB"></label></p>
<p><label>C: <input type="number" value="850" max="900" id="updateC"></label></p>
<pre id="result"></pre>`;
