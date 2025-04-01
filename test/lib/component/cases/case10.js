export const title       = '10) Value update by property'
export const description = `Display a icon by .value`;

export function script () {
  defineComponent(
    'my-icon',
    `<g-composer value="3">
        <template>
          <svg viewBox="0 0 500 500" fill="none" stroke="black" stroke-width="10">
            <circle cx="250" cy="250" r="200" :fill="$$.dynamic($.config.figures[data.value || 0].fill)"></circle>
            <circle cx="310" cy="200" r="10" fill="black"></circle>
            <circle cx="180" cy="200" r="10" fill="black"></circle>
            <path  :d="$$.dynamic($.config.figures[data.value || 0].d)"/>
          </svg>
        </template>
        <script type="config">
          {
            figures: [
              {d: 'M 250 310 Q 250 310 250 310', fill: '#E3E3E3'},
              {d: 'M 170 310 Q 250 250 340 310', fill: '#FFACAC'},
              {d: 'M 170 310 Q 250 310 330 310', fill: '#FFFACD'},
              {d: 'M 170 310 Q 250 370 320 310', fill: '#ACFFCD'}
            ]
          }
        </script>
      </g-composer>
`);
}

export default `
  <my-icon value="2"></my-icon>
  <p>
    <select oninput="document.querySelector('my-icon').value = this.value">
      <option value="0">none</option>
      <option value="1">angry</option>
      <option value="2">neutral</option>
      <option value="3" selected>happy</option>
    </select>
  </p>
`;
