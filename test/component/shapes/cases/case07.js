export const title       = '7) triangle and circle';
export const description = `create a triangle with regularPolygon and a circle`;

export function script () {
  const show  = document.querySelector('#show');
  const code = document.querySelector('#result');
  show.addEventListener('render', () => {
    code.innerHTML = sourceFormat(show.svg.source());
  });
}

export default `<g-composer id="show">
<svg viewBox="0 0 200 200" width="200">
  <path fill="none" stroke-width="1" stroke="black" id="path" 
        :d="$$.regularPolygon(100, 100, 99, 3).circle(100, 100, 99)"/>
</svg>
</g-composer>
<pre id="result"></pre>`;
