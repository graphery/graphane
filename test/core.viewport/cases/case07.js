export const title       = '7) css var'
export const description = `Display an circle into a overflow div`;

export async function script () {
  const {Base, RENDER, define} = await import('/src/core/base.js');
  const {viewport}             = await import('/src/core/viewport.js');

  class MyComponent extends Base {

    [RENDER] () {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
          }
        </style>
        <svg viewBox="0 0 100 100" width="100" height="100">
          <circle cx="50" cy="50" r="50" style="fill: var(--circle-fill)"/>
          <rect x="14" y="14" width="72" height="72"/> 
        </svg>`;
    }
    get svg() {
      return this.shadowRoot.querySelector('svg');
    }
  }

  define(MyComponent)
    .extension(viewport)
    .tag('my-component');

  const component  = document.querySelector('g-my-component');
  const result     = document.querySelector('#result');
  result.innerHTML = `<p>viewportRatio = ${component.viewportRatio }</p>`

}

export default `
<style>
.exit {
  --circle-fill: blue;
}
.enter {
  --circle-fill: red;
}
</style>
<div id="container" style="width: 120px; height: 120px; overflow: auto">
  <g-my-component viewport-ratio="1" class="exit" viewport-class="enter" style="margin-top:120px;"></g-my-component>
</div>
<pre id="result"></pre>`;