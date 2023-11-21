export const title = '18) g-bind:style - literal object';
export const description = 'g-bind:style with a literal object of values';

export function script () {
const svg = gSVG(document.querySelector('#svg'));
  svg.render({
    warning   : true,
    noWarning : {
      fill   : 'green',
      stroke : 'blue'
    }
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
  <circle cx="25" cy="50" r="20" style="stroke-width: 5" :style="warning && {
    fill   : 'orange',
    stroke : 'red'
  }"></circle>
  <circle cx="75" cy="50" r="20" style="stroke-width: 5" :style="{
    fill   : noWarning.fill,
    stroke : noWarning.stroke
  }"></circle>
</svg>
<pre id="result"></pre>`;