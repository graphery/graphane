export const title       = '1) polar2cartesian';
export const description = `create a regular polygon`;

export function script () {
  const show = document.querySelector('#show');
  const code = document.querySelector('#result');
  if (show.rendered) {
    code.innerHTML = sourceFormat(show.svg.source());
  } else {
    show.addEventListener('render', () => {
      code.innerHTML = sourceFormat(show.svg.source());
    });
  }
}

export default `
<g-composer id="show">
  <template>
    <svg viewBox="0 0 100 100" width="100" height="100">
      <path stroke="black" stroke-width="3" fill="red" 
            :d="regularPolygon(50, 50, 42, 8, 22.5)"/>
      <text x="50" y="52" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="sans-serif" font-weight="bold" style="font-size: 1.2em;">STOP</text>
    </svg>
  </template>
  <script type="methods">
    function regularPolygon (cx, cy, r, sides, start = 0) {
      const angle = 360 / sides;
      let path    = '';
      for (let i = 0; i < sides; i++) {
        const coords = $.polar2cartesian(cx, cy, r, (angle * i) + start);
        path += (i ? 'L' : 'M' ) + coords.x + ',' + coords.y;
      }
      path += 'Z';
      return path;
    }
  </script>
</g-composer>
<pre id="result"></pre>`;
