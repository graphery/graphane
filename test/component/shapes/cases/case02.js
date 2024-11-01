export const title = '2) Shape circle';
export const description = `create a circle`;

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
            :d="$$.circle(50, 50, 42)"></path>
      <rect x="20" y="40" width="60" height="20" fill="white"></rect>
    </svg>
  </template>
</g-composer>
<pre id="result"></pre>`;
