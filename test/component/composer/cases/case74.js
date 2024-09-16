export const title       = '74) datum: script (string)';
export const description = `&lt;script type="data">hello&lt;/script>`;

export default `<g-composer>
  <svg viewBox="0 0 110 110">
    <text x="50" y="50" dominant-baseline="middle" text-anchor="middle"
          g-content="data">test</text>
  </svg>
  <script type="data">
    hello
  </script>
</g-composer>
`;