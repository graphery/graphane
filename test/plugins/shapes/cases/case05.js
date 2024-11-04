export const title       = '5) arc values';
export const description = `check different arc values`;

export function script () {
  const data = [
    [90], [-90], [90, 180], [-90, 180], [180, -90],
    [360], [90, 360], [270, 270], [270], [270, 90],
    [360, 360], [400], [-400], [-180, -270], [-270, -180],
    [0], [90, -300], [-300, 90], [-270, 60], [60, -270]
  ];

  const div   = document.querySelector('#show');
  const svg   = gSVG().viewBox('0 0 1000 800').width(300);
  const defs  = svg.add('defs');
  const arrow = defs.add('marker').viewBox(0, 0, 10, 10).refX(5).refY(5)
                    .markerWidth(10).markerHeight(10).orient('auto-start-reverse')
                    .id('arrow');
  arrow.add('path').fill('#00d800').d.M(0, 0).L(10, 5).L(0, 10).z();

  data.forEach((r, i) => {
    const line   = Math.floor(i / 5) * 200 + 100;
    const column = i % 5 * 200 + 100;
    svg.add('text').x(column).y(line).font_size(35).text_anchor('middle').dominant_baseline('middle')
       .content(r)
    svg.add('path').fill('none').stroke_width(3).stroke('black').id('path')
       .marker_end(arrow.url())
       .d.arc(column, line, 80, r[0], r[1]);
  });

  svg.attachTo(div);
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());
}

export default `<div id="show"></div>
<pre id="result"></pre>`;
