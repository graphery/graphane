export const title       = '49) several .content()';
export const description = 'replate the content';

export async function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gSVG().viewBox('0,0,100,100').width(100).height(100)
  const g    = await svg.add('g');
  const c = `
<svg viewBox="0,0,100,100" width="100" height="100">
  <line x1="10" y1="10" x2="90" y2="90" stroke="black" stroke-width="10"/>
  <line x1="10" y1="90" x2="90" y2="10" stroke="black" stroke-width="10"/>
</svg>`;
  g.content(c);
  g.content(c);
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
}

export default `<div id="show"></div>
<pre id="result"></pre>`;