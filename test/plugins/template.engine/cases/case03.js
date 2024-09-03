export const title       = '3) g-content with svg source';
export const description = 'include svg content into a &lt;g>&lt;/g>';

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render({
    source : '<rect x="40" y="40" width="20" height="20" fill="green">'
  });
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());

}

export default `<svg viewBox="0 0 100 100" id="svg" style="width: 100px; height: 100px">
  <g g-content="source"></g>
</svg>
<pre id="result"></pre>`;
