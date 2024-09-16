export const title       = '75) datum: function (string)';
export const description = `function data() { return 'hello'; }`;

export default `<g-composer>
  <svg viewBox="0 0 110 110">
    <text x="50" y="50" dominant-baseline="middle" text-anchor="middle"
          g-content="data">test</text>
  </svg>
  <script type="methods">
    function data() {
      return 'hello';    
    }
  </script>
</g-composer>
`;