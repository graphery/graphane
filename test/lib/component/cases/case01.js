export const title       = '1) Simple example'
export const description = `Display a svg file`;

export function script () {
  defineComponent(
    'my-component',
    ` <g-composer>
        <template>
          <svg viewBox="0 0 200 100" width="200px" height="100px">
            <g stroke-width="12" stroke-linecap="round">
              <g g-for="(record, index) of data">
                <line
                  x1="22"
                  g-bind:x2="30 + record.value"
                  g-bind:y1="30 + (index * 20)"
                  g-bind:y2="30 + (index * 20)"
                  g-bind:stroke="record.color"
                ></line>
              </g>
            </g>
          </svg>
        </template>
        <script type="data">
          [
            { color: "#D80000", value: 100 },
            { color: "#00D800", value: 150 },
            { color: "#0000D8", value: 70 },
          ]
        </script>
      </g-composer>
    `);
}

export default `<my-component></my-component>`;
