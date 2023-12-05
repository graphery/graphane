export const title       = '24) render with svg methods-src';
export const description = `Use the render template with svg and methods-src`;

export default `<g-composer methods-src="/test/component/composer/assets/colors.js">
  <svg viewBox="0 0 100 100" id="svg" width="100">
    <defs g-for="value of data">
        <circle   :cx="value.cx"
                  :cy="value.cy"
                    r="25"
                :fill="color(value.cx)">
        </circle>
    </defs>
    <text x="50" y="12">circles</text>
  </svg>
  <script type="data">[
    {cx: 25, cy: 25},
    {cx: 50, cy: 50},
    {cx: 75, cy: 75}
  ]</script>
</g-composer>
`;