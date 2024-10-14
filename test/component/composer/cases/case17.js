export const title       = '17) render updated';
export const description = 'Render updated dynamically';

export function script () {
  const svg = document.querySelector('g-composer');
  const cx  = document.querySelector('#redCX');
  cx.addEventListener('change', () => {
    svg.data[0].cx = Number(cx.value);
  })
  const cy = document.querySelector('#redCY');
  cy.addEventListener('change', () => {
    svg.data[0].cy = Number(cy.value);
  })
}

export default `<g-composer style="width: 100px">
  <svg viewBox="0 0 100 100" id="svg">
    <g g-for="value of data">
        <circle   :cx="value.cx"
                  :cy="value.cy"
                    r="25"
                :fill="value.color">
        </circle>
    </g>
    <text x="50" y="12">circles</text>
  </svg>
  <script type="data">
    "cx";"cy";"color"
    25;25;"red"
    50;50;"green"
    75;75;"blue"
  </script>
</g-composer>
<p>
red cx <input id="redCX" type="number" value="25">
</p>
<p>
red cy <input id="redCY" type="number" value="25">
</p>
`;