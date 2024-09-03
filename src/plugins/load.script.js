import svgPlugin from './load.js';

if (globalThis.gSVG) {
  globalThis.gSVG.install(svgPlugin);
}

customElements
  .whenDefined('g-composer')
  .then(composer => {
    composer.install(svgPlugin);
  });
