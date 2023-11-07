export const title       = '23) render with svg and scripts data and methods';
export const description = `Use the render template with svg, script type="data", and g-methods`;

export default `<g-composer>
  <svg viewBox="0 0 100 100" id="svg">
    <defs g-for="value of data">
        <circle   :cx="value.cx"
                  :cy="value.cy"
                    r="25"
                :fill="color(value.cx)">
        </circle>
    </defs>
    <text x="50" y="12">circles</text>
  </svg>
  <script type="methods">
    function color (value) {
      if (value >= 75) {
        return 'blue';
      }
      if (value >= 50) {
        return 'green';
      }
      return 'red';
    }
  </script>
  <script type="data">[
    {cx: 25, cy: 25},
    {cx: 50, cy: 50},
    {cx: 75, cy: 75}
  ]</script>
</g-composer>
`;