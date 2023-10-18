export const title       = '16) render with svg and script type="data" content embebed';
export const description = `Use the render template with svg and script type="data" content`;

export default `<g-template>
  <svg viewBox="0 0 100 100" id="svg">
    <defs g-for="value of data">
        <circle   :cx="value.cx"
                  :cy="value.cy"
                    r="25"
                :fill="value.color">
        </circle>
    </defs>
    <text x="50" y="12">circles</text>
  </svg>
  <script type="data">
    "cx";"cy";"color"
    25;25;"red"
    50;50;"green"
    75;75;"blue"
</script>
</g-template>
`;