export const title       = '42) g-if with animation';
export const description = 'display or not an animation by g-if';

export function script () {
  let animation = false;
  const svg = gSVG(document.querySelector('#svg'));

  svg.render({animation});
  document.querySelector('#result').innerHTML = sourceFormat(svg.source());

  document.querySelector('#update').addEventListener('click', () => {
    animation = !animation;
    svg.render({animation});
    document.querySelector('#result').innerHTML = sourceFormat(svg.source());
  });
}

export default `
<svg id="svg" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" style="width: 200px;">
  <rect width="10" height="10">
    <animate
      g-if="animation"
      attributeName="rx"
      values="0;5;0"
      dur="10s"
      repeatCount="indefinite"
    ></animate>
  </rect>
</svg>
<button id="update">update</button>
<pre id="result"></pre>`;
