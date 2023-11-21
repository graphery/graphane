export const title       = '31) g-bind width dynamic default values';
export const description = 'g-bind with $$.dynamic(valu)';

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render();
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <circle cx="20" cy="20" :r="$$.dynamic(20)" fill="red"/>  
  <circle cx="40" cy="40" :r="$$.dynamic(20)" fill="blue"/>  
  <circle cx="60" cy="60" :r="$$.dynamic(20)" fill="green"/>  
  <circle cx="80" cy="80" :r="$$.dynamic(20)" fill="orange"/>  
</svg>
<pre id="result"></pre>`;
