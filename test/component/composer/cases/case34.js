export const title       = '34) load init with @';
export const description = `Use the @init event for build a circle`;

export default `
<g-composer>
  <svg viewBox="0 0 100 100" @init="init()">
  </svg>
  <script type="methods">
    function init() {
      const circle = $.svg.add('circle');
      circle.cx(50).cy(50).r(50).fill('red');
    }
  </script>
</g-composer>
`;
