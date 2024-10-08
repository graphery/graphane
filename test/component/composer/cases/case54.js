export const title       = '54) Error: g-bind expression';
export const description = 'launch an error expression in g-bind ';

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
      <rect :x="wrong"
            :y="fail" width="100" height="100" fill="red"/>
    </svg>
  </g-composer>
</div>
<pre id="result"></pre>
`;