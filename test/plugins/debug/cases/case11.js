export const title       = '11) Debug gSVG invalid path.d';
export const description = 'debug the gSVG invalid path.d';


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
  const svg = gSVG().viewBox('0 0 100 100').width(100).height(100)
  svg.add('path').stroke_width(5).stroke('black').fill('none')
     .d.M(5, 5).L(5, 90).L(90, 90).L(90, 5).circle().Z();
  svg.attachTo('#show');
}

export default `<div id="show"></div>
<pre id="log"></pre>`;
