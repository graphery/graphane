export const title       = '15) g-bind:class - object';
export const description = 'g-bind:class with an object of values (true or false)';

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
  <circle cx="25" cy="50" r="20" :class="{warning: isWarning, bordered: true}"></circle>
  <circle cx="75" cy="50" r="20" class="warning" :class="{warning: !isWarning, bordered: true}"></circle>
</svg>
<p>
  <label><input type="checkbox" id="update" checked>isWarning</label>
</p>
<pre id="result"></pre>`;