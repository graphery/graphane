export const title       = '6) Dynamic creation'
export const description = 'Create a g-composer from JS.';

export function script () {
  const div              = document.querySelector('div#content');
  const component        = document.createElement('g-composer');
  component.svgSrc          = "/test/component/composer/assets/image.svg";
  component.style.width  = '200px';
  component.style.height = '200px';
  component.addEventListener('render', () => {
    component.svg.fill('violet');
  });
  div.appendChild(component);
}

export default `<div id="content"></div>`;
