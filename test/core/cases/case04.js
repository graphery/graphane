export const title       = '4) Update attribute and property'
export const description = `Fire ready, render, update, and refresh events`;

export async function script () {
  const { Base, RENDER, REFRESH, define } = await import('/src/core/base.js');

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
        this.label = this.label === 'Hello' ? 'Goodbye' : 'Hello';
      });
      svg.addEventListener('auxclick', (evt) => {
        evt.preventDefault();
        this.setAttribute('label', this.getAttribute('label') === 'Hello' ? 'Goodbye' : 'Hello')
      });
      svg.addEventListener('contextmenu', (evt) => {
        evt.preventDefault();
      });
    }

    [ REFRESH ] () {
      this.shadowRoot.querySelector ('text').innerHTML = this.label;
    }
  }

  define (MyComponent)
    .attr({name:'label', value: 'Hello', posUpdate: REFRESH})
    .tag ('my-component');

}

export default `
<g-my-component id="component"></g-my-component>
<p>click: change the label by property</p>
<p>right click: change the label by attribute</p>
`;