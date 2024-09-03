export const title       = '42) keep-aspect plugin and data update';
export const description = `Keep font size and stroke when the SVG is resized and data is updated`;

export function script () {
  const composer = document.querySelector('g-composer');
  document.querySelector('#run').addEventListener('click', () => {
    composer.style.width  = (Number.parseInt(composer.style.width) + 100) + 'px';
    composer.style.height = (Number.parseInt(composer.style.height) + 100) + 'px';
  });
  document.querySelector('#minus').addEventListener('click', () => {
    composer.style.width  = (Number.parseInt(composer.style.width) - 100) + 'px';
    composer.style.height = (Number.parseInt(composer.style.height) - 100) + 'px';
  });
  document.querySelector('#init').addEventListener('input', function () {
    composer.data.n = Number(this.value);
  });
}

export default `
<g-composer data="n: 1" style="width: 100px; height: 100px">
  <svg viewBox="0 0 100 100" width="100%" height="100%" style="border: 1px solid lightgray">
    <text text-anchor="middle"
          alignment-baseline="middle"
          x="50"
          y="50"
          font-size="40"
          g-content="n"
          g-keep-aspect="size"/>
  </svg>
  <script type="plugin" src="./src/plugins/non.scaling.size.js"></script>
</g-composer>
<p>
  <button id="run">up size</button>
  <button id="minus">down size</button>
  value: <input id="init" type="number" value="1"/>
</p>
`;