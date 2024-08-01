export const title       = '3) g-if';
export const description = 'source code with g-if';

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render({
    option1 : true,
    option2 : false
  });
  document.querySelector('#result').innerHTML = sourceFormat(svg.toSource());
}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <circle  g-if="option1" cx="25" cy="50" r="20" fill="violet"></circle>  
  <circle  g-if="option2" cx="75" cy="50" r="20" fill="orange"></circle>  
</svg>
<pre id="result"></pre>`;
