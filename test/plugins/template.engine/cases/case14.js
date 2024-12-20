export const title       = '14) g-bind:class - array';
export const description = 'g-bind:class with an array of values';

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  const check = document.querySelector('#update');
  function update() {
    svg.render({
      isWarning : check.checked
    });
    document.querySelector('#result').innerHTML = sourceFormat(svg.source());
  }
  update();
  check.addEventListener('change', update);
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
  <circle cx="25" cy="50" r="20" class="bordered" :class="[{warning: isWarning}, 'bordered']"></circle>
  <circle cx="75" cy="50" r="20" :class="[{warning: !isWarning}, 'bordered']"></circle>
</svg>
<p>
  <label><input type="checkbox" id="update" checked>isWarning</label>
</p>
<pre id="result"></pre>`;