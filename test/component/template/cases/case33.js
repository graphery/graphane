export const title       = '33) load event';
export const description = `Use the load event and init() method for build a circle`;

export default `
<g-template>
  <svg viewBox="0 0 100 100" g-on:load="init()">
  </svg>
  <script type="methods">
    function init() {
      const circle = $.svg.add('circle');
      circle.cx(50).cy(50).r(50).fill('red');
    }
  </script>
</g-template>
`;
