export const title       = '46) append methods and attach event';
export const description = 'check different forms of append';

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gSVG('svg').viewBox(0, 0, 60, 60).width(100).height(100);
  const r1 = gSVG('rect').x(0).y(0).width(20).height(20).fill('#FF0000');
  const r2 = gSVG('rect').x(20).y(0).width(20).height(20).fill('#00FF00');
  const r3 = gSVG('rect').x(40).y(0).width(20).height(20).fill('#0000AA');
  const r4 = gSVG('rect').x(0).y(20).width(20).height(20).fill('#AA0000');
  const r5 = gSVG('rect').x(20).y(20).width(20).height(20).fill('#009900');
  const r6 = gSVG('rect').x(40).y(20).width(20).height(20).fill('#0000AA');
  const r7 = gSVG('rect').x(0).y(40).width(20).height(20).fill('#660000');
  const r8 = gSVG('rect').x(20).y(40).width(20).height(20).fill('#006600');
  svg.addEventListener('attach', () => {
    console.log('attach SVG')
    svg.add(r1);
  });
  r1.addEventListener('attach', () => {
    svg.appendChild(r2);
  });
  r2.addEventListener('attach', () => {
    svg.append(r3);
  });
  r3.addEventListener('attach', () => {
    r3.before(r4);
  });
  r4.addEventListener('attach', () => {
    r4.after(r5);
  });
  r5.addEventListener('attach', () => {
    r5.insertAdjacentElement('afterend', r6);
  });
  r6.addEventListener('attach', () => {
    r6.insertAdjacentElement('beforebegin', r7);
  });
  r7.addEventListener('attach', () => {
    svg.addBefore(r8);
  });
  r8.addEventListener('attach', () => {
    svg.insertBefore('rect').x(40).y(40).width(20).height(20).fill('#000066');
  });
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
}

export default `<div id="show"></div>
<pre id="result"></pre>`;