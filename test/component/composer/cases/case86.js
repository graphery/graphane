export const title       = '86) value property (string)';
export const description = `component.value="hello"`;

export function script () {
  const component = document.querySelector('g-composer');
  component.value  = "hello";
}

export default `<g-composer>
  <svg viewBox="0 0 110 110">
    <text x="50" y="50" dominant-baseline="middle" text-anchor="middle"
          g-content="value">test</text>
  </svg>
</g-composer>
`;