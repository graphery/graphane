export const title       = '66) fix catastrophic backtracking wrong JSON data';
export const description = `script type="data" with wrong content`;

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
  {}
  [
    {cx: 25, cy: 25, color: "red"},
    {cx: 50, cy: 50, color: "green"},
    {cx: 75, cy: 75, color: "blue"}
  ]
</script>
</g-composer>
`;