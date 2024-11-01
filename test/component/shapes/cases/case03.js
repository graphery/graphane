export const title = '3) Shape barArc';
export const description = `create a bar`;

export function script () {
  const show  = document.querySelector('#show');
  const code = document.querySelector('#result');
  show.addEventListener('render', () => {
    code.innerHTML = sourceFormat(show.svg.source());
  });
}

export default `<g-composer id="show">
  <template>
    <svg viewBox="0 0 200 500" width="200" height="200">
      <path :d="$$.barArc(100, 250, 95, 10, -85, 0)"></path>
      <path :d="$$.barArc(100, 250, 95, 20, 85, 5)"></path>
      <path :d="$$.barArc(100, 250, 95, 30, 85, 95)"></path>
      <path :d="$$.barArc(100, 250, 95, 40, -85, 270)"></path>
    </svg>
  </template>
</g-composer>
<pre id="result"></pre>`;
