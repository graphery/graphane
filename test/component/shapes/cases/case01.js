export const title       = '1) Shape regularPolygon';
export const description = `create a regular polygon`;

export function script () {
  const show  = document.querySelector('#show');
  const code = document.querySelector('#result');
  show.addEventListener('render', () => {
    code.innerHTML = sourceFormat(show.svg.source());
  });
}

export default `
<g-composer id="show">
  <template>
    <svg viewBox="0 0 100 100" width="100" height="100">
      <path stroke="black" stroke-width="3" fill="red" 
            :d="$$.regularPolygon(50, 50, 42, 8, 22.5)"/>
      <text x="50" y="52" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="sans-serif" font-weight="bold" style="font-size: 1.2em;">STOP</text>
    </svg>
  </template>
</g-composer>
<pre id="result"></pre>`;
