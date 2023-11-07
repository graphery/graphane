export const title       = '37) helper data: object data';
export const description = 'helper data with objects';

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render({data: [
      {val: 0},
      {val: 1},
      {val: 2},
      {val: 3},
      {val: 4},
      {val: 5},
      {val: 6},
      {val: 7},
      {val: 8},
      {val: 9},
      {val: 10}
  ]});
  document.querySelector('#result').innerHTML = svg.source().replace(/</g, "&lt;");
}

export default `<svg viewBox="0 0 350 200" id="svg" style="width: 350px; height: 200px">
  <text x="0" y="12">$.min('val'): <tspan g-content="$.min('val')"></tspan></text>
  <text x="0" y="30">$.max('val'): <tspan g-content="$.max('val')"></tspan></text>
  <text x="0" y="48">$.count('val'): <tspan g-content="$.count('val')"></tspan></text>
  <text x="0" y="66">$.sum('val'): <tspan g-content="$.sum('val')"></tspan></text>
  <text x="0" y="84">$.avg('val'): <tspan g-content="$.avg('val')"></tspan></text>
  <text x="0" y="102">$.distinct('val'): <tspan g-content="$.distinct('val')"></tspan></text>

  <text x="0" y="138">data.filter(x => x.val < 4).map(x => x.val * 2): <tspan g-content="data.filter(x => x.val < 4).map(x => x.val * 2)"></tspan></text>
</svg>
<pre id="result"></pre>`;
