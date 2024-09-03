export const title       = '47) append multiple tags';
export const description = 'add multiple elements';

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gSVG('svg').viewBox(0, 0, 60, 60).width(100).height(100);
  const r    = svg.append('rect', 'rect', 'rect', 'rect', 'rect', 'rect', 'rect', 'rect', 'rect')
  r[0].x(0).y(0).width(20).height(20).fill('#ff0000');
  r[1].x(20).y(0).width(20).height(20).fill('#00ff00');
  r[2].x(40).y(0).width(20).height(20).fill('#0000aa');
  r[3].x(0).y(20).width(20).height(20).fill('#aa0000');
  r[4].x(20).y(20).width(20).height(20).fill('#009900');
  r[5].x(40).y(20).width(20).height(20).fill('#0000aa');
  r[6].x(0).y(40).width(20).height(20).fill('#660000');
  r[7].x(20).y(40).width(20).height(20).fill('#006600');
  r[8].x(40).y(40).width(20).height(20).fill('#000066');
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
}

export default `<div id="show"></div>
<pre id="result"></pre>`;