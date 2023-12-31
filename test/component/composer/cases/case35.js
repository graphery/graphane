export const title       = '35) call to methods object';
export const description = `Call to load() method directly`;

export default `
<g-composer style="width: 100px">
  <svg viewBox="0 0 100 100">
  </svg>
  <script type="methods">
    function load() {
      const circle = $.svg.add('circle');
      circle.cx(50).cy(50).r(50).fill('red');
    }
  </script>
</g-composer>
<button id="check">click</button>
`;

export function script () {
  document.querySelector('#check').addEventListener('click', () => {
    document.querySelector('g-composer').methods.load();
  })
}
