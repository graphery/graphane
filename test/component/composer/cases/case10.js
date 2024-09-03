export const title       = '10) Intersection events'
export const description = 'You can capture the event intersection.enter and ' +
                           'intersection.exitViewport when the content is in and off the viewport.';

export function script () {
  const component = document.querySelector('g-composer');
  component.addEventListener('intersection.enter', () => {
    component.svg.fill('red');
  });
  component.addEventListener('intersection.exit', () => {
    component.svg.fill('blue');
  });
}

export default `<div style="width: 100px; height: 100px; overflow-y: scroll; overflow-x: hidden; border: 1px solid grey; text-align: center">
  <g-composer svg-src="/test/component/composer/assets/check.svg" intersection-ratio="1" style="width: 50px; margin-top: 120px;"></g-composer>
</div>`