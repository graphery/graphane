export const title       = '22) render with svg and script type="data" with methods';
export const description = `Use the render template with svg and &lt;script type="data"> with methods`;

export default `<g-template>
  <svg viewBox="0 0 100 100" id="svg">
    <defs g-for="value of values">
        <circle   :cx="value.cx"
                  :cy="value.cy"
                    r="25"
                :fill="color(value.cx)">
        </circle>
    </defs>
    <text x="50" y="12">circles</text>
  </svg>
  <script type="data">{
    color (value) {
      if (value >= 75) {
        return 'blue';
      }
      if (value >= 50) {
        return 'green';
      }
      return 'red';
    },
    values: [
      {cx: 25, cy: 25},
      {cx: 50, cy: 50},
      {cx: 75, cy: 75}
    ]
  }</script>
</g-template>
`;