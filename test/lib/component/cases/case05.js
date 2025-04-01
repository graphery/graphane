export const title       = '5) data-src=""'
export const description = `user <code>data-src=""</code> to update the component data`;

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
        </g-composer>
      `);
}

export default `<my-component data-src="/test/lib/component/assets/data.json"></my-component>`;
