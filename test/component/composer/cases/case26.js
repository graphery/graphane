export const title       = '26) render with config inline';
export const description = `Use the render template with <code>config="key: value"</code>`;

export default `<g-composer config="value: 3" style="width: 100px">
  <svg viewBox="0 0 100 100" id="svg">
    <defs g-for="n of $.config.value">
        <circle   :cx="(n + 1) * 25"
                  :cy="(n + 1) * 25"
                    r="25"
                :fill="['red','green','blue'][n]">
        </circle>
    </defs>
    <text x="50" y="12">circles</text>
  </svg>
</g-composer>
`;