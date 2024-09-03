export const title       = '32) g-on with added method';
export const description = `Use the g-on directive with an added method`;

export default `<g-composer>
  <svg viewBox="0 0 100 100" id="svg">
    <circle id="run" 
            cx="50"
            cy="50"
            r="50"
            fill="red"
            g-on:click="text"/>
    <text x="36" 
          y="53"
          g-on:click="text">click</text>
  </svg>
</g-composer>
`;

export function script () {
  const component = document.querySelector('g-composer');
  component.methods.text = function(evt) {
    component.svg.querySelector('text').content('ok').x(44);
  }
}