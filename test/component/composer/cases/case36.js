export const title       = '36) render with svg and script type="method" with data() function';
export const description = `Add normalized data`;

export default `<g-composer style="width: 100px">
  <svg viewBox="0 0 100 100" id="svg">
    <g g-for="(value, idx) of data">
        <circle   :cx="value.cx"
                  :cy="value.cy"
                    r="25"
                :fill="value.color">
        </circle>
         <text g-content = "value.level" 
                  :x = "((idx + 1) * 25) - 3" 
                  :y = "((idx + 1) * 25) + 6"
                fill = "white"></text>
    </g>
    <text x="50" y="12">circles</text>
  </svg>
  <script type="data">
    "cx";"cy";"level"
    25;25;1
    50;50;2
    75;75;3
  </script>
  <script type="methods">
    function data(origin) {
      return origin.map(record => {
        record.color = record.level === 1 ? 'red' : record.level === 2 ? 'green' : 'blue'
        return record;
      });
    }
  </script>
</g-composer>
`;