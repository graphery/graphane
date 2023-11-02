export const title       = '3) Debug gSVG unknown element';
export const description = 'debug the gSVG error with an unknown element';

export function script () {
  const log = document.querySelector('#log');
  gSVG.debugLogger({
    log (...args) {
      const p     = document.createElement('p');
      p.innerHTML = args.join(' ');
      log.appendChild(p);
    },
    error (...args) {
      const p       = document.createElement('p');
      p.innerHTML   = args.join(' ');
      p.style.color = 'red';
      log.appendChild(p);
    }
  });
  gSVG.debugLevel(gSVG.DEBUG_ERROR);
  const svg = gSVG().viewBox('0 0 100 100').width(100).height(100);
  svg.add('rect').x(5).y(5).width(90).height(90).stroke_width(5).stroke('black').fill('none');
  svg.add('kk');
  svg.attachTo('#show');
}

export default `<div id="show"></div>
<pre id="log"></pre>`;
