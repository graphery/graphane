export const title       = '88) value property (boolean)';
export const description = `component.value=false`;

export function script () {
  const component = document.querySelector('g-composer');
  component.value  = false;
}

export default `<g-composer>
  <svg viewBox="0 0 110 110">
    <text x="50" y="50" dominant-baseline="middle" text-anchor="middle"
          g-if="!value"
          g-content="value">test</text>
  </svg>
</g-composer>
`;