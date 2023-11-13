export const title       = '35) g-bind width dynamic keyframes and offset';
export const description = 'g-bind with $.dynamic([...]) with offset';

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render();
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <circle cx="20" cy="20" :r="$.dynamic([{value: 20, offset:0}, {value: 0, offset: 0.25}, {value: 0, offset: 0.75}, {value: 20, offset: 1}], 1500)" fill="red"/>  
  <circle cx="40" cy="40" :r="$.dynamic([{value: 20, offset:0}, {value: 0, offset: 0.25}, {value: 0, offset: 0.75}, {value: 20, offset: 1}], 1500)" fill="blue"/>  
  <circle cx="60" cy="60" :r="$.dynamic([{value: 20, offset:0}, {value: 0, offset: 0.25}, {value: 0, offset: 0.75}, {value: 20, offset: 1}], 1500)" fill="green"/>  
  <circle cx="80" cy="80" :r="$.dynamic([{value: 20, offset:0}, {value: 0, offset: 0.25}, {value: 0, offset: 0.75}, {value: 20, offset: 1}], 1500)" fill="orange"/>  
</svg>
<pre id="result"></pre>`;
