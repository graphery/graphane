export const title       = '1) body.dark';
export const description = `observer dark mode with <code>body.dark</code>`;

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
  document.querySelector('#dark-mode').addEventListener('change', () => {
    document.body.classList.toggle('dark');
  });
}

export default `
<style>
:root {
  background: #fff;
  color: #000;
}
:root.dark, body.dark {
  background: #000;
  color: #fff;
}
</style>
<g-composer id="show">
  <template>
    <svg viewBox="0 0 100 100" width="100" height="100">
      <style>
      .check {
        fill: #000;
      }
      :host(.dark) .check {
        fill: #fff;
      }
      </style>
      <rect x="10" y="10" width="80" height="80" class="check" />
    </svg>
  </template>
</g-composer>
<label><input type="checkbox" id="dark-mode" /> dark mode</label>
<pre id="result"></pre>`;
