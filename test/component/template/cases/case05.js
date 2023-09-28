export const title       = '5) Update the source'
export const description = 'Display a svg, config the content. Change the source, and update the image after the second rendering.';

export function script () {
  const component = document.querySelector('g-template');
  const initSrc   = '/test/component/template/assets/image.svg';
  const altSrc    = '/test/component/template/assets/check.svg';
  document.querySelector('#run').addEventListener('click', () => {
    component.src = component.src === initSrc ? altSrc : initSrc;
  });
  component.addEventListener('render', () => {
    if (component.src === altSrc) {
      component.svg.fill('green');
    } else {
      component.svg.fill('red');
    }
  })
}

export default `<g-template src="/test/component/template/assets/image.svg" style="width: 200px; height: 200px;"></g-template>
<button id="run">Change the content</button>
`;
