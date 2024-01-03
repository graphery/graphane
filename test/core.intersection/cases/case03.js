export const title       = '3) event & intersectionRatio = 0.5'
export const description = `Display an circle into a overflow div`;

export async function script () {
  const {Base, RENDER, define} = await import('/src/core/base.js');
  const {intersectionCoreExtension}         = await import('/src/core/intersection.js');

  class MyComponent extends Base {

    [RENDER] () {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
          }
        </style>
        <svg viewBox="0 0 100 100" width="100" height="100">
          <circle cx="50" cy="50" r="50" fill="blue"/>
        </svg>`;
    }
    get svg() {
      return this.shadowRoot.querySelector('svg');
    }
  }

  define(MyComponent)
    .extension(intersectionCoreExtension)
    .tag('my-component');

  const component  = document.querySelector('g-my-component');
  const result     = document.querySelector('#result');
  result.innerHTML = `<p>intersectionRatio = ${component.intersectionRatio }</p>`
  component.addEventListener('intersection.enter', ()=> component.svg.querySelector('circle').setAttribute('fill', 'red'));
  component.addEventListener('intersection.exit', ()=> component.svg.querySelector('circle').setAttribute('fill', 'blue'));

}

export default `
<div id="container" style="width: 120px; height: 120px; overflow: auto">
  <g-my-component intersection-ratio="0.5" style="margin-top:120px;"></g-my-component>
</div>
<pre id="result"></pre>`;