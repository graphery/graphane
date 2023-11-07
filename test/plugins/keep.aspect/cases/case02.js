export const title       = '2) Resize and keep text and line aspect';
export const description = `resize an SVG an keep the text size and line stroke with keepAspect`;

export function script () {
  const div    = document.querySelector('#show');
  const svg    = gSVG().viewBox(0, 0, 202, 202)
                       .preserveAspectRatio('none')
                       .width('100%').height('100%');
  const gLines = svg.add('g').style.stroke('#c0c0c0');
  const gText  = svg.add('g').style.stroke('none')
                    .style.fontFamily('sans-serif').style.fontSize(10);
  for (let column = 0; column < 10; column++) {
    gLines.add('line')
          .x1((column * 20) + 1).x2((column * 20) + 1)
          .y1(1).y2(201)
          .keepAspect();
    for (let row = 0; row < 10; row++) {
      if (column === 0) {
        gLines.add('line')
              .x1(1).x2(201)
              .y1((row * 20) + 1).y2((row * 20) + 1)
              .keepAspect();
      }
      gText.add('text')
           .text_anchor('middle').alignment_baseline('middle')
           .x((column * 20) + 12).y((row * 20) + 12)
           .content((row * 10) + column + 1)
           .keepAspect();
    }
  }
  gLines.add('line')
        .x1(201).x2(201)
        .y1(1).y2(201)
        .keepAspect();
  gLines.add('line')
        .x1(1).x2(201)
        .y1(201).y2(201)
        .keepAspect();
  svg.attachTo(div);
  document.querySelector('#change').addEventListener('click', () => {
    div.style.width  = (Number.parseInt(div.style.width) + 20) + 'px';
    div.style.height = (Number.parseInt(div.style.height) + 20) + 'px';
  });
  document.querySelector('#minus').addEventListener('click', () => {
    div.style.width  = (Number.parseInt(div.style.width) - 20) + 'px';
    div.style.height = (Number.parseInt(div.style.height) - 20) + 'px';
  });
}

export default `<div id="show" style="width:300px; height: 300px"></div>
<button id="change">up size</button> <button id="minus">down size</button> <script type="module">`;
