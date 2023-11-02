export const title       = '36) helper data: simple data';
export const description = 'helper data with integers';

export function script () {
  const svg = gSVG(document.querySelector('#svg'));
  svg.render({data: [
    0,1,2,3,4,5,6,7,8,9,10
  ]});
  document.querySelector('#result').innerHTML = svg.source().replace(/</g, "&lt;");
}

export default `<svg viewBox="0 0 350 200" id="svg" style="width: 350px; height: 200px">
  <text x="0" y="12">$.min(): <tspan g-content="$.min()"></tspan></text>
  <text x="0" y="30">$.max(): <tspan g-content="$.max()"></tspan></text>
  <text x="0" y="48">$.count(): <tspan g-content="$.count()"></tspan></text>
  <text x="0" y="66">$.sum(): <tspan g-content="$.sum()"></tspan></text>
  <text x="0" y="84">$.avg(): <tspan g-content="$.avg()"></tspan></text>
  <text x="0" y="102">$.distinct(): <tspan g-content="$.distinct()"></tspan></text>
  <text x="0" y="138">data.filter(x => x < 4).map(x => x * 2): <tspan g-content="data.filter(x => x < 4).map(x => x * 2)"></tspan></text>
</svg>
<pre id="result"></pre>`;
