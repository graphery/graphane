export const title       = '28) render with script type="config" src="url"';
export const description = `Use the render template with <code>script type="config" src="url"</code>`;

export default `<g-composer style="width: 100px">
  <svg viewBox="0 0 100 100" id="svg">
    <g g-for="n of $.config.value">
        <circle   :cx="(n + 1) * 25"
                  :cy="(n + 1) * 25"
                    r="25"
                :fill="['red','green','blue'][n]">
        </circle>
    </g>
    <text x="50" y="12">circles</text>
  </svg>
  <script type="config" src="/test/component/composer/assets/config.json"></script>
</g-composer>
`;