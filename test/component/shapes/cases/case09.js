export const title       = '9) pentagon';
export const description = `create a pentagon with regularPolygon`;

export function script () {
  const show  = document.querySelector('#show');
  const code = document.querySelector('#result');
  show.addEventListener('render', () => {
    code.innerHTML = sourceFormat(show.svg.source());
  });
}

export default `<g-composer id="show">
<svg viewBox="0 0 200 200" width="200">
  <circle fill="red" cx="100" cy="100" r="100"></circle>
  <path fill="none" stroke-width="1" stroke="black" id="path" 
        :d="$$.regularPolygon(100, 100, 100, 5)"/>
</svg>
</g-composer>
<pre id="result"></pre>`;
