export const title       = '5) arc values';
export const description = `check different arc values`;

export function script () {
  const show = document.querySelector('#show');
  const code = document.querySelector('#result');
  if (show.rendered) {
    code.innerHTML = sourceFormat(show.svg.source());
  } else {
    show.addEventListener('render', () => {
      code.innerHTML = sourceFormat(show.svg.source());
    });
  }
}

export default `<g-composer id="show">
<template>
<svg viewBox="0 0 1000 800" width="300">
  <defs>
    <marker viewBox="0,0,10,10" refX="5" refY="5" markerWidth="10" markerHeight="10" orient="auto-start-reverse" id="arrow">
      <path fill="#00d800" d="M0,0L10,5L0,10z"></path>
    </marker>
  </defs>
  <g g-for="(r, i) of data">
    <text :x="i % 5 * 200 + 100" 
          :y="Math.floor(i / 5) * 200 + 100" 
          font-size="35" text-anchor="middle" dominant-baseline="middle"
          g-content="r"></text>
    <path fill="none" stroke-width="3" stroke="black" id="path" marker-end="url(#arrow)" 
          :d="$$.arc(i % 5 * 200 + 100, Math.floor(i / 5) * 200 + 100, 80, r[0], r[1])"></path>
  </g>
</svg>
</template>
<script type="data">
[
  [90], [-90], [90, 180], [-90, 180], [180, -90],
  [360], [90, 360], [270, 270], [270], [270, 90],
  [360, 360], [400], [-400], [-180, -270], [-270, -180],
  [0], [90, -300], [-300, 90], [-270, 60], [60, -270]
]
</script>
</g-composer>
<pre id="result"></pre>`;
