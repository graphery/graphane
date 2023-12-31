export const title       = '15) Add and remove keep rect aspect';
export const description = `resize an SVG with and without keep aspect`;

export function script () {
  const div = document.querySelector('#show');
  const svg = gSVG().viewBox(0, 0, 100, 100)
                    .preserveAspectRatio('none')
                    .width('100%').height('100%');
  const g   = svg.add('g').style.stroke('#000');
  const r1  = g.add('rect')
               .x(45).y(45).width(10).height(10)
               .fill('none')
               .stroke_width(3)
               .nonScalingSize();
  const r2  = g.add('rect')
               .x(20).y(20).width(60).height(60)
               .fill('none')
               .stroke_width(3);
  svg.attachTo(div);
  document.querySelector('#change').addEventListener('click', () => {
    div.style.width  = (Number.parseInt(div.style.width) + 100) + 'px';
    div.style.height = (Number.parseInt(div.style.height) + 100) + 'px';
  });
  document.querySelector('#minus').addEventListener('click', () => {
    div.style.width  = (Number.parseInt(div.style.width) - 100) + 'px';
    div.style.height = (Number.parseInt(div.style.height) - 100) + 'px';
  });
  const toggle = document.querySelector('#toggle');
  toggle.addEventListener('input', () => {
    if (toggle.checked) {
      r1.keepAspect('size');
    } else {
      r1.keepAspect(false);
    }
  })
  const result     = document.querySelector('#result');
  result.innerHTML = sourceFormat(svg.source());
  svg.addEventListener('resize', () => {
    result.innerHTML = sourceFormat(svg.source());
  });
}

export default `
<div id="show" style="width:100px; height: 100px"></div>
<button id="change">up size</button> <button id="minus">down size</button> 
<p>
  <label>keep aspect <input type="checkbox" id="toggle" checked></label>
</p>
<pre id="result"></pre>
`;

