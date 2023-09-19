export const title       = '11) Manage the life cycle'
export const description = `RENDER return false and REFRESH forced`;

export async function script () {
  const {Base, RENDER, REFRESH, CONTEXT, define} = await import('/src/web-component/base.js');

  class MyComponent extends Base {

    async load () {
      const ctx      = this [CONTEXT];
      const URL      = `https://httpbin.org/delay/${ ctx.delay }?label=hello%20Graphane`;
      const response = await fetch(URL);
      const data     = await response.json();
      ctx.label      = data.args.label;
      this[REFRESH](true);
    }

    [RENDER] () {
      this.load();
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
          }
        </style>
        <svg viewBox="0 0 200 100" width="200" height="100">
          <ellipse cx="100" cy="50" rx="100" ry="50" fill="blue"/>
          <text x="50%" y="50%" text-anchor="middle" fill="white" dy="0.2em" font-size="20">loading...
          </text>
        </svg>`;
      return false;
    }

    [REFRESH] () {
      const ctx      = this [CONTEXT];
      const text     = this.shadowRoot.querySelector('text');
      text.innerHTML = ctx.label;
    }

  }

  define(MyComponent)
    .attribute({name: 'delay', type: 'number', value: 0, posUpdate: 'load'})
    .attribute({name: 'label', type: 'string', value: '', posUpdate: REFRESH})
    .tag('my-component');
}

export default `
<g-my-component delay="2"></g-my-component>
`;