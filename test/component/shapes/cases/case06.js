export const title       = '6) Shape arc direction';
export const description = `create a bar with optional direction`;

export function script () {
  const show  = document.querySelector('#show');
  const code = document.querySelector('#result');
  show.addEventListener('render', () => {
    code.innerHTML = sourceFormat(show.svg.source());
  });
}

export default `<g-composer id="show">
<template>
<svg viewBox="0 0 200 200" width="200">
  <circle fill="red" cx="75" cy="100" r="50"></circle>
  <path fill="none" stroke-width="1" stroke="black" id="path" 
        :d="$$.arc(75, 100, 60, -180, 240)"></path>
  <text>
    <textPath href="#path" method="align">testing the path</textPath>
  </text>
</svg>
</template>
</g-composer>
<pre id="result"></pre>`;
