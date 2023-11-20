export const title       = '34) g-bind width dynamic keyframes';
export const description = 'g-bind with $$.dynamic([...])';

export async function script () {
  const svg = gSVG(document.querySelector('#svg'));
  await svg.render();
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <circle cx="20" cy="20" :r="$$.dynamic([20, 0, 20], 1000)" fill="red"/>  
  <circle cx="40" cy="40" :r="$$.dynamic([20, 0, 20], 1200)" fill="blue"/>  
  <circle cx="60" cy="60" :r="$$.dynamic([20, 0, 20], 1400)" fill="green"/>  
  <circle cx="80" cy="80" :r="$$.dynamic([20, 0, 20], 1600)" fill="orange"/>  
</svg>
<pre id="result"></pre>`;
