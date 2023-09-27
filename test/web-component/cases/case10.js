export const title       = '10) CSS'
export const description = `CSS properties and related functions`;

export async function script () {
  const {Base, RENDER, define}                 = await import('/src/web-component/base.js');
  const {getCSSVar, getCSSPropertyDescriptors} = await import('/src/helpers/cssprops.js');

  class MyComponent extends Base {

    [RENDER] () {
      this.shadowRoot.innerHTML = `
            <style>
            :host {
                display: block;
                width: 64px;
                height: 64px;
                background-color: ${ getCSSVar(this, 'bg-color') };
                color: ${ getCSSVar(this, 'fg-color') };
            }
            </style>
            G
        `;
    }
  }

  define(MyComponent)
    .style({name : 'bg-color', initialValue : 'red'})
    .style({name : 'fg-color', initialValue : 'white'})
    .tag('my-component');

  const component = document.querySelector('#component');
  const result    = document.querySelector('#result');
  const check     = document.querySelector('#check');
  check.addEventListener('click', () => {
    const descriptors = getCSSPropertyDescriptors(component);
    result.innerHTML  = JSON.stringify(descriptors, null, 2).replaceAll('<', '&lt;');
  });


}

export default `
<g-my-component id="component"></g-my-component>
<p>
  <button id="check">get CSS properties</button>
</p>
<pre id="result"></pre>

`;