export const title       = '12) g-bind:class - simple value';
export const description = 'g-bind:class with a simple string value';

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render({
    value : 'warning'
  });
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <style> 
    .bordered {
      stroke-width: 5;
      stroke: red;      
    }
    .warning {
      fill: orange;
    }
  </style>
  <circle cx="50" cy="50" r="40" class="bordered" :class="value">
  </circle>
</svg>
<pre id="result"></pre>`;