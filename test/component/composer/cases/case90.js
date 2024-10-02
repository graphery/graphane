export const title       = '90) Structured error';
export const description = '.errors[object]';

export function script () {
  const result    = document.querySelector('#result');
  const component = document.querySelector('g-composer');
  const show      = () => result.innerHTML = component.errors
                                                      .map(r => JSON.stringify(r).replace(/</g, '&lt;'))
                                                      .join('\n');
  if (!component.rendered) {
    component.addEventListener('render', show);
  } else {
    show();
  }
  component.addEventListener('error', show);
  component.data.value="hello";
  setTimeout(() =>component.data.value="hello", 200);
}

export default `
<div id="container">
  <g-composer value="0">
    <svg viewBox="0 0 100 100">
      <rect :x="value * 2"
            @click="wrong()" 
            y="0" width="100" height="100" fill="red"/>
    </svg>
    <script type="plugin" src="./non-exist.js"></script>
  </g-composer>
</div>
<pre id="result"></pre>
`;