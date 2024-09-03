export const title       = '19) g-bind:style - kebab-case and camelCase';
export const description = 'g-bind:style with a key of kebab-case and camelCase';

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render();
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
  <text x="5" y="20" :style="{'font-family': ['Arial', 'sans-serif']}">Hello</text>
  <text x="5" y="40" :style="{fontFamily: 'Arial', fontSize: false}">world</text>
</svg>
<pre id="result"></pre>`;