export const title = '2) Intersection by template.engine';
export const description = `display an SVG when scroll`;

export async function script () {
  const svg = gSVG(document.querySelector('svg'));
  svg.render({
    enter() {
      svg.fill('red')
    },
    exit() {
      svg.fill('blue')
    }
  });
}

export default `
<div id="container" style="width: 220px; height: 220px; overflow: auto">
  <svg viewBox="0 0 512 512" g-intersection="0.5" @intersection.enter="enter" @intersection.exit="exit" style="width:200px; height: 200px; margin-top: 300px; margin-bottom: 300px;">
    <path d="M464 32H48C21.492 32 0 53.49 0 80V432C0 458.51 21.492 480 48 480H464C490.508 480 512 458.51 512 432V80C512 53.49 490.508 32 464 32ZM48 464C30.355 464 16 449.645 16 432V380.688L122.344 274.344C125.469 271.219 130.531 271.219 133.656 274.344L212.688 353.375L102.062 464H48ZM496 432C496 449.645 481.645 464 464 464H124.688L378.344 210.344C381.469 207.219 386.531 207.219 389.656 210.344L496 316.688V432ZM496 294.062L400.969 199.031C391.594 189.687 376.406 189.687 367.031 199.031L224 342.062L144.969 263.031C135.594 253.688 120.406 253.688 111.031 263.031L16 358.062V80C16 62.355 30.355 48 48 48H464C481.645 48 496 62.355 496 80V294.062ZM128 104C97.07 104 72 129.072 72 160S97.07 216 128 216S184 190.928 184 160S158.93 104 128 104ZM128 200C105.945 200 88 182.055 88 160C88 137.943 105.945 120 128 120S168 137.943 168 160C168 182.055 150.055 200 128 200Z"/>
  </svg>
</div>`;
