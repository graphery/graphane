export const title       = '30) g-on to method()';
export const description = `Use the g-on directive with a method call`;

export default `<g-template>
  <svg viewBox="0 0 100 100" id="svg">
    <circle id="run"
            cx="50"
            cy="50"
            r="50"
            fill="red"
            g-on:click="text()"/>
    <text x="36" 
          y="53"
          g-on:click="text()">click</text>
  </svg>
  <script type="methods">
    function text() {
      $.svg.querySelector('text').content('ok').x(44);
    }
  </script>
</g-template>
`;