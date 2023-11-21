export const title       = '33) g-bind width dynamic and previous value';
export const description = 'g-bind with value1 and $$.dynamic(value2)';

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render();
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <circle cx="20" cy="20" r="20" :r="$$.dynamic(0)" fill="red"/>  
  <circle cx="40" cy="40" r="20" :r="$$.dynamic(0)" fill="blue"/>  
  <circle cx="60" cy="60" r="20" :r="$$.dynamic(0)" fill="green"/>  
  <circle cx="80" cy="80" r="20" :r="$$.dynamic(0)" fill="orange"/>  
</svg>
<pre id="result"></pre>`;
