export const title       = '08) specific private element';
export const description = 'code with one regular defs and one defs g-for';


export function script () {
  const svg = gSVG(document.querySelector('svg'));
  document.querySelector('#result').innerHTML = sourceFormat(svg.toSource());
}

export default `
<svg viewBox="0,0,100,100" width="100" height="100">
  <line x1="10" y1="10" x2="90" y2="90" stroke="black" stroke-width="10"></line>
  <line x1="10" y1="90" x2="90" y2="10" stroke="black" stroke-width="10" data-type="graphane"></line>
</svg>
<pre id="result"></pre>`;
