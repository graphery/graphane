export const title       = '17) animateTo() delay and callback';
export const description = 'move rectangles sequentially';

export function script () {
  const div  = document.querySelector('#show');
  const run  = document.querySelector('#run');
  const code = document.querySelector('#result');
  const svg  = gSVG().viewBox(0, 0, 100, 100).width(100).height(100);
  const el1 = svg.add('rect').x(0).y(0).width(10).height(10).fill('red');
  const el2 = svg.add('rect').x(90).y(0).width(10).height(10).fill('green');
  const el3 = svg.add('rect').x(90).y(90).width(10).height(10).fill('blue');
  const el4 = svg.add('rect').x(0).y(90).width(10).height(10).fill('violet');
  svg.attachTo(div);
  code.innerHTML = sourceFormat(svg.source());
  run.addEventListener('click', () => {
    code.innerHTML = 'moving...';
    el1.animateTo({x : 90, y :  0},{duration : 500, delay: 0});
    el2.animateTo({x : 90, y : 90},{duration : 500, delay: 500});
    el3.animateTo({x :  0, y : 90},{duration : 500, delay: 1000});
    el4.animateTo({x :  0, y :  0},{duration : 500, delay: 1500}, null, () =>
      el4.animateTo({x: 0, y: 90}, 400, null, () =>
        el3.animateTo({x: 90, y: 90}, 400, null, () =>
          el2.animateTo({x: 90, y: 0}, 400, null, () =>
            el1.animateTo({x: 0, y: 0}, 400, null, () =>
              code.innerHTML = sourceFormat(svg.source())
            )
          )
        )
      )
    );
  });
}

export default `<div id="show"></div>
<button id="run">move</button>
<pre id="result"></pre>`;
