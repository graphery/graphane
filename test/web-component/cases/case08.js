export const title       = '8) CHANGE'
export const description = `Capture the light DOM change`;

export async function script () {
  const { Base, RENDER, CHANGE, define } = await import('/src/web-component/base.js');

  class MyComponent extends Base {

    [RENDER] () {
      const text                = this.querySelector('label').innerHTML;
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
          }
        </style>
        <svg viewBox="0 0 200 100" width="200" height="100">
          <ellipse cx="100" cy="50" rx="100" ry="50" fill="blue"/>
          <foreignObject x="0" y="0" width="200" height="100"
            style="color: white; text-align: center; font-size: 1.8em; line-height: 3.5em;">
            ${ text }
          </foreignObject>
        </svg>`;
    }

    [CHANGE] (mutation) {
      const foreignObject     = this.shadowRoot.querySelector('foreignObject');
      const label             = this.querySelector('label');
      foreignObject.innerHTML = label.innerHTML;
    }
  }

  define (MyComponent)
    .tag ('my-component');


  const component = document.querySelector ('#component');
  const num       = component.querySelector ('#num');
  const update    = document.querySelector ('#update');

  update.addEventListener ('click', () => {
    num.innerText = parseInt (num.innerText) + 1
  });
}

export default `
<g-my-component id="component">
  <label><strong><em>Number</em>:</strong> <span id="num">0</span></label>
</g-my-component>
<p>
  <button id="update">update the light DOM</button>
</p>
`;