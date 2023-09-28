export const title       = '9) RESIZE'
export const description = `Capture the resize`;

export async function script () {
  const { Base, RENDER, RESIZE, define } = await import('/src/core/base.js');

  class MyComponent extends Base {

    [ RENDER ] () {
      this.shadowRoot.innerHTML = `
        <style>
          :host { display: block;}
        </style>
        <svg viewBox="0 0 200 100" width="100%" height="100">
          <ellipse cx="100" cy="50" rx="100" ry="50" fill="blue"/>
          <text x="50%" y="50%" text-anchor="middle" fill="white" dy="0.2em" font-size="20">
            ${ this.label }
          </text>
        </svg>`;
    }

    [ RESIZE ] (width, height) {
      const svg = this.shadowRoot.querySelector ('svg');
      svg.setAttribute ('height', width / 2);
    }
  }

  define (MyComponent)
    .attribute ({name : 'label', type : 'string', value : '', posUpdate : RENDER})
    .tag ('my-component');

}

export default `

<div id="container" 
  style="height: 300px; width: 300px; resize:both; overflow: hidden; border: 1px dotted black">
  <g-my-component style="width: 100%; height: auto;" id="component" label="Hello"></g-my-component>
</div>
<p>Please resize the box</p>

`;