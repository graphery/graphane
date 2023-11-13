export const title       = '32) g-bind width dynamic with delay';
export const description = 'g-bind with $.dynamic(value, duration, delay)';

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render({
    time1 : 200,
    time2 : 600,
    time3 : 1200,
    time4 : 1600,
  });
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <circle cx="20" cy="20" :r="$.dynamic(20, 1000, time1)"      fill="red"/>  
  <circle cx="40" cy="40" :r="$.dynamic(20, 1000, time2)" fill="blue"/>  
  <circle cx="60" cy="60" :r="$.dynamic(20, 1000, time3)" fill="green"/>  
  <circle cx="80" cy="80" :r="$.dynamic(20, 1000, time4)" fill="orange"/>  
</svg>
<pre id="result"></pre>`;
