export const title       = '10) Viewport events'
export const description = 'You can capture the event enterViewport and exitViewport when the' +
                           ' content is in and off the viewport.';

export function script () {
  const component = document.querySelector('g-template');
  component.addEventListener('enterViewport', () => {
    component.svg.fill('red');
  });
  component.addEventListener('exitViewport', () => {
    component.svg.fill('blue');
  });
}

export default `<div style="width: 100px; height: 100px; overflow-y: scroll; overflow-x: hidden; border: 1px solid grey; text-align: center">
  <g-template svg-src="/test/component/template/assets/check.svg" viewport-ratio="1" style="width: 50px; margin-top: 120px;"></g-template>
</div>`