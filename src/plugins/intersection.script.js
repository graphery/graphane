import svgPlugin from './intersection.js';

if (gSVG) {
  gSVG.install(svgPlugin);
}

customElements
  .whenDefined('g-composer')
  .then(composer => {
    composer.install(svgPlugin);
  });
