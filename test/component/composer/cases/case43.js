export const title       = '43) resize event handler';
export const description = `Handle with resize.observer plugin`;

export function script () {
  const composer = document.querySelector('g-composer');
  document.querySelector('#run').addEventListener('click', () => {
    composer.style.width  = (Number.parseInt(composer.style.width) + 20) + 'px';
    composer.style.height = (Number.parseInt(composer.style.height) + 20) + 'px';
  });
  document.querySelector('#minus').addEventListener('click', () => {
    composer.style.width  = (Number.parseInt(composer.style.width) - 20) + 'px';
    composer.style.height = (Number.parseInt(composer.style.height) - 20) + 'px';
  });
}

export default `
<g-composer data="n: 0" style="width: 100px; height: 100px">
  <svg viewBox="0 0 100 100" width="100%" height="100%" style="border: 1px solid lightgray" @resize="add">
    <text text-anchor="middle"
          alignment-baseline="middle"
          x="50"
          y="50"
          font-size="40"
          g-content="n"
          g-keep-aspect="size"/>
  </svg>
  <script type="plugin" src="../plugins/observe.resize.js"></script>
  <script type="methods">
    function add(evt) {
      if (evt.detail.currentMatrix.a > evt.detail.prevMatrix.a) {
        $.data.n++;
      } else {
        $.data.n--;
      }
    }
  </script>
</g-composer>
<p>
  <button id="run">up size</button>
  <button id="minus">down size</button>
</p>
`;