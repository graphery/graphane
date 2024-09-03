export const title       = '30) nested g-if';
export const description = 'display or not a nested element by g-if';

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render({
    option1 : true,
    option2 : false
  });
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <g g-if="option1" transform="translate(0, 25)">
    <circle cx="20" cy="20" r="20" fill="red"></circle>  
    <g g-if="option2" transform="translate(0, 30)">
      <circle cx="20" cy="20" r="20" fill="blue"></circle>  
    </g>
  </g>
  <g g-if="option2" transform="translate(50, 25)">
    <circle cx="20" cy="20" r="20" fill="orange"></circle>  
    <g g-if="option1" transform="translate(0, 30)">
      <circle cx="20" cy="20" r="20" fill="violet"></circle>  
    </g>
  </g>
</svg>
<pre id="result"></pre>`;
