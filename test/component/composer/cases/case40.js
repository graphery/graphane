export const title       = '40) non-scaling-size plugin with method';
export const description = `Keep font size when the SVG is resized`;

export function script () {
  const composer = document.querySelector('g-composer')
  document.querySelector('#run').addEventListener('click', () => {
    composer.style.width  = (Number.parseInt(composer.style.width) + 50) + 'px';
    composer.style.height = (Number.parseInt(composer.style.height) + 50) + 'px';
  });
  document.querySelector('#minus').addEventListener('click', () => {
    composer.style.width  = (Number.parseInt(composer.style.width) - 50) + 'px';
    composer.style.height = (Number.parseInt(composer.style.height) - 50) + 'px';
  });
}

export default `
<g-composer style="width: 300px; height: 300px">
  <svg viewBox="0 0 202 202" 
       preserveAspectRatio="none"
       width="100%" 
       height="100%"
       @render="render">
    <g style="stroke: #c0c0c0">
      <g g-for="column of 11">
        <line :x1="(column * 20) + 1"
              :x2="(column * 20) + 1"
              y1="1"
              y2="201"/>
      </g>
      <g g-for="row of 11">
        <line :y1="(row * 20) + 1"
              :y2="(row * 20) + 1"
              x1="1"
              x2="201"/>
      </g>
    </g>
    <g style="stroke: none; font-family: sans-serif; font-size: 8">
      <g g-for="n of 100">
        <text text-anchor="middle"
              alignment-baseline="middle"
              :x="(n % 10 * 20) + 12"
              :y="(Math.floor(n / 10) * 20) + 12"
              g-content="n + 1"/>
      </g>
    </g>
  </svg>
  <script type="plugin" src="./src/plugins/non.scaling.size.js"></script>
  <script type="methods">
    function render() {
      $.svg.querySelectorAll(':not(defs) > line').forEach(el => {
        el.vector_effect('non-scaling-stroke');
      });
      $.svg.querySelectorAll(':not(defs) > text').forEach(el => {
        el.nonScalingSize();
      });
    }
  </script>
</g-composer>
<p>
  <button id="run">up size</button>
  <button id="minus">down size</button> <script type="module">
</p>
`;