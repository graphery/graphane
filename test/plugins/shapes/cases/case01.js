export const title = '1) Shape regularPolygon';
export const description = `create a regular polygon`;

export function script () {
  const div  = document.querySelector('#show');
  const code = document.querySelector('#result');
  const svg  = gSVG().viewBox('0 0 100 100').width(100).height(100)
  svg.add('path').stroke('black').stroke_width(3).fill('red')
     .d.regularPolygon(50, 50, 42, 8, 22.5);
  svg.add('text').content('STOP')
     .x(50).y(52).text_anchor('middle').dominant_baseline('middle')
     .fill('white').style.font_size('1.2em').font_family('sans-serif').font_weight('bold');
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
}

export default `<div id="show"></div>
<pre id="result"></pre>`;
