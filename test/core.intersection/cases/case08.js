export const title       = '8) update intersectionRatio'
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
          <circle cx="50" cy="50" r="50" style="fill: var(--circle-fill)"/>
          <rect x="14" y="14" width="72" height="72"/> 
        </svg>`;
    }
    get svg() {
      return this.shadowRoot.querySelector('svg');
    }
  }

  define(MyComponent)
    .extension(intersectionCoreExtension)
    .tag('my-component');

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
  <g-my-component intersection-ratio="1" class="exit" intersection-class="enter" style="margin-top:70px;"></g-my-component>
</div>
<pre>intersectionRatio = <input type="range" min="0" max="1" value="1" step="0.05" oninput="document.querySelector('g-my-component').intersectionRatio = this.value"</pre>`;