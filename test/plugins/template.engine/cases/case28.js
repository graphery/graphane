export const title       = '28) g-bind:d with functions';
export const description = 'g-bind:d with functions as M().c().Z()';

export function script () {
  const svg     = gSVG(document.querySelector('#svg'));

  svg.render();
}

export default `<svg id="svg" viewBox="0 0 512 512" width="300" height="300">
  <path g-bind:d="$$.M(462,62).c(-54,-46,-136,-38,-186,13).l(-19,20,-19,-20).c(-50,-51,-131,-60,-186,-13).c(-62,53,-66,149,-9,207).l(193,199).c(12,12,32,12,45,0).l(193,-199).c(54,-55,52,-154,-13,-207).Z()"/>
</svg>
<pre id="result"></pre>`;
