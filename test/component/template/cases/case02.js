export const title       = '2) Update the svg';
export const description = `Display a svg and update the image.`;

export function script () {
  const component = document.querySelector('g-template');
  if (component.rendered) {
    component.svg.querySelector('path').fill('red');
  } else {
    component.addEventListener('render', () => {
      component.svg.querySelector('path').fill('red');
    });
  }
}

export default `
<g-template src="/test/component/template/assets/image.svg" style="width: 200px; height: 200px;"> </g-template>
`;