export const title       = '4) Shape arc';
export const description = `create a bar`;

export function script () {
  const show  = document.querySelector('#show');
  const code = document.querySelector('#result');
  show.addEventListener('render', () => {
    code.innerHTML = sourceFormat(show.svg.source());
  });
}

export default `<g-composer id="show">
<template>
<svg viewBox="0 0 200 500" width="200" height="200">
  <path fill="none" stroke-width="10" stroke="black" :d="$$.arc(100, 250, 100, 50, 0)"/>
  <path fill="none" stroke-width="10" stroke="black" :d="$$.arc(100, 250, 100, 60, 90)"/>
  <path fill="none" stroke-width="10" stroke="black" :d="$$.arc(100, 250, 100, 70, 180)"/>
  <path fill="none" stroke-width="10" stroke="black" :d="$$.arc(100, 250, 100, 80, 270)"/>
</svg>
</template>
</g-composer>
<pre id="result"></pre>`;
