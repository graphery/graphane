export const title       = '12) Debug gSVG valid path.d by plugin';
export const description = 'debug the gSVG valid path.d by plugin';

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
  gSVG.debugLevel(gSVG.DEBUG_ALL);
  gSVG.install((setup) => {
    setup.extendPath({
      rect (x, y, width, height) {
        return `M${ x },${ y }L${ x },${ y + width }L${ x + width },${ y + height }L${ x + width }, ${ y }Z`
      }
    })
  });
  const svg = gSVG().viewBox('0 0 100 100').width(100).height(100)
  svg.add('path').stroke_width(5).stroke('black').fill('none').d.rect(5, 5, 90, 90);
  svg.attachTo('#show');
}

export default `<div id="show"></div>
<pre id="log"></pre>`;
