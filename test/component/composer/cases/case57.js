export const title       = '57) Error: g-if expression';
export const description = 'launch an error expression in g-if';

export function script () {
  const result    = document.querySelector('#result');
  const component = document.querySelector('g-composer');
  const show      = () => result.innerHTML = component.errors
                                                      .map(r => r.replace(/</g, '&lt;'))
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
      <g g-if="wrong">
        <rect x="0" y="0" width="100" height="100" fill="red"/>
      </g>
    </svg>
  </g-composer>
</div>
<pre id="result"></pre>
`;