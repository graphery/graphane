export const title       = '79) datum: script (boolean)';
export const description = `&lt;script type="data">false&lt;/script>`;

export default `<g-composer>
  <svg viewBox="0 0 110 110">
    <text x="50" y="50" dominant-baseline="middle" text-anchor="middle"
          g-if="!data"
          g-content="data">test</text>
  </svg>
  <script type="data">
    false
  </script>
</g-composer>
`;