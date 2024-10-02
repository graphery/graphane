export const title       = '55) Error: g-content expression';
export const description = 'launch an error expression in g-content ';


export function script () {
  const result    = document.querySelector('#result');
  const component = document.querySelector('g-composer');
  const show      = () => result.innerHTML = component.errors
                                                      .map(r => String(r).replace(/</g, '&lt;'))
                                                      .join('\n');
  if (!component.rendered) {
    component.addEventListener('render', show);
  } else {
    show();
  }
}

export default `
<div id="container">
  <g-composer>
    <svg viewBox="0 0 100 100">
      <text x="0" y="0" g-content="wrong"></text>
    </svg>
  </g-composer>
</div>
<pre id="result"></pre>
`;