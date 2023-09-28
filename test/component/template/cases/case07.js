export const title       = '7) Wrong source';
export const description = 'Do not display a svg with a wrong source.';

export function script () {
  const component = document.querySelector('g-template');
  component.addEventListener('error', (evt) => {
    document.querySelector('#result').innerHTML = evt.detail;
  });
  component.src = "/src/g-template/test/assets/unknown.svg";
}

export default `<g-template ></g-template>
<div id="result"></div>`;
