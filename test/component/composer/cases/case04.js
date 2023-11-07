export const title       = '4) Define the source after the creation'
export const description = 'Display a svg lazy.';

export function script() {
  const component        = document.querySelector('g-composer');
  const alternativeImage = '/test/component/composer/assets/check.svg';
  document.querySelector('#run').addEventListener('click', () => {
    component.svgSrc = alternativeImage;
  });
}

export default `<g-composer style="width: 200px; height: 200px;"></g-composer>
<button id="run">Add the content</button>`;
