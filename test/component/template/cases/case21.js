export const title       = '21) data as string';
export const description = `Use the render template with <code>gsvg.data="key: value"</code>`;

export function script() {
  const gsvg = document.querySelector('g-template');
  gsvg.data = 'value: 3'
}

export default `<g-template>
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
</g-template>
`;