export const title       = '2) Attribute reaction'
export const description = `Display a label`;

export async function script () {
  const { Base, RENDER, REFRESH, define } = await import('/src/core/base.js');

  class MyComponent extends Base {
    constructor () {
      super ();
      this.label = 'Hello';
    }

    [ RENDER ] () {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
            cursor:pointer;
          }
        </style>
        <svg viewBox="0 0 200 100" width="200" height="100">
          <ellipse cx="100" cy="50" rx="100" ry="50" fill="blue"/>
          <text x="50%" y="50%" text-anchor="middle" fill="white"
            dy="0.3em" font-size="20"></text>
        </svg>`;
      this.addEventListener('click', () => {
        this.label = this.label === 'Hello' ? 'Goodbye' : 'Hello';
      });
    }

    [ REFRESH ] () {
      this.shadowRoot.querySelector ('text').innerHTML = this.label;
    }
  }

  define (MyComponent)
    .prop({name:'label', posUpdate: REFRESH})
    .tag ('my-component');
}

export default `
<g-my-component></g-my-component>
<p>click: change the label</p>`;