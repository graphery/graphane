export const title       = '14) connect/disconnect callbacks into constructor and prototype';
export const description = `add a callback to connect the component to the DOM`;

export async function script () {
  const {Base, define, ONCONNECT, ONDISCONNECT} = await import('/src/core/base.js');

  class MyComponent extends Base {

    #message = 'loading...';

    constructor () {
      super();
      debugger
      this[ONCONNECT].push(
        function () {
          document.querySelector('#result').innerHTML = this.message;
        }
      );
      this[ONDISCONNECT].push(
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

    set message (value) {
      this.#message = value;
    }

  }

  MyComponent.prototype[ONCONNECT].push(function() {
    this.message = 'connected!';
  });

  MyComponent.prototype[ONDISCONNECT].push( function() {
    this.message = 'disconnected!';
  });

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