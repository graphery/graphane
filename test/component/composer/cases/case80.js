export const title       = '80) datum: function (boolean)';
export const description = `function data() { return false; }`;

export default `<g-composer>
  <svg viewBox="0 0 110 110">
    <text x="50" y="50" dominant-baseline="middle" text-anchor="middle"
          g-if="!data"
          g-content="data">test</text>
  </svg>
  <script type="methods">
    function data() {
      return false;    
    }
  </script>
</g-composer>
`;