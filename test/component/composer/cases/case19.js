export const title       = '19) render with data inline';
export const description = `Use the render template with <code>data="key: value"</code>`;

export default `<g-composer data="value: 3" style="width: 100px">
  <svg viewBox="0 0 100 100" id="svg">
    <defs g-for="n of value">
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