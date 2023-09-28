export const title       = '12) Simple'
export const description = `A componente without UI`;

export async function script () {
  const {Simple, CONTEXT, define} = await import('/src/core/simple.js');

  class MyComponent extends Simple {

    async load () {
      const ctx      = this [CONTEXT];
      const URL      = `https://httpbin.org/delay/${ ctx.delay }?label=hello%20Graphane`;
      const response = await fetch(URL);
      const data     = await response.json ();
      const ref      = document.querySelector (ctx.href);
      ref.innerHTML  = data.args.label;
    }

  }

  define (MyComponent)
    .attribute ({name : 'delay', type : 'number', value : 0, posUpdate : 'load'})
    .attribute ({name : 'href', type : 'string', value : ''})
    .tag ('my-component');
}

export default `
<g-my-component href="#content"></g-my-component>
<button id="update" onclick="document.querySelector('g-my-component').delay=1">load</button>
<div id="content"></div>
`;