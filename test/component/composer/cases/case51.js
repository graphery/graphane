export const title       = '51) Size: hide and SVG';
export const description = 'start with display none and component size defined by SVG';


export function script () {
  const container = document.querySelector('#container');
  const show      = document.querySelector('#run');

  show.addEventListener('click', () => {
    if (container.style.display) {
      container.style.display = '';
      show.innerHTML = 'hide';
    } else {
      container.style.display = 'none';
      show.innerHTML = 'show';
    }
  });

}


export default `
<div id="container" style="display:none">
  <g-composer>
    <svg viewBox="0 0 100 100" style="width:200px">
      <rect x="0" y="0" width="100" height="100" fill="red"/>
    </svg>
  </g-composer>
</div>
<button id="run">show</button>
`;