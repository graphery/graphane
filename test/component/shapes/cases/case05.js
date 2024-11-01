export const title       = '5) Shape star';
export const description = `create a star`;

export function script () {
  const show = document.querySelector('#show');
  const code = document.querySelector('#result');
  show.addEventListener('render', () => {
    code.innerHTML = sourceFormat(show.svg.source());
  });
}

export default `<g-composer id="show">
<template>
<svg viewBox="0 0 200 500" width="200" height="200">
  <path :d="$$.star(100, 250, 100, 15, 5, 0)"/>
</svg>
</template>
</g-composer>
<pre id="result"></pre>`;
