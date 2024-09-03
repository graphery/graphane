export const title       = '2) Update the svg';
export const description = `Display a svg and update the image.`;

export function script () {
  const component = document.querySelector('g-composer');
  if (component.rendered) {
    component.svg.querySelector('path').fill('red');
  } else {
    component.addEventListener('render', () => {
      component.svg.querySelector('path').fill('red');
    });
  }
}

export default `
<g-composer svg-src="/test/component/composer/assets/image.svg" style="width: 200px; height: 200px;"> </g-composer>
`;