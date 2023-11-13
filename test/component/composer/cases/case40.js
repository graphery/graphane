export const title       = '40) keep-aspect plugin with method';
export const description = `Keep font size and stroke with when the SV is resized`;

export function script () {
  const composer = document.querySelector('g-composer')
  document.querySelector('#change').addEventListener('click', () => {
    composer.style.width  = (Number.parseInt(composer.style.width) + 20) + 'px';
    composer.style.height = (Number.parseInt(composer.style.height) + 20) + 'px';
  });
  document.querySelector('#minus').addEventListener('click', () => {
    composer.style.width  = (Number.parseInt(composer.style.width) - 20) + 'px';
    composer.style.height = (Number.parseInt(composer.style.height) - 20) + 'px';
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
      <defs g-for="column of 11">
        <line :x1="(column * 20) + 1"
              :x2="(column * 20) + 1"
              y1="1"
              y2="201"/>
      </defs>
      <defs g-for="row of 11">
        <line :y1="(row * 20) + 1"
              :y2="(row * 20) + 1"
              x1="1"
              x2="201"/>
      </defs>
    </g>
    <g style="stroke: none; font-family: sans-serif; font-size: 10">
      <defs g-for="n of 100">
        <text text-anchor="middle"
              alignment-baseline="middle"
              :x="(n % 10 * 20) + 12"
              :y="(Math.floor(n / 10) * 20) + 12"
              g-content="n + 1"/>
      </defs>
    </g>
  </svg>
  <script type="plugin" src="../plugins/keep.aspect.js"></script>
  <script type="methods">
    function render() {
      $.svg.querySelectorAll(':not(defs) > line').forEach(el => {
        el.keepAspect();
      });
      $.svg.querySelectorAll(':not(defs) > text').forEach(el => {
        el.keepAspect();
      });
    }
  </script>
</g-composer>
<p>
  <button id="change">up size</button>
  <button id="minus">down size</button> <script type="module">
</p>
`;