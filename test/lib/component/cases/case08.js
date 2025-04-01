export const title       = '8) Rewrite config with script type="config" src=""'
export const description = `Display a simple bars with a rewrite config`;

export function script () {
  defineComponent(
    'my-component',
    ` <g-composer>
        <template>
          <svg viewBox="0 0 200 100" width="200px" height="100px">
            <g stroke-width="12" stroke-linecap="round">
              <g g-for="(value, index) of data">
                <line
                  x1="22"
                  g-bind:x2="30 + value"
                  g-bind:y1="30 + (index * 20)"
                  g-bind:y2="30 + (index * 20)"
                  g-bind:stroke="$.config.colors[index]"
                ></line>
              </g>
            </g>
          </svg>
        </template>
        <script type="data">
          [ 100 , 150 , 70]
        </script>
        <script type="config">
          {colors: ["#D80000", "#00D800", "#0000D8"]}
        </script>
      </g-composer>
    `);
}

export default `<my-component>
    <script type="config" src="/test/lib/component/assets/config.json"></script>
</my-component>`;
