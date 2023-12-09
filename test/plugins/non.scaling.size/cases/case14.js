export const title       = '14) Add and remove keep circle aspect';
export const description = `resize an SVG with and without keep aspect`;

export function script () {
  const div = document.querySelector('#show');
  const svg = gSVG().viewBox(0, 0, 100, 100)
                    .preserveAspectRatio('none')
                    .width('100%').height('100%');
  const g   = svg.add('g').style.stroke('#000');
  const c1  = g.add('circle')
               .cx(50).cy(50).r(10)
               .fill('none')
               .stroke_width(3)
               .nonScalingSize();
  const c2  = g.add('circle')
               .cx(50).cy(50).r(40)
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
      c1.nonScalingSize();
    } else {
      c1.nonScalingSize(false);
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

