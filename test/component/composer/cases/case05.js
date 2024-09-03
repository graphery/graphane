export const title       = '5) Update the source'
export const description = 'Display a svg, config the content. Change the source, and update the image after the second rendering.';

export function script () {
  const component = document.querySelector('g-composer');
  const initSrc   = '/test/component/composer/assets/image.svg';
  const altSrc    = '/test/component/composer/assets/check.svg';
  document.querySelector('#run').addEventListener('click', () => {
    component.svgSrc = component.svgSrc === initSrc ? altSrc : initSrc;
  });
  component.addEventListener('render', () => {
    if (component.svgSrc === altSrc) {
      component.svg.fill('green');
    } else {
      component.svg.fill('red');
    }
  })
}

export default `<g-composer svg-src="/test/component/composer/assets/image.svg" style="width: 200px; height: 200px;"></g-composer>
<button id="run">Change the content</button>
`;
