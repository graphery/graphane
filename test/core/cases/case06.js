export const title       = '6) Context'
export const description = `Getting value`;

export async function script () {
  const { Base, RENDER, REFRESH, CONTEXT, define } = await import('/src/core/base.js');

  class MyComponent extends Base {

    [ RENDER ] () {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
            cursor: pointer;
          }
        </style>
        <svg viewBox="0 0 200 100" width="200" height="100">
          <ellipse cx="100" cy="50" rx="100" ry="50" fill="blue"/>
          <text x="50%" y="50%" text-anchor="middle" fill="white"
            dy="0.3em" font-size="20"></text>
        </svg>`;
      const svg = this.shadowRoot.querySelector('svg');
      svg.addEventListener('click', () => {
        this[CONTEXT].value++;
        this[REFRESH]();          // Update value from CONTEXT don't launch REFRESH
      });
    }

    [ REFRESH ] () {
      this.shadowRoot.querySelector ('text').innerHTML = this[CONTEXT].value;
    }
  }

  define (MyComponent)
    .attribute({name:'value', type: 'number', value: 0, posUpdate: REFRESH})
    .tag ('my-component');

}

export default `
<g-my-component id="component" value="10"></g-my-component>
<p>click: add 1 to value</p>
`;