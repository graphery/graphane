export const title       = '1) Web component'
export const description = `Display an ellipse`;

export async function script () {
  const { Base, RENDER, define } = await import('/src/core/base.js');

  class MyComponent extends Base {

    [ RENDER ] () {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
          }
        </style>
        <svg viewBox="0 0 200 100" width="200" height="100">
          <ellipse cx="100" cy="50" rx="100" ry="50" fill="blue"/>
        </svg>`;
    }
  }
  define (MyComponent).tag('my-component');

}

export default `
<g-my-component></g-my-component>`;