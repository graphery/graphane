export const title       = '27) render with script type="config" ';
export const description = `Use the render template with <code>script type="config"</code>`;

export default `<g-composer>
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
  <script type="config">{value: 3}</script>
</g-composer>
`;