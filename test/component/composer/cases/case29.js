export const title       = '29) g-on to method';
export const description = `Use the g-on directive with a simple method`;

export default `<g-composer>
  <svg viewBox="0 0 100 100" id="svg">
    <g @click="change" style="cursor: pointer;">
      <circle id="run"
              cx="50"
              cy="50"
              r="50"
              fill="red"/>
      <text x="36" 
            y="53">click</text>
    </g>
  </svg>
  <script type="methods">
    const circle = $.svg.querySelector('circle');
    const text   = $.svg.querySelector('text');
    function change() {
      if ($.svg.querySelector('text').content() === 'click') {
        circle.fill('green');
        $.svg.querySelector('text').content('ok').x(44);
      } else {
        circle.fill('red');
        $.svg.querySelector('text').content('click').x(36);
      }
    }
  </script>
</g-composer>
`;