export const title       = '4) Debug gSVG with plugin';
export const description = 'debug the gSVG with a plugin extension';


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
    setup.extendInstance({
      sum (a, b) {
        return a + b
      }
    })
  });
  const svg = gSVG().viewBox('0 0 100 100').width(100).height(100);
  svg.add('rect').x(5).y(5).width(90).height(90).stroke_width(5).stroke('black').fill('none');
  svg.sum(10, 10);
  svg.mult(10, 10);
  svg.attachTo('#show');
}

export default `<div id="show"></div>
<pre id="log"></pre>`;
