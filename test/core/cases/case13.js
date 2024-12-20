export const title       = '13) connect/disconnect callback into constructor'
export const description = `add a callback to connect the component to the DOM`;

export async function script () {
  const {Base, define} = await import('/src/core/base.js');

  class MyComponent extends Base {

    #message = 'loading...';

    constructor () {
      super();
      this[Base.ONCONNECT].push(
        () => {
          this.#message = 'connected!';
        },
        function () {
          document.querySelector('#result').innerHTML = this.message;
        }
      );
      this[Base.ONDISCONNECT].push(
        () => {
          this.#message = 'disconnected!';
        },
        function () {
          document.querySelector('#result').innerHTML = this.message;
        }
      );
    }

    [Base.RENDER] () {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
          }
        </style>
        <svg viewBox="0 0 200 100" width="200" height="100">
          <ellipse cx="100" cy="50" rx="100" ry="50" fill="blue"/>
          <text x="50%" y="50%" text-anchor="middle" fill="white" dy="0.2em" font-size="20">
           callbacks...
          </text>
        </svg>`;
    }

    get message () {
      return this.#message;
    }

  }

  define(MyComponent).tag('my-component');

  let el = document.querySelector('g-my-component');
  document.querySelector('#disconnect').addEventListener('click', () => {
    el.remove();
  })
  document.querySelector('#connect').addEventListener('click', () => {
    document.querySelector('#container').appendChild(el);
  })
}

export default `
<div>
  <button id="disconnect">disconnect</button>
  <button id="connect">connect</button>
</div>
<div id="result">
</div>
<div id="container">
  <g-my-component></g-my-component>
</div>
`;