export const title       = '31) g-bind width animate';
export const description = 'g-bind with animate()';

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render({
    time1 : 400,
    time2 : 1400,
    time3 : 2400,
    time4 : 3400,
  });
  document.querySelector('#result').innerHTML = svg.source().replace(/</g, "&lt;");
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <circle cx="20" cy="20" :r="$.animate(20, 1000, time1)"      fill="red"/>  
  <circle cx="40" cy="40" :r="$.animate(20, 1000, time2)" fill="blue"/>  
  <circle cx="60" cy="60" :r="$.animate(20, 1000, time3)" fill="green"/>  
  <circle cx="80" cy="80" :r="$.animate(20, 1000, time4)" fill="orange"/>  
</svg>
<pre id="result"></pre>`;
