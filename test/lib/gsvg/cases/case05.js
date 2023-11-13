// 5) Get a SVG element

export const description = `
get and wrap an existing SVG element
`;

export function script () {
  const div      = document.querySelector('div#show');
  const code     = document.querySelector('#result');
  const el       = div.querySelector('svg');
  const svg = gSVG(el);
  code.innerHTML = sourceFormat(svg.source());
}

export default `
<div id="show">
  <svg viewBox="0,0,100,100" width="100" height="100">
    <line x1="10" y1="10" x2="90" y2="90" stroke="black" stroke-width="10"></line>
    <line x1="10" y1="90" x2="90" y2="10" stroke="black" stroke-width="10"></line>
  </svg>
</div>
<pre id="result"></pre>
`;
