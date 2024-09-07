export const title       = '37) $$.currentValue() get the current attribute value';
export const description = 'Add value';

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.addEventListener('render', () => {
    svg.style.display('');
  });
  svg.render({
      cx : 5, cy : 5, color : 'red',
  });
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());
}

export default `
<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px; display: none">
  <circle    cx = "30"
            :cx = "$$.currentValue() + cx"
             cy = "40" 
            :cy = "$$.currentValue() + cy"
          :fill = "color"
              r = "25"/>
</svg>
<pre id="result"></pre>`;
