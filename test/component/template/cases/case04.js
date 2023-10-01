export const title       = '4) Define the source after the creation'
export const description = 'Display a svg lazy.';

export function script() {
  const component        = document.querySelector('g-template');
  const alternativeImage = '/test/component/template/assets/check.svg';
  document.querySelector('#run').addEventListener('click', () => {
    component.svgSrc = alternativeImage;
  });
}

export default `<g-template style="width: 200px; height: 200px;"></g-template>
<button id="run">Add the content</button>`;
