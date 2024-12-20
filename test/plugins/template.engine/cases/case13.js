export const title       = '13) g-bind:class - logical evaluation';
export const description = `g-bind:class with an initial logical evaluation (not work in several renderings)`;

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render({
    isWarning : true
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
  <circle cx="25" cy="50" r="20" class="bordered" :class="isWarning ? 'warning' : ''"></circle>
  <circle cx="75" cy="50" r="20" class="bordered" :class="isWarning ? '' : 'warning'"></circle>
</svg>
<pre id="result"></pre>`;