export const title       = '52) Size: hide and component';
export const description = 'start with display none and component size by css';


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
  <g-composer style="width: 300px">
    <svg viewBox="0 0 100 100">
      <rect x="0" y="0" width="100" height="100" fill="red"/>
    </svg>
  </g-composer>
</div>
<button id="run">show</button>
`;