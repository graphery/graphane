export const title       = '7) Wrong source';
export const description = 'Do not display a svg with a wrong source.';

export function script () {
  const component = document.querySelector('g-composer');
  component.addEventListener('error', (evt) => {
    document.querySelector('#result').innerHTML = evt.detail;
  });
  component.svgSrc = "/src/g-composer/test/assets/unknown.svg";
}

export default `<g-composer ></g-composer>
<div id="result"></div>`;
